"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Context for managing open state
const NavigationMenuContext = React.createContext<{
  activeItem: string | null
  setActiveItem: (item: string | null) => void
}>({
  activeItem: null,
  setActiveItem: () => {},
})

const NavigationMenu = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)

  return (
    <NavigationMenuContext.Provider value={{ activeItem, setActiveItem }}>
      <nav
        ref={ref}
        className={cn(
          "relative z-10 flex max-w-max flex-1 items-center justify-center",
          className
        )}
        onMouseLeave={() => setActiveItem(null)}
        {...props}
      >
        {children}
        <NavigationMenuViewport />
      </nav>
    </NavigationMenuContext.Provider>
  )
})
NavigationMenu.displayName = "NavigationMenu"

const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = "NavigationMenuList"

const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & { value?: string }
>(({ className, value, ...props }, ref) => {
  const { setActiveItem } = React.useContext(NavigationMenuContext)
  
  return (
    <li 
      ref={ref} 
      className={cn("relative", className)} 
      onMouseEnter={() => value && setActiveItem(value)}
      {...props} 
    />
  )
})
NavigationMenuItem.displayName = "NavigationMenuItem"

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)

const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { "data-state"?: string, value?: string }
>(({ className, children, value, ...props }, ref) => {
  const { activeItem, setActiveItem } = React.useContext(NavigationMenuContext)
  const isOpen = activeItem === value

  const handleClick = () => {
    if (value) {
      setActiveItem(isOpen ? null : value)
    }
  }

  return (
    <button
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      data-state={isOpen ? "open" : "closed"}
      onClick={handleClick}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </button>
  )
})
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { "data-state"?: string, value?: string }
>(({ className, children, value, ...props }, ref) => {
  const { activeItem } = React.useContext(NavigationMenuContext)
  const isOpen = activeItem === value

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute left-0 top-full mt-2 w-full md:w-auto z-50",
        "animate-in fade-in zoom-in-95 duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
NavigationMenuContent.displayName = "NavigationMenuContent"

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, children, ...props }, ref) => (
  <a ref={ref} className={cn("block", className)} {...props}>
    {children}
  </a>
))
NavigationMenuLink.displayName = "NavigationMenuLink"

const NavigationMenuViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { activeItem } = React.useContext(NavigationMenuContext)
  
  if (!activeItem) return null

  return (
    <div className={cn("absolute left-0 top-full flex justify-center", className)}>
      <div
        ref={ref}
        className={cn(
          "origin-top-center relative mt-1.5 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
          className
        )}
        {...props}
      />
    </div>
  )
})
NavigationMenuViewport.displayName = "NavigationMenuViewport"

const NavigationMenuIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { activeItem } = React.useContext(NavigationMenuContext)

  if (!activeItem) return null

  return (
    <div
      ref={ref}
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </div>
  )
})
NavigationMenuIndicator.displayName = "NavigationMenuIndicator"

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}