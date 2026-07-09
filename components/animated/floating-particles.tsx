"use client"

import { motion } from "framer-motion"

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 15 + 15,
  delay: Math.random() * 5,
}))

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0  overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        {particles.map((p) => (
          <motion.circle
            key={p.id}
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.size}
            fill="currentColor"
            className="text-primary"
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </svg>
    </div>
  )
}