import { createClient } from '@/lib/supabase/server'
import PageHeader from '@/components/dashboard/page-header'
import SettingsClient from '../_components/settings-client'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your profile and business information" />
      <SettingsClient initialProfile={profile} userId={user.id} userEmail={user.email} />
    </div>
  )
}