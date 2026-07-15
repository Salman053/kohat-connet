import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { createMockSupabaseClient } from '@/src/test/mocks/supabase'
import { SYSTEM_DOMAIN } from '@/lib/utils'

const singletonClient = createMockSupabaseClient()

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => singletonClient),
}))

const { GET, POST } = await import('../route')

describe('payments API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET', () => {
    it('returns payments list with user and advertisement data', async () => {
      const request = new NextRequest(new URL(SYSTEM_DOMAIN+'api/payments'))
      const response = await GET(request)
      const body = await response.json()

      expect(response.status).toBe(200)
      expect(body.payments).toBeDefined()
      expect(Array.isArray(body.payments)).toBe(true)
      expect(body.payments.length).toBeGreaterThan(0)
    })

    it('filters payments by status', async () => {
      const request = new NextRequest(
        new URL(SYSTEM_DOMAIN+'api/payments?status=under_review')
      )
      const response = await GET(request)
      const body = await response.json()

      expect(response.status).toBe(200)
      expect(body.payments).toBeDefined()
    })

    it('handles pagination parameters', async () => {
      const request = new NextRequest(
        new URL(SYSTEM_DOMAIN+'api/payments?limit=5&offset=0')
      )
      const response = await GET(request)
      const body = await response.json()

      expect(response.status).toBe(200)
      expect(body.limit).toBe(5)
      expect(body.offset).toBe(0)
    })

    it('returns error on failure', async () => {
      vi.mocked(singletonClient.from).mockImplementationOnce(() => {
        throw new Error('Database error')
      })

      const request = new NextRequest(new URL(SYSTEM_DOMAIN+'api/payments'))
      const response = await GET(request)
      const body = await response.json()

      expect(response.status).toBe(500)
      expect(body.error).toBe('Database error')
    })
  })

  describe('POST', () => {
    it('creates a new payment', async () => {
      const request = new NextRequest(SYSTEM_DOMAIN+'api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer test-token',
        },
        body: JSON.stringify({
          advertisement_id: 'ad-1',
          amount: 5000,
          payment_method: 'bank_transfer',
          transaction_id: 'TXN123',
          receipt_url: 'https://example.com/receipt.pdf',
        }),
      })

      const response = await POST(request)
      const body = await response.json()

      expect(response.status).toBe(201)
      expect(body.user_id).toBe('test-user-id')
      expect(body.status).toBe('under_review')
    })

    it('rejects unauthorized requests', async () => {
      const request = new NextRequest(SYSTEM_DOMAIN+'api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ advertisement_id: 'ad-1', amount: 5000 }),
      })

      const response = await POST(request)
      expect(response.status).toBe(401)
    })

    it('rejects requests with invalid auth token', async () => {
      vi.mocked(singletonClient.auth.getUser).mockResolvedValueOnce({
        data: { user: null },
        error: new Error('Invalid token'),
      } as any)

      const request = new NextRequest(SYSTEM_DOMAIN+'api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer invalid-token',
        },
        body: JSON.stringify({ advertisement_id: 'ad-1', amount: 5000 }),
      })

      const response = await POST(request)
      expect(response.status).toBe(401)
    })
  })
})
