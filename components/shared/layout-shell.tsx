"use client"

import { usePathname } from "next/navigation"
import Header from "./header"
import Footer from "./footer"
import AnimatedGradientOrbs from "../animated/animated-gradient-Orbs"
import Oneko from "./oneko"
import ScrollToTopButton from "./scroll-to-top-button"

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")
  const isDashboard = pathname.startsWith("/dashboard")

  if (isAdmin || isDashboard) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <AnimatedGradientOrbs />
      <Oneko />
      {children}
      <ScrollToTopButton />
      <Footer />
    </>
  )
}