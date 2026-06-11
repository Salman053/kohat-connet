import React from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const SectionWrapper = ({
  title,
  subtitle,
  children,
  className,
  containerClassName,
}: SectionWrapperProps) => {
  return (
    <section className={cn("py-8 md:py-12", className)}>
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {(title || subtitle) && (
          <div className="mb-6 md:mb-8">
            {title && (
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
