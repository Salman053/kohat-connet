// components/Oneko.tsx
'use client';

import { useEffect } from 'react';

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
  const scriptId = 'oneko-script';

  useEffect(() => {
    if (window.onekoLoaded) return;

    window.onekoLoaded = true;

    const container = document.createElement('div');
    container.id = 'oneko-container';
    if (className) {
      container.className = className;
    }
    document.body.appendChild(container);

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = '/oneko.js';
    script.async = true;
    script.dataset.cat = catSprite;
    script.dataset.persistPosition = persistPosition ? 'true' : 'false';

    document.body.appendChild(script);

    return () => {};
  }, [catSprite, persistPosition, className]);

  // This component doesn't render anything visible itself
  // The cat is appended to document.body by the script
  return null;
}