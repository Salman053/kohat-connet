'use client'

import Link from 'next/link'
import { 
  LayoutDashboard, 
  Building2, 
  Megaphone, 
  Settings,
  LogOut,
  Plus,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Logo from '@/components/shared/logo'
import { useAuth } from '@/components/auth/auth-context'
import { createClient } from '@/lib/supabase/client'

type Profile = {
  role: string
  full_name: string | null
  business_name: string | null
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)

  const supabase = createClient()

  useEffect(() => {
    if (!user) return
    supabase
      .from('profiles')
      .select('role, full_name, business_name')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data) setProfile(data)
      })
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/listings', label: 'My Listings', icon: Building2 },
    { href: '/dashboard/listings/new', label: 'Add Listing', icon: Plus },
    { href: '/dashboard/advertisements', label: 'My Ads', icon: Megaphone },
    { href: '/dashboard/ads/new', label: 'Book Ad', icon: Megaphone },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo variant="minimal" />
              <span className="ml-4 text-sm text-gray-500">
                {profile?.business_name || profile?.full_name || 'Dashboard'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                View Site
              </Link>
              <Link
                href="/auth/signout"
                className="flex items-center space-x-1 text-sm "
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-gray-100 hover:text-gray-900"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
