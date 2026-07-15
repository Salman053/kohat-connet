import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { createMockSupabaseClient } from '@/src/test/mocks/supabase'
import { SYSTEM_DOMAIN } from '@/lib/utils'

const mockSupabase = createMockSupabaseClient()

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => mockSupabase),
}))

const { PUT } = await import('../[id]/route')

describe('payments [id] API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('rejects unauthorized requests', async () => {
    const request = new NextRequest(SYSTEM_DOMAIN+'api/payments/payment-1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'completed' }),
    })

    const response = await PUT(request, { params: Promise.resolve({ id: 'payment-1' }) })
    expect(response.status).toBe(401)
  })

  it('rejects non-admin users', async () => {
    vi.mocked(mockSupabase.from).mockImplementation((table: string) => {
      if (table === 'profiles') {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: { role: 'business' }, error: null }),
            }),
          }),
        } as any
      }
      return {} as any
    })

    const request = new NextRequest(SYSTEM_DOMAIN+'api/payments/payment-1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer test-token',
      },
      body: JSON.stringify({ status: 'completed' }),
    })

    const response = await PUT(request, { params: Promise.resolve({ id: 'payment-1' }) })
    expect(response.status).toBe(403)
  })
})
