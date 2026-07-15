"use client";

import { WordsPullUp } from "./words-pull-up";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchBox from "../shared/search-box";

export default function Hero() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden">
      {/* Background Collage (z-0 to z-20) */}

      {/* 4. CRITICAL FIX: Add z-30 here so text sits ON TOP of the overlay */}
      <div className="container mx-auto px-4 relative z-30">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="space-y-6 max-w-5xl text-center">
            <WordsPullUp
              text="Connecting the Heart of Kohat"
              className="text-2xl md:text-3xl  text-center font-extrabold tracking-tighter text-foreground"
            />
            <p className="text-muted-foreground text-sm  max-w-3xl mx-auto  slide-in-from-bottom-4 duration-1000 delay-700 fill-mode-both leading-relaxed">
              Find everything from local businesses and essential services to
              hidden historical gems in the soul of KPK.
            </p>
          </div>

          {/* Search Box */}
          <SearchBox />

          <div className="flex flex-wrap justify-center gap-6  slide-in-from-bottom-4 duration-1000 delay-[1200ms] fill-mode-both">
            <Link href="/explore">
              <Button variant="ghost" size="lg" className=" text-base font-bold bg-background/80 backdrop-blur-md border-white/20 ">
                Explore Categories
              </Button>
            </Link>
            <Link href="/request-listing">
              <Button size="lg" className=" text-base font-bold shadow-xl shadow-primary/20 transition-all">
                List Your Business
              </Button>
            </Link>
          </div>

          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20  duration-1000 delay-[1400ms] fill-mode-both">
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