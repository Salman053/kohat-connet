'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Search, Filter, Phone, MapPin, Droplets, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface BloodDonor {
  id: string; user_id: string | null; name: string; blood_type: string
  phone: string; age: number | null; last_donation_date: string | null
  is_available: boolean; created_at: string
}

const bloodGroupColors: Record<string, string> = {
  'A+': 'bg-red-100 text-red-800', 'A-': 'bg-red-50 text-red-700',
  'B+': 'bg-blue-100 text-blue-800', 'B-': 'bg-blue-50 text-blue-700',
  'AB+': 'bg-purple-100 text-purple-800', 'AB-': 'bg-purple-50 text-purple-700',
  'O+': 'bg-green-100 text-green-800', 'O-': 'bg-green-50 text-green-700',
}

export default function AdminBloodDonorsPage() {
  const [donors, setDonors] = useState<BloodDonor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [bloodFilter, setBloodFilter] = useState('all')

  useEffect(() => { fetchDonors() }, [])

  const fetchDonors = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('blood_donors').select('*').order('created_at', { ascending: false })
    if (error) { console.error('Error:', error); setDonors([]) } else { setDonors(data || []) }
    setLoading(false)
  }

  const handleToggleAvailability = async (donorId: string, current: boolean) => {
    await supabase.from('blood_donors').update({ is_available: !current }).eq('id', donorId)
    fetchDonors()
  }

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) || donor.phone.includes(searchTerm)
    const matchesBlood = bloodFilter === 'all' || donor.blood_type === bloodFilter
    return matchesSearch && matchesBlood
  })

  const bloodGroups = ['all', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blood Donors</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
            <Input placeholder="Search donors by name or phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400 shrink-0" />
            <Select value={bloodFilter} onValueChange={(v) => setBloodFilter(v ?? 'all')}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Blood Group" /></SelectTrigger>
              <SelectContent>
                {bloodGroups.map(bg => (
                  <SelectItem key={bg} value={bg}>{bg === 'all' ? 'All Blood Groups' : bg}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading donors...</div>
        ) : filteredDonors.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No blood donors found.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Donation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDonors.map((donor) => (
                <tr key={donor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${bloodGroupColors[donor.blood_type] || 'bg-gray-100 text-gray-800'}`}>
                      {donor.blood_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Phone className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      {donor.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.age || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donor.last_donation_date ? new Date(donor.last_donation_date).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="ghost" size="xs" onClick={() => handleToggleAvailability(donor.id, donor.is_available)}
                      className={donor.is_available ? 'text-green-600' : 'text-gray-400'}>
                      {donor.is_available ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" />}
                      {donor.is_available ? 'Available' : 'Unavailable'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
