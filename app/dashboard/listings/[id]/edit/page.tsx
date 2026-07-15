'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { supabase as createSupabaseClient } from '@/lib/supabase'
import { Building2, MapPin, Phone, Mail, Globe, Image as ImageIcon, X, Plus, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from '@/components/dashboard/toast'
import ImageUpload from '@/components/dashboard/image-upload'
import PageHeader from '@/components/dashboard/page-header'

const supabase = createSupabaseClient()

interface Category {
  id: string
  name: string
  slug: string
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditListingPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const [formData, setFormData] = useState({
    category_id: '',
    title: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    latitude: '',
    longitude: '',
    price_range: ''
  })

  useEffect(() => {
    const load = async () => {
      const { data: cats } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
      if (cats) setCategories(cats)

      const { data: listing } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single()

      if (listing) {
        setFormData({
          category_id: listing.category_id || '',
          title: listing.title || '',
          description: listing.description || '',
          address: listing.address || '',
          phone: listing.phone || '',
          email: listing.email || '',
          website: listing.website || '',
          latitude: listing.latitude?.toString() || '',
          longitude: listing.longitude?.toString() || '',
          price_range: listing.price_range || ''
        })
        setImageUrls(listing.images || [])
      }
      setFetching(false)
    }
    load()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/auth/signin'); return }

      const { error } = await supabase
        .from('listings')
        .update({
          ...formData,
          images: imageUrls,
          latitude: formData.latitude ? parseFloat(formData.latitude) : null,
          longitude: formData.longitude ? parseFloat(formData.longitude) : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)

      if (error) throw error
      toast('Listing updated successfully', 'success')
      router.push('/dashboard/listings')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to update listing', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Edit Listing" subtitle="Update your business listing details" />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <Select
              value={formData.category_id}
              onValueChange={(v) => setFormData({ ...formData, category_id: v ?? '' })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text" required value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="pl-10" placeholder="Enter business name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <Textarea
              required value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4} placeholder="Describe your business"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text" required value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="pl-10" placeholder="Enter full address"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="tel" required value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10" placeholder="+92 XXX XXXXXXX"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10" placeholder="email@example.com"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="url" value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="pl-10" placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
              <Input
                type="number" step="any" value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                placeholder="33.5877"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
              <Input
                type="number" step="any" value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                placeholder="71.4376"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <Input
              type="text" value={formData.price_range}
              onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
              placeholder="e.g., $, $$, $$$"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
            <div className="space-y-3">
              <ImageUpload
                folder="listings"
                onUpload={(url) => setImageUrls(prev => [...prev, url])}
              />
              {imageUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt={`Image ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => setImageUrls(imageUrls.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.push('/dashboard/listings')}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}