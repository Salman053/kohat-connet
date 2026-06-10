"use client"
import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Tag, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

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
    className="relative flex-shrink-0 w-[300px]   max-h-min   rounded-2xl overflow-hidden group snap-start bg-card border border-border"
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{ perspective: "1000px" }}
  >
    {/* Background Image */}
    <div className="h-1/2 overflow-hidden">
      <img
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
            <img src={item.authorLogo} alt={`${item.authorName} logo`} className="w-6 h-6 rounded-full bg-muted object-cover" />
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
}

// The main carousel component with scroll functionality
const CardsCarousel = React.forwardRef<HTMLDivElement, CardsCarouselProps>(
  ({ items, className, ...props }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);

    const scroll = (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = current.clientWidth * 0.8;
        current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    };

    React.useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer || isHovered) return;

      let animationFrameId: number;
      let lastTime: number;
      const speed = 0.1; // Pixels per frame

      const step = (time: number) => {
        if (lastTime !== undefined) {
          const deltaTime = time - lastTime;
          // Normalize speed to 60fps (16.67ms per frame)
          const moveAmount = speed * (deltaTime / 16.67);
          
          scrollContainer.scrollLeft += moveAmount;

          // Loop back to start
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 1) {
            scrollContainer.scrollLeft = 0;
          }
        }
        lastTime = time;
        animationFrameId = requestAnimationFrame(step);
      };

      animationFrameId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered]);

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
            isHovered ? "snap-x snap-mandatory" : "snap-none"
          )}
        >
          {items.map((item) => (
            <GenericCard key={item.id} item={item} />
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
