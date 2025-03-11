'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  People as UsersIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import AdminLayout from '@/app/components/admin/AdminLayout';

const drawerWidth = 240;

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

  return <AdminLayout>{children}</AdminLayout>;
} 