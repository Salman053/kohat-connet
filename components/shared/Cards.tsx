"use client"
import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Tag, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Define the type for a single card item
export interface CardItem {
  id: string | number;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  title: string;
  description: string;
  authorLogo?: string;
  authorName?: string;
  location?: string;
  date?: string;
  price?: string;
  href: string;
}

// Props for the GenericCard component
interface GenericCardProps {
  item: CardItem;
}

// The individual card component with hover animation
const GenericCard = React.forwardRef<HTMLAnchorElement, GenericCardProps>(({ item }, ref) => (
  <motion.a
    ref={ref}
    href={item.href}
    className="relative flex-shrink-0 w-[300px] max-h-min rounded-2xl overflow-hidden group snap-start bg-card border border-border"
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{ perspective: "1000px" }}
  >
    {/* Background Image */}
    <div className="h-1/2 overflow-hidden">
      <Image
        src={item.imageSrc}
        alt={item.imageAlt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    {/* Card Content */}
    <div className="h-1/2 p-5 flex flex-col justify-between">
      <div className="space-y-2">
        {/* Tag & Price */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Tag className="w-3 h-3 mr-1 text-primary" />
            <span className="font-medium">{item.tag}</span>
          </div>
          {item.price && (
            <span className="font-bold text-primary">{item.price}</span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-card-foreground leading-tight line-clamp-1">{item.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-5">{item.description}</p>
        
        {/* Info: Location or Date */}
        <div className="flex flex-col gap-1 pt-1">
          {item.location && (
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="truncate">{item.location}</span>
            </div>
          )}
          {item.date && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{item.date}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
        <div className="flex items-center gap-2">
          {item.authorLogo && (
            <Image src={item.authorLogo} alt={`${item.authorName} logo`} className="w-6 h-6 rounded-full bg-muted object-cover" />
          )}
          {item.authorName && (
            <p className="text-xs font-semibold text-card-foreground truncate max-w-[120px]">{item.authorName}</p>
          )}
        </div>
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground transform transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </motion.a>
));
GenericCard.displayName = "GenericCard";

// Props for the CardsCarousel component
export interface CardsCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CardItem[];
  autoScroll?: boolean;
  autoScrollSpeed?: number; // pixels per second
  infinite?: boolean;
}

// The main carousel component with infinite scroll functionality
const CardsCarousel = React.forwardRef<HTMLDivElement, CardsCarouselProps>(
  ({ items, className, autoScroll = true, autoScrollSpeed = 50, infinite = true, ...props }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);
    const [displayedItems, setDisplayedItems] = React.useState<CardItem[]>([]);

    // Create infinite loop by duplicating items
    React.useEffect(() => {
      if (infinite && items.length > 0) {
        // Duplicate items 3 times for seamless infinite scroll
        setDisplayedItems([...items, ...items, ...items]);
      } else {
        setDisplayedItems(items);
      }
    }, [items, infinite]);

    // Auto-scroll functionality
    React.useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer || !autoScroll || isHovered) return;

      let animationFrameId: number;
      let lastTimestamp: number;
      let scrollPosition = scrollContainer.scrollLeft;

      const scroll = (timestamp: number) => {
        if (!lastTimestamp) {
          lastTimestamp = timestamp;
          animationFrameId = requestAnimationFrame(scroll);
          return;
        }

        const deltaTime = timestamp - lastTimestamp;
        const moveDistance = (autoScrollSpeed * deltaTime) / 1000; // Convert to pixels per second
        
        scrollPosition += moveDistance;
        
        // Handle infinite loop reset
        if (infinite && scrollContainer.scrollWidth > 0) {
          const itemWidth = scrollContainer.children[0]?.clientWidth || 300;
          const gap = 24; // gap between items (space-x-6 = 24px)
          const singleSetWidth = (items.length * (itemWidth + gap)) - gap;
          
          // Reset to beginning when reaching the end of first duplicate set
          if (scrollPosition >= singleSetWidth * 2) {
            scrollPosition = scrollPosition - singleSetWidth;
            scrollContainer.scrollLeft = scrollPosition;
          }
        }
        
        scrollContainer.scrollLeft = scrollPosition;
        lastTimestamp = timestamp;
        animationFrameId = requestAnimationFrame(scroll);
      };

      animationFrameId = requestAnimationFrame(scroll);
      
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }, [autoScroll, autoScrollSpeed, isHovered, infinite, items.length]);

    const scroll = (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = current.clientWidth * 0.8;
        const newScrollLeft = direction === "left" 
          ? current.scrollLeft - scrollAmount 
          : current.scrollLeft + scrollAmount;
        
        current.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });
      }
    };

    // Reset scroll position when items change
    React.useEffect(() => {
      if (scrollContainerRef.current && infinite) {
        const itemWidth = scrollContainerRef.current.children[0]?.clientWidth || 300;
        const gap = 24;
        const singleSetWidth = (items.length * (itemWidth + gap)) - gap;
        scrollContainerRef.current.scrollLeft = singleSetWidth;
      }
    }, [displayedItems, infinite, items.length]);

    return (
      <div 
        ref={ref} 
        className={cn("relative w-full group", className)} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 w-10 h-10 rounded-full bg-background/80 shadow-md backdrop-blur-sm border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background disabled:opacity-0"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex space-x-6 no-scrollbar overflow-x-auto pb-6 pt-2 px-2 scrollbar-hide",
            !autoScroll && "snap-x snap-mandatory"
          )}
          style={{
            scrollBehavior: autoScroll ? "auto" : "smooth",
          }}
        >
          {displayedItems.map((item, index) => (
            <GenericCard key={`${item.id}-${index}`} item={item} />
          ))}
        </div>
        
        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 w-10 h-10 rounded-full bg-background/80 shadow-md backdrop-blur-sm border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background disabled:opacity-0"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  }
);
CardsCarousel.displayName = "CardsCarousel";

export { CardsCarousel, GenericCard };