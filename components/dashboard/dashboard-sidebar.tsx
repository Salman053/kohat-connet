'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Building2, Plus, Megaphone, CreditCard, Settings, X, Menu
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/listings', label: 'My Listings', icon: Building2 },
  { href: '/dashboard/listings/new', label: 'Add Listing', icon: Plus },
  { href: '/dashboard/advertisements', label: 'My Advertisements', icon: Megaphone },
  { href: '/dashboard/ads/new', label: 'Book Advertisement', icon: Plus },
  { href: '/dashboard/payments', label: 'Payment History', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function DashboardSidebar({ businessName }: { businessName?: string | null }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white border border-gray-200 shadow-sm"
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-700 truncate">
            {businessName || 'Dashboard'}
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (
              item.href !== '/dashboard' && pathname.startsWith(item.href + '/')
            )

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-indigo-50 text-primary border border-indigo-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
                  }
                `}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}