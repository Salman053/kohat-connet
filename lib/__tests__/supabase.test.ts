import { describe, it, expect, vi } from 'vitest'
import { createMockSupabaseClient } from '@/src/test/mocks/supabase'

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(() => createMockSupabaseClient()),
}))

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => createMockSupabaseClient()),
}))

const supModule = await import('@/lib/supabase')

describe('lib/supabase', () => {
  it('exports supabase function that returns a client', () => {
    const client = supModule.supabase()
    expect(client).toBeDefined()
    expect(client.auth).toBeDefined()
    expect(client.from).toBeDefined()
  })

  it('exports supabaseAdmin function that returns a client', () => {
    const client = supModule.supabaseAdmin()
    expect(client).toBeDefined()
    expect(client.auth).toBeDefined()
    expect(client.from).toBeDefined()
  })
})
