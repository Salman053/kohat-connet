import React from 'react'
import { BadgeInfo } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getActiveAdvertisements } from '@/lib/data'
import { AdvertisementInterface } from '@/types'
import Image from 'next/image'

const PromotedListings = async () => {
  const ads = await getActiveAdvertisements('featured', 3)

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
            <BadgeInfo className="w-6 h-6 text-primary" /> Sponsored & Promoted
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ads.length > 0 ? (
            ads.map((ad:AdvertisementInterface) => (
              <div key={ad.id} className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col hover:border-primary/50 transition-all">
                <span className="text-[10px] font-black uppercase text-primary bg-primary/10 px-2 py-1 rounded-full self-start mb-3">{ad.ad_type}</span>
                <h3 className="text-lg font-bold mb-1">{ad.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{ad.description}</p>
                {ad.image_url && (
                  <Image width={200} height={200} src={ad.image_url} alt={ad.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                )}
                <Button variant="outline" className="w-full mt-auto">View Listing</Button>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-muted-foreground py-8">
              No sponsored listings yet. Contact us to promote your business!
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PromotedListings
