"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Users, Search, ArrowRight } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const categories = ["All", "Festival", "Workshop", "Sports", "Expo", "Food", "Fitness", "Culture"]

const events = [
  { id: 1, title: "Kohat Annual Cultural Festival 2026", tag: "Festival", description: "Experience the vibrant heritage of Kohat with traditional folk music, local KPK cuisine, and artisan crafts at the Kohat Stadium.", date: "June 15–22, 2026", time: "10:00 AM – 10:00 PM", location: "Kohat Stadium, City Center", price: "Free", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80", slug: "kohat-festival" },
  { id: 2, title: "Miranzai Valley Hiking Expedition", tag: "Sports", description: "Explore the hidden scenic trails of Miranzai Valley with professional guides. A must-do adventure for hiking enthusiasts in KPK.", date: "Every Sunday", time: "6:00 AM", location: "Miranzai Valley, Kohat Range", price: "Free", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", slug: "hiking-miranzai" },
  { id: 3, title: "Winter Mega Sale at Kohat City Mall", tag: "Expo", description: "Get up to 60% off on winter collections from top brands. Exclusive discounts on clothing, footwear, and accessories.", date: "Dec 1–31, 2026", time: "11:00 AM – 9:00 PM", location: "Kohat City Mall, Main GT Road", price: "Free Entry", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80", slug: "winter-sale" },
  { id: 4, title: "Professional Bridal Makeup Workshop", tag: "Workshop", description: "Learn expert bridal makeup techniques from certified professionals. Includes practical training and certification.", date: "July 10, 2026", time: "10:00 AM – 4:00 PM", location: "Kohat Cultural Center, KDA", price: "Rs. 8,000", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80", slug: "makeup-workshop" },
  { id: 5, title: "Kohat Inter-District Cricket Championship", tag: "Sports", description: "Annual cricket tournament featuring top teams from across KPK. Prize pool of Rs. 500,000 and trophies.", date: "Aug 5–20, 2026", time: "8:00 AM – 6:00 PM", location: "Kohat Sports Complex", price: "Free Entry", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80", slug: "cricket-tournament" },
  { id: 6, title: "Tech Expo 2026 – Latest Gadgets & AI", tag: "Expo", description: "Explore cutting-edge technology, AI innovations, and exclusive discounts on laptops, mobiles, and accessories.", date: "Sep 18–20, 2026", time: "10:00 AM – 8:00 PM", location: "Kohat Expo Center, KDA", price: "Free Entry", image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=800&q=80", slug: "tech-expo" },
  { id: 7, title: "30-Day Fitness Transformation Challenge", tag: "Fitness", description: "Join Kohat's biggest fitness bootcamp with professional trainers, nutrition plans, and daily workouts.", date: "Starts Nov 1, 2026", time: "6:00 AM – 7:30 AM", location: "Elite Gym, Kohat Cantt", price: "Rs. 12,000", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80", slug: "fitness-bootcamp" },
  { id: 8, title: "Kohat Food Street – Ramadan Night Bazaar", tag: "Food", description: "Experience the best street food in Kohat with over 50 food stalls offering traditional KPK and Pakistani cuisine.", date: "Ramadan 2026", time: "7:00 PM – 2:00 AM", location: "Kohat Food Street, KDA", price: "Varies", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", slug: "ramadan-bazaar" },
  { id: 9, title: "Kohat Heritage Museum Grand Opening", tag: "Culture", description: "New museum showcasing Kohat's rich history, ancient artifacts, and cultural heritage spanning 2000 years.", date: "Oct 15, 2026", time: "9:00 AM – 5:00 PM", location: "Heritage Street, Old Kohat", price: "Rs. 100 Entry", image: "https://images.unsplash.com/photo-1566127992631-137a642a90d4?auto=format&fit=crop&w=800&q=80", slug: "museum-opening" },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")

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
