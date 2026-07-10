import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createMockSupabaseClient } from '@/src/test/mocks/supabase'

const singletonClient = createMockSupabaseClient()

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(() => singletonClient),
}))

const { supabase } = await import('@/lib/supabase')
const auth = await import('@/lib/auth')

describe('lib/auth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('signUp', () => {
    it('creates account and profile for new user', async () => {
      vi.mocked(singletonClient.auth.signUp).mockResolvedValueOnce({
        data: { user: { id: 'new-id', email: 'new@example.com' }, session: null },
        error: null,
      } as any)

      const result = await auth.signUp('new@example.com', 'password123', 'New User', 'business')

      expect(result.user).toBeDefined()
      expect(result.user!.email).toBe('new@example.com')
    })

    it('throws on signup failure', async () => {
      vi.mocked(singletonClient.auth.signUp).mockRejectedValueOnce(new Error('Email already registered'))

      await expect(auth.signUp('existing@example.com', 'password123', 'Existing', 'user'))
        .rejects.toThrow('Email already registered')
    })
  })

  describe('signIn', () => {
    it('signs in with valid credentials', async () => {
      vi.mocked(singletonClient.auth.signInWithPassword).mockResolvedValueOnce({
        data: { user: { id: 'test-user-id', email: 'test@example.com' }, session: {} },
        error: null,
      } as any)

      const result = await auth.signIn('test@example.com', 'password123')
      expect(result.user).toBeDefined()
      expect(result.user!.email).toBe('test@example.com')
    })

    it('throws on invalid credentials', async () => {
      vi.mocked(singletonClient.auth.signInWithPassword).mockRejectedValueOnce(new Error('Invalid login credentials'))

      await expect(auth.signIn('wrong@example.com', 'wrong'))
        .rejects.toThrow('Invalid login credentials')
    })
  })

  describe('signOut', () => {
    it('signs out successfully', async () => {
      vi.mocked(singletonClient.auth.signOut).mockResolvedValueOnce({ error: null })
      await expect(auth.signOut()).resolves.not.toThrow()
    })

    it('throws on signout failure', async () => {
      vi.mocked(singletonClient.auth.signOut).mockRejectedValueOnce(new Error('Signout failed'))

      await expect(auth.signOut()).rejects.toThrow('Signout failed')
    })
  })

  describe('getCurrentUser', () => {
    it('returns user with profile data when authenticated', async () => {
      vi.mocked(singletonClient.auth.getUser).mockResolvedValueOnce({
        data: { user: { id: 'test-user-id', email: 'test@example.com' } },
        error: null,
      } as any)

      const user = await auth.getCurrentUser()
      expect(user).toBeDefined()
      expect(user!.id).toBe('test-user-id')
      expect(user!.email).toBe('test@example.com')
    })

    it('returns null when not authenticated', async () => {
      vi.mocked(singletonClient.auth.getUser).mockResolvedValueOnce({ data: { user: null }, error: null } as any)

      const user = await auth.getCurrentUser()
      expect(user).toBeNull()
    })
  })

  describe('resetPassword', () => {
    it('sends password reset email', async () => {
      vi.mocked(singletonClient.auth.resetPasswordForEmail).mockResolvedValueOnce({ data: {}, error: null })
      await expect(auth.resetPassword('test@example.com')).resolves.not.toThrow()
    })
  })

  describe('updatePassword', () => {
    it('updates user password', async () => {
      vi.mocked(singletonClient.auth.updateUser).mockResolvedValueOnce({ data: { user: {} }, error: null })
      await expect(auth.updatePassword('new-password')).resolves.not.toThrow()
    })
  })
})
