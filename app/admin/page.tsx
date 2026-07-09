import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { 
  Users, 
  Building2, 
  Megaphone, 
  Eye,
  TrendingUp,
  DollarSign,
  Clock
} from 'lucide-react'

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {
          // Ignore for read operations
        },
      },
    }
  )

  // Fetch dashboard stats
  const [
    { count: totalUsers },
    { count: totalListings },
    { count: totalAds },
    { count: pendingListings },
    { count: pendingAds },
    { data: recentListings }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('listings').select('*', { count: 'exact', head: true }),
    supabase.from('advertisements').select('*', { count: 'exact', head: true }),
    supabase.from('listings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('advertisements').select('*', { count: 'exact', head: true }).eq('ad_status', 'pending'),
    supabase.from('listings').select('*').order('created_at', { ascending: false }).limit(5)
  ])

  const stats = [
    {
      name: 'Total Users',
      value: totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Listings',
      value: totalListings || 0,
      icon: Building2,
      color: 'bg-green-500',
    },
    {
      name: 'Active Ads',
      value: totalAds || 0,
      icon: Megaphone,
      color: 'bg-purple-500',
    },
    {
      name: 'Pending Reviews',
      value: (pendingListings || 0) + (pendingAds || 0),
      icon: Clock,
      color: 'bg-yellow-500',
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
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
          )
        })}
      </div>

      {/* Recent Listings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Listings</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentListings && recentListings.length > 0 ? (
            recentListings.map((listing: any) => (
              <div key={listing.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{listing.title}</p>
                  <p className="text-sm text-gray-500">{listing.status}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{listing.views || 0}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-4 text-sm text-gray-500">No listings yet</div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/admin/listings?status=pending"
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-indigo-500 transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-yellow-500" />
            <div>
              <p className="font-medium text-gray-900">Review Pending Listings</p>
              <p className="text-sm text-gray-500">{pendingListings || 0} pending</p>
            </div>
          </div>
        </a>

        <a
          href="/admin/advertisements?status=pending"
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-indigo-500 transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <Megaphone className="h-6 w-6 text-purple-500" />
            <div>
              <p className="font-medium text-gray-900">Review Pending Ads</p>
              <p className="text-sm text-gray-500">{pendingAds || 0} pending</p>
            </div>
          </div>
        </a>

        <a
          href="/admin/users"
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-indigo-500 transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900">Manage Users</p>
              <p className="text-sm text-gray-500">{totalUsers || 0} total users</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}
