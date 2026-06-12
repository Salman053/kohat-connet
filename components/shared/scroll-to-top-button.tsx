"use client"

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / height) * 100;

      setIsVisible(scrollY > 300);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const size = 48; // 48px = w-12
  const radius = 20;
  const center = size / 2; // 24
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollProgress / 100);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-primary/20"
          />
        </svg>

        {/* Progress circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-primary transition-all duration-300"
            strokeLinecap="round"
          />
        </svg>

        {/* Button */}
        <Button
          aria-label={"scroll to top"}
          variant={"ghost"}
          className={cn(
            "absolute inset-0 m-auto rounded-full shadow-lg",
            "  hover:bg-primary/90 hover:text-white",
            "transition-all duration-300",
            !isVisible && "opacity-0 pointer-events-none"
          )}
          onClick={scrollToTop}
          style={{ width: size - 8, height: size - 8, top: '80%', left: '50%', transform: 'translate(-50%, -50%)' }}
          size="sm"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default ScrollToTopButton;