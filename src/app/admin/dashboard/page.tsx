"use client";

import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useProducts } from "@/app/hooks/useProducts";
import { useNotificationDemo } from "@/app/hooks/useNotificationDemo";
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
  ListItemIcon,
  Button,
  LinearProgress,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  AttachMoney as MoneyIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  ShoppingCart as CartIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Person as PersonIcon,
  ViewList as ViewListIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  Visibility as VisibilityIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import AdminSkeleton from "@/app/components/admin/AdminSkeleton";
import Link from "next/link";
import { useNotifications } from "@/app/contexts/NotificationContext";
import SecurityStatus from '@/app/components/admin/SecurityStatus';
import RedisStatusWidget from '@/app/components/admin/RedisStatusWidget';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    products,
    loading: productsLoading,
    error,
    getProducts,
  } = useProducts();
  const { addNotification } = useNotifications();
  const theme = useTheme();
  const muiTheme = useMuiTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Gunakan hook notifikasi demo
  useNotificationDemo();

  useEffect(() => {
    if (status === "authenticated") {
      getProducts(1, 1000);
    }
  }, [status, getProducts]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (status === "loading" || productsLoading) {
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

  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  // Hitung statistik - with null checks to prevent errors
  const totalProducts = Array.isArray(products) ? products.length : 0;
  const totalCategories = Array.isArray(products)
    ? new Set(products.map((p) => p.category)).size
    : 0;
  const totalValue = Array.isArray(products)
    ? products.reduce((sum, p) => sum + (p.price || 0), 0)
    : 0;
  const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;

  // Hitung produk tanpa kategori, gambar, dan harga
  const productsWithoutCategory = products.filter((p) => !p.category).length;
  const productsWithoutImage = products.filter((p) => !p.imageUrl).length;
  const productsWithoutPrice = products.filter((p) => !p.price).length;

  // Hitung persentase kelengkapan data
  const completionPercentage =
    totalProducts > 0
      ? 100 -
        ((productsWithoutCategory +
          productsWithoutImage +
          productsWithoutPrice) /
          (totalProducts * 3)) *
          100
      : 0;

  // Data statistik untuk cards
  const statsCards = [
    {
      title: "Total Produk",
      value: totalProducts,
      icon: <InventoryIcon />,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
      change: "+5%",
      changeType: "increase",
      link: "/admin/products",
    },
    {
      title: "Kategori",
      value: totalCategories,
      icon: <CategoryIcon />,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
      change: "+2",
      changeType: "increase",
      link: "/admin/products",
    },
    {
      title: "Total Nilai",
      value: `Rp ${totalValue.toLocaleString()}`,
      icon: <MoneyIcon />,
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
      change: "+12%",
      changeType: "increase",
      link: "/admin/products",
    },
    {
      title: "Rata-rata Harga",
      value: `Rp ${averagePrice.toLocaleString()}`,
      icon: <TrendingUpIcon />,
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.1),
      change: "-3%",
      changeType: "decrease",
      link: "/admin/products",
    },
  ];

  // Ambil 5 produk termahal
  const topProducts = [...products]
    .sort((a, b) => (b.price || 0) - (a.price || 0))
    .slice(0, 5);

  // Ambil 5 produk terbaru (berdasarkan ID, asumsi ID lebih besar = lebih baru)
  const recentProducts = [...products]
    .sort((a, b) => {
      const idA = a.id ? parseInt(a.id.toString()) : 0;
      const idB = b.id ? parseInt(b.id.toString()) : 0;
      return idB - idA;
    })
    .slice(0, 5);

  // Fungsi untuk menampilkan kartu statistik
  const renderStatCard = (stat: any) => (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        boxShadow: theme.shadows[2],
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {stat.title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              {stat.value}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {stat.changeType === "increase" ? (
                <ArrowUpwardIcon
                  fontSize="small"
                  sx={{ color: "success.main", mr: 0.5 }}
                />
              ) : (
                <ArrowDownwardIcon
                  fontSize="small"
                  sx={{ color: "error.main", mr: 0.5 }}
                />
              )}
              <Typography
                variant="body2"
                sx={{
                  color:
                    stat.changeType === "increase"
                      ? "success.main"
                      : "error.main",
                  fontWeight: "medium",
                }}
              >
                {stat.change} dari bulan lalu
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: stat.bgColor,
                color: stat.color,
              }}
            >
              {stat.icon}
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            component={Link}
            href={stat.link}
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: "medium",
            }}
          >
            Lihat Detail
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  // Fungsi untuk menambahkan notifikasi demo
  const handleAddDemoNotification = () => {
    addNotification({
      title: "Notifikasi Demo",
      message:
        "Ini adalah contoh notifikasi yang dapat Anda gunakan untuk memberikan informasi penting kepada pengguna.",
      type: "info",
    });
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  color: muiTheme.palette.text.primary,
                }}
              >
                Selamat Datang, {session?.user?.name || "Admin"}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {currentTime.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false
                })} WIB
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "flex-end" },
              }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                component={Link}
                href="/admin/products/add"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  boxShadow: theme.shadows[3],
                }}
              >
                Tambah Produk
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={`stat-card-${stat.title}`}>
              {renderStatCard(stat)}
            </Grid>
          ))}
        </Grid>

        {/* Data Completion */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: theme.shadows[2] }}>
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Kelengkapan Data Produk
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {completionPercentage.toFixed(1)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={completionPercentage}
              sx={{
                height: 10,
                borderRadius: 5,
                mb: 2,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              }}
            />
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: "error.main",
                      mr: 1,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Produk tanpa kategori: {productsWithoutCategory}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: "warning.main",
                      mr: 1,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Produk tanpa gambar: {productsWithoutImage}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: "info.main",
                      mr: 1,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Produk tanpa harga: {productsWithoutPrice}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Top Products */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: theme.shadows[2],
              }}
            >
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Produk Termahal
                  </Typography>
                }
                action={
                  <Tooltip title="Muat ulang data">
                    <IconButton onClick={() => getProducts()} size="small">
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                }
                sx={{ pb: 0 }}
              />
              <CardContent sx={{ pt: 2 }}>
                <List sx={{ p: 0 }}>
                  {topProducts.map((product, index) => (
                    <Fragment key={`top-product-${product._id}`}>
                      <ListItem
                        sx={{
                          px: 2,
                          py: 1.5,
                          borderRadius: 2,
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                          },
                        }}
                        secondaryAction={
                          <Stack direction="row" spacing={1}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold", color: "primary.main" }}
                            >
                              Rp {product.price?.toLocaleString()}
                            </Typography>
                            <IconButton
                              size="small"
                              component={Link}
                              href={`/admin/products/edit/${product._id}`}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        }
                      >
                        <ListItemIcon>
                          <Avatar
                            sx={{
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                            }}
                          >
                            {index + 1}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={product.name}
                          secondary={product.category || "Tanpa Kategori"}
                          primaryTypographyProps={{
                            fontWeight: "medium",
                            sx: {
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              pr: 15, // memberikan ruang untuk harga dan tombol
                            },
                          }}
                          secondaryTypographyProps={{
                            sx: {
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            },
                          }}
                        />
                      </ListItem>
                      {index < topProducts.length - 1 && (
                        <Divider component="li" variant="inset" />
                      )}
                    </Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Products */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: theme.shadows[2],
              }}
            >
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Produk Terbaru
                  </Typography>
                }
                action={
                  <Button
                    size="small"
                    startIcon={<ViewListIcon />}
                    component={Link}
                    href="/admin/products"
                    sx={{ textTransform: "none" }}
                  >
                    Lihat Semua
                  </Button>
                }
                sx={{ pb: 0 }}
              />
              <CardContent sx={{ pt: 2 }}>
                <List sx={{ p: 0 }}>
                  {recentProducts.map((product, index) => (
                    <Fragment key={`recent-product-${product._id}`}>
                      <ListItem
                        sx={{
                          px: 2,
                          py: 1.5,
                          borderRadius: 2,
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                          },
                        }}
                        secondaryAction={
                          <Stack direction="row" spacing={1}>
                            <Tooltip title="Lihat Produk">
                              <IconButton
                                size="small"
                                component={Link}
                                href={`/produk/${product._id}`}
                                target="_blank"
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Produk">
                              <IconButton
                                size="small"
                                component={Link}
                                href={`/admin/products/edit/${product._id}`}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        }
                      >
                        <ListItemIcon>
                          <Avatar
                            src={product.imageUrl || undefined}
                            alt={product.name}
                            sx={{
                              bgcolor: !product.imageUrl
                                ? alpha(theme.palette.info.main, 0.1)
                                : undefined,
                              color: !product.imageUrl
                                ? theme.palette.info.main
                                : undefined,
                            }}
                          >
                            {!product.imageUrl && <CartIcon />}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={product.name}
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {product.category || "Tanpa Kategori"} • Rp{" "}
                              {product.price?.toLocaleString() || "Tanpa Harga"}
                            </Typography>
                          }
                          primaryTypographyProps={{ fontWeight: "medium" }}
                        />
                      </ListItem>
                      {index < recentProducts.length - 1 && (
                        <Divider component="li" variant="inset" />
                      )}
                    </Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 2,
              color: muiTheme.palette.text.primary,
            }}
          >
            Aksi Cepat
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Card
                component={Link}
                href="/admin/products/add"
                sx={{
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: 3,
                  boxShadow: theme.shadows[2],
                  transition: "transform 0.2s, box-shadow 0.2s",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    width: 56,
                    height: 56,
                    mb: 2,
                  }}
                >
                  <AddIcon />
                </Avatar>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "medium",
                    color: muiTheme.palette.text.primary,
                  }}
                >
                  Tambah Produk
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                component={Link}
                href="/admin/users"
                sx={{
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: 3,
                  boxShadow: theme.shadows[2],
                  transition: "transform 0.2s, box-shadow 0.2s",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                    width: 56,
                    height: 56,
                    mb: 2,
                  }}
                >
                  <PersonIcon />
                </Avatar>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "medium",
                    color: muiTheme.palette.text.primary,
                  }}
                >
                  Kelola Pengguna
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                component={Link}
                href="/admin/settings"
                sx={{
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: 3,
                  boxShadow: theme.shadows[2],
                  transition: "transform 0.2s, box-shadow 0.2s",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main,
                    width: 56,
                    height: 56,
                    mb: 2,
                  }}
                >
                  <SettingsIcon />
                </Avatar>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "medium",
                    color: muiTheme.palette.text.primary,
                  }}
                >
                  Pengaturan
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card
                onClick={handleAddDemoNotification}
                sx={{
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: 3,
                  boxShadow: theme.shadows[2],
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    color: theme.palette.info.main,
                    width: 56,
                    height: 56,
                    mb: 2,
                  }}
                >
                  <NotificationsIcon />
                </Avatar>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "medium",
                    color: muiTheme.palette.text.primary,
                  }}
                >
                  Uji Notifikasi
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Status Keamanan dan Redis */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            mt: 4,
            color: muiTheme.palette.text.primary,
          }}
        >
          Status Keamanan
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <SecurityStatus />
          </Grid>
          <Grid item xs={12} md={4}>
            <RedisStatusWidget />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
