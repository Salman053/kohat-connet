"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { fetchNews } from '@/lib/news';
import NewsSection from '../shared/news';
import { buttonVariants } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { fallbackTrending, getTrendingItems } from '@/lib/data-fallback';
import type { TrendingItem } from '@/lib/data-fallback';

const popularSearches = [
  "best restaurant in kohat",
  "kohat jobs",
  "real estate in kohat",
  "best hospital in kohat",
  "kohat university",
  "best clothing store in kohat",
  "mobile repair in kohat"
];

export default function Trending() {
  const [items, setItems] = useState<TrendingItem[]>(fallbackTrending)
  const [activeTab, setActiveTab] = useState("All")
  const [newsItems, setNewsItems] = useState<any[]>([])

  useEffect(() => {
    getTrendingItems().then(setItems)
    fetchNews().then(setNewsItems).catch(() => setNewsItems([]))
  }, [])

  const tabs = ["All", ...new Set<string>(items.map((i) => i.tag))]

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

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as string)}>
          <TabsList className="flex-wrap">
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab} className="text-[10px] font-bold uppercase tracking-wider">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
                {(tab === "All" ? items : items.filter((i) => i.tag === tab)).slice(0, 8).map((item) => (
                  <Link href={item.href} key={item.id} className="group bg-card border border-border p-4 rounded-3xl flex gap-4 hover:border-primary/50 transition-colors">
                    <Image width={300} height={300} src={item.imageSrc} alt={item.imageAlt} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                    <div className='flex-1 min-w-0'>
                      <span className='text-[10px] font-black uppercase text-primary'>{item.tag}</span>
                      <h4 className='font-bold text-sm leading-tight mt-1'>{item.title}</h4>
                      <p className='text-xs text-muted-foreground mt-1 line-clamp-2'>{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-4.5 bg-muted/50 p-4 rounded-3xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Popular Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, i) => (
              <Link key={i} href={`/search?q=${encodeURIComponent(search)}`} className={cn(buttonVariants({ variant: "outline" }), "text-sm font-semibold gap-2")}>
                <Search className='w-3 h-3' /> {search}
              </Link>
            ))}
          </div>
        </div>
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

