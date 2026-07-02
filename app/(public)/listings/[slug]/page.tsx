"use client"

import React, { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, MapPin, Phone, Mail, Globe, ShieldCheck, Clock, Heart, Share2 } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const listingData = [
  {
    name: "Khyber Electronics Center",
    slug: "khyber-electronics",
    category: "Local Business",
    categorySlug: "local-business",
    subcategory: "Hardware & Electronics",
    rating: 4.8,
    reviews: 140,
    phone: "+92 333 9876543",
    email: "contact@khyberelectronics.com",
    website: "www.khyberelectronics.com",
    address: "Main Bazar Road, Near Chowk, Kohat Cantt",
    hours: "09:00 AM - 09:00 PM",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    verified: true,
    description: "Best quality electronics and hardware services in Kohat Cantt and surrounding areas. Highly experienced team, professional support, and affordable prices.",
    about: "Khyber Electronics Center has been serving the Kohat community for over 15 years. We specialize in consumer electronics, home appliances, mobile phones, and computer accessories. Our team of certified technicians provides repair services and expert advice to help you find the right products for your needs."
  },
  {
    name: "Kohat Elite Salon",
    slug: "kohat-elite-salon",
    category: "Beauty & Wellness",
    categorySlug: "beauty-wellness",
    subcategory: "Salons",
    rating: 4.6,
    reviews: 64,
    phone: "+92 334 1234567",
    email: "info@kohatelite.com",
    website: "www.kohatelite.com",
    address: "Phase 1, KDA, Kohat",
    hours: "10:00 AM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    verified: true,
    description: "Premium salon services for men and women in Kohat.",
    about: "Kohat Elite Salon offers a wide range of beauty and grooming services including haircuts, styling, facial treatments, bridal makeup, and henna application. Our professional stylists use premium products to ensure you look your best for every occasion."
  },
  {
    name: "Tanda Dam View Point",
    slug: "tanda-dam-view",
    category: "Tourism",
    categorySlug: "tourism",
    subcategory: "Natural Attractions",
    rating: 4.9,
    reviews: 210,
    phone: "+92 922 515253",
    email: "info@kpk tourism.com",
    website: "www.kpktourism.com",
    address: "Tanda Dam Road, Kohat",
    hours: "06:00 AM - 06:00 PM",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    verified: true,
    description: "Scenic viewpoint with boating and picnic spots.",
    about: "Tanda Dam is one of KPK's most beautiful wetland sanctuaries, offering breathtaking views, boating facilities, and peaceful picnic spots. It is home to a variety of migratory birds and native wildlife, making it a must-visit destination for nature lovers."
  },
  {
    name: "National Tailors & Fashion",
    slug: "national-tailors",
    category: "Local Business",
    categorySlug: "local-business",
    subcategory: "Tailors & Fashion",
    rating: 4.4,
    reviews: 28,
    phone: "+92 922 515254",
    email: "nationaltailors@email.com",
    website: "www.nationaltailors.com",
    address: "Hangu Road Bypass, Kohat",
    hours: "10:00 AM - 08:00 PM",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80",
    verified: false,
    description: "Custom tailoring and traditional shalwar kameez stitching.",
    about: "National Tailors & Fashion specializes in bespoke tailoring services including suits, shalwar kameez, wedding wear, and casual fashion. With skilled master tailors and modern stitching techniques, we deliver perfectly fitted garments for men, women, and children."
  },
  {
    name: "Al-Noor Restaurant",
    slug: "al-noor-restaurant",
    category: "Food & Dining",
    categorySlug: "food-dining",
    subcategory: "Restaurants",
    rating: 4.7,
    reviews: 189,
    phone: "+92 333 1122334",
    email: "alnoor@restaurant.com",
    website: "www.alnoorrestaurant.com",
    address: "KDA Chowk, Kohat Cantt",
    hours: "11:00 AM - 11:00 PM",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    verified: true,
    description: "Family dining with authentic Pakistani cuisine.",
    about: "Al-Noor Restaurant serves the finest Pakistani and BBQ cuisine in Kohat. From sizzling chapli kababs to aromatic biryanis and freshly baked naans, every dish is prepared with authentic recipes and the freshest ingredients. Warm ambiance and friendly service make it a favorite for families."
  },
  {
    name: "City Medical Store",
    slug: "city-medical-store",
    category: "Local Business",
    categorySlug: "local-business",
    subcategory: "Pharmacies",
    rating: 4.5,
    reviews: 76,
    phone: "+92 335 9900112",
    email: "citymedical@email.com",
    website: "",
    address: "Main Bazar Chowk, Kohat",
    hours: "24 Hours",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
    verified: true,
    description: "24-hour pharmacy with all essential medicines available.",
    about: "City Medical Store is a trusted 24-hour pharmacy serving the Kohat community with genuine medicines, surgical supplies, and healthcare products. Our licensed pharmacists provide prescription dispensing, health consultations, and home delivery services."
  },
  {
    name: "Kohat Blood Donor Network",
    slug: "kohat-blood-donor",
    category: "Community",
    categorySlug: "community",
    subcategory: "Blood Donors",
    rating: 5.0,
    reviews: 45,
    phone: "+92 334 5566778",
    email: "blooddonor@kohatconnect.com",
    website: "",
    address: "Kohat Cantt, KPK",
    hours: "Emergency Service",
    image: "https://images.unsplash.com/photo-1615461066842-32561977e3d8?auto=format&fit=crop&w=800&q=80",
    verified: true,
    description: "Emergency blood donor network serving all of Kohat.",
    about: "Kohat Blood Donor Network is a community-driven initiative that connects blood donors with patients in need. Our registry includes voluntary donors across all blood types. In case of an emergency, we mobilize donors quickly to save lives."
  },
  {
    name: "Green Grocery Store",
    slug: "green-grocery-store",
    category: "Food & Dining",
    categorySlug: "food-dining",
    subcategory: "Dhabas & Street Food",
    rating: 4.3,
    reviews: 52,
    phone: "+92 331 4455667",
    email: "greengrocery@email.com",
    website: "",
    address: "Bazar-e-Mustafa, Kohat",
    hours: "07:00 AM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    verified: false,
    description: "Fresh farm-to-table vegetables and organic produce.",
    about: "Green Grocery Store brings fresh, organic, and farm-sourced vegetables and fruits directly to your neighborhood. We source directly from local farmers in Kohat and surrounding areas to ensure the highest quality produce at affordable prices."
  }
]

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ListingDetailPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug

  const listing = listingData.find(l => l.slug === slug)

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
                      <input
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
                    <textarea
                      required
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience with this listing..."
                      className="w-full bg-background border border-border rounded-xl p-3 text-xs focus:outline-none focus:border-primary/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-primary/10"
                  >
                    Submit Review
                  </button>
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
