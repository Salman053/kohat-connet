"use client";
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fallbackEventDetails, getEventBySlug } from '@/lib/data-fallback'
import type { EventDetail } from '@/lib/data-fallback'

export default function EventDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const initialEvent = fallbackEventDetails.find(e => e.slug === slug) || null
  const [event, setEvent] = useState<EventDetail | null>(initialEvent)

  useEffect(() => { if (slug) getEventBySlug(slug).then(setEvent) }, [slug])

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
