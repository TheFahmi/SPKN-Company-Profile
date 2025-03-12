'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run on the client side
    if (!window || !pathname) return;

    // Function to initialize analytics
    const initAnalytics = () => {
      // Google Analytics
      if (typeof window.gtag === 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag() {
          window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', 'G-MEASUREMENT_ID', {
          page_path: pathname,
        });
      } else {
        // Send pageview with path
        window.gtag('config', 'G-MEASUREMENT_ID', {
          page_path: pathname,
        });
      }
    };

    // Use requestIdleCallback or setTimeout as a fallback
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(initAnalytics);
    } else {
      setTimeout(initAnalytics, 500);
    }

    // Track page view
    const handleRouteChange = () => {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      // Send to Google Analytics
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: url,
        });
      }
    };

    // Track initial page load
    handleRouteChange();

    // Track route changes
    return () => {
      // Clean up if needed
    };
  }, [pathname, searchParams]);

  return null;
}

// Add TypeScript declarations
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}