import { vi } from 'vitest'
import { createMockSupabaseClient, type MockSupabaseClient } from './supabase'

export function mockSupabaseModule(overrides?: Partial<MockSupabaseClient>) {
  const client = createMockSupabaseClient()
  Object.assign(client, overrides)
  return {
    createBrowserClient: vi.fn(() => client),
    createServerClient: vi.fn(() => client),
  }
}
