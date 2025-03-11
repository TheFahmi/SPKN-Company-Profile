'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useProducts } from '@/app/hooks/useProducts';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
  Avatar,
  ListItemIcon
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  AttachMoney as MoneyIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import AdminSkeleton from '@/app/components/admin/AdminSkeleton';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { products, loading: productsLoading, error, getProducts } = useProducts();

  useEffect(() => {
    if (status === 'authenticated') {
      getProducts(1, 1000);
    }
  }, [status, getProducts]);

  if (status === 'loading' || productsLoading) {
    return (
      <Container>
        <AdminSkeleton type="dashboard" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  // Hitung statistik - with null checks to prevent errors
  const totalProducts = Array.isArray(products) ? products.length : 0;
  const totalCategories = Array.isArray(products) ? new Set(products.map(p => p.category)).size : 0;
  const totalValue = Array.isArray(products) 
    ? products.reduce((sum, p) => sum + (p.price || 0), 0) 
    : 0;
  const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;

  // Data statistik untuk cards
  const statsCards = [
    {
      title: 'Total Produk',
      value: totalProducts,
      icon: <InventoryIcon sx={{ fontSize: 40 }} />,
      color: '#2196f3',
      description: 'Jumlah produk yang tersedia'
    },
    {
      title: 'Kategori',
      value: totalCategories,
      icon: <CategoryIcon sx={{ fontSize: 40 }} />,
      color: '#4caf50',
      description: 'Jumlah kategori produk'
    },
    {
      title: 'Total Nilai',
      value: `Rp ${totalValue.toLocaleString()}`,
      icon: <MoneyIcon sx={{ fontSize: 40 }} />,
      color: '#ff9800',
      description: 'Total nilai inventori'
    },
    {
      title: 'Rata-rata Harga',
      value: `Rp ${averagePrice.toLocaleString()}`,
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: '#e91e63',
      description: 'Rata-rata harga produk'
    }
  ];

  // Ambil 5 produk termahal
  const topProducts = [...products]
    .sort((a, b) => (b.price || 0) - (a.price || 0))
    .slice(0, 5);

  const renderStatCard = (title: string, value: string | number, icon: React.ReactNode) => (
    <Card sx={{ 
      height: '100%',
      backgroundColor: 'background.paper',
      '& .MuiCardContent-root': {
        backgroundColor: 'background.paper',
      }
    }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar sx={{ 
              bgcolor: 'primary.dark',
              color: 'primary.contrastText'
            }}>
              {icon}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              {value}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              {title}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box 
      component="main"
      sx={{ 
        backgroundColor: 'background.default', 
        minHeight: '100vh',
        color: 'text.primary',
        width: '100%',
        position: 'relative',
        '&.MuiBox-root': {
          backgroundColor: 'background.default',
        },
        '& > *': {
          backgroundColor: 'background.default',
        }
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          pt: 4, 
          pb: 4,
          backgroundColor: 'transparent',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Welcome Section */}
        <Box sx={{ 
          mb: 4,
          backgroundColor: 'transparent'
        }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
            Selamat Datang di Dashboard Admin
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            {session?.user?.email} | {new Date().toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              {renderStatCard(stat.title, stat.value, stat.icon)}
            </Grid>
          ))}
        </Grid>

        {/* Recent Products and Quick Stats */}
        <Grid container spacing={3}>
          {/* Top Products */}
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                backgroundColor: 'background.paper',
                '& > *': {
                  backgroundColor: 'background.paper',
                }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 2,
                backgroundColor: 'transparent'
              }}>
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                  Produk Termahal
                </Typography>
                <Tooltip title="Muat ulang data">
                  <IconButton 
                    onClick={() => getProducts()} 
                    size="small" 
                    sx={{ color: 'primary.main' }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <List sx={{ backgroundColor: 'background.paper' }}>
                {topProducts.map((product, index) => (
                  <div key={product.id}>
                    {index > 0 && <Divider />}
                    <ListItem
                      sx={{ 
                        backgroundColor: 'background.paper',
                        '&:hover': {
                          backgroundColor: darkMode => 
                            darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                      secondaryAction={
                        <Typography variant="body1" sx={{ color: 'primary.main' }}>
                          Rp {product.price?.toLocaleString()}
                        </Typography>
                      }
                    >
                      <ListItemIcon>
                        <Avatar sx={{ 
                          bgcolor: 'primary.dark',
                          color: 'primary.contrastText'
                        }}>
                          <CartIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={{ color: 'text.primary' }}>
                            {product.name}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ color: 'text.secondary' }}>
                            {product.category || 'Tanpa Kategori'}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                height: '100%',
                backgroundColor: 'background.paper',
                '& > *': {
                  backgroundColor: 'background.paper',
                }
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                Statistik Cepat
              </Typography>
              <List sx={{ backgroundColor: 'background.paper' }}>
                <ListItem sx={{ backgroundColor: 'background.paper' }}>
                  <ListItemText 
                    primary={
                      <Typography sx={{ color: 'text.primary' }}>
                        Produk Tanpa Kategori
                      </Typography>
                    }
                  />
                  <Typography sx={{ color: 'primary.main' }}>
                    {products.filter(p => !p.category).length}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem sx={{ backgroundColor: 'background.paper' }}>
                  <ListItemText 
                    primary={
                      <Typography sx={{ color: 'text.primary' }}>
                        Produk Tanpa Gambar
                      </Typography>
                    }
                  />
                  <Typography sx={{ color: 'primary.main' }}>
                    {products.filter(p => !p.imageUrl).length}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem sx={{ backgroundColor: 'background.paper' }}>
                  <ListItemText 
                    primary={
                      <Typography sx={{ color: 'text.primary' }}>
                        Produk Tanpa Harga
                      </Typography>
                    }
                  />
                  <Typography sx={{ color: 'primary.main' }}>
                    {products.filter(p => !p.price).length}
                  </Typography>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 