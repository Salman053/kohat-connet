import { createClient } from '@/lib/supabase/server'
import PageHeader from '@/components/dashboard/page-header'
import AdminAdsTable from '../_components/ads-table'

export default async function AdminAdvertisementsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: ads } = await supabase
    .from('advertisements')
    .select('*, user:profiles(email, full_name, business_name)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <PageHeader title="Advertisement Management" subtitle="Review and manage all advertisements" />
      <AdminAdsTable initialAds={ads || []} />
    </div>
  )
}