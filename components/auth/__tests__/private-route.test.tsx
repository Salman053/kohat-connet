/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { PrivateRoute } from '../private-route'
import { AuthProvider } from '../auth-context'
import { createMockSupabaseClient } from '@/src/test/mocks/supabase'

const singletonClient = createMockSupabaseClient()
const replaceMock = vi.fn()

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(() => singletonClient),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock, push: vi.fn() }),
}))

function ProtectedContent() {
  return <div data-testid="protected-content">Protected Content</div>
}

describe('PrivateRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading spinner while auth is initializing', async () => {
    render(
      <AuthProvider>
        <PrivateRoute>
          <ProtectedContent />
        </PrivateRoute>
      </AuthProvider>
    )

    expect(document.querySelector('.animate-spin')).toBeDefined()
  })

  it('renders children when user is authenticated', async () => {
    render(
      <AuthProvider>
        <PrivateRoute>
          <ProtectedContent />
        </PrivateRoute>
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('protected-content')).toBeDefined()
    })
  })

  it('redirects to signin when no user', async () => {
    vi.mocked(singletonClient.auth.getSession).mockResolvedValueOnce({
      data: { session: null },
      error: null,
    } as any)

    render(
      <AuthProvider>
        <PrivateRoute>
          <ProtectedContent />
        </PrivateRoute>
      </AuthProvider>
    )

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/auth/signin')
    })
  })
})
