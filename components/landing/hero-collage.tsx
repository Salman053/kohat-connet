"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const collageImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400&h=400&fit=crop",
    alt: "Colorful umbrellas",
    className: "w-44 h-44 md:w-56 md:h-56 rounded-2xl object-cover shadow-2xl",
    position: "left-[4%] top-[30%] md:left-[6%] md:top-[32%]",
    rotate: "rotate-[-2deg]",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    alt: "Bread and rice",
    className: "w-36 h-32 md:w-44 md:h-40 rounded-2xl object-cover shadow-2xl",
    position: "left-[22%] top-[18%] md:left-[24%] md:top-[22%]",
    rotate: "rotate-[1deg]",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=350&h=500&fit=crop",
    alt: "Skincare product",
    className: "w-36 h-52 md:w-44 md:h-64 rounded-2xl object-cover shadow-2xl",
    position: "left-[18%] top-[42%] md:left-[20%] md:top-[44%]",
    rotate: "rotate-[2deg]",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop",
    alt: "Portrait",
    className: "w-48 h-64 md:w-60 md:h-80 rounded-2xl object-cover shadow-2xl",
    position: "left-[38%] top-[25%] md:left-[40%] md:top-[28%]",
    rotate: "rotate-0",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
    alt: "Flowers",
    className: "w-36 h-40 md:w-44 md:h-48 rounded-2xl object-cover shadow-2xl",
    position: "right-[22%] top-[18%] md:right-[24%] md:top-[20%]",
    rotate: "rotate-[-1deg]",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=400&fit=crop",
    alt: "Red car",
    className: "w-40 h-44 md:w-52 md:h-56 rounded-2xl object-cover shadow-2xl",
    position: "right-[4%] top-[30%] md:right-[6%] md:top-[32%]",
    rotate: "rotate-[1deg]",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    alt: "Mountain sunset",
    className: "w-44 h-32 md:w-56 md:h-40 rounded-2xl object-cover shadow-2xl",
    position: "right-[18%] bottom-[8%] md:right-[20%] md:bottom-[10%]",
    rotate: "rotate-[-1deg]",
  },
];

export function HeroCollage() {
  return (
    // 1. Root container sits at the very back (z-0)
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      
      {/* 2. Scattered images sit above the root (z-10) */}
      {collageImages.map((img) => (
        <motion.div
          key={img.id}
          animate={{ opacity: [0, 1], scale: [0.95, 1],repeatCount: Infinity,}}
          transition={{ duration: 0.8, delay: img.id * 0.3 }}
          className={`absolute ${img.position} ${img.rotate} z-10 transition-transform duration-700 hover:scale-105 hover:z-50`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={400}
            height={400}
            className={img.className}
            priority={img.id <= 4}
          />
        </motion.div>
      ))}

      {/* 3. Dark overlay sits ON TOP of images (z-20) to darken them */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background/40 to-primary/20 z-20" />
    </div>
  );
}