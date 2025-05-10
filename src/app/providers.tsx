'use client';

import React from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import { SessionProvider } from 'next-auth/react';
import { LoadingProvider } from './contexts/LoadingContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ColorModeProvider } from './contexts/ColorModeContext';
import { usePathname } from 'next/navigation';

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin');

  // Bungkus dengan ThemeProvider hanya jika di halaman admin
  const content = (
    <NotificationProvider>
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </NotificationProvider>
  );

  return (
    <SessionProvider>
      <ColorModeProvider>
        {isAdminPath ? (
          <ThemeProvider>
            {content}
          </ThemeProvider>
        ) : (
          content
        )}
      </ColorModeProvider>
    </SessionProvider>
  );
} 