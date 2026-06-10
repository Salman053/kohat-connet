"use client"

import React, { useState } from 'react';
import { Newspaper, Clock, TrendingUp,  ArrowRight, ExternalLink, Zap } from 'lucide-react';
import { cn } from "@/lib/utils";

export interface NewsItem {
  id: string | number;
  title: string;
  category: string;
  time: string;
  isBreaking?: boolean;
  isTrending?: boolean;
  readTime?: string;
  source?: string;
  excerpt?: string;
  href: string;
}

interface NewsSectionProps {
  items: NewsItem[];
  className?: string;
  isLoading?: boolean;
  maxItems?: number;
}

const categoryColors: Record<string, string> = {
  politics: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  business: 'bg-green-500/10 text-green-600 border-green-500/20',
  sports: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  technology: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  health: 'bg-red-500/10 text-red-600 border-red-500/20',
  entertainment: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
  breaking: 'bg-destructive/10 text-destructive border-destructive/20',
};

const getCategoryColor = (category: string) => {
  return categoryColors[category.toLowerCase()] || 'bg-muted text-muted-foreground border-border';
};

// Loading Skeleton Component
const NewsSkeleton: React.FC = () => (
  <div className="space-y-3 p-4 animate-pulse">
    <div className="flex items-center gap-2">
      <div className="h-4 w-16 bg-muted rounded" />
      <div className="h-3 w-12 bg-muted rounded ml-auto" />
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-3/4" />
    </div>
  </div>
);

// Empty State Component
const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
      <Newspaper className="w-6 h-6 text-muted-foreground" />
    </div>
    <p className="text-sm font-medium text-foreground mb-1">No news available</p>
    <p className="text-xs text-muted-foreground">Check back later for updates</p>
  </div>
);

// Featured Breaking News Component
const FeaturedNews: React.FC<{ item: NewsItem }> = ({ item }) => (
  <a
    href={item.href}
    className="block p-4  border-b border-border hover:from-destructive/10 transition-all group relative overflow-hidden"
  >
    {/* Animated gradient border */}
    <div className="absolute top-0 left-0 w-full h-0.5  opacity-50" />
    
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-1">
        <div className="relative">
          <div className="w-10 h-10 rounded-lg  flex items-center justify-center">
            <Zap className="w-5 h-5 " />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-destructive text-destructive-foreground">
            Breaking
          </span>
          {item.category && (
            <span className={cn(
              "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border",
              getCategoryColor(item.category)
            )}>
              {item.category}
            </span>
          )}
        </div>
        
        <h3 className="text-base font-bold leading-tight text-foreground group-hover:text-destructive transition-colors line-clamp-2 mb-2">
          {item.title}
        </h3>
        
        {item.excerpt && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {item.excerpt}
          </p>
        )}
        
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{item.time}</span>
          </div>
          {item.readTime && (
            <div className="flex items-center gap-1">
              <span>•</span>
              <span>{item.readTime} read</span>
            </div>
          )}
          {item.source && (
            <div className="flex items-center gap-1">
              <span>•</span>
              <span className="font-medium">{item.source}</span>
            </div>
          )}
        </div>
      </div>
      
      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-destructive group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
    </div>
  </a>
);

// Regular News Item Component
const NewsItemCard: React.FC<{ item: NewsItem; isLast: boolean }> = ({ item, isLast }) => (
  <a
    href={item.href}
    className={cn(
      "block p-4 transition-all group relative",
      "hover:bg-muted/50 hover:pl-5",
      !isLast && "border-b border-border",
      item.isTrending && "bg-primary/5"
    )}
  >
    <div className="flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className={cn(
            "text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border",
            getCategoryColor(item.category)
          )}>
            {item.category}
          </span>
          
          {item.isTrending && (
            <div className="flex items-center gap-1 text-[10px] font-semibold text-primary">
              <TrendingUp className="w-3 h-3" />
              <span>Trending</span>
            </div>
          )}
        </div>
        
        <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1.5">
          {item.title}
        </h3>
        
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{item.time}</span>
          </div>
          {item.readTime && (
            <>
              <span>•</span>
              <span>{item.readTime}</span>
            </>
          )}
          {item.source && (
            <>
              <span>•</span>
              <span className="font-medium">{item.source}</span>
            </>
          )}
        </div>
      </div>
      
      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
    </div>
  </a>
);

const NewsSection: React.FC<NewsSectionProps> = ({ 
  items, 
  className, 
  isLoading = false,
  maxItems = 10 
}) => {
  const [showAll, setShowAll] = useState(false);
  
  const breakingNews = items.filter(item => item.isBreaking);
  const regularNews = items.filter(item => !item.isBreaking);
  const displayItems = showAll ? regularNews : regularNews.slice(0, maxItems);
  const hasMore = regularNews.length > maxItems;

  return (
    <div className={cn(
      "bg-card border border-border rounded-2xl overflow-hidden flex flex-col h-full shadow-sm",
      className
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-to-br from-muted/50 to-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Newspaper className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-base text-foreground">Latest News</h2>
              <p className="text-[10px] text-muted-foreground">Stay informed</p>
            </div>
          </div>
          
          {breakingNews.length > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/10 border border-destructive/20">
              <div className="relative">
                <div className="w-2 h-2 bg-destructive rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-destructive rounded-full animate-ping" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-destructive">
                {breakingNews.length} Breaking
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="space-y-0">
            {[...Array(5)].map((_, i) => (
              <NewsSkeleton key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Featured Breaking News */}
            {breakingNews.length > 0 && (
              <FeaturedNews item={breakingNews[0]} />
            )}

            {/* Regular News */}
            <div>
              {displayItems.map((item, index) => (
                <NewsItemCard 
                  key={item.id} 
                  item={item} 
                  isLast={index === displayItems.length - 1 && !hasMore}
                />
              ))}
            </div>

            {/* Show More Button */}
            {hasMore && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full p-3 text-xs font-medium text-primary hover:bg-primary/5 transition-colors border-t border-border flex items-center justify-center gap-1"
              >
                <span>Show {regularNews.length - maxItems} more stories</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <a 
        href="/news" 
        className="p-3 text-center text-xs font-semibold text-primary hover:bg-primary/5 transition-all border-t border-border flex items-center justify-center gap-1.5 group"
      >
        <span>View All Local News</span>
        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
};

export default NewsSection;