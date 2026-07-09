import React from 'react'
import { Store, ShieldCheck, Star, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getFeaturedListings } from '@/lib/data'

const BusinessDirectory = async () => {
  const listings = await getFeaturedListings(4)

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
            <Store className="w-6 h-6 text-primary" /> Verified Businesses
          </h2>
          <div className="flex gap-2">
             <Button variant="outline" className="rounded-full flex items-center gap-2">
                <Search className="w-4 h-4" /> Search
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {listings.length > 0 ? (
            listings.map((listing: any) => (
              <div key={listing.id} className="bg-card p-5 rounded-3xl border border-border flex items-center gap-4 hover:border-primary/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className='flex-1'>
                  <h4 className="font-bold text-sm leading-tight">{listing.title}</h4>
                  <p className="text-xs text-muted-foreground">{listing.category?.name || 'Business'}</p>
                  <div className="flex items-center gap-1 text-amber-500 mt-1">
                      <Star className="w-3 h-3 fill-amber-500" />
                      <span className="text-xs font-bold text-foreground">{listing.rating?.toFixed(1) || '4.5'}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center text-muted-foreground py-8">
              No verified businesses yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BusinessDirectory
