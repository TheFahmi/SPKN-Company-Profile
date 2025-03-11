'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function usePageLoading() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => setIsPageLoading(true);
    const handleComplete = () => setIsPageLoading(false);

    handleComplete(); // Reset loading state on mount

    return () => {
      setIsPageLoading(false); // Reset loading state on unmount
    };
  }, [pathname, searchParams]);

  return { isPageLoading };
} 