"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Search } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { fallbackEvents, getEvents } from '@/lib/data-fallback'
import type { EventItem } from '@/lib/data-fallback'

const categories = ["All", "Festival", "Workshop", "Sports", "Expo", "Food", "Fitness", "Culture"]

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>(fallbackEvents)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => { getEvents().then(setEvents) }, [])

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <PageHeader
        title="Events in Kohat"
        subtitle="Discover festivals, workshops, sports tournaments, and cultural events happening across the city."
        bgImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="All">
            <TabsList className="flex-wrap mb-8">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
              ))}
            </TabsList>

            {categories.map((cat) => (
              <TabsContent key={cat} value={cat}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(cat === "All"
                    ? filteredEvents
                    : filteredEvents.filter((e) => e.tag === cat)
                  ).map((event) => (
                    <Link
                      key={event.id}
                      href={`/events/${event.slug}`}
                      className="group bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest">
                          {event.tag}
                        </span>
                        {event.price === "Free" || event.price === "Free Entry" ? (
                          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-green-500/90 text-white text-[10px] font-bold uppercase tracking-widest">
                            Free
                          </span>
                        ) : null}
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {event.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {event.location}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  )
}
