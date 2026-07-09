'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Search, Plus, Edit, Trash2, Calendar, MapPin, Users, Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FormField, FormActions } from '@/components/shared/form-field'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Event {
  id: string; title: string; description: string; venue: string; city: string
  start_date: string; end_date: string; status: 'draft' | 'published' | 'cancelled' | 'postponed' | 'completed'
  is_free: boolean; ticket_price: number | null; attendees_count: number
  cover_image: string | null; created_at: string
}

interface FormData {
  title: string
  description: string
  short_description: string
  venue: string
  city: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  cover_image: string
  status: Event['status']
  is_free: boolean
  ticket_price: string
  max_attendees: string
  tags: string
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: '', description: '', short_description: '', venue: '', city: 'Kohat',
    start_date: '', end_date: '', start_time: '', end_time: '', cover_image: '',
    status: 'draft', is_free: true, ticket_price: '', max_attendees: '', tags: '',
  })

  useEffect(() => { fetchEvents() }, [])

  const fetchEvents = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('events').select('*').order('start_date', { ascending: false })
    if (error) { console.error('Error:', error); setEvents([]) } else { setEvents(data || []) }
    setLoading(false)
  }

  const handleCreate = () => {
    setEditingEvent(null); setShowModal(true)
    setFormData({ title: '', description: '', short_description: '', venue: '', city: 'Kohat', start_date: '', end_date: '', start_time: '', end_time: '', cover_image: '', status: 'draft', is_free: true, ticket_price: '', max_attendees: '', tags: '' })
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title, description: event.description || '', short_description: '',
      venue: event.venue || '', city: event.city || 'Kohat',
      start_date: event.start_date?.split('T')[0] || '', end_date: event.end_date?.split('T')[0] || '',
      start_time: '', end_time: '', cover_image: event.cover_image || '',
      status: event.status as 'draft' | 'published' | 'cancelled' | 'postponed' | 'completed', is_free: event.is_free, ticket_price: event.ticket_price?.toString() || '',
      max_attendees: '', tags: '',
    })
    setShowModal(true)
  }

  const handleDelete = async (eventId: string) => {
    if (!confirm('Delete this event?')) return
    await supabase.from('events').delete().eq('id', eventId)
    fetchEvents()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      title: formData.title, description: formData.description, short_description: formData.short_description,
      venue: formData.venue, city: formData.city,
      start_date: formData.start_date ? new Date(formData.start_date).toISOString() : null,
      end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
      start_time: formData.start_time || null, end_time: formData.end_time || null,
      cover_image: formData.cover_image || null, status: formData.status,
      is_free: formData.is_free, ticket_price: formData.ticket_price ? parseFloat(formData.ticket_price) : null,
      max_attendees: formData.max_attendees ? parseInt(formData.max_attendees) : null,
      tags: formData.tags ? formData.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
      updated_at: new Date().toISOString(),
    }
    if (editingEvent) {
      await supabase.from('events').update(payload).eq('id', editingEvent.id)
    } else {
      await supabase.from('events').insert({ ...payload, created_at: new Date().toISOString() })
    }
    setShowModal(false); fetchEvents()
  }

  const handleToggleStatus = async (eventId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published'
    await supabase.from('events').update({ status: newStatus }).eq('id', eventId)
    fetchEvents()
  }

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.city?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'postponed': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
        <Button onClick={handleCreate}><Plus className="h-5 w-5 mr-1.5" />Add Event</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
          <Input placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading events...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No events found.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {event.cover_image && <img src={event.cover_image} alt={event.title} className="h-12 w-16 object-cover rounded" />}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{event.description?.slice(0, 60)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Calendar className="h-3.5 w-3.5 inline mr-1 text-gray-400" />
                    {event.start_date ? new Date(event.start_date).toLocaleDateString() : 'TBD'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5 inline mr-1 text-gray-400" />{event.venue || event.city || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusBadge(event.status)}`}>{event.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Users className="h-3.5 w-3.5 inline mr-1 text-gray-400" />{event.attendees_count || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon-xs" onClick={() => handleToggleStatus(event.id, event.status)}
                        title={event.status === 'published' ? 'Unpublish' : 'Publish'}>
                        {event.status === 'published' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon-xs" onClick={() => handleEdit(event)} title="Edit"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon-xs" onClick={() => handleDelete(event.id)} title="Delete"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{editingEvent ? 'Edit Event' : 'Add Event'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Title" required>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </FormField>
                <FormField label="Description" required>
                  <Textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} />
                </FormField>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Venue" required>
                    <Input value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} />
                  </FormField>
                  <FormField label="City">
                    <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                  </FormField>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Start Date" required>
                    <Input type="date" required value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
                  </FormField>
                  <FormField label="End Date" required>
                    <Input type="date" required value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
                  </FormField>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Start Time">
                    <Input type="time" value={formData.start_time} onChange={(e) => setFormData({ ...formData, start_time: e.target.value })} />
                  </FormField>
                  <FormField label="End Time">
                    <Input type="time" value={formData.end_time} onChange={(e) => setFormData({ ...formData, end_time: e.target.value })} />
                  </FormField>
                </div>
                <FormField label="Cover Image URL">
                  <Input type="url" value={formData.cover_image} onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })} />
                </FormField>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Status">
                    <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as any })}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="postponed">Postponed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Ticket Price">
                    <Input type="number" step="0.01" value={formData.ticket_price} onChange={(e) => setFormData({ ...formData, ticket_price: e.target.value })} />
                  </FormField>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Max Attendees">
                    <Input type="number" value={formData.max_attendees} onChange={(e) => setFormData({ ...formData, max_attendees: e.target.value })} />
                  </FormField>
                  <div className="flex items-end pb-1">
                    <Label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox checked={formData.is_free} onCheckedChange={(c) => setFormData({ ...formData, is_free: c as boolean })} />
                      <span className="text-sm font-medium text-foreground">Free Event</span>
                    </Label>
                  </div>
                </div>
                <FormField label="Tags (comma separated)">
                  <Input value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="cultural, music, festival" />
                </FormField>
                <FormActions>
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                  <Button type="submit">{editingEvent ? 'Update Event' : 'Add Event'}</Button>
                </FormActions>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
