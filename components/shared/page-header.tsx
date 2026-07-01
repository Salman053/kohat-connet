"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle: string
  tag?: string
  align?: 'center' | 'left'
  className?: string
  backLink?: {
    href: string
    label: string
  }
  bgImage?: string
  children?: React.ReactNode
}

export default function PageHeader({
  title,
  subtitle,
  tag,
  align = 'center',
  className,
  backLink,
  bgImage,
  children
}: PageHeaderProps) {
  if (bgImage) {
    return (
      <div className={cn("relative h-64 md:h-96 w-full overflow-hidden border-b", className)}>
        <Image
          src={bgImage}
          alt={title}
          fill
          className="object-cover "
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-primary/10 to-black/5" />
        <div className="absolute bottom-8 left-0 w-full">
          <div className="container mx-auto px-6">
            {backLink && (
              <Link
                href={backLink.href}
                className="inline-flex items-center gap-1 text-xs font-bold text-white/80 hover:text-white mb-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full transition-all"
              >
                <ArrowLeft className="h-3 w-3" /> {backLink.label}
              </Link>
            )}
            {tag && (
              <div className="mb-2">
                <span className="text-[9px] font-extrabold tracking-widest text-white bg-primary px-2.5 py-1 rounded-full uppercase">
                  {tag}
                </span>
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2 uppercase">
              {title}
            </h1>
            <p className="text-white/95 text-xs md:text-sm max-w-2xl font-medium leading-relaxed">
              {subtitle}
            </p>
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("bg-primary/5  border-b border-border/40 py-16 relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className={cn(
        "container mx-auto px-6 relative z-10",
        align === 'center' ? 'text-center max-w-3xl' : 'max-w-6xl'
      )}>
        {backLink && (
          <div className="mb-4">
            <Link
              href={backLink.href}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {backLink.label}
            </Link>
          </div>
        )}
        
        {tag && (
          <div className="mb-3">
            <span className="text-[10px] font-extrabold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase inline-block">
              {tag}
            </span>
          </div>
        )}
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4 uppercase">
          {title.includes(' ') ? (
            <>
              {title.substring(0, title.lastIndexOf(' '))} <span className="text-primary">{title.substring(title.lastIndexOf(' ') + 1)}</span>
            </>
          ) : (
            title
          )}
        </h1>
        
        <p className={cn(
          "text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl",
          align === 'center' ? 'mx-auto' : ''
        )}>
          {subtitle}
        </p>

        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  )
}
