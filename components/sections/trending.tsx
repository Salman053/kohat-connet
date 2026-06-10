import React from 'react'
import { CardsCarousel, CardItem } from '../shared/Cards'
import NewsSection, { NewsItem } from '../shared/news'
import { fetchNews } from '@/lib/news'
import { site } from '@/lib/site'

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
  },
  {
    id: 5,
    title: "Traditional Handmade Kohat Chappal",
    description: "Purchase authentic, high-quality leather Kohat Chappals handcrafted by local master artisans in the Main Bazaar.",
    imageSrc: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Detailed view of handcrafted traditional leather Kohat Chappals",
    tag: "Shopping",
    price: "Rs. 3,500",
    location: "Main Bazaar, Kohat",
    authorName: "Artisan Leather Crafts",
    authorLogo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    href: "/listings/kohat-chappal"
  }
];

const Trending = async () => {
  const newsItems = await fetchNews();

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Trending Events and Places in Kohat",
    "description": "Discover the most popular cultural events, dining spots, and travel destinations in Kohat, KPK.",
    "itemListElement": trendingItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": item.tag === 'Event' ? 'Event' : 'LocalBusiness',
        "name": item.title,
        "description": item.description,
        "image": item.imageSrc,
        "url": `${site.url}${item.href}`,
        ...(item.tag === 'Event' ? {
          "startDate": "2026-06-15", // Ideal to have actual date objects
          "location": {
            "@type": "Place",
            "name": item.location,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kohat",
              "addressRegion": "KPK",
              "addressCountry": "PK"
            }
          }
        } : {})
      }
    }))
  };

  return (
    <>
      {/* Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-12 px-7 col-span-12 lg:col-span-8" aria-labelledby="trending-title">
        <div className="mx-auto px-4">
          <div className="flex flex-col mb-8">
            <h2 id="trending-title" className="text-3xl font-bold tracking-tight text-foreground">
              Trending in Kohat
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Stay updated with the latest happenings, premium stays, and authentic experiences in the heart of Kohat, Khyber Pakhtunkhwa.
            </p>
          </div>

          <CardsCarousel items={trendingItems} />
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
