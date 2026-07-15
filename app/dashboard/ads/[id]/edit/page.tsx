'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { supabase as createSupabaseClient } from '@/lib/supabase'
import { Megaphone, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/components/dashboard/toast'
import ImageUpload from '@/components/dashboard/image-upload'
import PageHeader from '@/components/dashboard/page-header'

const supabase = createSupabaseClient()

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditAdPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const [fetching, setFetching] = useState(true)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    redirect_url: '',
    start_date: '',
    end_date: '',
  })

  useEffect(() => {
    const load = async () => {
      const { data: ad } = await supabase
        .from('advertisements')
        .select('*')
        .eq('id', id)
        .single()

      if (ad) {
        setFormData({
          title: ad.title || '',
          description: ad.description || '',
          image_url: ad.image_url || '',
          redirect_url: ad.redirect_url || '',
          start_date: ad.start_date?.slice(0, 10) || '',
          end_date: ad.end_date?.slice(0, 10) || '',
        })
      }
      setFetching(false)
    }
    load()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('advertisements')
        .update({
          ...formData,
          start_date: formData.start_date ? new Date(formData.start_date).toISOString() : null,
          end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)

      if (error) throw error
      toast('Advertisement updated successfully', 'success')
      router.push('/dashboard/advertisements')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to update advertisement', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Edit Advertisement" subtitle="Update your advertisement details" />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <div className="relative">
              <Megaphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text" required value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="pl-10" placeholder="Ad title"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3} placeholder="Describe your advertisement"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ad Image</label>
            <ImageUpload
              folder="ads"
              currentImage={formData.image_url}
              onUpload={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Redirect URL</label>
            <Input
              type="url" value={formData.redirect_url}
              onChange={(e) => setFormData({ ...formData, redirect_url: e.target.value })}
              placeholder="https://example.com/landing-page"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <Input
                type="date" required value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
              <Input
                type="date" required value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.push('/dashboard/advertisements')}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700">
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}