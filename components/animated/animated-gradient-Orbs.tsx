"use client"

import { motion } from "framer-motion"
import { useRef } from "react"

interface OrbProps {
  id: number
  size: number
  x: number
  y: number
  color: string
  blur: number
  opacity: number
  duration: number
  delay: number
  path: number[]
  scaleA: number
  scaleB: number
}

function generateOrbs(): OrbProps[] {
  const colors = [
    "bg-primary/30",
    "bg-accent",
    "bg-secondary",
    "bg-primary/50",
    "bg-accent/70",
  ]

  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 400 + 300,
    x: Math.random() * 100 - 20,
    y: Math.random() * 100 - 20,
    color: colors[Math.floor(Math.random() * colors.length)],
    blur: Math.random() * 100 + 80,
    opacity: Math.random() * 0.3 + 0.1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    path: [
      Math.random() * 160 - 80,
      Math.random() * 160 - 80,
      Math.random() * 160 - 80,
      Math.random() * 160 - 80,
    ],
    scaleA: 1 + Math.random() * 0.3,
    scaleB: 1 - Math.random() * 0.2,
  }))
}

export default function AnimatedGradientOrbs() {
  const orbsRef = useRef<OrbProps[] | null>(null)
  if (!orbsRef.current) {
    orbsRef.current = generateOrbs()
  }
  const orbs = orbsRef.current

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full ${orb.color}`}
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            filter: `blur(${orb.blur}px)`,
            opacity: orb.opacity,
          }}
          animate={{
            x: [0, orb.path[0], orb.path[1], 0],
            y: [0, orb.path[2], orb.path[3], 0],
            scale: [1, orb.scaleA, orb.scaleB, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  )
}