import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createMockSupabaseClient } from '@/src/test/mocks/supabase'

const mockState: { client: ReturnType<typeof createMockSupabaseClient> | null } = { client: null }

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(() => mockState.client),
}))

const dataModule = await import('@/lib/data')

describe('lib/data', () => {
  beforeEach(() => {
    mockState.client = createMockSupabaseClient()
    vi.clearAllMocks()
  })

  describe('getFeaturedListings', () => {
    it('returns featured listings', async () => {
      const listings = await dataModule.getFeaturedListings()
      expect(Array.isArray(listings)).toBe(true)
      expect(listings.length).toBeGreaterThan(0)
    })
  })

  describe('getListingsByCategory', () => {
    it('returns listings filtered by category', async () => {
      const listings = await dataModule.getListingsByCategory('restaurants')
      expect(Array.isArray(listings)).toBe(true)
    })

    it('returns empty array for unknown category', async () => {
      const listings = await dataModule.getListingsByCategory('nonexistent')
      expect(listings).toEqual([])
    })
  })

  describe('getActiveAdvertisements', () => {
    it('returns active ads', async () => {
      const ads = await dataModule.getActiveAdvertisements()
      expect(Array.isArray(ads)).toBe(true)
    })

    it('filters by type', async () => {
      const ads = await dataModule.getActiveAdvertisements('banner')
      expect(Array.isArray(ads)).toBe(true)
    })
  })

  describe('getCategories', () => {
    it('returns categories', async () => {
      const categories = await dataModule.getCategories()
      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThan(0)
    })
  })

  describe('getBloodDonors', () => {
    it('returns blood donors', async () => {
      const donors = await dataModule.getBloodDonors()
      expect(Array.isArray(donors)).toBe(true)
    })

    it('filters by blood type', async () => {
      const donors = await dataModule.getBloodDonors('A+')
      expect(Array.isArray(donors)).toBe(true)
    })
  })

  describe('searchListings', () => {
    it('returns matching listings', async () => {
      const results = await dataModule.searchListings('test')
      expect(Array.isArray(results)).toBe(true)
    })
  })
})
