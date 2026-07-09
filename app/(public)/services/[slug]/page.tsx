"use client"

import React, { use, useState } from 'react'
import { categories } from '@/lib/site'
import Link from 'next/link'
import Image from 'next/image'
import { Check, Shield, Star, Calendar } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

const serviceExperts = [
  {
    name: "Mohammad Qasim",
    title: "Senior Technician",
    rating: 4.9,
    reviews: 112,
    experience: "8+ Years",
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=800&q=80",
    phone: "+92 333 1122334"
  },
  {
    name: "Zahir Shah",
    title: "Certified Professional",
    rating: 4.7,
    reviews: 48,
    experience: "5+ Years",
    image: "https://images.unsplash.com/photo-1599351431202-6e0c0b104f1e?auto=format&fit=crop&w=800&q=80",
    phone: "+92 334 5566778"
  }
]

export default function ServiceSlugPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug

  const servicesCategory = categories.find(c => c.slug === "services")
  const subcategory = servicesCategory?.subcategories.find(sub => sub.slug === slug)

  const [bookingName, setBookingName] = useState("")
  const [bookingPhone, setBookingPhone] = useState("")
  const [bookingDate, setBookingDate] = useState("")
  const [bookingNote, setBookingNote] = useState("")
  const [isBooked, setIsBooked] = useState(false)

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingName || !bookingPhone || !bookingDate) return
    setIsBooked(true)
  }

  if (!subcategory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <h1 className="text-3xl font-extrabold mb-2">Service Not Found</h1>
        <p className="text-muted-foreground text-sm mb-6">The service page you are looking for does not exist.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title={subcategory.name}
        subtitle={subcategory.description}
        align="left"
        backLink={{ href: '/', label: 'Back to Home' }}
      >
        <div className="mt-4 flex gap-2">
          <div className="bg-card border p-3 rounded-2xl flex items-center gap-3">
            <Shield className="h-6 w-6 text-green-500 shrink-0" />
            <div>
              <div className="text-[10px] font-extrabold text-muted-foreground uppercase">INSURED &amp; VERIFIED</div>
              <div className="text-xs font-bold text-foreground">100% Satisfaction</div>
            </div>
          </div>
        </div>
      </PageHeader>

      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground">
                WHY HIRE OUR {subcategory.name.toUpperCase()} PROVIDERS?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start p-4 bg-muted/30 rounded-2xl border">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold">Vetted Professionals</h3>
                    <p className="text-xs text-muted-foreground">Every expert is background checked and verified.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start p-4 bg-muted/30 rounded-2xl border">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold">Fair Upfront Pricing</h3>
                    <p className="text-xs text-muted-foreground">Get clear rates and estimates before starting work.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start p-4 bg-muted/30 rounded-2xl border">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold">Express Service</h3>
                    <p className="text-xs text-muted-foreground">Same day booking available for urgent requests.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start p-4 bg-muted/30 rounded-2xl border">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold">Community Trust</h3>
                    <p className="text-xs text-muted-foreground">Highly rated by residents in Kohat Cantt &amp; KDA.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground">
                AVAILABLE LOCAL EXPERTS ({serviceExperts.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {serviceExperts.map((expert, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-border p-5 rounded-3xl flex gap-4 items-center hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border">
                      <Image
                        src={expert.image}
                        alt={expert.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="font-bold text-sm text-foreground">{expert.name}</h3>
                        <span className="bg-yellow-500/10 text-yellow-600 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-0.5">
                          <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" /> {expert.rating}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">{expert.title}</div>
                      <div className="text-[10px] text-muted-foreground font-semibold flex gap-2">
                        <span>Exp: {expert.experience}</span>
                        <span>•</span>
                        <span>{expert.reviews} orders</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border p-6 rounded-3xl sticky top-24 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Calendar className="h-5 w-5" />
                <h2 className="font-extrabold text-base">BOOK SERVICE INSTANTLY</h2>
              </div>

              {isBooked ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Booking Request Sent!</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Our customer service team will reach out to verify and coordinate timings.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setIsBooked(false)
                      setBookingName("")
                      setBookingPhone("")
                      setBookingDate("")
                      setBookingNote("")
                    }}
                    className="w-full py-2 bg-primary text-primary-foreground font-bold text-xs rounded-xl"
                  >
                    Book Another Service
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Your Name</label>
                    <Input
                      type="text"
                      required
                      placeholder="e.g. Salman Khan"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Phone Number</label>
                    <Input
                      type="tel"
                      required
                      placeholder="e.g. +92 335 1234567"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Preferred Date</label>
                    <Input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Special Instructions</label>
                    <Textarea
                      placeholder="Explain the problem briefly..."
                      value={bookingNote}
                      onChange={(e) => setBookingNote(e.target.value)}
                      rows={3}
                      className="w-full bg-background border border-border rounded-xl p-3 text-xs focus:outline-none focus:border-primary/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs py-3 rounded-xl transition-all shadow-md shadow-primary/10 mt-2"
                  >
                    Confirm Booking Request
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}