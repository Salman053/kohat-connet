import { createBrowserClient } from '@supabase/ssr'

// Use globalThis to persist across hot reloads in development
const getGlobal = () => {
  if (typeof globalThis !== 'undefined') {
    return globalThis as any
  }
  if (typeof window !== 'undefined') {
    return window as any
  }
  if (typeof global !== 'undefined') {
    return global as any
  }
  return {}
}

export function createClient() {
  const global = getGlobal()
  
  if (!global.__supabaseClient) {
    global.__supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  
  return global.__supabaseClient
}
