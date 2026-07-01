import React from 'react'
import Link from 'next/link'
import { categories } from '@/lib/site'
import Image from 'next/image'
import PageHeader from '@/components/shared/page-header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | Kohat Connect',
  description: 'Browse professional services, utility repair, health specialists, and tutors in Kohat.',
}

export default function ServicesPage() {
  // Find only the services category or list subcategories under services category
  const servicesCategory = categories.find(c => c.slug === 'services')
  const subcategories = servicesCategory ? servicesCategory.subcategories : []

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title="PROFESSIONAL SERVICES"
        subtitle="Find certified electricians, expert plumbers, home repairs, health coordinators, and skill tutors in Kohat."
        tag="On-Demand Support"
      />

      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subcategories.map((sub) => (
            <Link
              key={sub.slug}
              href={`/services/${sub.slug}`}
              className="block bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/45 hover:shadow-xl transition-all duration-300 group"
            >
              {sub.imageUrl && (
                <div className="relative h-56 w-full">
                  <Image
                    src={sub.imageUrl}
                    alt={sub.name}
                    width={500}
                    height={350}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-35 flex items-end p-6">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{sub.name}</h3>
                  </div>
                </div>
              )}
              <p className="p-6 text-xs md:text-sm text-muted-foreground leading-relaxed">
                {sub.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
