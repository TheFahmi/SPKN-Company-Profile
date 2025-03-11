'use client';

import { Providers } from './providers';
import ClientLayout from './client-layout';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <ClientLayout>
        {children}
      </ClientLayout>
    </Providers>
  );
} 