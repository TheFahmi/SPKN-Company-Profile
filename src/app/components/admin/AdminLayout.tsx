'use client';

import React, { useState, useCallback, memo } from 'react';
import {
  Box,
  CssBaseline,
  useMediaQuery,
  Toolbar,
} from '@mui/material';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const drawerWidth = 260;

// Komponen konten yang dimemoized untuk mencegah re-render saat drawer toggle
const AdminLayoutContent = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { md: `calc(100% - ${drawerWidth}px)` },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Toolbar />
      <Box sx={{ flexGrow: 1, pt: 2 }}>{children}</Box>
    </Box>
  );
});

// Memastikan nama tampil di React DevTools
AdminLayoutContent.displayName = 'AdminLayoutContent';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const currentPath = usePathname();

  // Menggunakan useCallback untuk mencegah re-render yang tidak perlu
  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);

  // Menutup drawer saat ukuran layar berubah dari mobile ke desktop
  React.useEffect(() => {
    if (!isMobile && mobileOpen) {
      setMobileOpen(false);
    }
  }, [isMobile, mobileOpen]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AdminHeader 
        open={!isMobile} 
        handleDrawerToggle={handleDrawerToggle} 
        drawerWidth={drawerWidth} 
      />
      
      <AdminSidebar 
        open={mobileOpen} 
        handleDrawerToggle={handleDrawerToggle} 
        drawerWidth={drawerWidth} 
        currentPath={currentPath || ''}
      />
      
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </Box>
  );
};

export default AdminLayout; 