'use client'

import { useState, useEffect } from 'react'
import { supabase as createSupabaseClient } from '@/lib/supabase'
import { Search, Plus, Edit, Trash2, MapPin, Star, Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FormField, FormActions } from '@/components/shared/form-field'

const supabase = createSupabaseClient()

interface TourismPlace {
  id: string; name: string; description: string; location: string; city: string
  category: string; cover_image: string | null; rating: number; review_count: number
  is_featured: boolean; entry_fee: number | null; opening_hours: string | null
  contact_phone: string | null; created_at: string
}

const categories = [
  { value: 'historical-sites', label: 'Historical Sites' },
  { value: 'natural-attractions', label: 'Natural Attractions' },
  { value: 'religious-sites', label: 'Religious Sites' },
  { value: 'adventure-sports', label: 'Adventure & Sports' },
  { value: 'parks-gardens', label: 'Parks & Gardens' },
  { value: 'museums-culture', label: 'Museums & Culture' },
]

export default function AdminTourismPage() {
  const [places, setPlaces] = useState<TourismPlace[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingPlace, setEditingPlace] = useState<TourismPlace | null>(null)
  const [formData, setFormData] = useState({
    name: '', description: '', short_description: '', location: '', city: 'Kohat',
    category: 'natural-attractions', cover_image: '', images: '', entry_fee: '',
    opening_hours: '', closing_hours: '', contact_phone: '', website: '',
    is_featured: false, tags: '',
  })

  useEffect(() => { fetchPlaces() }, [])

  const fetchPlaces = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('tourism_places').select('*').order('created_at', { ascending: false })
    if (error) { console.error('Error:', error); setPlaces([]) } else { setPlaces(data || []) }
    setLoading(false)
  }

  const handleCreate = () => {
    setEditingPlace(null); setShowModal(true)
    setFormData({ name: '', description: '', short_description: '', location: '', city: 'Kohat', category: 'natural-attractions', cover_image: '', images: '', entry_fee: '', opening_hours: '', closing_hours: '', contact_phone: '', website: '', is_featured: false, tags: '' })
  }

  const handleEdit = (place: TourismPlace) => {
    setEditingPlace(place)
    setFormData({
      name: place.name, description: place.description || '', short_description: '',
      location: place.location || '', city: place.city || 'Kohat', category: place.category || 'natural-attractions',
      cover_image: place.cover_image || '', images: '', entry_fee: place.entry_fee?.toString() || '',
      opening_hours: place.opening_hours || '', closing_hours: '', contact_phone: place.contact_phone || '',
      website: '', is_featured: place.is_featured || false, tags: '',
    })
    setShowModal(true)
  }

  const handleDelete = async (placeId: string) => {
    if (!confirm('Delete this tourism place?')) return
    await supabase.from('tourism_places').delete().eq('id', placeId)
    fetchPlaces()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      name: formData.name, description: formData.description, short_description: formData.short_description,
      location: formData.location, city: formData.city, category: formData.category,
      cover_image: formData.cover_image || null,
      images: formData.images ? formData.images.split(',').map(s => s.trim()).filter(Boolean) : [],
      entry_fee: formData.entry_fee ? parseFloat(formData.entry_fee) : null,
      opening_hours: formData.opening_hours || null, closing_hours: formData.closing_hours || null,
      contact_phone: formData.contact_phone || null, website: formData.website || null,
      is_featured: formData.is_featured,
      tags: formData.tags ? formData.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
      updated_at: new Date().toISOString(),
    }
    if (editingPlace) {
      await supabase.from('tourism_places').update(payload).eq('id', editingPlace.id)
    } else {
      await supabase.from('tourism_places').insert({ ...payload, created_at: new Date().toISOString() })
    }
    setShowModal(false); fetchPlaces()
  }

  const handleToggleFeatured = async (placeId: string, current: boolean) => {
    await supabase.from('tourism_places').update({ is_featured: !current }).eq('id', placeId)
    fetchPlaces()
  }

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tourism Management</h1>
        <Button onClick={handleCreate}><Plus className="h-5 w-5 mr-1.5" />Add Place</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
          <Input placeholder="Search tourism places..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading tourism places...</div>
        ) : filteredPlaces.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No tourism places found.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Place</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlaces.map((place) => (
                <tr key={place.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {place.cover_image && <img src={place.cover_image} alt={place.name} className="h-12 w-16 object-cover rounded" />}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{place.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{place.description?.slice(0, 80)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{place.category?.replace(/-/g, ' ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      {place.rating?.toFixed(1) || '0.0'} <span className="text-gray-500 ml-1">({place.review_count || 0})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5 inline mr-1 text-gray-400" />{place.location || place.city || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="ghost" size="xs" onClick={() => handleToggleFeatured(place.id, place.is_featured)}
                      className={place.is_featured ? 'text-yellow-600' : 'text-gray-400'}>
                      {place.is_featured ? <Eye className="h-4 w-4 mr-1" /> : <EyeOff className="h-4 w-4 mr-1" />}
                      {place.is_featured ? 'Featured' : 'Hidden'}
                    </Button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon-xs" onClick={() => handleEdit(place)} title="Edit"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon-xs" onClick={() => handleDelete(place.id)} title="Delete"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{editingPlace ? 'Edit Tourism Place' : 'Add Tourism Place'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Name" required>
                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </FormField>
                  <FormField label="Category" required>
                    <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v ?? '' })}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>
                <FormField label="Description" required>
                  <Textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} />
                </FormField>
                <FormField label="Short Description">
                  <Textarea value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} rows={2} />
                </FormField>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Location" required>
                    <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                  </FormField>
                  <FormField label="City">
                    <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                  </FormField>
                </div>
                <FormField label="Cover Image URL">
                  <Input type="url" value={formData.cover_image} onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })} />
                </FormField>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Entry Fee">
                    <Input type="number" step="0.01" value={formData.entry_fee} onChange={(e) => setFormData({ ...formData, entry_fee: e.target.value })} />
                  </FormField>
                  <FormField label="Contact Phone">
                    <Input value={formData.contact_phone} onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })} />
                  </FormField>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Opening Hours">
                    <Input value={formData.opening_hours} onChange={(e) => setFormData({ ...formData, opening_hours: e.target.value })} placeholder="e.g. 9:00 AM" />
                  </FormField>
                  <FormField label="Closing Hours">
                    <Input value={formData.closing_hours} onChange={(e) => setFormData({ ...formData, closing_hours: e.target.value })} placeholder="e.g. 6:00 PM" />
                  </FormField>
                </div>
                <FormField label="Website">
                  <Input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
                </FormField>
                <FormField label="Tags (comma separated)">
                  <Input value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="historical, fort, heritage" />
                </FormField>
                <div className="flex items-center">
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={formData.is_featured} onCheckedChange={(c) => setFormData({ ...formData, is_featured: c as boolean })} />
                    <span className="text-sm font-medium text-foreground">Featured Place</span>
                  </Label>
                </div>
                <FormActions>
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                  <Button type="submit">{editingPlace ? 'Update Place' : 'Add Place'}</Button>
                </FormActions>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
