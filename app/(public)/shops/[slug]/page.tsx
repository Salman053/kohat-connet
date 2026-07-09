"use client"

import React, { use, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface ShopDetail {
  name: string; category: string; rating: number; reviews: number
  image: string; description: string; slug: string; address: string
  phone: string; email: string; hours: string
}

const shopsList: ShopDetail[] = [
  { name: "Al-Noor Electronics", category: "Electronics", rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1740803292814-13d2e35924c3?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "The biggest electronics hub in Kohat. Branded appliances and smartphones.", slug: "al-noor", address: "Hangu Road, Kohat Cantt", phone: "+92 333 1122334", email: "alnoor@kohat.com", hours: "10:00 AM - 10:00 PM" },
  { name: "Kohat Fashion House", category: "Clothing", rating: 4.5, reviews: 89, image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80", description: "Traditional and modern clothing. Specialist in bridal wear.", slug: "fashion-house", address: "Bazar-e-Mustafa, Kohat Cantt", phone: "+92 334 5566778", email: "fashion@kohat.com", hours: "11:00 AM - 09:30 PM" },
  { name: "City Furniture Mart", category: "Home", rating: 4.7, reviews: 56, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80", description: "Quality wood furniture crafted by master artisans.", slug: "city-furniture", address: "KDA Khas, Sector 3, Kohat", phone: "+92 335 9900112", email: "cityfurniture@kohat.com", hours: "09:00 AM - 08:00 PM" },
  { name: "Green Grocery", category: "Groceries", rating: 4.9, reviews: 210, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", description: "Fresh farm-to-table vegetables and fruits.", slug: "green-grocery", address: "Main Bazar Chowk, Kohat", phone: "+92 331 4455667", email: "greengrocery@kohat.com", hours: "07:00 AM - 11:00 PM" }
]

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ShopDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug

  const shop = shopsList.find(s => s.slug === slug) || null

  const [reviewName, setReviewName] = useState("")
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewName || !reviewText) return
    setSubmitSuccess(true)
  }

  if (!shop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <h1 className="text-3xl font-extrabold mb-2">Shop Not Found</h1>
        <p className="text-muted-foreground text-sm mb-6">The shop profile you are searching for is not listed.</p>
        <Link href="/shops" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Shops
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title={shop.name}
        subtitle={shop.description}
        tag={shop.category}
        align="left"
        backLink={{ href: '/shops', label: 'Back to Marketplace' }}
      >
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="bg-card border px-3 py-1.5 rounded-full text-xs font-bold text-yellow-600 flex items-center gap-1.5 shrink-0">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span>{shop.rating} ({shop.reviews} reviews)</span>
          </div>
          <div className="bg-card border px-3 py-1.5 rounded-full text-xs font-bold text-green-600 flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="h-4 w-4" />
            <span>Verified Local Merchant</span>
          </div>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Image block */}
            <div className="relative h-96 w-full rounded-3xl overflow-hidden border">
              <Image
                src={shop.image}
                alt={shop.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Shop Details */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground">ABOUT {shop.name.toUpperCase()}</h2>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {shop.name} is a leading name in the {shop.category.toLowerCase()} sector of Kohat, offering top-tier services, authentic goods, and reliable products. Located conveniently at {shop.address}, it provides easy accessibility and a premium shopping experience to all customers in the KPK region.
              </p>
            </div>

            {/* Write a review */}
            <div className="bg-card border border-border p-6 md:p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-extrabold flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" /> Write a Customer Review
              </h3>

              {submitSuccess ? (
                <div className="bg-green-500/10 text-green-600 border border-green-500/20 p-4 rounded-xl text-xs font-bold text-center">
                  Review submitted successfully! Thank you for sharing your feedback.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Your Name</label>
                      <Input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Salman Khan"
                        className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Rating Selection</label>
                      <Select
                        value={String(reviewRating)} // Converts your numeric state to a string for shadcn
                        onValueChange={(value) => setReviewRating(Number(value))} // Converts string back to a number
                      >
                        <SelectTrigger className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary/50">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">⭐⭐⭐⭐⭐ (5 Stars)</SelectItem>
                          <SelectItem value="4">⭐⭐⭐⭐ (4 Stars)</SelectItem>
                          <SelectItem value="3">⭐⭐⭐ (3 Stars)</SelectItem>
                          <SelectItem value="2">⭐⭐ (2 Stars)</SelectItem>
                          <SelectItem value="1">⭐ (1 Star)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Feedback Comments</label>
                    <Textarea
                      required
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share details of your experience visiting this shop..."
                         />
                  </div>

                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-primary/10"
                  >
                    Submit Rating Review
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar Contact Column */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border p-6 rounded-3xl sticky top-24 space-y-6 shadow-sm">
              <h3 className="font-extrabold text-sm border-b pb-3">SHOP CONTACT DETAILS</h3>

              <div className="space-y-4 text-xs text-muted-foreground">
                <div className="flex gap-3 items-center">
                  <MapPin className="h-4.5 w-4.5 text-primary shrink-0" />
                  <div>
                    <div className="font-extrabold text-foreground mb-0.5">Physical Address</div>
                    <p>{shop.address}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <Phone className="h-4.5 w-4.5 text-primary shrink-0" />
                  <div>
                    <div className="font-extrabold text-foreground mb-0.5">Mobile Number</div>
                    <p>{shop.phone}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <Mail className="h-4.5 w-4.5 text-primary shrink-0" />
                  <div>
                    <div className="font-extrabold text-foreground mb-0.5">Shop Email</div>
                    <p>{shop.email}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <Clock className="h-4.5 w-4.5 text-primary shrink-0" />
                  <div>
                    <div className="font-extrabold text-foreground mb-0.5">Opening Hours</div>
                    <p>{shop.hours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <a
                  href={`tel:${shop.phone}`}
                  className="w-full inline-block text-center bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs py-3.5 rounded-xl transition-all shadow-md shadow-primary/10"
                >
                  Contact Merchant
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
