import { MapPin, Search } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { motion } from 'framer-motion'

const SearchBox = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as const

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    },
  } as const

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-5xl mx-auto p-3 px-8 bg-background/60 backdrop-blur-2xl border border-white/10 shadow-2xl  shadow-gray-700/10 rounded-3xl"
    >
      <div className="flex flex-col items-center md:flex-row gap-3 sticky top-20">
        {/* Search Input */}
        <motion.div
          variants={itemVariants}
          className="flex-1 flex items-center gap-3 px-5 py-4 bg-background/40 border border-white/5 rounded-xl hover:border-white/10 transition-colors group"
        >
          <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="What are you looking for?"
            className="w-full bg-transparent border-0 p-0 text-base font-medium placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="hidden md:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent my-2"
        />

        {/* Location Input */}
        <motion.div
          variants={itemVariants}
          className="flex-1 flex items-center gap-3 px-5 py-4 bg-background/40 border border-white/5 rounded-xl hover:border-white/10 transition-colors group"
        >
          <MapPin className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="KDA, City, or Cantt"
            className="w-full bg-transparent border-0 p-0 text-base font-medium placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </motion.div>

        {/* Search Button */}
        <motion.div variants={itemVariants} className="md:w-auto">
          <Button
            size="lg"
            className="w-full md:w-auto   m-auto px-8 font-semibold text-sm bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            Search Now
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SearchBox