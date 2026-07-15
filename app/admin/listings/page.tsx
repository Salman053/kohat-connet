import { createClient } from '@/lib/supabase/server'
import PageHeader from '@/components/dashboard/page-header'
import AdminListingsTable from '../_components/listings-table'

export default async function AdminListingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: listings } = await supabase
    .from('listings')
    .select('*, category:categories(name), user:profiles(email, full_name)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <PageHeader title="Listing Management" subtitle="Review and manage all business listings" />
      <AdminListingsTable initialListings={listings || []} />
    </div>
  )
}