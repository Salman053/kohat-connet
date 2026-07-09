"use client"

import { motion } from "framer-motion"

export default function AnimatedGridPattern() {
  return (
    <div className="pointer-events-none absolute inset-0  overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground/5"
            />
          </pattern>

          {/* Radial fade mask */}
          <radialGradient id="grid-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
          </mask>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid-pattern)" mask="url(#grid-mask)" />
      </svg>

      {/* Pulsing intersection dots */}
      <motion.div
        className="absolute top-1/4 left-1/4 h-1.5 w-1.5 rounded-full bg-primary/60"
        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 h-1.5 w-1.5 rounded-full bg-primary/60"
        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/2 h-1.5 w-1.5 rounded-full bg-primary/60"
        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  )
}