import React from 'react'
import Link from 'next/link'
import { Store, ArrowRight, Star, ShoppingBag, TrendingUp, Users, Zap, CheckCircle2, Sparkles, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const categories = ["All", "Electronics", "Clothing", "Home", "Groceries", "Sports", "Beauty"];

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

const benefits = [
  { icon: Users, text: "Reach 10,000+ monthly local customers" },
  { icon: TrendingUp, text: "Grow your business with verified leads" },
  { icon: Zap, text: "Free listing with premium upgrade options" },
];

const Shops = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
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

        {/* Quick Filter Bar */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, i) => (
            <button key={cat} className={cn("px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all", i === 0 ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-muted-foreground")}>
              {cat}
            </button>
          ))}
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
        </div>

        {/* ============================================ */}
        {/* BUSINESS OWNER CTA SECTION - REPLACES PLACEHOLDER */}
        {/* ============================================ */}
        <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/70 to-primary/80 border border-primary/20 shadow-2xl shadow-primary/20">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-10 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute bottom-16 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-10 w-1 h-1 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12 lg:p-16">
            {/* Left: Content */}
            <div className="flex flex-col justify-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-white">
                  For Business Owners
                </span>
              </div>

              {/* Headline */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] mb-4">
                Grow Your Business
                <br />
                <span className="text-white/90">With Kohat's #1 Platform</span>
              </h3>

              {/* Subheading */}
              <p className="text-white/80 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
                Join hundreds of local entrepreneurs already reaching thousands of customers every month. List your business in minutes — it's free to start.
              </p>

              {/* Benefits list */}
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-white/95">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm md:text-base font-medium">{benefit.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/request-listing">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-bold px-8 h-12 shadow-xl shadow-black/20 group"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    List Your Business
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/partner">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white font-bold px-8 h-12"
                  >
                    Partner With Us
                  </Button>
                </Link>
              </div>

              {/* Trust indicator */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-primary bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center"
                    >
                      <Store className="w-3.5 h-3.5 text-white" />
                    </div>
                  ))}
                </div>
                <div className="text-white/80 text-xs">
                  <span className="font-bold text-white">500+</span> businesses already onboard
                </div>
              </div>
            </div>

            {/* Right: Visual Card Stack */}
            <div className="relative flex items-center justify-center min-h-[320px] lg:min-h-[400px]">
              {/* Background decorative card */}
              <div className="absolute top-8 right-8 w-56 h-72 md:w-64 md:h-80 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 rotate-6 hidden sm:block" />
              
              {/* Main showcase card */}
              <div className="relative w-64 md:w-72 bg-white rounded-2xl shadow-2xl overflow-hidden -rotate-3 hover:rotate-0 transition-transform duration-500">
                {/* Card header */}
                <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/40 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=80"
                    alt="Business showcase"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-green-500 text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    Live
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-foreground text-sm">Your Business</h4>
                      <p className="text-xs text-muted-foreground">Featured Listing</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-[10px] font-bold">5.0</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
                    <div className="text-center">
                      <div className="text-xs font-black text-primary">2.4k</div>
                      <div className="text-[9px] text-muted-foreground uppercase">Views</div>
                    </div>
                    <div className="text-center border-x border-border">
                      <div className="text-xs font-black text-primary">184</div>
                      <div className="text-[9px] text-muted-foreground uppercase">Leads</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-black text-primary">+47%</div>
                      <div className="text-[9px] text-muted-foreground uppercase">Growth</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification card */}
              <div className="absolute bottom-4 left-0 md:-left-4 bg-white rounded-xl shadow-xl p-3 flex items-center gap-2 -rotate-6 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">New customer</p>
                  <p className="text-xs font-bold text-foreground">+12 this week</p>
                </div>
              </div>

              {/* Floating review card */}
              <div className="absolute top-0 left-4 md:left-0 bg-white rounded-xl shadow-xl p-3 rotate-6 hidden md:flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-foreground">4.9 avg</span>
              </div>
            </div>
          </div>
        </div>
        {/* ============================================ */}
        {/* END OF CTA SECTION */}
        {/* ============================================ */}
      </div>
    </section>
  )
}

export default Shops