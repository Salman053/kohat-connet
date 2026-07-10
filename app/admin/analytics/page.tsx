import { supabaseAdmin } from '@/lib/supabase'
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Megaphone, 
  DollarSign,
  Eye,
  MousePointer2,
  Calendar,
} from 'lucide-react'

export default async function AdminAnalyticsPage() {
  const supabase = supabaseAdmin()

  const [
    { count: totalUsers },
    { count: totalListings },
    { count: totalAds },
    { count: totalViews },
    { count: totalClicks },
    { data: recentUsers },
    { data: recentListings },
    { data: recentAds },
    { data: categoryStats },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('listings').select('*', { count: 'exact', head: true }),
    supabase.from('advertisements').select('*', { count: 'exact', head: true }),
    supabase.from('listings').select('views', { count: 'exact', head: true }).gt('views', 0),
    supabase.from('advertisements').select('clicks', { count: 'exact', head: true }).gt('clicks', 0),
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(10),
    supabase.from('listings').select('*').order('views', { ascending: false }).limit(10),
    supabase.from('advertisements').select('*').order('clicks', { ascending: false }).limit(10),
    supabase.from('categories').select(`
      id,
      name,
      listings:listings(count)
    `),
  ])

  const { data: viewsData } = await supabase
    .from('listings')
    .select('views')
  
  const { data: clicksData } = await supabase
    .from('advertisements')
    .select('clicks')

  const totalViewsSum = viewsData?.reduce((sum, item) => sum + (item.views || 0), 0) || 0
  const totalClicksSum = clicksData?.reduce((sum, item) => sum + (item.clicks || 0), 0) || 0

  const stats = [
    {
      name: 'Total Users',
      value: totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Total Listings',
      value: totalListings || 0,
      icon: Building2,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive',
    },
    {
      name: 'Active Ads',
      value: totalAds || 0,
      icon: Megaphone,
      color: 'bg-purple-500',
      change: '+15%',
      changeType: 'positive',
    },
    {
      name: 'Total Views',
      value: totalViewsSum,
      icon: Eye,
      color: 'bg-yellow-500',
      change: '+23%',
      changeType: 'positive',
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value.toLocaleString()}</p>
                  <p className={`text-sm mt-1 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Listings</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentListings && recentListings.length > 0 ? (
              recentListings.slice(0, 5).map((listing: any) => (
                <div key={listing.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{listing.title}</p>
                    <p className="text-sm text-gray-500">{listing.status}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{listing.views || 0}</span>
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
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Ads</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentAds && recentAds.length > 0 ? (
              recentAds.slice(0, 5).map((ad: any) => (
                <div key={ad.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{ad.title}</p>
                    <p className="text-sm text-gray-500">{ad.ad_type}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MousePointer2 className="h-4 w-4" />
                      <span>{ad.clicks || 0}</span>
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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Listings by Category</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {categoryStats && categoryStats.length > 0 ? (
            categoryStats.map((category: any) => (
              <div key={category.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{category.name}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    {category.listings?.[0]?.count || 0} listings
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{
                        width: `${totalListings ? ((category.listings?.[0]?.count || 0) / totalListings) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-4 text-sm text-gray-500">No categories yet</div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentUsers && recentUsers.length > 0 ? (
            recentUsers.map((user: any) => (
              <div key={user.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user.full_name || user.email}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'business' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-4 text-sm text-gray-500">No users yet</div>
          )}
        </div>
      </div>
    </div>
  )
}
