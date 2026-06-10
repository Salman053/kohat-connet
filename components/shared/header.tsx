"use client"

import Link from 'next/link'
import { useState } from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent } from './navigation-menu'
import { navigationLinks, categories, site } from '@/lib/site'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openCategories, setOpenCategories] = useState(false)
  const [openServices, setOpenServices] = useState(false)
  const [openProfessionals, setOpenProfessionals] = useState(false)

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
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className=" mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="font-bold text-sm">
                {site.name}
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {navigationLinks.slice(0, 6).map((link) => {
                    // Special handling for Categories link
                    if (link.name === "Categories") {
                      return (
                        <NavigationMenuItem key={link.name} value="categories">
                          <NavigationMenuTrigger className='text-xs' value="categories">
                            Categories
                          </NavigationMenuTrigger>
                          <NavigationMenuContent value="categories">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 w-[800px] max-w-[90vw] bg-popover rounded-md border shadow-lg">
                              {categories.map((category) => (
                                <div key={category.name} className="group">
                                  <Link
                                    href={`/categories/${category.slug}`}
                                    className="block p-3 rounded-lg hover:bg-accent transition-colors"
                                  >
                                    <div className="font-semibold text-foreground mb-1 text-sm">
                                      {category.name}
                                    </div>
                                    <div className="text-[10px] text-muted-foreground mb-2 line-clamp-2">
                                      {category.description}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {category.subcategories.slice(0, 3).map((sub, idx) => (
                                        <span
                                          key={sub.name}
                                          className="text-[10px] text-muted-foreground hover:text-primary"
                                        >
                                          {sub.name}
                                          {idx < Math.min(category.subcategories.length, 3) - 1 && ","}
                                        </span>
                                      ))}
                                      {category.subcategories.length > 3 && (
                                        <span className="text-[10px] text-primary">
                                          +{category.subcategories.length - 3} more
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </div>
                            <div className="border-t p-3 bg-muted/30 rounded-b-md">
                              <Link
                                href="/categories"
                                className="text-xs font-medium text-primary hover:underline flex justify-center"
                              >
                                View All Categories & Services →
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
                          <NavigationMenuTrigger className='text-xs' value="services">
                            Services
                          </NavigationMenuTrigger>
                          <NavigationMenuContent value="services">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-[400px] bg-popover rounded-md border shadow-lg">
                              {servicesCategory?.subcategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={`/category/${sub.slug}`}
                                  className="block p-2 rounded-lg hover:bg-accent transition-colors"
                                >
                                  <div className="font-semibold text-foreground text-xs">
                                    {sub.name}
                                  </div>
                                  <div className="text-[10px] text-muted-foreground line-clamp-1">
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
                          <NavigationMenuTrigger className='text-xs' value="professionals">
                            Professionals
                          </NavigationMenuTrigger>
                          <NavigationMenuContent value="professionals">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-[400px] bg-popover rounded-md border shadow-lg">
                              {businessCategory?.subcategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={`/category/${sub.slug}`}
                                  className="block p-2 rounded-lg hover:bg-accent transition-colors"
                                >
                                  <div className="font-semibold text-foreground text-xs">
                                    {sub.name}
                                  </div>
                                  <div className="text-[10px] text-muted-foreground line-clamp-1">
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
                          <NavigationMenuLink  href={link.href} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                            {link.name}
                          </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground z-50"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Desktop Sign In Button */}
            <div className="hidden lg:flex items-center space-x-2">
              <button className="inline-flex items-center justify-center rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-4 py-2">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Slide-in Drawer */}
      <div 
        className={cn(
          "lg:hidden fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleMobileMenu}
      >
        <div 
          className={cn(
            "fixed inset-y-0 right-0 w-full max-w-[280px] bg-background border-l shadow-2xl transition-transform duration-300 ease-in-out flex flex-col",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <span className="font-bold text-sm">{site.name}</span>
            <button onClick={toggleMobileMenu} className="p-2 -mr-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            {navigationLinks.map((link) => {
              if (link.name === "Categories") {
                return (
                  <div key={link.name} className="space-y-1">
                    <button
                      onClick={toggleCategories}
                      className="flex items-center justify-between w-full py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <span>Categories</span>
                      <span className={cn("transition-transform duration-200", openCategories ? "rotate-180" : "")}>
                        ▼
                      </span>
                    </button>
                    
                    <div className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openCategories ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    )}>
                      <div className="pl-4 py-2 space-y-4 border-l ml-1">
                        {categories.map((category) => (
                          <div key={category.name} className="space-y-2">
                            <Link
                              href={`/categories/${category.slug}`}
                              className="block font-semibold text-xs text-foreground hover:text-primary transition-colors"
                              onClick={toggleMobileMenu}
                            >
                              {category.name}
                            </Link>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1 pl-1">
                              {category.subcategories.slice(0, 4).map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={`/category/${sub.slug}`}
                                  className="text-[10px] text-muted-foreground hover:text-primary transition-colors truncate"
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
                      className="flex items-center justify-between w-full py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <span>Services</span>
                      <span className={cn("transition-transform duration-200", openServices ? "rotate-180" : "")}>
                        ▼
                      </span>
                    </button>
                    <div className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openServices ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    )}>
                      <div className="pl-4 py-2 space-y-2 border-l ml-1">
                        {servicesCategory?.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            href={`/category/${sub.slug}`}
                            className="block py-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                            onClick={toggleMobileMenu}
                          >
                            {sub.name}
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
                      className="flex items-center justify-between w-full py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <span>Professionals</span>
                      <span className={cn("transition-transform duration-200", openProfessionals ? "rotate-180" : "")}>
                        ▼
                      </span>
                    </button>
                    <div className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openProfessionals ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    )}>
                      <div className="pl-4 py-2 space-y-2 border-l ml-1">
                        {businessCategory?.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            href={`/category/${sub.slug}`}
                            className="block py-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                            onClick={toggleMobileMenu}
                          >
                            {sub.name}
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
                  className="block py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors border-b border-border/40 last:border-0"
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>
          
          <div className="p-4 border-t bg-muted/10">
            <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header