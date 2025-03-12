'use client';

import { useState, useEffect } from 'react';
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
  Badge,
  ListItemButton,
  useMediaQuery,
  Collapse,
  alpha,
  useTheme as useMuiTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  CloudUpload as CloudUploadIcon,
  Notifications as NotificationsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Category as CategoryIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@/app/contexts/ThemeContext';
import { signOut, useSession } from 'next-auth/react';
import AdminFooter from './AdminFooter';
import Image from 'next/image';
import NotificationPanel from './NotificationPanel';
import ThemeToggle from './ThemeToggle';
import { NotificationProvider } from '@/app/contexts/NotificationContext';

const drawerWidth = 260;

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  href?: string;
  subItems?: MenuItem[];
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { mode } = useTheme();
  const muiTheme = useMuiTheme();
  const { data: session } = useSession();
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleProfile = () => {
    router.push('/admin/profile');
    handleClose();
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/admin/login' });
    handleClose();
  };

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const handleSubMenuToggle = (text: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  const menuItems: MenuItem[] = [
    { text: 'Dashboard', icon: <DashboardIcon />, href: '/admin/dashboard' },
    { text: 'Beranda', icon: <HomeIcon />, href: '/' },
    { 
      text: 'Produk', 
      icon: <InventoryIcon />, 
      subItems: [
        { text: 'Semua Produk', icon: <CategoryIcon />, href: '/admin/products' },
        { text: 'Import Produk', icon: <CloudUploadIcon />, href: '/admin/products/import' },
      ]
    },
    { text: 'Pengguna', icon: <PeopleIcon />, href: '/admin/users' },
    { text: 'Pengaturan', icon: <SettingsIcon />, href: '/admin/settings' },
  ];

  const isPathActive = (href: string) => {
    if (!href) return false;
    
    // Exact match
    if (pathname === href) return true;
    
    // Special case for products
    if (href === '/admin/products') {
      return pathname.startsWith('/admin/products') && pathname !== '/admin/products/import';
    }
    
    // Special case for product import
    if (href === '/admin/products/import') {
      return pathname === '/admin/products/import';
    }
    
    // Other cases
    if (href === '/admin/dashboard' || href === '/admin/users' || href === '/admin/settings') {
      return pathname.startsWith(href);
    }
    
    return false;
  };

  const isMenuWithSubItemsActive = (item: MenuItem) => {
    if (!item.subItems) {
      return isPathActive(item.href || '');
    }
    
    if (item.text === 'Produk') {
      return pathname.startsWith('/admin/products');
    }
    
    return item.subItems.some(subItem => isPathActive(subItem.href || ''));
  };

  const drawer = (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'flex-start' : 'center',
          p: 2,
          borderBottom: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
          height: 64,
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

      <Box sx={{ overflow: 'auto', flexGrow: 1, mt: 1 }}>
        <List>
          {menuItems.map((item) => (
            <Box key={item.text}>
              {item.subItems ? (
                <>
                  <ListItemButton
                    onClick={() => handleSubMenuToggle(item.text)}
                    sx={{
                      minHeight: 48,
                      px: 2.5,
                      backgroundColor: isMenuWithSubItemsActive(item)
                        ? alpha(muiTheme.palette.primary.main, muiTheme.palette.mode === 'dark' ? 0.15 : 0.1)
                        : 'transparent',
                      borderRadius: '24px',
                      mx: open ? 1 : 'auto',
                      width: open ? 'auto' : 40,
                      justifyContent: open ? 'initial' : 'center',
                      '&:hover': {
                        backgroundColor: alpha(muiTheme.palette.primary.main, muiTheme.palette.mode === 'dark' ? 0.2 : 0.15),
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: isMenuWithSubItemsActive(item)
                          ? muiTheme.palette.primary.main
                          : muiTheme.palette.text.primary,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ 
                        opacity: open ? 1 : 0,
                        '& .MuiTypography-root': {
                          color: isMenuWithSubItemsActive(item) 
                            ? muiTheme.palette.primary.main 
                            : muiTheme.palette.text.primary,
                        }
                      }}
                    />
                    {open && (
                      <Box sx={{ color: muiTheme.palette.text.primary }}>
                        {expandedItems[item.text] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </Box>
                    )}
                  </ListItemButton>
                  <Collapse in={open && expandedItems[item.text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.text}
                          href={subItem.href || ''}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <ListItemButton
                            sx={{
                              pl: 4,
                              py: 1,
                              minHeight: 40,
                              backgroundColor: isPathActive(subItem.href || '')
                                ? alpha(muiTheme.palette.primary.main, muiTheme.palette.mode === 'dark' ? 0.15 : 0.1)
                                : 'transparent',
                              borderRadius: '24px',
                              mx: 1,
                              '&:hover': {
                                backgroundColor: alpha(muiTheme.palette.primary.main, muiTheme.palette.mode === 'dark' ? 0.2 : 0.15),
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: 2,
                                color: isPathActive(subItem.href || '')
                                  ? muiTheme.palette.primary.main
                                  : muiTheme.palette.text.secondary,
                              }}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={subItem.text}
                              primaryTypographyProps={{
                                fontSize: 14,
                                fontWeight: isPathActive(subItem.href || '') ? 'medium' : 'normal',
                                color: isPathActive(subItem.href || '') 
                                  ? muiTheme.palette.primary.main 
                                  : muiTheme.palette.text.secondary,
                              }}
                            />
                          </ListItemButton>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <Link
                  href={item.href || ''}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      px: 2.5,
                      backgroundColor: isMenuWithSubItemsActive(item)
                        ? alpha(muiTheme.palette.primary.main, muiTheme.palette.mode === 'dark' ? 0.15 : 0.1)
                        : 'transparent',
                      borderRadius: '24px',
                      mx: open ? 1 : 'auto',
                      width: open ? 'auto' : 40,
                      justifyContent: open ? 'initial' : 'center',
                      '&:hover': {
                        backgroundColor: alpha(muiTheme.palette.primary.main, muiTheme.palette.mode === 'dark' ? 0.2 : 0.15),
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: isMenuWithSubItemsActive(item)
                          ? muiTheme.palette.primary.main
                          : muiTheme.palette.text.primary,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ 
                        opacity: open ? 1 : 0,
                        '& .MuiTypography-root': {
                          color: isMenuWithSubItemsActive(item) 
                            ? muiTheme.palette.primary.main 
                            : muiTheme.palette.text.primary,
                        }
                      }}
                    />
                  </ListItemButton>
                </Link>
              )}
            </Box>
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
        <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary, display: 'block', mb: 0.5 }}>
          &copy; {new Date().getFullYear()} PT. SPKN
        </Typography>
        <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary, display: 'block' }}>
          v1.0.0
        </Typography>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: muiTheme.palette.background.paper,
          color: muiTheme.palette.text.primary,
          borderBottom: 1,
          borderColor: muiTheme.palette.divider,
          boxShadow: 'none',
          width: { md: `calc(100% - ${open ? drawerWidth : 73}px)` },
          ml: { md: `${open ? drawerWidth : 73}px` },
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2,
              display: { xs: 'block', md: 'none' }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            sx={{ 
              color: muiTheme.palette.text.primary,
              flexGrow: 1,
            }}
          >
            Selamat Datang, {session?.user?.name || 'Admin'}!
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationPanel />
            <ThemeToggle />
            <Tooltip title="Akun">
              <IconButton
                size="large"
                aria-label="account"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: muiTheme.palette.primary.main,
                    color: muiTheme.palette.primary.contrastText,
                  }}
                >
                  {session?.user?.name?.[0]?.toUpperCase() || 'A'}
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
              PaperProps={{
                sx: {
                  backgroundColor: muiTheme.palette.background.paper,
                  color: muiTheme.palette.text.primary,
                }
              }}
            >
              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" sx={{ color: muiTheme.palette.text.primary }} />
                </ListItemIcon>
                <Typography color="text.primary">Profil</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" sx={{ color: muiTheme.palette.text.primary }} />
                </ListItemIcon>
                <Typography color="text.primary">Keluar</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: open ? drawerWidth : 72,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: open ? drawerWidth : 72,
            transition: (theme) =>
              theme.transitions.create(['width', 'box-shadow'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
            boxShadow: open ? '4px 0 15px rgba(0, 0, 0, 0.05)' : 'none',
            background: (theme) => 
              theme.palette.mode === 'light' 
                ? 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)' 
                : 'linear-gradient(180deg, #1e1e1e 0%, #121212 100%)',
          },
        }}
        open={open}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: open ? 'space-between' : 'center',
              p: 2,
              borderBottom: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
              height: 64,
              background: (theme) => 
                theme.palette.mode === 'light' 
                  ? 'linear-gradient(90deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)' 
                  : 'linear-gradient(90deg, rgba(25, 118, 210, 0.15) 0%, rgba(25, 118, 210, 0.05) 100%)',
            }}
          >
            <Image
              src="https://spkn.co.id/wp-content/uploads/elementor/thumbs/LOGO-SPKN-NEW-300x274-removebg-preview-1-qfqh90c9we3vc1w52kgko3f13r707nf8egy7ksj0fc.png"
              alt="PT SPKN Logo"
              width={open ? 150 : 40}
              height={open ? 40 : 40}
              style={{
                objectFit: 'contain',
                transition: 'all 0.3s ease',
              }}
            />
            <IconButton 
              onClick={handleDrawerToggle}
              sx={{
                display: open ? 'inline-flex' : 'none',
                borderRadius: '50%',
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.15),
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ChevronLeftIcon sx={{ color: muiTheme.palette.primary.main }} />
            </IconButton>
          </Box>

          <Box sx={{ overflow: 'auto', flexGrow: 1, mt: 1 }}>
            {!open && (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  mb: 1,
                }}
              >
                <MenuIcon sx={{ color: muiTheme.palette.text.primary }} />
              </IconButton>
            )}
            <List>
              {menuItems.map((item) => (
                <Box key={item.text}>
                  {item.subItems ? (
                    <>
                      <ListItemButton
                        onClick={() => handleSubMenuToggle(item.text)}
                        sx={{
                          minHeight: 48,
                          px: 2.5,
                          backgroundColor: isMenuWithSubItemsActive(item)
                            ? alpha(muiTheme.palette.primary.main, muiTheme.palette.mode === 'dark' ? 0.15 : 0.1)
                            : 'transparent',
                          borderRadius: '24px',
                          mx: open ? 1 : 'auto',
                          width: open ? 'auto' : 40,
                          justifyContent: open ? 'initial' : 'center',
                          '&:hover': {
                            backgroundColor: alpha(muiTheme.palette.primary.main, muiTheme.palette.mode === 'dark' ? 0.2 : 0.15),
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color: isMenuWithSubItemsActive(item)
                              ? muiTheme.palette.primary.main
                              : muiTheme.palette.text.primary,
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          sx={{ 
                            opacity: open ? 1 : 0,
                            '& .MuiTypography-root': {
                              color: isMenuWithSubItemsActive(item) 
                                ? muiTheme.palette.primary.main 
                                : muiTheme.palette.text.primary,
                            }
                          }}
                        />
                        {open && (
                          <Box sx={{ color: muiTheme.palette.text.primary }}>
                            {expandedItems[item.text] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </Box>
                        )}
                      </ListItemButton>
                      <Collapse in={open && expandedItems[item.text]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.text}
                              href={subItem.href || ''}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              <ListItemButton
                                sx={{
                                  pl: 4,
                                  py: 1,
                                  minHeight: 40,
                                  backgroundColor: isPathActive(subItem.href || '')
                                    ? (theme) => `linear-gradient(90deg, ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.25 : 0.15)} 0%, ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.15 : 0.05)} 100%)`
                                    : 'transparent',
                                  borderRadius: '12px',
                                  mx: 1,
                                  position: 'relative',
                                  '&:hover': {
                                    backgroundColor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                                  },
                                  '&::before': isPathActive(subItem.href || '') ? {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    top: '25%',
                                    height: '50%',
                                    width: '4px',
                                    backgroundColor: muiTheme.palette.primary.main,
                                    borderRadius: '0 4px 4px 0',
                                  } : {},
                                  transition: 'all 0.2s ease',
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    minWidth: 0,
                                    mr: 2,
                                    color: isPathActive(subItem.href || '')
                                      ? muiTheme.palette.primary.main
                                      : muiTheme.palette.text.secondary,
                                    transition: 'all 0.2s ease',
                                  }}
                                >
                                  {subItem.icon}
                                </ListItemIcon>
                                <ListItemText
                                  primary={subItem.text}
                                  primaryTypographyProps={{
                                    fontSize: 14,
                                    fontWeight: isPathActive(subItem.href || '') ? 600 : 400,
                                    color: isPathActive(subItem.href || '') 
                                      ? muiTheme.palette.primary.main 
                                      : muiTheme.palette.text.secondary,
                                    transition: 'all 0.2s ease',
                                  }}
                                />
                              </ListItemButton>
                            </Link>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  ) : (
                    <Link
                      href={item.href || ''}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          px: 2.5,
                          backgroundColor: isMenuWithSubItemsActive(item)
                            ? (theme) => `linear-gradient(90deg, ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.25 : 0.15)} 0%, ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.15 : 0.05)} 100%)`
                            : 'transparent',
                          borderRadius: '12px',
                          mx: open ? 1 : 'auto',
                          width: open ? 'auto' : 40,
                          justifyContent: open ? 'initial' : 'center',
                          position: 'relative',
                          '&:hover': {
                            backgroundColor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                          },
                          '&::before': isMenuWithSubItemsActive(item) ? {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: '25%',
                            height: '50%',
                            width: '4px',
                            backgroundColor: muiTheme.palette.primary.main,
                            borderRadius: '0 4px 4px 0',
                          } : {},
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color: isMenuWithSubItemsActive(item)
                              ? muiTheme.palette.primary.main
                              : muiTheme.palette.text.primary,
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          sx={{ 
                            opacity: open ? 1 : 0,
                            '& .MuiTypography-root': {
                              color: isMenuWithSubItemsActive(item) 
                                ? muiTheme.palette.primary.main 
                                : muiTheme.palette.text.primary,
                              fontWeight: isMenuWithSubItemsActive(item) ? 600 : 400,
                              transition: 'all 0.2s ease',
                            }
                          }}
                        />
                      </ListItemButton>
                    </Link>
                  )}
                </Box>
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
            <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary, display: 'block', mb: 0.5 }}>
              &copy; {new Date().getFullYear()} PT. SPKN
            </Typography>
            <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary, display: 'block' }}>
              v1.0.0
            </Typography>
          </Box>
        </Box>
      </Drawer>
      
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
            boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
            background: (theme) => 
              theme.palette.mode === 'light' 
                ? 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)' 
                : 'linear-gradient(180deg, #1e1e1e 0%, #121212 100%)',
          },
        }}
      >
        {drawer}
      </Drawer>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: { xs: 8, sm: 9 },
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <NotificationProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </NotificationProvider>
  );
} 