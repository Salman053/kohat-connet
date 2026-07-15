import { createClient } from '@/lib/supabase/server'
import PaymentsClient from '../_components/payments-client'

export default async function PaymentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: payments } = await supabase
    .from('payments')
    .select('*, advertisements(title)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return <PaymentsClient initialPayments={payments || []} />
}