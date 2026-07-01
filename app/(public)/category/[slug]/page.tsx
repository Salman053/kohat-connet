"use client"

import React, { use } from 'react'
import { categories } from '@/lib/site'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Star, ShieldCheck, Mail, Globe } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

const getSampleBusinesses = (subName: string) => {
  return [
    {
      name: `Khyber ${subName} Center`,
      rating: 4.8,
      reviews: 140,
      phone: "+92 333 9876543",
      email: "contact@khyberlocal.com",
      website: "www.khyberlocal.com",
      address: "Main Bazar Road, Near Chowk, Kohat",
      desc: `Best quality ${subName.toLowerCase()} services in Kohat Cantt and surrounding areas. Highly experienced team, professional support, and affordable prices.`,
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: `Kohat Elite ${subName}`,
      rating: 4.6,
      reviews: 64,
      phone: "+92 334 1234567",
      email: "info@kohatelite.com",
      website: "www.kohatelite.com",
      address: "Phase 1, KDA, Kohat",
      desc: `Premium and reliable ${subName.toLowerCase()} providers, serving residential and commercial clients across Khyber Pakhtunkhwa.`,
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: `National ${subName} Hub`,
      rating: 4.4,
      reviews: 28,
      phone: "+92 922 515253",
      email: "support@nationalhub.com",
      website: "www.nationalhub.com",
      address: "Hangu Road Bypass, Kohat",
      desc: `Local shop specializing in ${subName.toLowerCase()}. Fast responses, friendly environment, and client satisfaction guaranteed.`,
      verified: false,
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
    }
  ]
}

export default function SubcategoryPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug

  let parentCategory: any = null
  let subcategory: any = null

  for (const cat of categories) {
    const found = cat.subcategories.find(sub => sub.slug === slug)
    if (found) {
      parentCategory = cat
      subcategory = found
      break
    }
  }

  if (!subcategory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <h1 className="text-3xl font-extrabold mb-2">Subcategory Not Found</h1>
        <p className="text-muted-foreground text-sm mb-6">The page you are trying to view does not exist.</p>
        <Link href="/categories" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
          Back to Categories
        </Link>
      </div>
    )
  }

  const businesses = getSampleBusinesses(subcategory.name)

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title={subcategory.name}
        subtitle={subcategory.description}
        tag="SUBCATEGORY"
        align="left"
        backLink={{ href: `/categories/${parentCategory.slug}`, label: `Back to ${parentCategory.name}` }}
      />

      {/* Main Listing Section */}
      <div className="container mx-auto px-6 mt-12">
        <h2 className="text-lg md:text-xl font-bold tracking-tight text-foreground mb-6">
          Verified Providers &amp; Establishments ({businesses.length})
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {businesses.map((biz, idx) => (
            <div
              key={idx}
              className="bg-card rounded-3xl border border-border p-6 md:p-8 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center"
            >
              <div className="relative w-full lg:w-48 h-40 shrink-0 rounded-2xl overflow-hidden border">
                <Image
                  src={biz.imageUrl}
                  alt={biz.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-4 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg md:text-xl font-black text-foreground hover:text-primary transition-colors">
                      {biz.name}
                    </h3>
                    {biz.verified && (
                      <span className="inline-flex items-center gap-0.5 bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-500/20">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-full text-xs font-bold text-yellow-600">
                    <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                    <span>{biz.rating} ({biz.reviews} reviews)</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {biz.desc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-muted-foreground pt-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span>{biz.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <span>{biz.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <span>{biz.email}</span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-auto shrink-0 flex flex-row lg:flex-col gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border/80 lg:pl-8">
                <a
                  href={`tel:${biz.phone}`}
                  className="flex-1 lg:flex-none text-center bg-primary text-primary-foreground font-bold text-xs py-3 px-6 rounded-xl hover:bg-primary/95 transition-all shadow-md shadow-primary/10"
                >
                  Call Now
                </a>
                <a
                  href={`https://${biz.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 lg:flex-none text-center bg-card border border-border font-bold text-xs py-3 px-6 rounded-xl hover:bg-accent transition-all flex items-center justify-center gap-1"
                >
                  <Globe className="h-3.5 w-3.5" /> Visit Site
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
