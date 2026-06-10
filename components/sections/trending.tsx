import Link from 'next/link'
import { CardItem } from '../shared/Cards'
import NewsSection from '../shared/news'
import { fetchNews } from '@/lib/news'
import { Search, TrendingUp } from 'lucide-react';
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
    title: "Winter Mega Sale at Kohat City Mall",
    description: "Get up to 60% off on winter collections from top brands. Exclusive discounts on clothing, footwear, and accessories.",
    imageSrc: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Shopping mall interior with winter sale decorations and discount signs",
    tag: "Shopping",
    price: "Up to 60% off",
    date: "Dec 1 - Dec 31, 2026",
    location: "Kohat City Mall, Main GT Road",
    authorName: "Kohat Mall Management",
    authorLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80",
    href: "/events/winter-sale"
  },
  {
    id: 6,
    title: "Professional Bridal Makeup Workshop",
    description: "Learn expert bridal makeup techniques from certified professionals. Includes practical training and certification.",
    imageSrc: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Makeup artist demonstrating bridal makeup techniques on a client",
    tag: "Workshop",
    price: "Rs. 8,000",
    date: "July 10, 2026",
    location: "Kohat Cultural Center, KDA",
    authorName: "Glamour Academy Kohat",
    authorLogo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
    href: "/events/makeup-workshop"
  },
  {
    id: 7,
    title: "Kandar Valley Camping & Bonfire Night",
    description: "Experience an unforgettable night under the stars with bonfire, BBQ dinner, and morning hiking trails.",
    imageSrc: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Camping tents set up near a campfire in Kandar Valley mountains",
    tag: "Adventure",
    price: "Rs. 5,500/person",
    location: "Kandar Valley, Kohat",
    authorName: "Camp Kohat Adventures",
    authorLogo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    href: "/listings/kandar-valley"
  },
  {
    id: 8,
    title: "Special Sindhi Biryani - Chef's Special",
    description: "Famous Sindhi Biryani with aromatic spices, tender chicken, and premium basmati rice. Served with raita and salad.",
    imageSrc: "https://foodaazz.com/wp-content/uploads/2023/03/Sindhi-Chicken-Biryani.jpeg",
    imageAlt: "Delicious Sindhi Biryani served in traditional copper pot",
    tag: "Food",
    price: "From Rs. 350",
    location: "City Center, Kohat Cantt",
    authorName: "Biryani House Kohat",
    authorLogo: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=100&q=80",
    href: "/listings/biryani-house"
  },
  {
    id: 9,
    title: "Kohat Inter-District Cricket Championship",
    description: "Annual cricket tournament featuring top teams from across KPK. Prize pool of Rs. 500,000 and trophies.",
    imageSrc: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Cricket batsman hitting a six during a match at Kohat Sports Complex",
    tag: "Sports",
    price: "Free Entry",
    date: "August 5 - August 20, 2026",
    location: "Kohat Sports Complex",
    authorName: "Kohat Sports Board",
    authorLogo: "https://images.unsplash.com/photo-1533953723667-793b6b3f2ea1?auto=format&fit=crop&w=100&q=80",
    href: "/events/cricket-tournament"
  },
  {
    id: 10,
    title: "Tech Expo 2026 - Latest Gadgets & AI",
    description: "Explore cutting-edge technology, AI innovations, and exclusive discounts on laptops, mobiles, and accessories.",
    imageSrc: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern tech expo with AI demonstrations and latest gadgets on display",
    tag: "Expo",
    price: "Free Entry",
    date: "September 18 - September 20, 2026",
    location: "Kohat Expo Center, KDA",
    authorName: "Tech Connect Pakistan",
    authorLogo: "https://images.unsplash.com/photo-1569770303414-3e9dcf8f49cf?auto=format&fit=crop&w=100&q=80",
    href: "/events/tech-expo"
  },
  {
    id: 11,
    title: "30-Day Fitness Transformation Challenge",
    description: "Join Kohat's biggest fitness bootcamp with professional trainers, nutrition plans, and daily workouts.",
    imageSrc: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Group of people doing fitness training at Elite Gym Kohat",
    tag: "Fitness",
    price: "Rs. 12,000",
    date: "Starts Nov 1, 2026",
    location: "Elite Gym, Kohat Cantt",
    authorName: "FitKohat",
    authorLogo: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=100&q=80",
    href: "/events/fitness-bootcamp"
  },
  {
    id: 12,
    title: "Handcrafted Kohati Chappal Exhibition",
    description: "Discover authentic handcrafted leather chappals made by Kohat's master artisans. Custom sizes available.",
    imageSrc: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Traditional handcrafted Kohati leather chappals displayed on wooden shelf",
    tag: "Shopping",
    price: "Rs. 3,500 - Rs. 5,000",
    location: "Main Bazaar, Kohat City",
    authorName: "Artisan Leather Kohat",
    authorLogo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    href: "/listings/kohat-chappal"
  },
  {
    id: 13,
    title: "Kohat Food Street - Ramadan Night Bazaar",
    description: "Experience the best street food in Kohat with over 50 food stalls offering traditional KPK and Pakistani cuisine.",
    imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Vibrant food street in Kohat with crowded stalls and delicious food",
    tag: "Food",
    price: "Varies",
    date: "Ramadan 2026",
    location: "Kohat Food Street, KDA",
    authorName: "Kohat Food Lovers",
    authorLogo: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=100&q=80",
    href: "/events/ramadan-bazaar"
  },
  {
    id: 14,
    title: "Kohat Heritage Museum Grand Opening",
    description: "New museum showcasing Kohat's rich history, ancient artifacts, and cultural heritage spanning 2000 years.",
    imageSrc: "https://images.unsplash.com/photo-1566127992631-137a642a90d4?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Ancient artifacts and historical displays at Kohat Heritage Museum",
    tag: "Culture",
    price: "Rs. 100 Entry",
    date: "Opening October 15, 2026",
    location: "Heritage Street, Old Kohat",
    authorName: "Kohat Heritage Society",
    authorLogo: "https://images.unsplash.com/photo-1599305090598-fe179d501c27?auto=format&fit=crop&w=100&q=80",
    href: "/events/museum-opening"
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
          {trendingItems.slice(0,8).map((item) => (
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

        <div className="mt-4.5 bg-muted/50 p-4 rounded-3xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Popular Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, i) => (
              <Link key={i} href={`/search?q=${encodeURIComponent(search)}`} className="bg-background px-4 py-2 rounded-full text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 border border-border">
                <Search className='w-3 h-3' /> {search}
              </Link>
            ))}
          </div>
        </div>


        {/* // here i want to add  */}


      </section>

      <aside className="py-12 bg-background h-fit col-span-12 lg:col-span-4 " aria-labelledby="news-title">
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
