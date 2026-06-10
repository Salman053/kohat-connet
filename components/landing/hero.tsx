"use client";

import { WordsPullUp } from "./words-pull-up";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import { HeroCollage } from "./hero-collage";

export default function Hero() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden">
      {/* Background Collage (z-0 to z-20) */}
      {/* <HeroCollage /> */}

      {/* 4. CRITICAL FIX: Add z-30 here so text sits ON TOP of the overlay */}
      <div className="container mx-auto px-4 relative z-30">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="space-y-6 max-w-5xl text-center">
            <WordsPullUp
              text="Connecting the Heart of Kohat"
              className="text-2xl md:text-3xl lg:text-4xl text-center font-extrabold tracking-tighter text-foreground"
            />
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700 fill-mode-both leading-relaxed">
              Find everything from local businesses and essential services to 
              hidden historical gems in the soul of KPK.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full max-w-4xl p-2 bg-background/40 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col md:flex-row gap-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000 fill-mode-both">
            <div className="flex-1 flex items-center px-4 py-4 gap-4 bg-background/20 border border-white/10">
              <Search className="h-6 w-6 text-primary" />
              <input 
                type="text" 
                placeholder="What are you looking for?" 
                className="w-full bg-transparent outline-none text-base font-semibold placeholder:text-muted-foreground/60"
              />
            </div>
            <div className="h-px md:h-10 w-full md:w-px bg-white/10 my-auto hidden md:block" />
            <div className="flex-1 flex items-center px-4 py-4 gap-4 bg-background/20 border border-white/10">
              <MapPin className="h-6 w-6 text-primary" />
              <input 
                type="text" 
                placeholder="KDA, City, or Cantt" 
                className="w-full bg-transparent outline-none text-base font-semibold placeholder:text-muted-foreground/60"
              />
            </div>
            <Button size="sm" className="h-auto  px-5 font-bold text-sm shadow-xl shadow-primary/20 transition-all">
              Search Now
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-[1200ms] fill-mode-both">
            <Link href="/explore">
              <Button variant="ghost" size="lg" className="px-10 h-14 text-base font-bold bg-background/80 backdrop-blur-md border-white/20 ">
                Explore Categories
              </Button>
            </Link>
            <Link href="/request-listing">
              <Button size="lg" className="px-10 h-14 text-base font-bold shadow-xl shadow-primary/20 transition-all">
                List Your Business
              </Button>
            </Link>
          </div>

          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 animate-in fade-in duration-1000 delay-[1400ms] fill-mode-both">
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-4xl font-black text-primary group-hover:scale-110 transition-transform">500+</span>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Businesses</span>
            </div>
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-4xl font-black text-primary group-hover:scale-110 transition-transform">50+</span>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Services</span>
            </div>
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-4xl font-black text-primary group-hover:scale-110 transition-transform">20+</span>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Tour Sites</span>
            </div>
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-4xl font-black text-primary group-hover:scale-110 transition-transform">10k+</span>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Monthly Users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}