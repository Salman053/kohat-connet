import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

const mockGetUser = vi.fn()
const mockFrom = vi.fn()
const mockSelect = vi.fn()
const mockEq = vi.fn()
const mockSingle = vi.fn()

mockFrom.mockReturnValue({ select: mockSelect })
mockSelect.mockReturnValue({ eq: mockEq })
mockEq.mockReturnValue({ single: mockSingle })

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser: mockGetUser },
    from: mockFrom,
  })),
}))

const { updateSession } = await import('@/lib/supabase/proxy')

function createRequest(url: string, cookies: Record<string, string> = {}) {
  const cookieStr = Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ')
  return new NextRequest(new URL(url, 'http://localhost:3000'), {
    headers: { cookie: cookieStr },
  })
}

describe('updateSession (proxy)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetUser.mockResolvedValue({ data: { user: { id: 'test-user-id', email: 'test@example.com' } }, error: null })
    mockSingle.mockResolvedValue({ data: { role: 'admin' }, error: null })
  })

  it('allows authenticated users to access protected routes', async () => {
    const request = createRequest('/dashboard')
    const response = await updateSession(request)

    expect(response.status).toBe(200)
  })

  it('redirects unauthenticated users from protected routes', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null })

    const request = createRequest('/dashboard')
    const response = await updateSession(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toContain('/auth/signin')
  })

  it('allows unauthenticated users to access public routes', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null })

    const request = createRequest('/')
    const response = await updateSession(request)

    expect(response.status).toBe(200)
  })

  it('allows unauthenticated users to access signin page', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null })

    const request = createRequest('/auth/signin')
    const response = await updateSession(request)

    expect(response.status).toBe(200)
  })

  it('protects /admin routes for admin users', async () => {
    const request = createRequest('/admin')
    const response = await updateSession(request)

    expect(response.status).toBe(200)
  })

  it('redirects non-admin users from /admin routes', async () => {
    mockSingle.mockResolvedValue({ data: { role: 'business' }, error: null })

    const request = createRequest('/admin')
    const response = await updateSession(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toContain('/dashboard')
  })
})
