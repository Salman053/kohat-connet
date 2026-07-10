import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { createMockSupabaseClient } from '@/src/test/mocks/supabase'

const singletonClient = createMockSupabaseClient()

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(() => singletonClient),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}))

vi.mock('@/components/auth/auth-context', () => ({
  useAuth: () => ({
    user: { id: 'admin-user-id', email: 'admin@example.com', user_metadata: { role: 'admin' } },
    session: { access_token: 'admin-token' },
    loading: false,
  }),
}))

const AdminPaymentsPage = (await import('../page')).default

describe('Admin Payments Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders payment management page', async () => {
    render(<AdminPaymentsPage />)

    await waitFor(() => {
      expect(screen.getByText('Payment Management')).toBeDefined()
    })
  })

  it('renders payment filters and search', async () => {
    render(<AdminPaymentsPage />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search/i)).toBeDefined()
    })
  })
})
