"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent } from './navigation-menu'
import { navigationLinks, categories, site } from '@/lib/site'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSwitcher from './language-switcher'
import Logo from './logo'
import { Button } from '../ui/button'

const announcements = [
  "Welcome to Kohat Connect - Your local city guide",
  "New: Check out the 'Services' section for home repairs",
  "List your business today for FREE!",
  "Explore historical sites in Kohat with our 'Tourism' guide"
]

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openCategories, setOpenCategories] = useState(false)
  const [openServices, setOpenServices] = useState(false)
  const [openProfessionals, setOpenProfessionals] = useState(false)
  const [announcementIndex, setAnnouncementIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setOpenCategories(false)
    setOpenServices(false)
    setOpenProfessionals(false)
  }

  const toggleCategories = () => {
    setOpenCategories(!openCategories)
  }

  return (
    <>
      {/* Top Bar - Announcement Carousel & Social */}
      <div className="bg-primary overflow-hidden text-primary-foreground text-[10px] md:text-xs py-1.5 md:py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <Phone className="h-3 w-3" />
              <span>{site.watsappNumber}</span>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <Mail className="h-3 w-3" />
              <span>{site.contactEmail}</span>
            </div>
          </div>

          <div className="relative h-5 overflow-hidden flex-1 flex items-center justify-center max-w-[300px] md:max-w-md mx-4">
            <AnimatePresence initial={false}>
              <motion.div
                key={announcementIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="absolute whitespace-nowrap font-medium text-center w-full"
              >
                {announcements[announcementIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* <div className="flex items-center gap-3"> */}
          {/* <Link href={site.facebookPage} className="hover:opacity-80"><Facebook className="h-3 w-3" /></Link> */}
          {/* <Link href={site.instagramHandle} className="hover:opacity-80"><Instagram className="h-3 w-3" /></Link> */}
          {/* <Link href={site.twitterPage} className="hover:opacity-80"><Twitter className="h-3 w-3" /></Link> */}
          {/* </div> */}
        </div>
      </div>

      <nav className={cn(
        "sticky mx-auto  top-0 z-50 w-full b transition-all duration-300 ",
        scrolled
          ? "bg-background/80 backdrop-blur-xl h-14"
          : "bg-background h-16 md:h-20"
      )}>
        {/* Animated Background Gradient Line */}

        <div className=" bg-transparent mx-auto px-7 h-full">
          <div className="flex h-full items-center justify-between">
            {/* Logo */}
            <Logo variant="header" showTagline />

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {navigationLinks.slice(0, 6).map((link) => {
                    // Special handling for Categories link
                    if (link.name === "Categories") {
                      return (
                        <NavigationMenuItem key={link.name} value="categories">
                          <NavigationMenuTrigger className='text-[11px] bg-transparent font-semibold' value="categories">
                            Categories
                          </NavigationMenuTrigger>
                          <NavigationMenuContent value="categories">
                            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-3 p-5 w-[800px] max-w-[90vw] bg-popover rounded-xl border shadow-2xl">
                              {categories.map((category) => (
                                <div key={category.name} className="group/cat">
                                  <Link
                                    href={`/categories/${category.slug}`}
                                    className="block p-2.5 rounded-lg hover:bg-accent transition-all hover:translate-x-1"
                                  >
                                    <div className="font-bold text-foreground mb-1 text-xs group-hover/cat:text-primary">
                                      {category.name}
                                    </div>
                                    <div className="text-[10px]  mb-2 line-clamp-1">
                                      {category.description}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {category.subcategories.slice(0, 3).map((sub, idx) => (
                                        <span
                                          key={sub.name}
                                          className="text-[9px] "
                                        >
                                          {sub.name}
                                          {idx < Math.min(category.subcategories.length, 3) - 1 && " • "}
                                        </span>
                                      ))}
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </div>
                            <div className="border-t p-3 bg-muted/90 mix-blend-color-dodge rounded-b-xl flex justify-between items-center px-6">
                              <span className="text-[10px]  italic">Find what you need in Kohat</span>
                              <Link
                                href="/categories"
                                className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                              >
                                View All Categories <X className="h-3 w-3 rotate-[-135deg]" />
                              </Link>
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      )
                    }

                    // Special handling for Services link
                    if (link.name === "Services") {
                      const servicesCategory = categories.find(c => c.name === "Services");
                      return (
                        <NavigationMenuItem key={link.name} value="services">
                          <NavigationMenuTrigger className='text-[11px] bg-transparent font-semibold' value="services">
                            Services
                          </NavigationMenuTrigger>
                          <NavigationMenuContent value="services">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 w-[450px] bg-popover rounded-xl border shadow-2xl">
                              {servicesCategory?.subcategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={`/services/${sub.slug}`}
                                  className="flex flex-col p-2.5 rounded-lg hover:bg-accent transition-all group/sub"
                                >
                                  <div className="font-bold text-foreground text-[11px] group-hover/sub:text-primary">
                                    {sub.name}
                                  </div>
                                  <div className="text-[9px]  line-clamp-1">
                                    {sub.description}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      )
                    }

                    // Special handling for Professionals link
                    if (link.name === "Professionals") {
                      const businessCategory = categories.find(c => c.name === "Local Business");
                      return (
                        <NavigationMenuItem key={link.name} value="professionals">
                          <NavigationMenuTrigger className='text-[11px] bg-transparent font-semibold' value="professionals">
                            Professionals
                          </NavigationMenuTrigger>
                          <NavigationMenuContent value="professionals">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 w-[450px] bg-popover rounded-xl border shadow-2xl">
                              {businessCategory?.subcategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={`/category/${sub.slug}`}
                                  className="flex flex-col p-2.5 rounded-lg hover:bg-accent transition-all group/sub"
                                >
                                  <div className="font-bold text-foreground text-[11px] group-hover/sub:text-primary">
                                    {sub.name}
                                  </div>
                                  <div className="text-[9px]  line-clamp-1">
                                    {sub.description}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      )
                    }

                    // Regular links
                    return (
                      <NavigationMenuItem key={link.name}>
                        <NavigationMenuLink href={link.href} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-[11px] font-semibold transition-all hover:text-primary">
                          {link.name}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center space-x-2">
                <LanguageSwitcher />
                <Link href="/request-listing">
                  <Button variant="outline" size="sm" className="text-[10px] md:text-xs h-8 md:h-9 px-4">
                    List Business
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button size="sm" className="text-[10px] md:text-xs h-8 md:h-9 px-4">
                    Sign In
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant={'ghost'}
               aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={toggleMobileMenu}
                className="lg:hidden inline-flex items-center justify-center rounded-lg p-1.5 py-4  "
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Slide-in Drawer */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-[100] transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={toggleMobileMenu} />
        <div
          className={cn(
            "fixed inset-y-0 right-0 w-full max-w-[320px] bg-background border-l shadow-2xl transition-transform duration-300 ease-in-out flex flex-col",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-16 md:h-20 items-center justify-between px-6 border-b">
            <Logo variant="minimal" />
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button variant="outline" size="icon-xs" aria-label="Close menu" onClick={toggleMobileMenu}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
            {navigationLinks.map((link) => {
              if (link.name === "Categories") {
                return (
                  <div key={link.name} className="space-y-1">
                    <button
                      onClick={toggleCategories}
                      className="flex items-center justify-between w-full py-3 text-sm font-bold text-foreground hover:text-primary transition-colors border-b border-border/40"
                    >
                      <span>Categories</span>
                      <X className={cn("h-3 w-3 transition-transform duration-300 rotate-[-45deg]", openCategories ? "rotate-0" : "")} />
                    </button>

                    <div className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out bg-muted/20 rounded-xl",
                      openCategories ? "max-h-[2000px] opacity-100 py-2" : "max-h-0 opacity-0"
                    )}>
                      <div className="px-4 space-y-4">
                        {categories.map((category) => (
                          <div key={category.name} className="space-y-2">
                            <Link
                              href={`/categories/${category.slug}`}
                              className="block font-bold text-[11px] text-foreground hover:text-primary transition-colors"
                              onClick={toggleMobileMenu}
                            >
                              {category.name}
                            </Link>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1 pl-2 border-l-2 ml-1">
                              {category.subcategories.slice(0, 4).map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={`/category/${sub.slug}`}
                                  className="text-[10px]  hover:text-primary transition-colors truncate"
                                  onClick={toggleMobileMenu}
                                >
                                  • {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              if (link.name === "Services") {
                const servicesCategory = categories.find(c => c.name === "Services");
                return (
                  <div key={link.name} className="space-y-1">
                    <button
                      onClick={() => setOpenServices(!openServices)}
                      className="flex items-center justify-between w-full py-3 text-sm font-bold text-foreground hover:text-primary transition-colors border-b border-border/40"
                    >
                      <span>Services</span>
                      <X className={cn("h-3 w-3 transition-transform duration-300 rotate-[-45deg]", openServices ? "rotate-0" : "")} />
                    </button>
                    <div className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out bg-muted/20 rounded-xl",
                      openServices ? "max-h-[1000px] opacity-100 py-2" : "max-h-0 opacity-0"
                    )}>
                      <div className="px-4 space-y-1.5">
                        {servicesCategory?.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            href={`/category/${sub.slug}`}
                            className="block py-1.5 text-[11px] font-medium  hover:text-primary transition-colors"
                            onClick={toggleMobileMenu}
                          >
                            • {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              if (link.name === "Professionals") {
                const businessCategory = categories.find(c => c.name === "Local Business");
                return (
                  <div key={link.name} className="space-y-1">
                    <button
                      onClick={() => setOpenProfessionals(!openProfessionals)}
                      className="flex items-center justify-between w-full py-3 text-sm font-bold text-foreground hover:text-primary transition-colors border-b border-border/40"
                    >
                      <span>Professionals</span>
                      <X className={cn("h-3 w-3 transition-transform duration-300 rotate-[-45deg]", openProfessionals ? "rotate-0" : "")} />
                    </button>
                    <div className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out bg-muted/20 rounded-xl",
                      openProfessionals ? "max-h-[1000px] opacity-100 py-2" : "max-h-0 opacity-0"
                    )}>
                      <div className="px-4 space-y-1.5">
                        {businessCategory?.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            href={`/category/${sub.slug}`}
                            className="block py-1.5 text-[11px] font-medium  hover:text-primary transition-colors"
                            onClick={toggleMobileMenu}
                          >
                            • {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-3 text-sm font-bold text-foreground hover:text-primary transition-colors border-b border-border/40 last:border-0"
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className="p-6 border-t bg-muted/30 space-y-3">
            <Link href="/auth/signin" className="block" onClick={toggleMobileMenu}>
              <Button className="w-full h-12 text-sm">
                Sign In to Your Account
              </Button>
            </Link>
            <Link href="/request-listing" className="block" onClick={toggleMobileMenu}>
              <Button variant="outline" className="w-full h-12 text-sm">
                Add Your Business
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header