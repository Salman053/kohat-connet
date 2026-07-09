import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null
let supabaseAdminInstance: ReturnType<typeof createClient> | null = null

function getEnv() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  }
}

export function supabase() {
  if (!supabaseInstance) {
    const { url, anonKey } = getEnv()
    supabaseInstance = createBrowserClient(url, anonKey)
  }
  return supabaseInstance
}

export function supabaseAdmin() {
  if (!supabaseAdminInstance) {
    const { url, anonKey } = getEnv()
    supabaseAdminInstance = createClient(
      url,
      process.env.SUPABASE_SERVICE_ROLE_KEY || anonKey
    )
  }
  return supabaseAdminInstance
}