import Link from 'next/link'
import { 
  Building2, 
  Megaphone, 
  Eye, 
  Star,
  TrendingUp,
  Calendar,
  Plus,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const [
    { count: totalListings },
    { count: activeListings },
    { count: totalAds },
    { count: activeAds },
    { data: recentListings },
    { data: recentAds },
  ] = await Promise.all([
    supabase.from('listings').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
    supabase.from('listings').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'approved'),
    supabase.from('advertisements').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
    supabase.from('advertisements').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('ad_status', 'active'),
    supabase.from('listings').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
    supabase.from('advertisements').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
  ])

  const stats = [
    {
      name: 'Total Listings',
      value: totalListings || 0,
      icon: Building2,
      color: 'bg-blue-500',
      href: '/dashboard/listings',
    },
    {
      name: 'Active Listings',
      value: activeListings || 0,
      icon: Building2,
      color: 'bg-green-500',
      href: '/dashboard/listings',
    },
    {
      name: 'Total Ads',
      value: totalAds || 0,
      icon: Megaphone,
      color: 'bg-purple-500',
      href: '/dashboard/advertisements',
    },
    {
      name: 'Active Ads',
      value: activeAds || 0,
      icon: Megaphone,
      color: 'bg-yellow-500',
      href: '/dashboard/advertisements',
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <Link
            href="/dashboard/listings/new"
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            <span>Add Listing</span>
          </Link>
          <Link
            href="/dashboard/ads/new"
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Megaphone className="h-5 w-5" />
            <span>Book Ad</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.name} href={stat.href}>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-indigo-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Listings</h2>
            <Link href="/dashboard/listings" className="text-sm text-indigo-600 hover:text-indigo-500">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentListings && recentListings.length > 0 ? (
              recentListings.map((listing: any) => (
                <div key={listing.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{listing.title}</p>
                      <p className="text-sm text-gray-500">{listing.status}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{listing.views || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>{listing.rating?.toFixed(1) || '0'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-sm text-gray-500">No listings yet</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Ads</h2>
            <Link href="/dashboard/advertisements" className="text-sm text-indigo-600 hover:text-indigo-500">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentAds && recentAds.length > 0 ? (
              recentAds.map((ad: any) => (
                <div key={ad.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{ad.title}</p>
                      <p className="text-sm text-gray-500">{ad.ad_status}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{ad.impressions || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{ad.clicks || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-sm text-gray-500">No ads yet</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/listings/new"
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-indigo-500 transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <Plus className="h-6 w-6 text-indigo-500" />
            <div>
              <p className="font-medium text-gray-900">Create New Listing</p>
              <p className="text-sm text-gray-500">Add your business to the directory</p>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/ads/new"
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-green-500 transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <Megaphone className="h-6 w-6 text-green-500" />
            <div>
              <p className="font-medium text-gray-900">Book Advertisement</p>
              <p className="text-sm text-gray-500">Promote your business with ads</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
