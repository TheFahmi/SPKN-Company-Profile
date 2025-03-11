'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from '../contexts/LoadingContext';

export function usePageLoading() {
  const { setIsLoading } = useLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Ketika rute berubah, aktifkan loading
    const handleStart = () => {
      setIsLoading(true);
    };

    // Ketika navigasi selesai, nonaktifkan loading
    const handleComplete = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // Berikan sedikit delay untuk efek loading
    };

    // Panggil handleStart saat komponen dimount
    handleStart();

    // Panggil handleComplete setelah komponen dimount dan rute sudah siap
    handleComplete();

    // Tambahkan event listener untuk perubahan rute
    return () => {
      // Cleanup
    };
  }, [pathname, searchParams, setIsLoading]);

  return null;
} 