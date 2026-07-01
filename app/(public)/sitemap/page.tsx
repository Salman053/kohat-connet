import React from 'react'
import Link from 'next/link'
import { navigationLinks, footerLinks, categories } from '@/lib/site'
import { Network, Home, Compass, Info, Award } from 'lucide-react'

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Network className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
            Site Directory Map
          </h1>
        </div>

        <div className="bg-card border border-border p-8 rounded-3xl space-y-10 text-sm">
          {/* Main Links */}
          <div className="space-y-4">
            <h2 className="font-extrabold text-base text-foreground flex items-center gap-2">
              <Home className="h-4.5 w-4.5 text-primary" /> Main Navigation Pages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {navigationLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 border rounded-xl hover:border-primary/50 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Directory Category Map */}
          <div className="space-y-4 border-t pt-8">
            <h2 className="font-extrabold text-base text-foreground flex items-center gap-2">
              <Compass className="h-4.5 w-4.5 text-primary" /> Directory Category &amp; Subcategory Mapping
            </h2>
            <div className="space-y-6">
              {categories.map((cat) => (
                <div key={cat.slug} className="space-y-2">
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="font-bold text-foreground hover:text-primary text-xs underline uppercase"
                  >
                    {cat.name} Category
                  </Link>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pl-4">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/category/${sub.slug}`}
                        className="text-[11px] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                      >
                        • {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="space-y-4 border-t pt-8">
            <h2 className="font-extrabold text-base text-foreground flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-primary" /> Legal &amp; Support Resources
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {footerLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 border rounded-xl hover:border-primary/50 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
