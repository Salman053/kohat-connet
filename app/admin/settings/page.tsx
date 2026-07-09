'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Save, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FormField, FormActions } from '@/components/shared/form-field'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface SiteSettings {
  id: string
  site_name: string
  site_description: string
  contact_email: string
  whatsapp_number: string
  facebook_page: string
  instagram_handle: string
  twitter_page: string
  youtube_channel: string
  updated_at: string
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [formData, setFormData] = useState({
    site_name: '',
    site_description: '',
    contact_email: '',
    whatsapp_number: '',
    facebook_page: '',
    instagram_handle: '',
    twitter_page: '',
    youtube_channel: '',
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching settings:', error)
    } else if (data) {
      setSettings(data)
      setFormData({
        site_name: data.site_name || '',
        site_description: data.site_description || '',
        contact_email: data.contact_email || '',
        whatsapp_number: data.whatsapp_number || '',
        facebook_page: data.facebook_page || '',
        instagram_handle: data.instagram_handle || '',
        twitter_page: data.twitter_page || '',
        youtube_channel: data.youtube_channel || '',
      })
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const payload = { ...formData, updated_at: new Date().toISOString() }

    if (settings) {
      const { error } = await supabase
        .from('site_settings')
        .update(payload)
        .eq('id', settings.id)

      if (error) {
        setMessage({ type: 'error', text: 'Failed to save settings' })
      } else {
        setMessage({ type: 'success', text: 'Settings saved successfully' })
      }
    } else {
      const { error } = await supabase
        .from('site_settings')
        .insert({ ...payload, created_at: new Date().toISOString() })

      if (error) {
        setMessage({ type: 'error', text: 'Failed to create settings' })
      } else {
        setMessage({ type: 'success', text: 'Settings created successfully' })
      }
    }

    setSaving(false)
    fetchSettings()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Site Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your site configuration</p>
      </div>

      <Card size="sm">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <div className={`flex items-center gap-2 p-3 rounded-sm mb-4 text-sm ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              <AlertCircle className="h-4 w-4" />
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Site Name" required>
                <Input
                  required
                  value={formData.site_name}
                  onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                />
              </FormField>
              <FormField label="Contact Email" required>
                <Input
                  type="email"
                  required
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                />
              </FormField>
            </div>

            <FormField label="Site Description">
              <Textarea
                value={formData.site_description}
                onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
                rows={3}
              />
            </FormField>

            <FormField label="WhatsApp Number" required>
              <Input
                required
                value={formData.whatsapp_number}
                onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                placeholder="+92XXXXXXXXXX"
              />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Facebook Page">
                <Input
                  type="url"
                  value={formData.facebook_page}
                  onChange={(e) => setFormData({ ...formData, facebook_page: e.target.value })}
                />
              </FormField>
              <FormField label="Instagram Handle">
                <Input
                  value={formData.instagram_handle}
                  onChange={(e) => setFormData({ ...formData, instagram_handle: e.target.value })}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Twitter/X Page">
                <Input
                  type="url"
                  value={formData.twitter_page}
                  onChange={(e) => setFormData({ ...formData, twitter_page: e.target.value })}
                />
              </FormField>
              <FormField label="YouTube Channel">
                <Input
                  type="url"
                  value={formData.youtube_channel}
                  onChange={(e) => setFormData({ ...formData, youtube_channel: e.target.value })}
                />
              </FormField>
            </div>

            <FormActions>
              <Button type="submit" disabled={saving}>
                <Save className="h-4 w-4 mr-1.5" />
                {saving ? 'Saving...' : 'Save Settings'}
              </Button>
            </FormActions>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}