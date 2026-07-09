"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'
import { fallbackBlogPosts, getBlogPosts } from '@/lib/data-fallback'
import type { BlogPost } from '@/lib/data-fallback'

const filterCategories = ["All", "Tourism", "Food & Dining", "Nature", "Education"]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackBlogPosts)
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => { getBlogPosts().then(setPosts) }, [])

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title="THE KOHAT CONNECT BLOG"
        subtitle="Discover community stories, local guides, travel advice, and updates from the heart of Kohat."
        tag="Local Publications"
      />

      {/* Category Tabs */}
      <div className="container mx-auto px-6 mt-10">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground hover:text-foreground border-border hover:border-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post, idx) => (
            <article
              key={idx}
              className="bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-md border border-border/40 px-2.5 py-1 rounded-full text-[9px] font-extrabold text-primary uppercase">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" /> {post.author}
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 md:px-8 md:pb-8 pt-0 border-t border-border/40 mt-auto flex justify-between items-center bg-muted/5">
                <span className="text-[10px] text-muted-foreground font-semibold">
                  {post.readTime}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-[11px] font-black text-primary hover:underline group-hover:translate-x-1 transition-transform"
                >
                  Read Full Article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
