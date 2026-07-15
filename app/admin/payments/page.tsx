import { createClient } from '@/lib/supabase/server'
import PageHeader from '@/components/dashboard/page-header'
import AdminPaymentsTable from '../_components/payments-table'

export default async function AdminPaymentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: payments } = await supabase
    .from('payments')
    .select('*, user:profiles!payments_user_id_fkey(full_name, business_name, email), advertisement:advertisements(title, ad_type)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <PageHeader title="Payment Management" subtitle="Review and process payment requests" />
      <AdminPaymentsTable initialPayments={payments || []} />
    </div>
  )
}