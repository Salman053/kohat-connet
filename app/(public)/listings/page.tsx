"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { categories } from '@/lib/site'
import { Search, MapPin, Phone, Star, ShieldCheck, LayoutGrid, List } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'

interface ListingItem {
  name: string
  slug: string
  category: string
  categorySlug: string
  subcategory: string
  rating: number
  reviews: number
  phone: string
  address: string
  image: string
  verified: boolean
  description: string
}

const allListings: ListingItem[] = [
  {
    name: "Khyber Electronics Center",
    slug: "khyber-electronics",
    category: "Local Business",
    categorySlug: "local-business",
    subcategory: "Hardware & Electronics",
    rating: 4.8,
    reviews: 140,
    phone: "+92 333 9876543",
    address: "Main Bazar Road, Near Chowk, Kohat",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    verified: true,
    description: "Best quality electronics and hardware services in Kohat Cantt."
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
    address: "Phase 1, KDA, Kohat",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    verified: true,
    description: "Premium salon services for men and women in Kohat."
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
    address: "Tanda Dam Road, Kohat",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    verified: true,
    description: "Scenic viewpoint with boating and picnic spots."
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
    address: "Hangu Road Bypass, Kohat",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80",
    verified: false,
    description: "Custom tailoring and traditional shalwar kameez stitching."
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
    address: "KDA Chowk, Kohat Cantt",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    verified: true,
    description: "Family dining with authentic Pakistani cuisine."
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
    address: "Main Bazar Chowk, Kohat",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
    verified: true,
    description: "24-hour pharmacy with all essential medicines available."
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
    address: "Kohat Cantt, KPK",
    image: "https://images.unsplash.com/photo-1615461066842-32561977e3d8?auto=format&fit=crop&w=800&q=80",
    verified: true,
    description: "Emergency blood donor network serving all of Kohat."
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
    address: "Bazar-e-Mustafa, Kohat",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    verified: false,
    description: "Fresh farm-to-table vegetables and organic produce."
  }
]

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const uniqueCategories = ["All", ...new Set(allListings.map(l => l.category))]

  const filtered = allListings.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title="BUSINESS DIRECTORY"
        subtitle="Browse all registered businesses, services, and listings on Kohat Connect."
        tag="All Listings"
      />

      <div className="container mx-auto px-6 mt-10">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search listings by name, category, or keyword..."
              className="w-full bg-card border border-border rounded-2xl pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-card border border-border rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-primary/50"
            >
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="flex bg-card border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-xs text-muted-foreground mb-6 font-semibold">
          {filtered.length} listing{filtered.length !== 1 ? "s" : ""} found
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </p>

        {/* Grid View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <Link
                key={item.slug}
                href={`/listing/${item.slug}`}
                className="bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.verified && (
                      <span className="bg-green-500/90 backdrop-blur-sm text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-block mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="font-bold text-yellow-600">{item.rating}</span>
                      <span className="text-[10px]">({item.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">{item.address}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{item.phone}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filtered.map((item) => (
              <Link
                key={item.slug}
                href={`/listing/${item.slug}`}
                className="bg-card rounded-3xl border border-border p-5 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group flex flex-col md:flex-row gap-5 items-start"
              >
                <div className="relative w-full md:w-40 h-32 shrink-0 rounded-2xl overflow-hidden border">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[9px] font-extrabold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    {item.verified && (
                      <span className="text-[9px] font-bold text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1 mb-3">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="font-bold text-yellow-600">{item.rating}</span> ({item.reviews})
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" /> {item.address}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-primary" /> {item.phone}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-foreground mb-2">No listings found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter to find what you are looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
