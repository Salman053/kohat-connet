import React from 'react'
import Link from 'next/link'
import { Store, ArrowRight, Star, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

const shops = [
  {
    id: 1,
    name: "Al-Noor Electronics",
    category: "Electronics",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1740803292814-13d2e35924c3?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The biggest electronics hub in Kohat. Branded appliances and smartphones.",
    featured: true,
    href: "/shops/al-noor"
  },
  {
    id: 2,
    name: "Kohat Fashion House",
    category: "Clothing",
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80",
    description: "Traditional and modern clothing. Specialist in bridal wear.",
    href: "/shops/fashion-house"
  },
  {
    id: 3,
    name: "City Furniture Mart",
    category: "Home",
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    description: "Quality wood furniture crafted by master artisans.",
    href: "/shops/city-furniture"
  },
  {
    id: 4,
    name: "Green Grocery",
    category: "Groceries",
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    description: "Fresh farm-to-table vegetables and fruits.",
    href: "/shops/green-grocery"
  }
]

const Shops = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
              KOHAT <span className="text-primary">MARKETPLACE</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore local shops and boutiques. Support the vendors that make our community unique.
            </p>
          </div>
          <Link href="/shops" className="group flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-colors">
            Browse All Shops <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Featured Shop - Large Bento Item */}
          <Link 
            href={shops[0].href}
            className="md:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-3xl bg-muted aspect-square lg:aspect-auto"
          >
            <img 
              src={shops[0].image} 
              alt={shops[0].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest">
                  Featured
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-bold text-white">{shops[0].rating}</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{shops[0].name}</h3>
              <p className="text-white/80 text-sm max-w-md line-clamp-2 mb-4">
                {shops[0].description}
              </p>
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                Visit Shop <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Regular Shops */}
          {shops.slice(1).map((shop) => (
            <Link 
              key={shop.id}
              href={shop.href}
              className="group relative overflow-hidden rounded-3xl bg-card border border-border h-[300px]"
            >
              <img 
                src={shop.image} 
                alt={shop.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-transparent to-transparent">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{shop.category}</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold text-white">{shop.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{shop.name}</h3>
              </div>
            </Link>
          ))}

          {/* Special Action Block */}
          <div className="lg:col-span-2 p-8 rounded-3xl bg-primary text-primary-foreground flex flex-col justify-between group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShoppingBag className="w-32 h-32 rotate-12" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Are you a shop owner?</h3>
              <p className="text-primary-foreground/80 mb-6 max-w-xs">
                Reach thousands of local customers in Kohat. List your business today and grow with us.
              </p>
            </div>
            <Link 
              href="/register-business"
              className="relative z-10 w-fit px-6 py-3 bg-white text-primary rounded-xl font-black text-sm uppercase tracking-tighter hover:bg-white/90 transition-all flex items-center gap-2 group/btn"
            >
              Get Started Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Shops
