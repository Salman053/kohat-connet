/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '../auth-context'
import { createMockSupabaseClient } from '@/src/test/mocks/supabase'
const singletonClient = createMockSupabaseClient()

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(() => singletonClient),
}))

function TestChild() {
  const { user, session, loading, signOut } = useAuth()
  if (loading) return <div data-testid="loading">Loading...</div>
  if (!user) return <div data-testid="no-user">No user</div>
  return (
    <div>
      <div data-testid="user-email">{user.email}</div>
      <div data-testid="session-status">{session ? 'active' : 'none'}</div>
      <button data-testid="signout-btn" onClick={signOut}>Sign Out</button>
    </div>
  )
}

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders children and provides auth context', async () => {
    render(
      <AuthProvider>
        <TestChild />
      </AuthProvider>
    )

    expect(screen.getByTestId('loading')).toBeDefined()

    await waitFor(() => {
      expect(screen.getByTestId('user-email')).toBeDefined()
    })

    expect(screen.getByTestId('user-email').textContent).toBe('test@example.com')
    expect(screen.getByTestId('session-status').textContent).toBe('active')
  })

  it('calls getSession on mount', async () => {
    render(
      <AuthProvider>
        <TestChild />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(singletonClient.auth.getSession).toHaveBeenCalledTimes(1)
    })
  })

  it('subscribes to onAuthStateChange', async () => {
    render(
      <AuthProvider>
        <TestChild />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(singletonClient.auth.onAuthStateChange).toHaveBeenCalledTimes(1)
    })
  })

  it('handles no session gracefully', async () => {
    vi.mocked(singletonClient.auth.getSession).mockResolvedValueOnce({
      data: { session: null },
      error: null,
    } as any)

    render(
      <AuthProvider>
        <TestChild />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('no-user')).toBeDefined()
    })
  })

  it('updates state on auth state change', async () => {
    render(
      <AuthProvider>
        <TestChild />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(singletonClient.auth.onAuthStateChange).toHaveBeenCalled()
    })

    const callback = vi.mocked(singletonClient.auth.onAuthStateChange).mock.calls[0][0]

    act(() => {
      callback('SIGNED_OUT', null)
    })

    await waitFor(() => {
      expect(screen.getByTestId('no-user')).toBeDefined()
    })
  })


})
