import { createClient } from '@/lib/supabase/server'
import ListingsClient from '../_components/listings-client'

export default async function ListingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return <ListingsClient initialListings={listings || []} />
}