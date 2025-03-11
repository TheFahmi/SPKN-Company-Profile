'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  
  // Efek untuk menangani loading awal - disederhanakan untuk menghindari loading ganda
  useEffect(() => {
    // Simulasi loading awal dengan satu timer saja
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Waktu loading awal

    // Tambahkan event listener untuk mendeteksi ketika halaman sudah dimuat sepenuhnya
    const handleLoad = () => {
      clearTimeout(timer);
      setIsLoading(false);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <LoadingScreen minDisplayTime={2000} />}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
} 