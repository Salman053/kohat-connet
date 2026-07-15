'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, Building2, Megaphone, FolderTree, BarChart3,
  DollarSign, Settings, LogOut, Newspaper, Compass, Calendar, Heart, Flag,
  X, Menu,
} from 'lucide-react'
import { useAuth } from '@/components/auth/auth-context'
import { createClient } from '@/lib/supabase/client'

type Profile = { role: string; full_name: string | null }

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/listings', label: 'Listings', icon: Building2 },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
  { href: '/admin/tourism', label: 'Tourism', icon: Compass },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/blood-donors', label: 'Blood Donors', icon: Heart },
  { href: '/admin/advertisements', label: 'Advertisements', icon: Megaphone },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/payments', label: 'Payments', icon: DollarSign },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/reports', label: 'Reports', icon: Flag },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading: loadingAuth, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const showSpinner = loadingAuth || (user && loadingProfile) || !user || profile?.role !== 'admin'

  useEffect(() => {
    if (!loadingAuth && !user) router.replace('/auth/signin')
  }, [user, loadingAuth, router])

  useEffect(() => {
    if (!user) { setLoadingProfile(false); return }
    let mounted = true
    supabase.from('profiles').select('role, full_name').eq('id', user.id).single().then(
      ({ data }: { data: { role: string; full_name: string | null } | null }) => {
        if (!mounted) return
        setProfile(data as Profile)
        if (data?.role !== 'admin') router.replace('/dashboard')
        setLoadingProfile(false)
      }
    ).catch(() => { if (mounted) { setProfile(null); setLoadingProfile(false) } })
    return () => { mounted = false }
  }, [user, router, supabase])

  if (showSpinner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  const handleSignOut = async () => { await signOut(); router.push('/auth/signin') }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white border border-gray-200 shadow-sm"
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

   {/* Sidebar */}
<aside
  className={`fixed h-screen lg:sticky top-0 overflow-hidden  inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
    mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
  } flex flex-col`}
>
  <div className="flex items-center justify-between p-4 border-b border-gray-200 shrink-0">
    <span className="text-lg py-0.5 font-semibold text-gray-700">Admin Panel</span>
    <button type="button" onClick={() => setMobileOpen(false)} className="lg:hidden p-1 rounded-md hover:bg-gray-100">
      <X className="h-4 w-4 text-gray-500" />
    </button>
  </div>

  <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
    {navItems.map((item) => {
      const Icon = item.icon
      const isActive = pathname === item.href || (
        item.href !== '/admin' && pathname.startsWith(item.href + '/')
      )
      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            isActive
              ? 'bg-primary-50 text-primary border border-primary/40'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
          }`}
        >
          <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
          <span>{item.label}</span>
        </Link>
      )
    })}
  </nav>
</aside>


      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <div className="lg:hidden w-8" />
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-sm text-gray-500 hidden sm:inline">
                {profile?.full_name || user?.email}
              </span>
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
  )
}