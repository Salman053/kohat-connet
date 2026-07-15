'use client'

import { createClient } from '@/lib/supabase/client'
import { createContext, useContext, useEffect, useState, useMemo, type ReactNode } from 'react'
import type { User, Session } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<{ user: User | null; session: Session | null }>
  signIn: (email: string, password: string) => Promise<{ user: User | null; session: Session | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signUp: async () => ({ user: null, session: null }),
  signIn: async () => ({ user: null, session: null }),
  signOut: async () => {},
})

export function AuthProvider({ 
  children, 
  initialSession = null 
}: { 
  children: ReactNode
  initialSession?: Session | null
}) {
  const [user, setUser] = useState<User | null>(initialSession?.user ?? null)
  const [session, setSession] = useState<Session | null>(initialSession)
  const [loading, setLoading] = useState(!initialSession)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    console.log('AuthContext - Provider mounted')
    let mounted = true

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: string, session: Session | null) => {
        console.log('AuthContext - Auth state change:', event, 'User:', session?.user?.id || 'none')
        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          setLoading(false)
        }
      }
    )

    // Get initial session if we didn't have one from server
    if (!initialSession) {
      supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
        console.log('AuthContext - Initial session:', session?.user?.id || 'none')
        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          setLoading(false)
        }
      })
    }

    return () => {
      console.log('AuthContext - Provider unmounted')
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase, initialSession])

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
