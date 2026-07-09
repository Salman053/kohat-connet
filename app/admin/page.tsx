import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import {
  Users,
  Building2,
  Megaphone,
  Eye,
  Clock
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
        },
      },
    }
  )

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
    { name: 'Total Users', value: totalUsers || 0, icon: Users, color: 'bg-primary' },
    { name: 'Total Listings', value: totalListings || 0, icon: Building2, color: 'bg-emerald-500' },
    { name: 'Active Ads', value: totalAds || 0, icon: Megaphone, color: 'bg-purple-500' },
    {
      name: 'Pending Reviews',
      value: (pendingListings || 0) + (pendingAds || 0),
      icon: Clock,
      color: 'bg-amber-500'
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name} size="sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
                  <div className={`${stat.color} p-2 rounded-sm`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card size="sm">
        <CardHeader>
          <CardTitle>Recent Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {recentListings && recentListings.length > 0 ? (
              recentListings.map((listing: any) => (
                <div key={listing.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{listing.title}</p>
                    <Badge variant={listing.status === 'approved' ? 'default' : listing.status === 'pending' ? 'outline' : 'destructive'}>
                      {listing.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">{listing.views || 0}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-sm text-muted-foreground text-center">No listings yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/listings?status=pending" className="block">
          <Card size="sm" className="hover:ring-1 hover:ring-primary transition-all cursor-pointer">
            <CardContent className="flex items-center gap-4 py-4">
              <div className="bg-amber-500 p-2 rounded-sm">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">Review Pending Listings</p>
                <p className="text-sm text-muted-foreground">{pendingListings || 0} pending</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/advertisements?status=pending" className="block">
          <Card size="sm" className="hover:ring-2 hover:ring transition-all cursor-pointer">
            <CardContent className="flex items-center gap-4 py-2">
              <div className="bg-purple-500 p-2 rounded-sm">
                <Megaphone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">Review Pending Ads</p>
                <p className="text-sm text-muted-foreground">{pendingAds || 0} pending</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/users" className="block">
          <Card size="sm" className="hover:ring-2 hover:ring transition-all cursor-pointer">
            <CardContent className="flex items-center gap-4 py-2">
              <div className="bg-primary p-2 rounded-sm">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">Manage Users</p>
                <p className="text-sm text-muted-foreground">{totalUsers || 0} total users</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}