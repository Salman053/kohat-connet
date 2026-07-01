import React from 'react'
import { BadgeInfo, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ads = [
  { id: 1, title: "Best Marble Supplier", company: "Kohat Marble & Granite", type: "Promoted", rating: 4.9 },
  { id: 2, title: "Expert Car Mechanic", company: "Al-Hamd Auto Garage", type: "Featured", rating: 4.8 },
  { id: 3, title: "Top-Rated Furniture", company: "City Modern Furniture", type: "Promoted", rating: 4.7 },
]

const PromotedListings = () => {
  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
            <BadgeInfo className="w-6 h-6 text-primary" /> Sponsored & Promoted
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ads.map(ad => (
            <div key={ad.id} className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col hover:border-primary/50 transition-all">
              <span className="text-[10px] font-black uppercase text-primary bg-primary/10 px-2 py-1 rounded-full self-start mb-3">{ad.type}</span>
              <h3 className="text-lg font-bold mb-1">{ad.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{ad.company}</p>
              <div className="flex items-center gap-1 text-amber-500 mb-6">
                <Star className="w-4 h-4 fill-amber-500" />
                <span className="text-sm font-bold text-foreground">{ad.rating}</span>
              </div>
              <Button variant="outline" className="w-full  mt-auto">View Listing</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromotedListings
