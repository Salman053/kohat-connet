import { createClient } from './supabase/client'
import { createClient as createServerSupabase } from '@supabase/supabase-js'

export function supabase() {
  return createClient()
}

export function supabaseAdmin() {
  return createServerSupabase(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
