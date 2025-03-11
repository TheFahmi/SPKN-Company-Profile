'use client';

import { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Tooltip,
  Avatar,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeProvider, useTheme } from '@/app/contexts/ThemeContext';
import { signOut, useSession } from 'next-auth/react';
import AdminFooter from './AdminFooter';
import Image from 'next/image';

const drawerWidth = 240;

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();
  const { data: session } = useSession();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    router.push('/admin/profile');
    handleClose();
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/admin/login' });
    handleClose();
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, href: '/admin/dashboard' },
    { text: 'Pengguna', icon: <PeopleIcon />, href: '/admin/users' },
    { text: 'Produk', icon: <InventoryIcon />, href: '/admin/products' },
    { text: 'Import Produk', icon: <CloudUploadIcon />, href: '/admin/products/import' },
    { text: 'Pengaturan', icon: <SettingsIcon />, href: '/admin/settings' },
  ];

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: (theme) =>
              theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
            }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Tooltip title="Menu Admin">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ 
                width: 32, 
                height: 32,
                bgcolor: theme => 
                  theme.palette.mode === 'dark' 
                    ? '#1976d2'
                    : '#2196f3',
                color: '#ffffff',
                boxShadow: theme =>
                  theme.palette.mode === 'dark'
                    ? '0 0 8px rgba(144, 202, 249, 0.5)'
                    : '0 0 8px rgba(33, 150, 243, 0.5)',
                '&:hover': {
                  bgcolor: theme =>
                    theme.palette.mode === 'dark'
                      ? '#1565c0'
                      : '#1976d2',
                }
              }}>
                {session?.user?.email?.[0]?.toUpperCase() || 'A'}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              mt: 1,
              '& .MuiPaper-root': {
                backgroundColor: theme => 
                  theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                boxShadow: theme =>
                  theme.palette.mode === 'dark'
                    ? '0 4px 6px rgba(0, 0, 0, 0.4)'
                    : '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: theme =>
                  `1px solid ${
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(0, 0, 0, 0.12)'
                  }`,
                minWidth: 200,
              },
              '& .MuiMenuItem-root': {
                padding: '8px 16px',
                '&:hover': {
                  backgroundColor: theme =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.04)',
                },
              },
              '& .MuiListItemIcon-root': {
                minWidth: 36,
                color: theme =>
                  theme.palette.mode === 'dark' ? '#90caf9' : '#ffffff',
              },
              '& .MuiListItemText-primary': {
                color: theme =>
                  theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                fontSize: '0.875rem',
                fontWeight: 500,
              },
              '& .MuiDivider-root': {
                margin: '8px 0',
                borderColor: theme =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <AccountCircleIcon 
                  fontSize="small"
                  sx={{ color: theme => theme.palette.mode === 'dark' ? '#90caf9' : '#ffffff' }}
                />
              </ListItemIcon>
              <ListItemText 
                primary="Profile"
                sx={{
                  '& .MuiTypography-root': {
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  },
                }}
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon 
                  fontSize="small"
                  sx={{ color: theme => theme.palette.mode === 'dark' ? '#90caf9' : '#ffffff' }}
                />
              </ListItemIcon>
              <ListItemText 
                primary="Logout"
                sx={{
                  '& .MuiTypography-root': {
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  },
                }}
              />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 65,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: open ? drawerWidth : 65,
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
        open={open}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: open ? 'flex-start' : 'center',
              p: 2,
              borderBottom: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
            }}
          >
            <Image
              src="https://spkn.co.id/wp-content/uploads/elementor/thumbs/LOGO-SPKN-NEW-300x274-removebg-preview-1-qfqh90c9we3vc1w52kgko3f13r707nf8egy7ksj0fc.png"
              alt="PT SPKN Logo"
              width={open ? 150 : 40}
              height={open ? 40 : 40}
              style={{
                objectFit: 'contain',
              }}
            />
          </Box>

          <List sx={{ mt: 2 }}>
            {menuItems.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItem
                  button
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    backgroundColor:
                      pathname === item.href
                        ? (theme) =>
                            darkMode
                              ? 'rgba(255, 255, 255, 0.08)'
                              : 'rgba(0, 0, 0, 0.04)'
                        : 'transparent',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>

        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
            display: open ? 'block' : 'none',
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            &copy; {new Date().getFullYear()} PT. SPKN
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            v1.0.0
          </Typography>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: (theme) => theme.spacing(10),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ThemeProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ThemeProvider>
  );
} 