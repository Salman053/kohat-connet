"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Home, Search, ArrowLeft, Building2, 
  Calendar, Newspaper, Heart, Compass
} from 'lucide-react'
import PageHeader from '@/components/shared/page-header'
import { Input } from '@/components/ui/input'

const quickLinks = [
  { label: "Home", href: "/", icon: Home, desc: "Back to homepage" },
  { label: "Explore", href: "/explore", icon: Compass, desc: "Discover Kohat" },
  { label: "Listings", href: "/listings", icon: Building2, desc: "Business directory" },
  { label: "Blog", href: "/blog", icon: Newspaper, desc: "Local stories" },
  { label: "Events", href: "/events", icon: Calendar, desc: "Upcoming events" },
  { label: "Blood Donors", href: "/blood-donors", icon: Heart, desc: "Save lives" },
]

export default function NotFound() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/listings?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title="PAGE NOT FOUND"
        subtitle="Oops! The page you are looking for does not exist or has been moved."
        tag="Error 404"
      />

      <div className="container mx-auto px-6 mt-10">
        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto mb-14"
        >
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search listings, businesses, services..."
              className="w-full rounded-2xl pl-11 py-3.5 h-auto text-sm"
            />
          </form>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Or browse the sections below
          </p>
        </motion.div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {quickLinks.map((link, idx) => {
            const Icon = link.icon
            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-4 bg-card border border-border rounded-3xl p-5 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                      {link.label}
                    </h3>
                    <p className="text-[10px] text-muted-foreground">
                      {link.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Back to Home CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-14"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-2xl px-8 py-4 font-bold text-sm transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Homepage
          </Link>
          <p className="text-xs text-muted-foreground mt-4">
            If you believe this is an error,{" "}
            <Link href="/contact" className="text-primary hover:underline font-semibold">
              contact our support team
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
