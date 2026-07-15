import { supabase } from './supabase'
import { SYSTEM_DOMAIN } from './utils'

export interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'business' | 'user'
  full_name?: string
  avatar_url?: string
}

function sb() {
  return supabase()
}

export async function signUp(email: string, password: string, fullName: string, role: 'admin' | 'business' | 'user' = 'user') {
  const { data, error } = await sb().auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role
      }
    }
  })

  if (error) throw error

  return data
}

export async function signIn(email: string, password: string) {
  console.log('lib/auth - signIn called for:', email)
  const { data, error } = await sb().auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error('lib/auth - signIn error:', error)
    throw error
  }
  console.log('lib/auth - signIn success, user:', data.user?.id || 'none')
  return data
}

export async function signOut() {
  const { error } = await sb().auth.signOut()
  
  if (error) throw error
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { user }, error } = await sb().auth.getUser()
  
  if (error || !user) return null

  const { data: profile } = await sb()
    .from('profiles')
    .select('role, full_name, avatar_url')
    .eq('id', user.id)
    .single()

  return {
    id: user.id,
    email: user.email!,
    role: profile?.role || 'user',
    full_name: profile?.full_name,
    avatar_url: profile?.avatar_url
  }
}

export async function resetPassword(email: string) {
  const { error } = await sb().auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || SYSTEM_DOMAIN}/auth/reset-password`
  })

  if (error) throw error
}

export async function updatePassword(newPassword: string) {
  const { error } = await sb().auth.updateUser({
    password: newPassword
  })

  if (error) throw error
}