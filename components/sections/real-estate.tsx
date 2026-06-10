import React from 'react'
import { Building, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

const properties = [
  { id: 1, title: "Modern Villa", location: "KDA Phase 1", price: "Rs. 2.5 Crore", specs: "4 Bed, 3 Bath" },
  { id: 2, title: "Commercial Plot", location: "Main Bazaar", price: "Rs. 80 Lac", specs: "2000 Sq Ft" },
  { id: 3, title: "Furnished Apartment", location: "University Road", price: "Rs. 45,000/mo", specs: "2 Bed, 2 Bath" },
]

const RealEstateHub = () => {
  return (
    <section className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
            <Building className="w-6 h-6 text-primary" /> Property & Real Estate
          </h2>
          <Button variant="outline" className="">View All Properties</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map(prop => (
            <div key={prop.id} className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col hover:border-primary/50 transition-all">
              <h3 className="text-lg font-bold mb-1">{prop.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {prop.location}
              </p>
              <div className="text-xl font-black text-foreground mb-4">{prop.price}</div>
              <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground mb-6 bg-muted/50 p-3 rounded-xl">
                {prop.specs}
              </div>
              <Button variant="secondary" className="w-full  mt-auto">View Details</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RealEstateHub
