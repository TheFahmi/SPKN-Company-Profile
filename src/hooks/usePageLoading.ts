'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function usePageLoading() {
  const [isPageLoading, setIsPageLoading] = useState(true); // Start with loading true
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This will run when the component mounts
    const timeoutId = setTimeout(() => {
      setIsPageLoading(false);
    }, 500); // Short delay to ensure loading screen shows briefly

    // Create event listeners for page transitions
    const handleStart = () => {
      setIsPageLoading(true);
    };

    const handleComplete = () => {
      setIsPageLoading(false);
    };

    // Add event listeners for navigation events
    window.addEventListener('beforeunload', handleStart);
    
    // For Next.js App Router, we can detect route changes by watching pathname and searchParams
    // When they change, we briefly show loading and then hide it

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('beforeunload', handleStart);
      setIsPageLoading(false); // Reset loading state on unmount
    };
  }, []); // Empty dependency array for initial setup

  // When pathname or searchParams change, trigger loading state
  useEffect(() => {
    setIsPageLoading(true);
    
    // After a short delay, set loading to false
    const timeoutId = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, searchParams]);

  return { isPageLoading };
}