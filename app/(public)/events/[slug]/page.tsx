"use client";
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const events = [
  { id: 1, title: "Kohat Annual Cultural Festival 2026", tag: "Festival", description: "Experience the vibrant heritage of Kohat with traditional folk music, local KPK cuisine, and artisan crafts at the Kohat Stadium. The festival brings together over 50 vendors, live performances from renowned artists, and interactive cultural workshops for all ages. Don't miss the grand finale fireworks display.", date: "June 15–22, 2026", time: "10:00 AM – 10:00 PM", location: "Kohat Stadium, City Center", price: "Free", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80", slug: "kohat-festival", organizer: "Municipal Committee Kohat", phone: "+92 335 1234567" },
  { id: 2, title: "Miranzai Valley Hiking Expedition", tag: "Sports", description: "Explore the hidden scenic trails of Miranzai Valley with professional guides. A must-do adventure for hiking enthusiasts in KPK. The expedition covers 12 km of breathtaking terrain through pine forests, streams, and panoramic viewpoints.", date: "Every Sunday", time: "6:00 AM", location: "Miranzai Valley, Kohat Range", price: "Free", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", slug: "hiking-miranzai", organizer: "Kohat Adventure Club", phone: "+92 335 7654321" },
  { id: 3, title: "Winter Mega Sale at Kohat City Mall", tag: "Expo", description: "Get up to 60% off on winter collections from top brands. Exclusive discounts on clothing, footwear, and accessories. Special clearance section with up to 80% off on selected items.", date: "Dec 1–31, 2026", time: "11:00 AM – 9:00 PM", location: "Kohat City Mall, Main GT Road", price: "Free Entry", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80", slug: "winter-sale", organizer: "Kohat Mall Management", phone: "" },
  { id: 4, title: "Professional Bridal Makeup Workshop", tag: "Workshop", description: "Learn expert bridal makeup techniques from certified professionals. Includes practical training, certification, and a starter kit. Covers bridal looks for both traditional and contemporary styles.", date: "July 10, 2026", time: "10:00 AM – 4:00 PM", location: "Kohat Cultural Center, KDA", price: "Rs. 8,000", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80", slug: "makeup-workshop", organizer: "Glamour Academy Kohat", phone: "+92 335 2345678" },
  { id: 5, title: "Kohat Inter-District Cricket Championship", tag: "Sports", description: "Annual cricket tournament featuring top teams from across KPK. Prize pool of Rs. 500,000 and trophies. 20-over format with knockout stages. Live commentary and refreshments available.", date: "Aug 5–20, 2026", time: "8:00 AM – 6:00 PM", location: "Kohat Sports Complex", price: "Free Entry", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80", slug: "cricket-tournament", organizer: "Kohat Sports Board", phone: "" },
  { id: 6, title: "Tech Expo 2026 – Latest Gadgets & AI", tag: "Expo", description: "Explore cutting-edge technology, AI innovations, and exclusive discounts on laptops, mobiles, and accessories. Live demos, keynote speeches from tech leaders, and hands-on workshops.", date: "Sep 18–20, 2026", time: "10:00 AM – 8:00 PM", location: "Kohat Expo Center, KDA", price: "Free Entry", image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=800&q=80", slug: "tech-expo", organizer: "Tech Connect Pakistan", phone: "" },
  { id: 7, title: "30-Day Fitness Transformation Challenge", tag: "Fitness", description: "Join Kohat's biggest fitness bootcamp with professional trainers, nutrition plans, and daily workouts. Includes before/after assessment, meal plans, and a supportive community.", date: "Starts Nov 1, 2026", time: "6:00 AM – 7:30 AM", location: "Elite Gym, Kohat Cantt", price: "Rs. 12,000", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80", slug: "fitness-bootcamp", organizer: "FitKohat", phone: "+92 335 3456789" },
  { id: 8, title: "Kohat Food Street – Ramadan Night Bazaar", tag: "Food", description: "Experience the best street food in Kohat with over 50 food stalls offering traditional KPK and Pakistani cuisine. Live cooking demonstrations, musical performances, and family-friendly activities.", date: "Ramadan 2026", time: "7:00 PM – 2:00 AM", location: "Kohat Food Street, KDA", price: "Varies", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", slug: "ramadan-bazaar", organizer: "Kohat Food Lovers", phone: "" },
  { id: 9, title: "Kohat Heritage Museum Grand Opening", tag: "Culture", description: "New museum showcasing Kohat's rich history, ancient artifacts, and cultural heritage spanning 2000 years. Featuring rare artifacts, interactive exhibits, and guided tours.", date: "Oct 15, 2026", time: "9:00 AM – 5:00 PM", location: "Heritage Street, Old Kohat", price: "Rs. 100 Entry", image: "https://images.unsplash.com/photo-1566127992631-137a642a90d4?auto=format&fit=crop&w=800&q=80", slug: "museum-opening", organizer: "Kohat Heritage Society", phone: "" },
]

export default function EventDetailPage() {
  const params = useParams()
  const event = events.find((e) => e.slug === params.slug)

  if (!event) {
    return (
      <div className="min-h-[60dvh] flex flex-col items-center justify-center bg-background px-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">Event not found</h1>
        <p className="text-muted-foreground mb-6">This event might have been removed or the link is incorrect.</p>
        <Link href="/events">
          <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Browse Events</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <section className="relative h-[50dvh] min-h-[320px]">
        <Image src={event.image} alt={event.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <Link href="/events" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-semibold mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Events
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest">
                {event.tag}
              </span>
              {(event.price === "Free" || event.price === "Free Entry") && (
                <span className="px-2.5 py-1 rounded-full bg-green-500/90 text-white text-[10px] font-bold uppercase tracking-widest">
                  Free
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white max-w-3xl">{event.title}</h1>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-foreground mb-4">About This Event</h2>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 h-fit">
              <h3 className="font-bold text-foreground mb-4">Event Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Date</p>
                    <p className="text-sm font-semibold text-foreground">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Time</p>
                    <p className="text-sm font-semibold text-foreground">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Location</p>
                    <p className="text-sm font-semibold text-foreground">{event.location}</p>
                  </div>
                </div>
                {event.organizer && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground font-medium">Organized by</p>
                    <p className="text-sm font-semibold text-foreground">{event.organizer}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-2">
                {event.phone && (
                  <Button variant="default" className="w-full gap-2" nativeButton={false} render={<a href={`tel:${event.phone}`} />}>
                    Contact Organizer
                  </Button>
                )}
                <Button variant="outline" className="w-full gap-2">
                  <Share2 className="w-4 h-4" /> Share Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
