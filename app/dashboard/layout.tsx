'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, ExternalLink } from 'lucide-react'
import { useAuth } from '@/components/auth/auth-context'
import { createClient } from '@/lib/supabase/client'
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'
import { ToastProvider } from '@/components/dashboard/toast'

type Profile = {
  role: string
  full_name: string | null
  business_name: string | null
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading: loadingAuth, signOut } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!loadingAuth && !user) {
      router.replace('/auth/signin')
    }
  }, [user, loadingAuth, router])

  useEffect(() => {
    if (!user) return
    supabase
      .from('profiles')
      .select('role, full_name, business_name')
      .eq('id', user.id)
      .single()
      .then(({ data }: { data: { role: string; full_name: string | null; business_name: string | null } | null }) => {
        if (data) setProfile(data)
        setLoadingProfile(false)
      })
  }, [user, supabase])

  const showSpinner = loadingAuth || (user && loadingProfile) || !user

  if (showSpinner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth/signin')
  }

  return (
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 flex">
          <DashboardSidebar businessName={profile?.business_name || profile?.full_name} />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
              <div className="flex items-center justify-between h-16 px-4 lg:px-8">
                <div className="lg:hidden w-8" />
                <div className="flex items-center gap-4 ml-auto">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="hidden sm:inline">View Site</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign out</span>
                  </button>
                </div>
              </div>
            </header>
            <main className="flex-1 p-4 lg:p-8 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </ToastProvider>
  )
}