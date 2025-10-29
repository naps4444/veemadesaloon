'use client';

import { useLayoutEffect, useState } from 'react';

/**
 * ClientLayoutWrapper
 * 
 * This component ensures:
 * - Scroll restoration is disabled (prevents mid-page flashes)
 * - The page starts scrolled to the top before rendering
 * - The UI only becomes visible once layout is stable
 */
export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    // Disable browser's scroll restoration feature
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Ensure we're at the top of the page
    window.scrollTo(0, 0);

    // Wait one frame for layout stabilization before showing content
    const animationFrame = requestAnimationFrame(() => setIsReady(true));

    // Cleanup on unmount
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ease-out ${
        isReady ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      {children}
    </div>
  );
}
