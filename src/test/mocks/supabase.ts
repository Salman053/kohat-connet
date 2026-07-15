import type { AuthResponse } from '@supabase/supabase-js'
import { vi } from 'vitest'

function createQueryBuilder(table: string, tableData: any[]) {
  const filters: Record<string, any> = {}
  let orderField: string | undefined
  let orderDir: 'asc' | 'desc' = 'asc'
  let limitVal: number | undefined
  let headMode = false
  let resultData = [...tableData]
  let selectedColumns = '*'

  const builder: any = {
    select(cols: string) {
      selectedColumns = cols
      return builder
    },
    eq(col: string, val: any) {
      filters[col] = val
      resultData = resultData.filter((r: any) => r[col] === val)
      return builder
    },
    neq(col: string, val: any) {
      resultData = resultData.filter((r: any) => r[col] !== val)
      return builder
    },
    gt(col: string, val: any) {
      resultData = resultData.filter((r: any) => r[col] > val)
      return builder
    },
    gte(col: string, val: any) {
      resultData = resultData.filter((r: any) => r[col] >= val)
      return builder
    },
    lt(col: string, val: any) {
      resultData = resultData.filter((r: any) => r[col] < val)
      return builder
    },
    lte(col: string, val: any) {
      resultData = resultData.filter((r: any) => r[col] <= val)
      return builder
    },
    or(filterStr: string) {
      return builder
    },
    textSearch(_col: string, _query: string) {
      return builder
    },
    ilike(col: string, val: any) {
      return builder
    },
    in(col: string, vals: any[]) {
      resultData = resultData.filter((r: any) => vals.includes(r[col]))
      return builder
    },
    is(col: string, val: any) {
      resultData = resultData.filter((r: any) => r[col] === val)
      return builder
    },
    order(col: string, opts?: { ascending?: boolean }) {
      orderField = col
      orderDir = opts?.ascending !== false ? 'asc' : 'desc'
      return builder
    },
    limit(n: number) {
      limitVal = n
      if (limitVal) resultData = resultData.slice(0, limitVal)
      return builder
    },
    range(start: number, end: number) {
      resultData = resultData.slice(start, end + 1)
      return builder
    },
    count(exact: any, head: boolean) {
      headMode = head
      return builder
    },
    single() {
      const r = { data: resultData[0] || null, error: null }
      return Promise.resolve(r)
    },
    maybeSingle() {
      const r = { data: resultData[0] || null, error: null }
      return Promise.resolve(r)
    },
    insert(values: any) {
      resultData = [values]
      return builder
    },
    update(values: any) {
      resultData = [values]
      return builder
    },
    delete() {
      resultData = []
      return builder
    },
    then(resolve?: (value: any) => any) {
      const result = {
        data: headMode ? null : resultData,
        error: null,
        count: headMode ? resultData.length : null,
      }
      return Promise.resolve(resolve ? resolve(result) : result)
    },
    catch(_fn: any) {
      return Promise.resolve({ data: resultData, error: null, count: resultData.length })
    },
  }

  return builder
}

export function createMockSupabaseClient() {
  const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com',
    user_metadata: { full_name: 'Test User', role: 'business' },
    app_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  }

  const mockAdminUser = {
    id: 'admin-user-id',
    email: 'admin@example.com',
    user_metadata: { full_name: 'Admin User', role: 'admin' },
    app_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  }

  let currentUser: typeof mockUser | null = mockUser
  let currentSession = {
    access_token: 'test-access-token',
    refresh_token: 'test-refresh-token',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    token_type: 'bearer',
    user: currentUser,
  }

  const tableData: Record<string, any[]> = {
    profiles: [
      { id: 'test-user-id', email: 'test@example.com', full_name: 'Test User', role: 'business', business_name: 'Test Business' },
      { id: 'admin-user-id', email: 'admin@example.com', full_name: 'Admin User', role: 'admin', business_name: null },
    ],
    listings: [
      { id: 'listing-1', title: 'Test Listing', description: 'A test listing', user_id: 'test-user-id', status: 'approved', category: 'restaurants', category_id: 'cat-1', is_featured: true, views: 100, rating: 4.5, price: 1000, created_at: new Date().toISOString() },
      { id: 'listing-2', title: 'Another Listing', description: 'Featured listing', user_id: 'admin-user-id', status: 'approved', category: 'hotels', category_id: 'cat-2', is_featured: true, views: 200, rating: 4.8, price: 2000, created_at: new Date().toISOString() },
    ],
    advertisements: [
      { id: 'ad-1', title: 'Test Ad', user_id: 'test-user-id', ad_status: 'active', ad_type: 'banner', impressions: 1000, clicks: 50, start_date: new Date(Date.now() - 86400000).toISOString(), end_date: new Date(Date.now() + 86400000).toISOString(), created_at: new Date().toISOString() },
    ],
    payments: [
      { id: 'payment-1', user_id: 'test-user-id', advertisement_id: 'ad-1', amount: 5000, currency: 'PKR', status: 'under_review', created_at: new Date().toISOString() },
      { id: 'payment-2', user_id: 'test-user-id', advertisement_id: 'ad-1', amount: 10000, currency: 'PKR', status: 'completed', reviewed_by: 'admin-user-id', reviewed_at: new Date().toISOString(), created_at: new Date().toISOString() },
    ],
    categories: [
      { id: 'cat-1', name: 'Restaurants', slug: 'restaurants', sort_order: 1, is_active: true, image_url: '/restaurants.jpg' },
      { id: 'cat-2', name: 'Hotels', slug: 'hotels', sort_order: 2, is_active: true, image_url: '/hotels.jpg' },
    ],
    events: [
      { id: 'event-1', title: 'Test Event', user_id: 'test-user-id', status: 'published', event_date: new Date().toISOString(), created_at: new Date().toISOString() },
    ],
    blogs: [
      { id: 'blog-1', title: 'Test Blog', content: 'Test content', author: 'Test User', status: 'published', created_at: new Date().toISOString() },
    ],
    reports: [
      { id: 'report-1', title: 'Test Report', description: 'Report description', reported_by: 'test-user-id', status: 'open', created_at: new Date().toISOString() },
    ],
    site_settings: [
      { id: 1, site_name: 'Kohat Connect', site_description: 'Test description', contact_email: 'test@example.com' },
    ],
    ad_packages: [
      { id: 'pkg-1', name: 'Basic', price: 5000, duration_days: 30, ad_type: 'banner' },
      { id: 'pkg-2', name: 'Premium', price: 10000, duration_days: 60, ad_type: 'featured' },
    ],
    blood_donors: [
      { id: 'donor-1', name: 'John Doe', blood_type: 'A+', phone: '1234567890', is_available: true, created_at: new Date().toISOString() },
    ],
    community_posts: [
      { id: 'post-1', title: 'Test Post', content: 'Post content', user_id: 'test-user-id', is_approved: true, post_type: 'discussion', created_at: new Date().toISOString() },
    ],
    tourism_places: [
      { id: 'place-1', name: 'Test Place', description: 'A tourist place', is_featured: true, created_at: new Date().toISOString() },
    ],
  }

  const queryBuilders = new Map<string, any>()

  const mock = {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: currentUser }, error: null }),
      getSession: vi.fn().mockResolvedValue({ data: { session: currentSession }, error: null }),
      signUp: vi.fn().mockImplementation((_creds: { email: string; password: string }) => {
        const newUser = { ...mockUser, id: 'new-user-id', email: _creds.email }
        currentUser = newUser
        currentSession = { ...currentSession, user: newUser }
        return Promise.resolve({ data: { user: newUser, session: currentSession }, error: null } as AuthResponse)
      }),
      signInWithPassword: vi.fn().mockImplementation((_creds: { email: string; password: string }) => {
        if (_creds.email === 'admin@example.com') {
          currentUser = mockAdminUser
        } else {
          currentUser = mockUser
        }
        currentSession = { ...currentSession, user: currentUser }
        return Promise.resolve({ data: { user: currentUser, session: currentSession }, error: null } as AuthResponse)
      }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      resetPasswordForEmail: vi.fn().mockResolvedValue({ data: {}, error: null }),
      updateUser: vi.fn().mockResolvedValue({ data: { user: currentUser }, error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
      getClaims: vi.fn().mockResolvedValue({ data: { claims: { sub: currentUser?.id } }, error: null }),
      setSession: vi.fn().mockResolvedValue({ data: { session: currentSession }, error: null }),
    },
    from: vi.fn().mockImplementation((table: string) => {
      if (!queryBuilders.has(table)) {
        const qb = createQueryBuilder(table, tableData[table] || [])
        queryBuilders.set(table, qb)
      }
      return queryBuilders.get(table)!
    }),
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ data: { path: 'test-file.jpg' }, error: null }),
        getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'https://test.com/test-file.jpg' } }),
        remove: vi.fn().mockResolvedValue({ data: {}, error: null }),
      }),
    },
  }

  return mock
}

export type MockSupabaseClient = ReturnType<typeof createMockSupabaseClient>
