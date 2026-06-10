import React from 'react'
import { Tag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const deals = [
  { id: 1, title: "20% OFF on all Pizza", shop: "Kohat Pizza Hut", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Buy 1 Get 1 Free", shop: "Fashion Hub", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Free Oil Change", shop: "Auto Care Center", image: "https://images.unsplash.com/photo-1594870420799-d8205466d3a9?auto=format&fit=crop&w=800&q=80" },
]

const DealsBanner = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map(deal => (
            <div key={deal.id} className="relative group rounded-3xl overflow-hidden h-64 border border-border">
              <Image src={deal.image} alt={deal.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                  <Tag className="w-4 h-4" /> Limited Offer
                </div>
                <h3 className="text-white text-2xl font-black tracking-tighter leading-tight mb-1">{deal.title}</h3>
                <p className="text-white/80 text-sm mb-4">{deal.shop}</p>
                <Button size="sm" className="w-fit rounded-full bg-white text-black hover:bg-white/90">
                  Claim Deal <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DealsBanner
