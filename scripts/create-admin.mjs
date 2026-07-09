#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadEnv() {
  const envPath = resolve(__dirname, '..', '.env')
  if (!existsSync(envPath)) return {}
  const text = readFileSync(envPath, 'utf-8')
  const env = {}
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
  }
  return env
}

async function apiFetch(url, serviceKey, method, body, extraHeaders = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`,
      ...extraHeaders
    },
    body: body ? JSON.stringify(body) : undefined
  })
  if (res.status === 204) return null
  const data = await res.json()
  if (!res.ok) {
    const msg = data.msg || data.error || data.message || data.details?.message || JSON.stringify(data)
    throw new Error(`${res.status} ${res.statusText}: ${msg}`)
  }
  return data
}

async function getInput(args) {
  const env = loadEnv()
  const supabaseUrl = args[2] || process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL
  let serviceRoleKey = args[3] || process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY
  let email = args[4] || process.env.ADMIN_EMAIL
  let password = args[5] || process.env.ADMIN_PASSWORD
  let fullName = args[6] || process.env.ADMIN_NAME || 'Admin'

  if (!supabaseUrl) {
    console.error('ERROR: NEXT_PUBLIC_SUPABASE_URL not found')
    process.exit(1)
  }

  // All values provided via CLI/env — skip interactivity
  if (serviceRoleKey && email && password && fullName !== 'Admin') {
    return { supabaseUrl, serviceRoleKey, email, password, fullName }
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const ask = (q) => new Promise((r) => rl.question(q, r))

  if (!serviceRoleKey) {
    console.log('Get service_role key from: https://supabase.com/dashboard/project/mtoyvfmvbnjotzqmephw/settings/api\n')
    serviceRoleKey = await ask('Paste your service_role key: ')
  }
  if (!email) email = await ask('Admin email: ')
  if (!password) password = await ask('Admin password (min 6 chars): ')
  if (!fullName || fullName === 'Admin') {
    const name = await ask(`Full name [${fullName}]: `)
    if (name) fullName = name
  }

  rl.close()
  return { supabaseUrl, serviceRoleKey, email, password, fullName }
}

async function main() {
  console.log('=== Create Supabase Admin User ===\n')

  const { supabaseUrl, serviceRoleKey, email, password, fullName } = await getInput(process.argv)

  if (!serviceRoleKey || !email || !password) {
    console.error('Missing required fields')
    process.exit(1)
  }

  // 1. Ensure schema exists
  console.log('\n1. Ensuring database schema exists...')
  let schemaOk = false
  try {
    await apiFetch(`${supabaseUrl}/rest/v1/profiles?limit=1`, serviceRoleKey, 'GET')
    console.log('  profiles table OK')
    schemaOk = true
  } catch {}
  if (!schemaOk) {
    console.log('  Creating schema (profiles table, enum, trigger)...')
    const sql = `
    DO $$ BEGIN CREATE TYPE user_role AS ENUM ('admin', 'business', 'user'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    CREATE TABLE IF NOT EXISTS public.profiles (id UUID PRIMARY KEY, email TEXT UNIQUE NOT NULL, full_name TEXT, phone TEXT, role user_role DEFAULT 'user', avatar_url TEXT, business_name TEXT, business_address TEXT, business_phone TEXT, business_description TEXT, is_verified BOOLEAN DEFAULT FALSE, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
    CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
    CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$ BEGIN INSERT INTO public.profiles (id, email, full_name, role) VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', (NEW.raw_user_meta_data->>'role')::user_role); RETURN NEW; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    `
    await apiFetch(`${supabaseUrl}/api/pg/sql`, serviceRoleKey, 'POST', { query: sql })
    console.log('  Schema created')
  }

  // 2. Create/locate admin user
  console.log('\n2. Setting up admin user...')
  const authUrl = `${supabaseUrl}/auth/v1/admin/users`
  let userId

  // Check if user exists
  try {
    const lookup = await apiFetch(`${authUrl}?email=${encodeURIComponent(email)}`, serviceRoleKey, 'GET')
    const existing = lookup?.users?.[0]
    if (existing) {
      userId = existing.id
      console.log(`  Found existing user: ${email} (${userId})`)
    }
  } catch {}

  if (!userId) {
    // Try Admin API first, then fall back to signup endpoint
    try {
      const result = await apiFetch(authUrl, serviceRoleKey, 'POST', {
        email, password, email_confirm: true
      })
      userId = result.id
      console.log(`  User created via Admin API: ${email} (${userId})`)
    } catch (adminErr) {
      console.log(`  Admin API failed: ${adminErr.message}`)
      console.log('  Falling back to signup endpoint...')
      try {
        const result = await apiFetch(`${supabaseUrl}/auth/v1/signup`, serviceRoleKey, 'POST', {
          email, password,
          data: { full_name: fullName, role: 'admin' }
        })
        userId = result?.user?.id || result?.id
        if (userId) {
          console.log(`  User created via signup: ${email} (${userId})`)
        } else {
          throw new Error('Signup did not return a user ID')
        }
      } catch (signupErr) {
        throw new Error(`User creation also failed via signup: ${signupErr.message}`)
        console.log(signupErr)
      }
    }
  }

  // 3. Ensure profile has admin role
  console.log('\n3. Setting admin role in profile...')
  // Wait a moment for the trigger to fire
  await new Promise(r => setTimeout(r, 2000))

  let profileExists = false
  try {
    const data = await apiFetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`, serviceRoleKey, 'GET')
    if (Array.isArray(data) && data.length > 0 && data[0].id) profileExists = true
  } catch {}

  if (profileExists) {
    await apiFetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`, serviceRoleKey, 'PATCH', {
      role: 'admin', full_name: fullName
    })
    console.log('  Profile updated to admin')
  } else {
    // Trigger failed — create profile manually
    await apiFetch(`${supabaseUrl}/rest/v1/profiles`, serviceRoleKey, 'POST', {
      id: userId, email, full_name: fullName, role: 'admin'
    })
    console.log('  Profile created manually with admin role')
  }

  console.log('\n✓ Admin user ready!')
  console.log(`  Email: ${email}`)
  console.log(`  Name:  ${fullName}`)
  console.log(`  Role:  admin`)
  console.log(`\nSign in at: http://localhost:3000/auth/signin`)
}

main().catch((err) => { console.error(`\n✗ ${err.message}`); process.exit(1) })
