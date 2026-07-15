import Link from 'next/link'
import { Building2, Megaphone, Eye, Star, TrendingUp, Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import StatCard from '@/components/dashboard/stat-card'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your business performance</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/listings/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Listing
          </Link>
          <Link
            href="/dashboard/ads/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Megaphone className="h-4 w-4" />
            Book Ad
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard name="Total Listings" value={totalListings || 0} icon={Building2} color="bg-blue-600" href="/dashboard/listings" />
        <StatCard name="Active Listings" value={activeListings || 0} icon={Building2} color="bg-green-600" href="/dashboard/listings" />
        <StatCard name="Total Ads" value={totalAds || 0} icon={Megaphone} color="bg-purple-600" href="/dashboard/advertisements" />
        <StatCard name="Active Ads" value={activeAds || 0} icon={Megaphone} color="bg-amber-600" href="/dashboard/advertisements" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Recent Listings</h2>
            <Link href="/dashboard/listings" className="text-xs font-medium text-primary hover:text-indigo-500">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentListings && recentListings.length > 0 ? (
              recentListings.map((listing: any) => (
                <div key={listing.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{listing.title}</p>
                    <p className="text-xs text-gray-400 capitalize">{listing.status}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 shrink-0">
                    <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{listing.views || 0}</span>
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />{listing.rating?.toFixed(1) || '0'}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-sm text-gray-400">No listings yet</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Recent Ads</h2>
            <Link href="/dashboard/advertisements" className="text-xs font-medium text-primary hover:text-indigo-500">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentAds && recentAds.length > 0 ? (
              recentAds.map((ad: any) => (
                <div key={ad.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{ad.title}</p>
                    <p className="text-xs text-gray-400 capitalize">{ad.ad_status}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 shrink-0">
                    <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{ad.impressions || 0}</span>
                    <span className="flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5" />{ad.clicks || 0}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-sm text-gray-400">No ads yet</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/listings/new"
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 text-primary group-hover:bg-indigo-100 transition-colors">
              <Plus className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors">Create New Listing</p>
              <p className="text-sm text-gray-500">Add your business to the directory</p>
            </div>
          </div>
        </Link>
        <Link
          href="/dashboard/ads/new"
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
              <Megaphone className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Book Advertisement</p>
              <p className="text-sm text-gray-500">Promote your business with ads</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}