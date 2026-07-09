import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  Building2,
  Megaphone,
  FolderTree,
  BarChart3,
  DollarSign,
  Settings,
  LogOut,
  Newspaper,
  Compass,
  Calendar,
  Heart,
  Flag
} from 'lucide-react'
import Logo from '@/components/shared/logo'
import { Card } from '@/components/ui/card'
import { signOut } from '@/lib/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
          }
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

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

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Logo variant="minimal" />
              <div className="h-4 w-px bg-border" />
              <span className="text-sm font-medium text-muted-foreground">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground">
                {profile?.full_name || user.email}
              </span>
              <Link
                href="/auth/signout"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-background border-r border-border min-h-[calc(100vh-4rem)]">
          <nav className="p-3 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Card size="sm" className="p-6">
            {children}
          </Card>
        </main>
      </div>
    </div>
  )
}