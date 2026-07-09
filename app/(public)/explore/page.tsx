"use client"

import React, { useState, useEffect } from 'react'
import { categories } from '@/lib/site'
import { Search, MapPin, Star, Filter, ArrowUpRight, Grid, List } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PageHeader from '@/components/shared/page-header'
import { Input } from '@/components/ui/input'
import { fallbackExploreItems, getExploreItems } from '@/lib/data-fallback'
import type { ExploreItem } from '@/lib/data-fallback'

export default function Explore() {
  const [items, setItems] = useState<ExploreItem[]>(fallbackExploreItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => { getExploreItems().then(setItems) }, [])

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background pb-16">
      <PageHeader
        title="EXPLORE THE BEST OF KOHAT"
        subtitle="Find historical locations, top-rated local eateries, school academies, utility services, and more."
      >
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search places, restaurants, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-primary/50 focus:outline-none shadow-lg transition-all text-sm"
          />
        </div>
      </PageHeader>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="bg-card p-6 rounded-3xl border border-border">
              <h2 className="font-bold text-base mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" /> Filter by Category
              </h2>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === "All"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === cat.name
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats or Tips */}
            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
              <h3 className="font-bold text-xs text-primary uppercase tracking-wider mb-2">Did You Know?</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Kohat is famous for its Chapli Kabab, the historic Garrison Fort built by the British, and the beautiful Tanda Dam lake which is a sanctuary for migratory birds.
              </p>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1 space-y-6">
            {/* Toolbar */}
            <div className="flex justify-between items-center bg-card px-6 py-4 rounded-2xl border border-border">
              <span className="text-xs font-medium text-muted-foreground">
                Showing {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg border transition-colors ${
                    viewMode === 'grid' ? "bg-primary/10 border-primary/20 text-primary" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg border transition-colors ${
                    viewMode === 'list' ? "bg-primary/10 border-primary/20 text-primary" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Listings */}
            {filteredItems.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                  : "space-y-4"
              }>
                {filteredItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`bg-card rounded-3xl border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden group flex ${
                      viewMode === 'list' ? 'flex-col md:flex-row h-auto md:h-48' : 'flex-col'
                    }`}
                  >
                    {/* Image Area */}
                    <div className={`relative ${
                      viewMode === 'list' ? 'w-full md:w-60 h-48 md:h-full shrink-0' : 'h-48 w-full'
                    }`}>
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-border/40 text-[9px] font-extrabold uppercase text-primary">
                        {item.category}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">
                            {item.subcategory}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-[11px] font-bold">{item.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-extrabold text-base text-foreground mb-2 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mb-4">
                          <MapPin className="h-3 w-3 text-primary shrink-0" />
                          {item.address}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-border/60">
                        <span className="text-[10px] text-muted-foreground font-semibold">
                          {item.reviews} Reviews
                        </span>
                        <Link
                          href={`/categories/${item.slug}`}
                          className="inline-flex items-center gap-1 text-[11px] font-black text-primary hover:underline"
                        >
                          View Details <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card p-12 text-center rounded-3xl border border-border">
                <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-bold text-base mb-1">No items found</h3>
                <p className="text-xs text-muted-foreground">
                  Try tweaking your search keywords or choosing a different category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}