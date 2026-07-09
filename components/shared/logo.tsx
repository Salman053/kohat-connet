"use client"

import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { site } from '@/lib/site'

interface LogoProps {
  variant?: 'header' | 'footer' | 'minimal'
  showTagline?: boolean
  className?: string
}

// Premium easing curve (similar to Vercel/Linear)
const premiumEase = [0.25, 1, 0.5, 1] as const;

export default function Logo({ variant = 'header', showTagline = false, className }: LogoProps) {
  const isMinimal = variant === 'minimal'
  const isFooter = variant === 'footer'

  const [firstWord, secondWord] = site.name.split(' ')

  // Refined sizing based on variant
  const markSize = isFooter ? "h-10 w-10" : isMinimal ? "h-8 w-8" : "h-8 w-8"
  const iconSize = isFooter ? "h-5 w-5" : "h-4 w-4"
  const markRadius = isFooter ? "rounded-2xl" : "rounded-xl"
  
  const titleSize = isFooter ? "text-xl" : isMinimal ? "text-lg" : "text-base"
  const taglineSize = isFooter ? "text-[8px]" : "text-[9px]"

  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center gap-2.5 group w-fit select-none",
        className
      )}
    >
      {/* --- The Mark --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: premiumEase }}
        whileHover={{
          scale: 1.05,
          transition: { type: "spring", stiffness: 400, damping: 30 },
        }}
        className={cn(
          "relative shrink-0 flex items-center justify-center",
          markSize,
          markRadius,
          "bg-primary text-primary-foreground",
          "shadow-sm ring-1 ring-inset ring-black/5", // Subtle inset ring for depth
          "transition-all duration-300",
          "group-hover:shadow-md group-hover:shadow-primary/20 group-hover:ring-black/10"
        )}
      >
        <motion.div
          whileHover={{ rotate: 12 }} // Subtle, professional rotation on hover
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <MapPin 
            className={iconSize} 
            strokeWidth={2.25} 
          />
        </motion.div>
      </motion.div>

      {/* --- The Wordmark --- */}
      {!isMinimal && (
        <motion.div 
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: premiumEase }}
          className="flex flex-col"
        >
          <div className="flex items-baseline  gap-[3px] leading-none">
            <span className={cn(
              "font-bold tracking-tight text-foreground", 
              titleSize
            )}>
              {firstWord}
            </span>
            <span className={cn(
              "font-bold tracking-tight text-primary", 
              titleSize
            )}>
              {secondWord}
            </span>
          </div>
          
          {(showTagline || isFooter) && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: premiumEase }}
              className={cn(
                "font-medium tracking-[0.18em] uppercase text-muted-foreground/80",
                taglineSize,
                isFooter ? "mt-0.5" : "mt-0.5"
              )}
            >
              Connect • Discover • Grow
            </motion.span>
          )}
        </motion.div>
      )}

      {/* --- Minimal Variant --- */}
      {isMinimal && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: premiumEase }}
          className="flex items-baseline gap-[3px] leading-none"
        >
          <span className={cn("font-bold tracking-tight text-foreground", titleSize)}>
            {firstWord}
          </span>
          <span className={cn("font-bold tracking-tight text-primary", titleSize)}>
            {secondWord}
          </span>
        </motion.div>
      )}
    </Link>
  )
}