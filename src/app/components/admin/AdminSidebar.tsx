'use client';

import React, { memo, useCallback } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  ShoppingBag as ProductsIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  LocalShipping as ShippingIcon,
  Receipt as OrdersIcon,
  BarChart as ReportsIcon,
  Security as SecurityIcon,
  Backup as BackupIcon,
  BugReport as BugReportIcon,
  Notifications as NotificationsIcon,
  Payments as PaymentsIcon,
  Discount as DiscountIcon,
  Feedback as FeedbackIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  path?: string;
  items?: MenuItem[];
}

interface AdminSidebarProps {
  open: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: number;
  currentPath: string;
}

const AdminSidebar = memo(({ open, handleDrawerToggle, drawerWidth, currentPath }: AdminSidebarProps) => {
  const theme = useTheme();
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({});

  const handleMenuToggle = useCallback((id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const isMenuActive = useCallback((path?: string): boolean => {
    if (!path) return false;
    return currentPath === path;
  }, [currentPath]);

  const isMenuWithSubItemsActive = useCallback((items?: MenuItem[]): boolean => {
    if (!items) return false;
    return items.some((item) => {
      const pathMatch = currentPath === item.path;
      const hasSubItems = item.items && item.items.length > 0;
      const subItemsMatch = hasSubItems ? isMenuWithSubItemsActive(item.items) : false;
      return pathMatch || subItemsMatch;
    });
  }, [currentPath]);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/admin',
    },
    {
      id: 'products',
      title: 'Produk',
      icon: <ProductsIcon />,
      items: [
        {
          id: 'product-list',
          title: 'Daftar Produk',
          icon: <ProductsIcon />,
          path: '/admin/products',
        },
        {
          id: 'categories',
          title: 'Kategori',
          icon: <CategoryIcon />,
          path: '/admin/categories',
        },
        {
          id: 'inventory',
          title: 'Inventaris',
          icon: <InventoryIcon />,
          path: '/admin/inventory',
        },
      ],
    },
    {
      id: 'orders',
      title: 'Pesanan',
      icon: <OrdersIcon />,
      items: [
        {
          id: 'order-list',
          title: 'Daftar Pesanan',
          icon: <OrdersIcon />,
          path: '/admin/orders',
        },
        {
          id: 'shipping',
          title: 'Pengiriman',
          icon: <ShippingIcon />,
          path: '/admin/shipping',
        },
      ],
    },
    {
      id: 'customers',
      title: 'Pelanggan',
      icon: <PeopleIcon />,
      path: '/admin/customers',
    },
    {
      id: 'reports',
      title: 'Laporan',
      icon: <ReportsIcon />,
      path: '/admin/reports',
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: <DiscountIcon />,
      items: [
        {
          id: 'promotions',
          title: 'Promosi',
          icon: <DiscountIcon />,
          path: '/admin/promotions',
        },
        {
          id: 'feedback',
          title: 'Ulasan',
          icon: <FeedbackIcon />,
          path: '/admin/feedback',
        },
      ],
    },
    {
      id: 'payments',
      title: 'Pembayaran',
      icon: <PaymentsIcon />,
      path: '/admin/payments',
    },
    {
      id: 'system',
      title: 'Sistem',
      icon: <SettingsIcon />,
      items: [
        {
          id: 'settings',
          title: 'Pengaturan',
          icon: <SettingsIcon />,
          path: '/admin/settings',
        },
        {
          id: 'security',
          title: 'Keamanan',
          icon: <SecurityIcon />,
          path: '/admin/security',
        },
        {
          id: 'backup',
          title: 'Backup',
          icon: <BackupIcon />,
          path: '/admin/backup',
        },
        {
          id: 'maintenance',
          title: 'Pemeliharaan',
          icon: <BugReportIcon />,
          path: '/admin/maintenance',
        },
        {
          id: 'notifications',
          title: 'Notifikasi',
          icon: <NotificationsIcon />,
          path: '/admin/notifications',
        },
      ],
    },
    {
      id: 'help',
      title: 'Bantuan',
      icon: <HelpIcon />,
      path: '/admin/help',
    },
  ];

  const renderMenuItem = (item: MenuItem) => {
    const isActive = isMenuActive(item.path);
    const hasSubItems = item.items && item.items.length > 0;
    const isSubMenuActive = hasSubItems && isMenuWithSubItemsActive(item.items);
    const isOpen = openMenus[item.id] || isSubMenuActive;

    return (
      <React.Fragment key={item.id}>
        <ListItem disablePadding>
          {item.path && !hasSubItems ? (
            <ListItemButton
              component={Link}
              href={item.path}
              sx={{
                minHeight: 48,
                px: 2.5,
                borderRadius: '8px',
                mb: 0.5,
                backgroundColor: isActive
                  ? alpha(theme.palette.primary.main, 0.1)
                  : 'transparent',
                color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 2,
                  color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={() => handleMenuToggle(item.id)}
              sx={{
                minHeight: 48,
                px: 2.5,
                borderRadius: '8px',
                mb: 0.5,
                backgroundColor: isSubMenuActive
                  ? alpha(theme.palette.primary.main, 0.1)
                  : 'transparent',
                color: isSubMenuActive ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 2,
                  color: isSubMenuActive ? theme.palette.primary.main : theme.palette.text.primary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          )}
        </ListItem>
        {hasSubItems && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
              {item.items?.map(renderMenuItem)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            style={{ marginRight: '10px' }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
          >
            Percetakan
          </Typography>
        </Box>
      </Box>
      <Box sx={{ overflow: 'auto', flexGrow: 1, p: 2 }}>
        <List>
          {menuItems.map(renderMenuItem)}
        </List>
      </Box>
      <Divider sx={{ opacity: 0.1 }} />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Percetakan Admin
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: theme.palette.background.default,
            borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: theme.palette.background.default,
            borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
});

// Memastikan nama tampil di React DevTools
AdminSidebar.displayName = 'AdminSidebar';

export default AdminSidebar; 