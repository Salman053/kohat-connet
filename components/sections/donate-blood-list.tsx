'use client'

import React, { useState, useEffect } from 'react'
import { Search, Filter, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { bloodTypeColors } from '@/lib/donate-blood-data'
import { createClient } from '@supabase/supabase-js'
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export const DonorList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBloodType, setSelectedBloodType] = useState<string>('All')
  const [donors, setDonors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDonors = async () => {
    try {
      const { data, error } = await getSupabase()
        .from('blood_donors')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDonors(data || [])
    } catch (error) {
      console.error('Error fetching donors:', error)
    } finally {
      setLoading(false)
    }
  }



  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (donor.phone && donor.phone.includes(searchQuery))
    const matchesBlood = selectedBloodType === 'All' || donor.blood_group === selectedBloodType
    return matchesSearch && matchesBlood
  })
    useEffect(() => {
    fetchDonors()
  }, [])

  return (
    <div className="lg:col-span-8">
      {/* Search and Filter Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {['All', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedBloodType(type)}
                aria-label={`Filter by blood type ${type}`}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
                  selectedBloodType === type
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">
          Available Donors
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({filteredDonors.length} found)
          </span>
        </h3>
        <Button variant="outline" size="sm" className="gap-2" aria-label="Open more filters">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading donors...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredDonors.map(donor => {
            const colors = bloodTypeColors[donor.blood_group as keyof typeof bloodTypeColors] || bloodTypeColors['O+']
            return (
              <div 
                key={donor.id} 
                className="group relative bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:border-red-500/30 transition-all duration-300 overflow-hidden"
              >
                <div className={cn(
                  "absolute top-4 right-4 w-2 h-2 rounded-full",
                  donor.is_available ? "bg-green-500" : "bg-gray-400"
                )}>
                  {donor.is_available && (
                    <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  )}
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0",
                    colors.bg, colors.text, colors.border, "border-2"
                  )}>
                    {donor.blood_group}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-base text-foreground truncate">{donor.full_name}</h4>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Age: {donor.age || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-border">
                  <div className="text-center">
                    <div className="text-xs font-semibold text-foreground">{donor.last_donation_date ? new Date(donor.last_donation_date).toLocaleDateString() : 'N/A'}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Last Donated</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-xs font-semibold text-foreground">{donor.is_available ? 'Available' : 'Unavailable'}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Status</div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full gap-2 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all"
                  aria-label={`Call ${donor.full_name} at ${donor.phone}`}
                >
                  <Phone className="w-4 h-4" />
                  {donor.phone}
                </Button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
