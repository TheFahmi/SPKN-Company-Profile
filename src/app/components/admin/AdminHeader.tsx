'use client';

import React, { memo, useCallback } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  alpha,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { useColorMode } from '@/app/contexts/ColorModeContext';
import NotificationPanel from './NotificationPanel';
import ProfileMenu from './ProfileMenu';
import SearchBar from './SearchBar';

interface AdminHeaderProps {
  open: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: number;
}

const AdminHeader = memo(({ open, handleDrawerToggle, drawerWidth }: AdminHeaderProps) => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();
  const [searchOpen, setSearchOpen] = React.useState(false);

  const handleSearchOpen = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const handleSearchClose = useCallback(() => {
    setSearchOpen(false);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${open ? drawerWidth : 0}px)` },
        ml: { md: `${open ? drawerWidth : 0}px` },
        boxShadow: 'none',
        backdropFilter: 'blur(6px)',
        backgroundColor: alpha(theme.palette.background.default, 0.8),
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        color: theme.palette.text.primary,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Admin Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {searchOpen ? (
            <SearchBar onClose={handleSearchClose} />
          ) : (
            <Tooltip title="Cari">
              <IconButton color="inherit" onClick={handleSearchOpen}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title={mode === 'dark' ? 'Mode Terang' : 'Mode Gelap'}>
            <IconButton color="inherit" onClick={toggleColorMode} sx={{ ml: 1 }}>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <NotificationPanel />
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
});

// Memastikan nama tampil di React DevTools
AdminHeader.displayName = 'AdminHeader';

export default AdminHeader; 