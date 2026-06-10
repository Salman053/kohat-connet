import React from 'react'
import Link from 'next/link'
import { CardItem } from '../shared/Cards'
import NewsSection from '../shared/news'
import { fetchNews } from '@/lib/news'
import { site } from '@/lib/site'
import { ArrowRight, Search, TrendingUp } from 'lucide-react'

const trendingItems: CardItem[] = [
  {
    id: 1,
    title: "Kohat Annual Cultural Festival 2026",
    description: "Experience the vibrant heritage of Kohat with traditional folk music, local KPK cuisine, and artisan crafts at the Kohat Stadium.",
    imageSrc: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Crowds celebrating with traditional music and dance at the Kohat Annual Cultural Festival",
    tag: "Event",
    date: "June 15 - June 22, 2026",
    location: "Kohat Stadium, City Center",
    authorName: "Municipal Committee Kohat",
    authorLogo: "https://images.unsplash.com/photo-1599305090598-fe179d501c27?auto=format&fit=crop&w=100&q=80",
    href: "/events/kohat-festival"
  },
  {
    id: 2,
    title: "Luxury Lakeview Suites at Tanda Dam",
    description: "Enjoy premium accommodation with breathtaking views of Tanda Dam. Perfect for family retreats and nature lovers in Kohat.",
    imageSrc: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Luxury hotel suites overlooking the serene waters of Tanda Dam in Kohat",
    tag: "Stay",
    price: "Rs. 15,000/night",
    location: "Tanda Dam Resort, Kohat",
    authorName: "Dam View Resorts",
    authorLogo: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=100&q=80",
    href: "/listings/tanda-dam-resort"
  },
  {
    id: 3,
    title: "Authentic Shinwari Peshawari Karahi",
    description: "Taste the most famous Peshawari Karahi in Kohat, prepared with traditional spices and fresh local ingredients at KDA Market.",
    imageSrc: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Sizzling traditional Peshawari Karahi served in a traditional iron wok",
    tag: "Food",
    price: "From Rs. 1,200",
    location: "KDA Market, Kohat",
    authorName: "Shinwari Grill",
    authorLogo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=100&q=80",
    href: "/listings/shinwari-grill"
  },
  {
    id: 4,
    title: "Miranzai Valley Hiking Expedition",
    description: "Explore the hidden scenic trails of Miranzai Valley with professional guides. A must-do adventure for hiking enthusiasts in KPK.",
    imageSrc: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Hikers trekking through the lush green mountains of Miranzai Valley",
    tag: "Adventure",
    date: "Every Sunday",
    location: "Miranzai Valley, Kohat Range",
    authorName: "Kohat Adventure Club",
    authorLogo: "https://images.unsplash.com/photo-1501503060443-ef4ed87d00ba?auto=format&fit=crop&w=100&q=80",
    href: "/events/hiking-miranzai"
  }
];

const popularSearches = [
  "best restaurant in kohat",
  "kohat jobs",
  "real estate in kohat",
  "best hospital in kohat",
  "kohat university",
  "best clothing store in kohat",
  "mobile repair in kohat"
];

const Trending = async () => {
  const newsItems = await fetchNews();

  return (
    <>
      <section className="py-12 col-span-12 lg:col-span-8" aria-labelledby="trending-title">
        <div className="flex flex-col mb-8">
          <h2 id="trending-title" className="text-3xl font-bold tracking-tight text-foreground">
            Trending in Kohat
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Stay updated with the latest happenings, premium stays, and authentic experiences in the heart of Kohat, Khyber Pakhtunkhwa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingItems.map((item) => (
            <Link href={item.href} key={item.id} className="group bg-card border border-border p-4 rounded-3xl flex gap-4 hover:border-primary/50 transition-colors">
              <img src={item.imageSrc} alt={item.imageAlt} className="w-24 h-24 rounded-2xl object-cover" />
              <div className='flex-1'>
                <span className='text-[10px] font-black uppercase text-primary'>{item.tag}</span>
                <h4 className='font-bold text-sm leading-tight mt-1'>{item.title}</h4>
                <p className='text-xs text-muted-foreground mt-1 line-clamp-2'>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-muted/50 p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Popular Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, i) => (
              <Link key={i} href={`/search?q=${encodeURIComponent(search)}`} className="bg-background px-4 py-2 rounded-full text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 border border-border">
                <Search className='w-3 h-3'/> {search}
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <aside className="py-12 bg-background px-7 h-fit col-span-12 lg:col-span-4 " aria-labelledby="news-title">
        <div className="flex flex-col mb-6 lg:hidden">
          <h2 id="news-title-mobile" className="text-2xl font-bold tracking-tight text-foreground">
            Local Breaking News
          </h2>
        </div>
        <NewsSection items={newsItems.slice(0, 7)} />
      </aside>
    </>
  )
}

export default Trending
