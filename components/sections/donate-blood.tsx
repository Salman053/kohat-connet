'use client'

import React, { useState } from 'react'
import { Plus, MapPin, Phone, AlertCircle, Building2, Heart, Users, Droplet, Shield, Search, Filter, Clock, Award, CheckCircle2, ArrowRight, Activity, TrendingUp, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const donors = [
  { 
    id: 1, 
    name: "Ali Khan", 
    bloodType: "O+", 
    location: "KDA Phase 1", 
    contact: "0300-1234567",
    donations: 12,
    lastDonation: "2 months ago",
    verified: true,
    available: true
  },
  { 
    id: 2, 
    name: "Sara Ahmed", 
    bloodType: "A-", 
    location: "City Center", 
    contact: "0333-7654321",
    donations: 8,
    lastDonation: "3 months ago",
    verified: true,
    available: true
  },
  { 
    id: 3, 
    name: "Usman Raza", 
    bloodType: "B+", 
    location: "University Road", 
    contact: "0312-9988776",
    donations: 15,
    lastDonation: "1 month ago",
    verified: true,
    available: false
  },
  { 
    id: 4, 
    name: "Zainab Bibi", 
    bloodType: "AB+", 
    location: "Old Town", 
    contact: "0345-1122334",
    donations: 6,
    lastDonation: "4 months ago",
    verified: false,
    available: true
  },
  { 
    id: 5, 
    name: "Bilal Malik", 
    bloodType: "O-", 
    location: "KDA Phase 2", 
    contact: "0301-4455667",
    donations: 20,
    lastDonation: "2 weeks ago",
    verified: true,
    available: true
  },
  { 
    id: 6, 
    name: "Fatima Noor", 
    bloodType: "A+", 
    location: "Main Boulevard", 
    contact: "0321-7788990",
    donations: 10,
    lastDonation: "2 months ago",
    verified: true,
    available: true
  },
]

const urgentNeeds = [
  { hospital: "DHQ Hospital Kohat", blood: "O-", patients: 3, urgency: "critical", time: "2 hours ago" },
  { hospital: "City Medical Complex", blood: "A+", patients: 2, urgency: "high", time: "5 hours ago" },
  { hospital: "Al-Razi Hospital", blood: "B-", patients: 1, urgency: "medium", time: "1 day ago" }
]

const bloodBanks = [
  { name: "Kohat Central Blood Bank", phone: "0922-123456", hours: "24/7", rating: 4.9 },
  { name: "Red Crescent Blood Center", phone: "0922-765432", hours: "8 AM - 10 PM", rating: 4.8 },
  { name: "District Hospital Blood Bank", phone: "0922-998877", hours: "24/7", rating: 4.7 }
]

const stats = [
  { icon: Users, value: "2,847", label: "Registered Donors", change: "+124 this month" },
  { icon: Heart, value: "1,234", label: "Lives Saved", change: "+89 this month" },
  { icon: Droplet, value: "3,456", label: "Units Donated", change: "+234 this month" },
  { icon: Award, value: "98%", label: "Success Rate", change: "Verified donors" }
]

const bloodTypeColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  'O+': { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', gradient: 'from-red-500 to-red-600' },
  'O-': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', gradient: 'from-red-600 to-red-700' },
  'A+': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' },
  'A-': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', gradient: 'from-blue-600 to-blue-700' },
  'B+': { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', gradient: 'from-green-500 to-green-600' },
  'B-': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', gradient: 'from-green-600 to-green-700' },
  'AB+': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600' },
  'AB-': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', gradient: 'from-purple-600 to-purple-700' }
}

const urgencyColors: Record<string, { bg: string; text: string; border: string }> = {
  critical: { bg: 'bg-red-500/20', text: 'text-red-300', border: 'border-red-400/30' },
  high: { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-400/30' },
  medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-400/30' }
}

const DonateBlood = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBloodType, setSelectedBloodType] = useState<string>('All')

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donor.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBlood = selectedBloodType === 'All' || donor.bloodType === selectedBloodType
    return matchesSearch && matchesBlood
  })

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="text-sm font-semibold text-red-500">Save Lives Today</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground mb-6">
            Blood Donor
            <br />
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Network
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connecting donors and recipients across Kohat. Every donation can save up to three lives.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="relative group bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-red-500" />
                </div>
                <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Donor Grid */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                Available Donors
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({filteredDonors.length} found)
                </span>
              </h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDonors.map(donor => {
                const colors = bloodTypeColors[donor.bloodType] || bloodTypeColors['O+']
                return (
                  <div 
                    key={donor.id} 
                    className="group relative bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:border-red-500/30 transition-all duration-300 overflow-hidden"
                  >
                    {/* Availability indicator */}
                    <div className={cn(
                      "absolute top-4 right-4 w-2 h-2 rounded-full",
                      donor.available ? "bg-green-500" : "bg-gray-400"
                    )}>
                      {donor.available && (
                        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                      )}
                    </div>

                    {/* Header */}
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

                    {/* Stats */}
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

                    {/* Contact */}
                    <Button 
                      variant="outline" 
                      className="w-full gap-2 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      {donor.contact}
                    </Button>
                  </div>
                )
              })}
            </div>

            {filteredDonors.length === 0 && (
              <div className="text-center py-16 bg-card border border-border rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">No donors found</h4>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Urgent Needs */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-2xl p-6 shadow-xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Urgent Needs</h3>
                    <p className="text-xs text-white/70">Immediate response required</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {urgentNeeds.map((need, i) => {
                    const urgency = urgencyColors[need.urgency]
                    return (
                      <div 
                        key={i} 
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="text-sm font-bold text-white mb-1">{need.hospital}</div>
                            <div className="flex items-center gap-2 text-xs text-white/70">
                              <Users className="w-3 h-3" />
                              <span>{need.patients} patient{need.patients > 1 ? 's' : ''}</span>
                              <span>•</span>
                              <Clock className="w-3 h-3" />
                              <span>{need.time}</span>
                            </div>
                          </div>
                          <div className={cn(
                            "px-2 py-1 rounded-lg text-xs font-bold border",
                            urgency.bg, urgency.text, urgency.border
                          )}>
                            {need.urgency.toUpperCase()}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <span className="text-xs text-white/60">Blood Type Needed</span>
                          <span className="text-lg font-black text-white bg-white/20 px-3 py-1 rounded-lg">
                            {need.blood}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Button className="w-full mt-4 bg-white text-red-600 hover:bg-white/90 font-bold gap-2">
                  <Heart className="w-4 h-4" />
                  Respond Now
                </Button>
              </div>
            </div>

       
          </div>
               {/* Blood Banks */}
            <div className="bg-card border col-span-8 border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Certified Blood Banks</h3>
                  <p className="text-xs text-muted-foreground">24/7 services available</p>
                </div>
              </div>

              <div className="space-y-3">
                {bloodBanks.map((bank, i) => (
                  <div 
                    key={i}
                    className="group p-4 rounded-xl bg-muted/50 hover:bg-muted border border-transparent hover:border-border transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        {bank.name}
                      </h4>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold">{bank.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{bank.phone}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{bank.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 gap-2">
                View All Banks
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-br col-span-4 h-fit from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                How It Works
              </h3>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Register", desc: "Sign up as a donor" },
                  { step: "2", title: "Get Matched", desc: "We find recipients near you" },
                  { step: "3", title: "Donate", desc: "Save lives at certified centers" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
                <Shield className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Become a Hero</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                Register as a Donor Today
              </h3>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                Join thousands of life-savers in Kohat. Your single donation can save up to three lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-white text-red-600 hover:bg-white/90 font-bold px-8 gap-2">
                  <Plus className="w-4 h-4" />
                  Register Now
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-bold px-8">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Heart className="w-24 h-24 text-white fill-white animate-pulse" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Droplet className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DonateBlood