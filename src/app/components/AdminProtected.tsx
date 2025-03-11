'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';

interface AdminProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: AdminProtectedProps) {
  const router = useRouter();
  const { user, isLoading, isAdmin, checkAdminAccess, refreshUserRole } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        if (!user) {
          router.push('/login');
          return;
        }

        const hasAccess = await checkAdminAccess();
        if (!hasAccess) {
          router.push('/');
          return;
        }

        setIsChecking(false);
      } catch (error: any) {
        console.error('Error checking admin access:', error);
        setError(error.message || 'Terjadi kesalahan saat memeriksa akses admin');
        setIsChecking(false);
      }
    };

    checkAccess();
  }, [user, router, checkAdminAccess]);

  const handleRefreshRole = async () => {
    try {
      setError(null);
      await refreshUserRole();
    } catch (error: any) {
      console.error('Error refreshing user role:', error);
      setError(error.message || 'Terjadi kesalahan saat memuat ulang peran pengguna');
    }
  };

  if (isLoading || isChecking) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user || !isAdmin) {
    return (
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom color="error">
            Akses Ditolak
          </Typography>
          <Typography variant="body1" gutterBottom>
            Anda tidak memiliki akses ke halaman ini.
          </Typography>
          {error && (
            <Typography color="error" paragraph>
              Error: {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/')}
          >
            Kembali ke Beranda
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleRefreshRole}
          >
            Muat Ulang Peran Pengguna
          </Button>
        </Box>
      </Container>
    );
  }

  return <>{children}</>;
} 