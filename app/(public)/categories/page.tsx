import React from 'react'
import Link from 'next/link'
import { categories } from '@/lib/site'
import Image from 'next/image'
import PageHeader from '@/components/shared/page-header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories | Kohat Connect',
  description: 'Browse all business, service, and local directories categories on Kohat Connect.',
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title="ALL CATEGORIES"
        subtitle="Browse and discover local businesses, essential services, tourism spots, and community hubs in Kohat."
        tag="Directory Index"
      />

      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="block bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/45 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  width={500}
                  height={350}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-35 flex items-end p-6">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">{cat.name}</h3>
                </div>
              </div>
              <p className="p-6 text-xs md:text-sm text-muted-foreground leading-relaxed">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
