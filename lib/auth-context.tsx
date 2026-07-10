'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { supabase } from './supabase'
import type { Session, User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

interface AuthContextValue extends AuthState {
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: true,
  refresh: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, session: null, loading: true })

  const refresh = useCallback(async () => {
    const { data: { session } } = await supabase().auth.getSession()
    setState({
      user: session?.user ?? null,
      session,
      loading: false,
    })
  }, [])

  useEffect(() => {
    refresh()

    const { data: { subscription } } = supabase().auth.onAuthStateChange((_event: string, session: Session | null) => {
      setState({
        user: session?.user ?? null,
        session,
        loading: false,
      })
    })

    return () => subscription.unsubscribe()
  }, [refresh])

  return (
    <AuthContext.Provider value={{ ...state, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useUser() {
  const { user, loading } = useContext(AuthContext)
  return { user, loading }
}

export function useSession() {
  const { session, loading } = useContext(AuthContext)
  return { session, loading }
}

export function useAuth() {
  return useContext(AuthContext)
}
