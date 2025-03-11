'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useLoading } from '../contexts/LoadingContext';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const { isLoading } = useLoading();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // Setelah render pertama, set isFirstRender ke false
    if (isFirstRender) {
      setTimeout(() => {
        setIsFirstRender(false);
      }, 500);
    }
  }, [isFirstRender]);

  // Jika masih loading atau render pertama, jangan tampilkan animasi
  if (isLoading || isFirstRender) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 