"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Star, MapPin, Store, Tag, ArrowRight } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { fallbackShops, getShops } from '@/lib/data-fallback'
import type { ShopItem } from '@/lib/data-fallback'

export default function ShopsPage() {
  const [shops, setShops] = useState<ShopItem[]>(fallbackShops)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Electronics", "Clothing", "Home", "Groceries"]

  useEffect(() => { getShops().then(setShops) }, [])

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          shop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          shop.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || shop.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title="KOHAT MARKETPLACE SHOPS"
        subtitle="Explore the local markets, popular shops, custom tailors, and electronics sellers in Kohat."
        tag="Marketplace Directory"
      >
        <div className="relative max-w-xl mx-auto mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
          <Input
            type="text"
            placeholder="Search shops by name, category, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 py-4 h-auto text-sm rounded-2xl shadow-lg"
          />
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Filter */}
          <div className="w-full lg:w-60 shrink-0">
            <div className="bg-card border border-border p-6 rounded-3xl space-y-4">
              <h3 className="font-extrabold text-sm flex items-center gap-2">
                <Store className="h-4 w-4 text-primary" /> Shop Categories
              </h3>
              <div className="space-y-1 z-50">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "ghost"}
                    onClick={() => {console.log(cat); setSelectedCategory(cat)}}
                    className="w-full justify-start text-xs font-semibold rounded-xl px-3"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            {filteredShops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredShops.map((shop, idx) => (
                  <div
                    key={idx}
                    className="bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={shop.image}
                          alt={shop.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-background/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-border/40 text-[9px] font-extrabold uppercase text-primary flex items-center gap-1">
                          <Tag className="h-3 w-3" /> {shop.category}
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-extrabold text-base text-foreground group-hover:text-primary transition-colors">
                            {shop.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs font-bold text-yellow-600 bg-yellow-500/10 px-2 py-0.5 rounded">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            <span>{shop.rating}</span>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {shop.description}
                        </p>

                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-semibold">
                          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{shop.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-border/40 mt-auto flex justify-between items-center bg-muted/5">
                      <span className="text-[10px] text-muted-foreground font-semibold">
                        {shop.reviews} Reviews
                      </span>
                      <Link
                        href={`/shops/${shop.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-black text-primary hover:underline"
                      >
                        Visit Shop <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card p-12 text-center rounded-3xl border border-border">
                <Store className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-bold text-base mb-1">No shops found</h3>
                <p className="text-xs text-muted-foreground">
                  Try adjusting your search filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
