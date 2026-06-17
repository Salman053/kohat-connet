// components/Oneko.tsx
'use client';

import { useEffect, useRef } from 'react';

interface OnekoProps {
  /** Path to the cat sprite image (default: "/oneko.gif") */
  catSprite?: string;
  /** Persist cat position in localStorage (default: true) */
  persistPosition?: boolean;
  /** Custom className for the container */
  className?: string;
}

declare global {
  interface Window {
    onekoLoaded?: boolean;
  }
}

export default function Oneko({ 
  catSprite = '/oneko.gif', 
  persistPosition = true,
  className 
}: OnekoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptId = 'oneko-script';

  useEffect(() => {
    // Don't load if already loaded
    if (window.onekoLoaded) {
      return;
    }

    // Create container for oneko
    const container = document.createElement('div');
    container.id = 'oneko-container';
    if (className) {
      container.className = className;
    }
    document.body.appendChild(container);

    // Create and configure script
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = '/oneko.js';
    script.async = true;
    script.dataset.cat = catSprite;
    script.dataset.persistPosition = persistPosition ? 'true' : 'false';

    // Mark as loaded when script loads
    script.onload = () => {
      window.onekoLoaded = true;
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      // Remove script
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      
      // Remove container
      const existingContainer = document.getElementById('oneko-container');
      if (existingContainer) {
        document.body.removeChild(existingContainer);
      }
      
      // Reset loaded flag (optional - remove if you want it to load only once per session)
      window.onekoLoaded = false;
    };
  }, [catSprite, persistPosition, className]);

  // This component doesn't render anything visible itself
  // The cat is appended to document.body by the script
  return null;
}