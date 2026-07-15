import { createClient } from '@/lib/supabase/server'
import AdsClient from '../_components/ads-client'

export default async function AdvertisementsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: ads } = await supabase
    .from('advertisements')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return <AdsClient initialAds={ads || []} />
}