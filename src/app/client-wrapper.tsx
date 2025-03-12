'use client';

import React, { Suspense, lazy } from 'react';
import { Providers } from './providers';
import LoadingScreen from './components/LoadingScreen';

// Dynamically import non-critical components
const ClientLayout = lazy(() => import('./client-layout'));

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Suspense fallback={<LoadingScreen />}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </Suspense>
    </Providers>
  );
}