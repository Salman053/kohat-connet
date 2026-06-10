import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'
import { site, footerLinks, categories } from '@/lib/site'

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-primary p-2 rounded-xl text-primary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                {site.name.split(' ')[0]}
                <span className="text-primary">{site.name.split(' ')[1]}</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {site.description}
            </p>
            {/* <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: site.facebookPage },
                { icon: Instagram, href: site.instagramHandle },
                { icon: Twitter, href: site.twitterPage },
                { icon: Youtube, href: site.youtubeChannel }
              ].map((social, idx) => (
                <Link 
                  key={idx} 
                  href={social.href || '#'} 
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4">
              {footerLinks.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-2 group">
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-xs">Popular Categories</h4>
            <ul className="space-y-4">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.name}>
                  <Link href={`/categories/${cat.slug}`} className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-2">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-xs">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">WhatsApp</div>
                  <div className="text-sm font-semibold">{site.watsappNumber}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Email</div>
                  <div className="text-sm font-semibold">{site.contactEmail}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Location</div>
                  <div className="text-sm font-semibold">Kohat, Khyber Pakhtunkhwa, Pakistan</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-muted-foreground text-xs font-medium">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-8">
            <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary text-xs font-medium transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary text-xs font-medium transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-primary text-xs font-medium transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
