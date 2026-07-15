"use client"

import React, { use, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, MapPin, Phone, Mail, Globe, ShieldCheck, Clock, Heart } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { getListingBySlug } from '@/lib/data-fallback';
import type { ListingDetail } from '@/lib/data-fallback'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ListingDetailPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug

  const [listing, setListing] = useState<ListingDetail | null>(null)

  useEffect(() => { getListingBySlug(slug).then(setListing) }, [slug])

  const [reviewName, setReviewName] = useState("")
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState("5")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewName || !reviewText) return
    setSubmitSuccess(true)
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <h1 className="text-3xl font-extrabold mb-2">Listing Not Found</h1>
        <p className="text-muted-foreground text-sm mb-6">The listing you are looking for does not exist or has been removed.</p>
        <Link href="/listing" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to All Listings
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title={listing.name}
        subtitle={listing.description}
        tag={listing.category}
        align="left"
        backLink={{ href: '/listing', label: 'Back to Directory' }}
      >
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="bg-card border px-3 py-1.5 rounded-full text-xs font-bold text-yellow-600 flex items-center gap-1.5 shrink-0">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span>{listing.rating} ({listing.reviews} reviews)</span>
          </div>
          {listing.verified && (
            <div className="bg-card border px-3 py-1.5 rounded-full text-xs font-bold text-green-600 flex items-center gap-1.5 shrink-0">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified Listing</span>
            </div>
          )}
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-80 w-full rounded-3xl overflow-hidden border">
              <Image
                src={listing.image}
                alt={listing.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground">
                ABOUT {listing.name.toUpperCase()}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {listing.about}
              </p>
            </div>

            {/* Review Section */}
            <div className="bg-card border border-border p-6 md:p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-extrabold flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" /> Write a Review
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
                      <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Rating</label>
                      <Select value={reviewRating} onValueChange={setReviewRating as any}>
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
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Your Review</label>
                    <Textarea
                      required
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience with this listing..."
                         />
                  </div>

                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-primary/10"
                  >
                    Submit Review
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border p-6 rounded-3xl sticky top-24 space-y-6 shadow-sm">
              <h3 className="font-extrabold text-sm border-b pb-3">CONTACT DETAILS</h3>

              <div className="space-y-4 text-xs text-muted-foreground">
                <div className="flex gap-3 items-start">
                  <MapPin className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-foreground mb-0.5">Address</div>
                    <p>{listing.address}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <Phone className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-foreground mb-0.5">Phone</div>
                    <p>{listing.phone}</p>
                  </div>
                </div>

                {listing.email && (
                  <div className="flex gap-3 items-start">
                    <Mail className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-foreground mb-0.5">Email</div>
                      <p className="break-all">{listing.email}</p>
                    </div>
                  </div>
                )}

                {listing.website && (
                  <div className="flex gap-3 items-start">
                    <Globe className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-foreground mb-0.5">Website</div>
                      <p>{listing.website}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 items-start">
                  <Clock className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-foreground mb-0.5">Hours</div>
                    <p>{listing.hours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <a
                  href={`tel:${listing.phone}`}
                  className="w-full inline-block text-center bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs py-3.5 rounded-xl transition-all shadow-md shadow-primary/10"
                >
                  Call Now
                </a>
                <Link
                  href={`/categories/${listing.categorySlug}`}
                  className="w-full inline-block text-center bg-card border border-border hover:bg-accent text-foreground font-bold text-xs py-3.5 rounded-xl transition-all"
                >
                  Browse {listing.category}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
