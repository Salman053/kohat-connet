"use client"

import React, { use } from 'react'
import { categories } from '@/lib/site'
import Link from 'next/link'
import { Layers, Bookmark, ArrowRight } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'

interface PageProps {
  params: Promise<{
    category: string
  }>
}

export default function CategoryPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const categorySlug = resolvedParams.category

  const category = categories.find(c => c.slug === categorySlug)

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <h1 className="text-3xl font-extrabold mb-2">Category Not Found</h1>
        <p className="text-muted-foreground text-sm mb-6">The category you are looking for does not exist.</p>
        <Link href="/categories" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
          Back to Categories
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title={category.name}
        subtitle={category.description}
        bgImage={category.imageUrl}
        backLink={{ href: '/categories', label: 'Categories' }}
      />

      {/* Subcategories List */}
      <div className="container mx-auto px-6 mt-12">
        <div className="flex items-center gap-2 mb-8">
          <Layers className="h-5 w-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-black tracking-tighter text-foreground">
            EXPLORE SUBCATEGORIES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.subcategories.map((sub) => (
            <div
              key={sub.slug}
              className="bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="p-6">
                <span className="text-[9px] font-extrabold uppercase text-primary bg-primary/10 px-2.5 py-0.5 rounded-full inline-block mb-3">
                  {category.name}
                </span>
                <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">
                  {sub.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {sub.description}
                </p>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-border/40 mt-auto flex justify-between items-center">
                <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                  <Bookmark className="h-3 w-3" /> Active Listings
                </span>
                <Link
                  href={`/category/${sub.slug}`}
                  className="inline-flex items-center gap-1 text-[11px] font-black text-primary hover:underline group-hover:translate-x-1 transition-transform"
                >
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}