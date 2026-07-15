'use client'

import { useState } from 'react'
import { supabase as createSupabaseClient } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/components/dashboard/toast'
import ImageUpload from '@/components/dashboard/image-upload'
import { User, Briefcase, MapPin, Phone, Mail, Camera } from 'lucide-react'

const supabase = createSupabaseClient()

type Props = {
  initialProfile: any
  userId: string
  userEmail: string | undefined
}

export default function SettingsClient({ initialProfile, userId, userEmail }: Props) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: initialProfile?.full_name || '',
    business_name: initialProfile?.business_name || '',
    business_address: initialProfile?.business_address || '',
    business_phone: initialProfile?.business_phone || '',
    business_description: initialProfile?.business_description || '',
    avatar_url: initialProfile?.avatar_url || '',
    phone: initialProfile?.phone || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', userId)
      if (error) throw error
      toast('Profile updated successfully', 'success')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to update profile', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarUpload = (url: string) => {
    setFormData(prev => ({ ...prev, avatar_url: url }))
    supabase.from('profiles').update({ avatar_url: url, updated_at: new Date().toISOString() }).eq('id', userId).then(
      ({ error }: { error: unknown }) => { if (!error) toast('Profile photo updated', 'success') }
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" /> Personal Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="text" value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="pl-10" placeholder="Your full name" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="tel" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10" placeholder="+92 XXX XXXXXXX" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="email" value={userEmail || ''} disabled
                  className="pl-10 bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" /> Business Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="text" value={formData.business_name}
                  onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                  className="pl-10" placeholder="Your business name" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="tel" value={formData.business_phone}
                  onChange={(e) => setFormData({ ...formData, business_phone: e.target.value })}
                  className="pl-10" placeholder="Business contact number" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Textarea value={formData.business_address}
                  onChange={(e) => setFormData({ ...formData, business_address: e.target.value })}
                  className="pl-10" rows={2} placeholder="Business address" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
              <Textarea value={formData.business_description}
                onChange={(e) => setFormData({ ...formData, business_description: e.target.value })}
                rows={3} placeholder="Brief description of your business" />
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save All Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" /> Profile Photo
          </h2>
          <ImageUpload folder="avatars" currentImage={formData.avatar_url} onUpload={handleAvatarUpload} />
        </div>
      </div>
    </div>
  )
}