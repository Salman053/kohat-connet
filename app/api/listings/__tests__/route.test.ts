import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { createMockSupabaseClient } from '@/src/test/mocks/supabase'

const singletonClient = createMockSupabaseClient()

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => singletonClient),
}))

const { GET, POST } = await import('../route')

describe('listings API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET', () => {
    it('returns listings with category and user data', async () => {
      const request = new NextRequest(new URL('http://localhost:3000/api/listings'))
      const response = await GET(request)
      const body = await response.json()

      expect(response.status).toBe(200)
      expect(body.listings).toBeDefined()
      expect(Array.isArray(body.listings)).toBe(true)
      expect(body.limit).toBe(20)
      expect(body.offset).toBe(0)
    })

    it('filters by category', async () => {
      const request = new NextRequest(
        new URL('http://localhost:3000/api/listings?category=restaurants')
      )
      const response = await GET(request)
      const body = await response.json()

      expect(response.status).toBe(200)
      expect(body.listings).toBeDefined()
    })

    it('filters featured listings', async () => {
      const request = new NextRequest(
        new URL('http://localhost:3000/api/listings?featured=true')
      )
      const response = await GET(request)
      const body = await response.json()

      expect(response.status).toBe(200)
      expect(body.listings).toBeDefined()
    })

    it('paginates results', async () => {
      const request = new NextRequest(
        new URL('http://localhost:3000/api/listings?limit=5&offset=0')
      )
      const response = await GET(request)
      const body = await response.json()

      expect(response.status).toBe(200)
      expect(body.limit).toBe(5)
      expect(body.offset).toBe(0)
    })
  })

  describe('POST', () => {
    it('creates a new listing', async () => {
      const request = new NextRequest('http://localhost:3000/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer test-token',
        },
        body: JSON.stringify({
          title: 'New Listing',
          description: 'A test listing',
          category_id: 'cat-1',
          price_range: '1000-2000',
        }),
      })

      const response = await POST(request)
      const body = await response.json()

      expect(response.status).toBe(201)
      expect(body.title).toBe('New Listing')
    })

    it('rejects unauthorized requests', async () => {
      const request = new NextRequest('http://localhost:3000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Listing' }),
      })

      const response = await POST(request)
      expect(response.status).toBe(401)
    })
  })
})
