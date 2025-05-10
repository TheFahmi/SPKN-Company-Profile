'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Box,
  CircularProgress,
  Container,
} from '@mui/material';
import AdminLayout from '@/app/components/admin/AdminLayout';

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Tampilkan loading saat mengecek sesi
  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Redirect ke halaman login jika tidak ada sesi
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  // Redirect ke halaman utama jika bukan admin
  if (session?.user?.role !== 'admin') {
    router.push('/');
    return null;
  }

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
} 