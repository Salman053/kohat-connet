'use client'

import React, { useState } from 'react'
import { Search, Filter, Phone, MapPin, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { donors, bloodTypeColors } from '@/lib/donate-blood-data'

export const DonorList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBloodType, setSelectedBloodType] = useState<string>('All')

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donor.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBlood = selectedBloodType === 'All' || donor.bloodType === selectedBloodType
    return matchesSearch && matchesBlood
  })

  return (
    <div className="lg:col-span-8">
      {/* Search and Filter Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredDonors.map(donor => {
          const colors = bloodTypeColors[donor.bloodType as keyof typeof bloodTypeColors] || bloodTypeColors['O+']
          return (
            <div 
              key={donor.id} 
              className="group relative bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:border-red-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className={cn(
                "absolute top-4 right-4 w-2 h-2 rounded-full",
                donor.available ? "bg-green-500" : "bg-gray-400"
              )}>
                {donor.available && (
                  <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                )}
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0",
                  colors.bg, colors.text, colors.border, "border-2"
                )}>
                  {donor.bloodType}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-base text-foreground truncate">{donor.name}</h4>
                    {donor.verified && (
                      <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{donor.location}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-border">
                <div className="text-center">
                  <div className="text-lg font-black text-foreground">{donor.donations}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Donations</div>
                </div>
                <div className="text-center border-l border-border">
                  <div className="text-xs font-semibold text-foreground">{donor.lastDonation}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Last Donated</div>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full gap-2 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all"
                aria-label={`Call ${donor.name} at ${donor.contact}`}
              >
                <Phone className="w-4 h-4" />
                {donor.contact}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
