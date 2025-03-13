"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Breadcrumbs,
  Link as MuiLink,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Card,
  CardContent,
  Chip,
  Divider,
  ImageList,
  ImageListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Skeleton,
  CardMedia,
  Rating,
  IconButton,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import StarIcon from "@mui/icons-material/Star";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckIcon from "@mui/icons-material/Check";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { ProductDetailIllustration } from "../../components/illustrations";
import ProductCard from "../../components/ProductCard";
import { Product } from "@/app/types";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

// Format harga ke format Rupiah
function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Fungsi untuk membersihkan CSS Elementor dan HTML tags
function cleanElementorCSS(text: string): string {
  if (!text) return "";

  return (
    text
      // Hapus CSS Elementor
      .replace(/\/\*![\s\S]*?\*\/[\s\S]*?{[\s\S]*?}/g, "")
      // Hapus style tags dan kontennya
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      // Hapus link stylesheet Elementor
      .replace(/<link[^>]*elementor[^>]*>/gi, "")
      // Bersihkan HTML lainnya jika diperlukan
      .trim()
  );
}

// Komponen ProductDetailSkeleton
const ProductDetailSkeleton = () => {
  return (
    <Box sx={{ bgcolor: "#F5F7FA", minHeight: "100vh" }}>
      {/* Header Section Skeleton */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Skeleton
            variant="text"
            width={300}
            height={20}
            sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 3 }}
          />
          <Skeleton
            variant="text"
            width="70%"
            height={60}
            sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width={100}
            height={32}
            sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
          />
        </Container>
      </Box>

      {/* Main Content Skeleton */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Left Column Skeleton */}
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                mb: 4,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Skeleton
                  variant="rectangular"
                  height={450}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                />
                <Box sx={{ p: 2, display: "flex", gap: 1, overflowX: "auto" }}>
                  {Array.from(new Array(5)).map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      width={80}
                      height={80}
                      sx={{
                        bgcolor: "rgba(0,0,0,0.07)",
                        borderRadius: 2,
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Skeleton
                        variant="text"
                        width={150}
                        height={48}
                        sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                      />
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={24}
                        sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Skeleton
                        variant="circular"
                        width={40}
                        height={40}
                        sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                      />
                      <Skeleton
                        variant="circular"
                        width={40}
                        height={40}
                        sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                      />
                    </Box>
                  </Box>
                  <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={48}
                      sx={{ bgcolor: "rgba(0,0,0,0.07)", borderRadius: 2 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={48}
                      sx={{ bgcolor: "rgba(0,0,0,0.07)", borderRadius: 2 }}
                    />
                  </Stack>
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
                <Skeleton
                  variant="text"
                  width={200}
                  height={56}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                />
              </Box>
              <CardContent sx={{ p: 4 }}>
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="95%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="80%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 3 }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", borderRadius: 2, mb: 3 }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column Skeleton */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                borderRadius: 3,
                mb: 4,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <Box sx={{ bgcolor: "primary.main", py: 2, px: 3 }}>
                <Skeleton
                  variant="text"
                  width={200}
                  height={32}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
                />
              </Box>
              <CardContent sx={{ p: 0 }}>
                {Array.from(new Array(6)).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      px: 3,
                      py: 2,
                      borderBottom: index < 5 ? "1px solid" : "none",
                      borderColor: "divider",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      variant="circular"
                      width={32}
                      height={32}
                      sx={{ bgcolor: "rgba(0,0,0,0.07)", mr: 2 }}
                    />
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        variant="text"
                        width="30%"
                        height={16}
                        sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        width="60%"
                        height={24}
                        sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                      />
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>

            <Card
              sx={{
                borderRadius: 3,
                mb: 4,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Skeleton
                    variant="circular"
                    width={24}
                    height={24}
                    sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                  />
                  <Skeleton
                    variant="text"
                    width={150}
                    height={32}
                    sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                  />
                </Box>
                {Array.from(new Array(4)).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Skeleton
                      variant="circular"
                      width={20}
                      height={20}
                      sx={{ bgcolor: "rgba(0,0,0,0.07)", mr: 2 }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                      sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productRating, setProductRating] = useState<number>(4.5); // Default rating
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        // Bersihkan deskripsi dari CSS Elementor
        if (data.product.description) {
          data.product.description = cleanElementorCSS(
            data.product.description
          );
        }

        setProduct(data.product);
        // Set gambar utama sebagai gambar yang dipilih di awal
        if (data.product.imageUrl) {
          setSelectedImage(data.product.imageUrl);
        } else if (data.product.images && data.product.images.length > 0) {
          setSelectedImage(data.product.images[0]);
        }

        // Set produk terkait
        if (data.relatedProducts) {
          setRelatedProducts(data.relatedProducts);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Produk tidak ditemukan
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/produk"
          sx={{ mt: 2 }}
        >
          Kembali ke Daftar Produk
        </Button>
      </Container>
    );
  }

  // Gunakan gambar asli produk dan fallback ke ilustrasi jika tidak ada
  const hasImages = product.images && product.images.length > 0;

  return (
    <Box sx={{ bgcolor: "#F5F7FA", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: -100,
            top: "50%",
            transform: "translateY(-50%)",
            width: "600px",
            height: "600px",
            opacity: 0.1,
            display: { xs: "none", md: "block" },
          }}
        >
          <ProductDetailIllustration index={0} />
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 3 }}
          >
            <MuiLink
              component={Link}
              href="/"
              color="inherit"
              underline="hover"
            >
              Beranda
            </MuiLink>
            <MuiLink
              component={Link}
              href="/produk"
              color="inherit"
              underline="hover"
            >
              Produk
            </MuiLink>
            <Typography color="white">{product.name}</Typography>
          </Breadcrumbs>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              maxWidth: "800px",
            }}
          >
            {product.name}
          </Typography>
          <Chip
            label={product.category}
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              mb: 2,
            }}
          />
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Left Column - Gambar dan Aksi */}
          <Grid item xs={12} md={7}>
            <Card sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                {hasImages ? (
                  <Box sx={{ position: "relative" }}>
                    {/* Main Image Display with Zoom Effect */}
                    <Box
                      sx={{
                        height: 450,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 2,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        p: 2,
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
                        "&:hover .zoom-icon": {
                          opacity: 1,
                        },
                      }}
                    >
                      <img
                        src={selectedImage || product.imageUrl}
                        alt={product.name}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          transition: "transform 0.3s ease",
                        }}
                      />
                      <Box
                        className="zoom-icon"
                        onClick={() => setZoomOpen(true)}
                        sx={{
                          position: "absolute",
                          right: 16,
                          bottom: 16,
                          bgcolor: "rgba(0,0,0,0.6)",
                          color: "white",
                          borderRadius: "50%",
                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: "primary.main",
                          },
                        }}
                      >
                        <ZoomInIcon />
                      </Box>
                    </Box>

                    {/* Zoom Modal */}
                    <Modal
                      open={zoomOpen}
                      onClose={() => setZoomOpen(false)}
                      aria-labelledby="image-zoom-modal"
                      aria-describedby="zoomed-product-image"
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "90%",
                          maxWidth: 1000,
                          maxHeight: "90vh",
                          bgcolor: "background.paper",
                          boxShadow: 24,
                          p: 4,
                          borderRadius: 2,
                          outline: "none",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => setZoomOpen(false)}
                          sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            bgcolor: "rgba(0,0,0,0.1)",
                            "&:hover": {
                              bgcolor: "rgba(0,0,0,0.2)",
                            },
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "auto",
                          }}
                        >
                          <img
                            src={selectedImage || product.imageUrl}
                            alt={product.name}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "80vh",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                      </Box>
                    </Modal>

                    {/* Thumbnail Navigation with Arrows */}
                    {product.images && product.images.length > 1 && (
                      <Box sx={{ position: "relative", mt: 2, mb: 4 }}>
                        {/* Left Navigation Arrow */}
                        <IconButton
                          sx={{
                            position: "absolute",
                            left: -20,
                            top: "50%",
                            transform: "translateY(-50%)",
                            bgcolor: "background.paper",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            zIndex: 2,
                            "&:hover": {
                              bgcolor: "primary.main",
                              color: "white",
                            },
                          }}
                          size="small"
                        >
                          <ArrowBackIosNewIcon fontSize="small" />
                        </IconButton>

                        {/* Thumbnails */}
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            overflowX: "auto",
                            px: 2,
                            py: 1,
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": {
                              display: "none",
                            },
                            mx: 2,
                          }}
                        >
                          {product.images.map((image, index) => (
                            <Box
                              key={index}
                              onClick={() => setSelectedImage(image)}
                              sx={{
                                width: 80,
                                height: 80,
                                flexShrink: 0,
                                cursor: "pointer",
                                borderRadius: 2,
                                overflow: "hidden",
                                border:
                                  selectedImage === image
                                    ? "2px solid"
                                    : "2px solid transparent",
                                borderColor:
                                  selectedImage === image
                                    ? "primary.main"
                                    : "transparent",
                                boxShadow:
                                  selectedImage === image
                                    ? "0 0 0 2px rgba(25, 118, 210, 0.2)"
                                    : "none",
                                transition: "all 0.2s ease",
                                position: "relative",
                                "&:hover": {
                                  transform: "translateY(-4px)",
                                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                },
                                "&:hover::after": {
                                  opacity: selectedImage !== image ? 0.3 : 0,
                                },
                                "&::after": {
                                  content: '""',
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: "rgba(0,0,0,0)",
                                  opacity: 0,
                                  transition: "opacity 0.2s ease",
                                },
                              }}
                            >
                              <img
                                src={image}
                                alt={`${product.name} ${index + 1}`}
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          ))}
                        </Box>

                        {/* Right Navigation Arrow */}
                        <IconButton
                          sx={{
                            position: "absolute",
                            right: -20,
                            top: "50%",
                            transform: "translateY(-50%)",
                            bgcolor: "background.paper",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            zIndex: 2,
                            "&:hover": {
                              bgcolor: "primary.main",
                              color: "white",
                            },
                          }}
                          size="small"
                        >
                          <ArrowForwardIosIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ height: 400, position: "relative", mb: 4 }}>
                    <ProductDetailIllustration index={0} />
                  </Box>
                )}
                <Typography
                  variant="h4"
                  color="primary"
                  fontWeight="bold"
                  gutterBottom
                >
                  {formatPrice(product.price)}
                </Typography>

                {/* Feature-specific card with checkmarks */}
                <Card
                  sx={{
                    mt: 3,
                    mb: 3,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "none",
                    overflow: "visible",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <VerifiedUserIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Fitur Produk
                      </Typography>
                    </Box>

                    <List disablePadding>
                      {[
                        {
                          text: "Kualitas Premium",
                          icon: (
                            <CheckIcon
                              fontSize="small"
                              sx={{ color: "success.main" }}
                            />
                          ),
                        },
                        {
                          text: "Garansi Produk",
                          icon: (
                            <VerifiedUserIcon
                              fontSize="small"
                              sx={{ color: "info.main" }}
                            />
                          ),
                        },
                        {
                          text: "Pengiriman Cepat",
                          icon: (
                            <LocalShippingIcon
                              fontSize="small"
                              sx={{ color: "warning.main" }}
                            />
                          ),
                        },
                        {
                          text: "Layanan Purna Jual",
                          icon: (
                            <AssignmentTurnedInIcon
                              fontSize="small"
                              sx={{ color: "error.main" }}
                            />
                          ),
                        },
                      ].map((feature, index) => (
                        <ListItem
                          key={index}
                          disablePadding
                          sx={{
                            py: 1,
                            borderBottom: index < 3 ? "1px dashed" : "none",
                            borderColor: "divider",
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {feature.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={feature.text}
                            primaryTypographyProps={{
                              variant: "body2",
                              fontWeight: 500,
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<WhatsAppIcon />}
                    fullWidth
                    component="a"
                    href="https://wa.me/6281234567890?text=Saya tertarik dengan produk ini: "
                    target="_blank"
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: "bold",
                      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px rgba(76, 175, 80, 0.3)",
                      },
                    }}
                  >
                    Chat WhatsApp
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    fullWidth
                    component={Link}
                    href="/kontak"
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: "bold",
                      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3)",
                      },
                    }}
                  >
                    Pesan Sekarang
                  </Button>
                </Stack>

                {/* Add this after the action buttons */}
                <Box
                  sx={{
                    mt: 3,
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    color="text.primary"
                  >
                    Bagikan Produk Ini
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {[
                      { color: "#3b5998", icon: "f", label: "Facebook" },
                      { color: "#1da1f2", icon: "t", label: "Twitter" },
                      {
                        color: "#25D366",
                        icon: <WhatsAppIcon fontSize="small" />,
                        label: "WhatsApp",
                      },
                      { color: "#E60023", icon: "p", label: "Pinterest" },
                    ].map((social, index) => (
                      <Tooltip
                        key={index}
                        title={social.label}
                        arrow
                        placement="top"
                      >
                        <IconButton
                          sx={{
                            bgcolor: social.color,
                            color: "white",
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            "&:hover": {
                              bgcolor: social.color,
                              opacity: 0.9,
                              transform: "translateY(-3px) scale(1.1)",
                              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                            },
                            transition: "all 0.2s ease",
                          }}
                          size="small"
                        >
                          {typeof social.icon === "string" ? (
                            <Box
                              component="span"
                              sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                            >
                              {social.icon}
                            </Box>
                          ) : (
                            social.icon
                          )}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Deskripsi Produk
                </Typography>
                <Divider sx={{ my: 2 }} />
                {product.description ? (
                  <Box
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                      "& img": {
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: 1,
                        my: 2,
                      },
                      "& p": {
                        mb: 2,
                      },
                      "& h1, & h2, & h3, & h4, & h5, & h6": {
                        color: "text.primary",
                        fontWeight: "bold",
                        mt: 3,
                        mb: 2,
                      },
                      "& ul, & ol": {
                        pl: 3,
                        mb: 2,
                      },
                      "& li": {
                        mb: 1,
                      },
                      "& a": {
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      },
                      "& blockquote": {
                        borderLeft: "4px solid",
                        borderColor: "divider",
                        pl: 2,
                        py: 1,
                        my: 2,
                        fontStyle: "italic",
                        bgcolor: "background.paper",
                        borderRadius: 1,
                      },
                      "& table": {
                        width: "100%",
                        borderCollapse: "collapse",
                        my: 2,
                      },
                      "& th, & td": {
                        border: "1px solid",
                        borderColor: "divider",
                        p: 1,
                      },
                      "& th": {
                        bgcolor: "background.paper",
                        fontWeight: "bold",
                      },
                    }}
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                    }}
                  >
                    Tidak ada deskripsi tersedia untuk produk ini.
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                border: "1px solid",
                borderColor: "divider",
                mt: 4,
                mb: 4,
              }}
            >
              <Box
                sx={{
                  bgcolor: "warning.main",
                  py: 2,
                  px: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <StarIcon sx={{ color: "white" }} />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "white" }}
                >
                  Ulasan Pelanggan
                </Typography>
              </Box>
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 4,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: "warning.main",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        boxShadow: "0 4px 12px rgba(255, 152, 0, 0.3)",
                      }}
                    >
                      <Typography variant="h4" fontWeight="bold" lineHeight={1}>
                        {"4.5"}
                      </Typography>
                      <Box sx={{ display: "flex", mt: 0.5 }}>
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            sx={{ fontSize: "0.6rem", color: "white" }}
                          />
                        ))}
                      </Box>
                    </Box>
                    <Box>
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        color="text.primary"
                      >
                        Rating Keseluruhan
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Berdasarkan ulasan pelanggan kami
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: "warning.main",
                        color: "white",
                      },
                    }}
                  >
                    Tulis Ulasan
                  </Button>
                </Box>

                {/* Sample reviews */}
                {[
                  {
                    name: "Ahmad Fauzi",
                    rating: 5,
                    date: "12 Maret 2023",
                    comment:
                      "Produk berkualitas tinggi dan sesuai dengan deskripsi. Pengiriman cepat dan pelayanan sangat baik. Sangat merekomendasikan!",
                  },
                  {
                    name: "Siti Nurhaliza",
                    rating: 4,
                    date: "5 Februari 2023",
                    comment:
                      "Kualitas produk bagus dan sesuai dengan kebutuhan kami. Hanya saja pengiriman sedikit terlambat dari jadwal yang dijanjikan.",
                  },
                ].map((review, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: index === 0 ? 3 : 0,
                      pb: index === 0 ? 3 : 0,
                      borderBottom: index === 0 ? "1px solid" : "none",
                      borderColor: "divider",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            bgcolor: "primary.light",
                            color: "primary.main",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                          }}
                        >
                          {review.name.charAt(0)}
                        </Box>
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {review.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {review.date}
                          </Typography>
                        </Box>
                      </Box>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ pl: 6 }}
                    >
                      {review.comment}
                    </Typography>
                  </Box>
                ))}

                <Box
                  sx={{
                    mt: 4,
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: "1px dashed",
                    borderColor: "divider",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    color="text.primary"
                    gutterBottom
                  >
                    Sudah menggunakan produk ini?
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Bagikan pengalaman Anda dengan pelanggan lain
                  </Typography>
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<StarIcon />}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      boxShadow: "0 4px 12px rgba(255, 152, 0, 0.2)",
                      "&:hover": {
                        boxShadow: "0 6px 16px rgba(255, 152, 0, 0.3)",
                      },
                    }}
                  >
                    Tulis Ulasan
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Informasi Produk */}
          <Grid item xs={12} md={5}>
            <Card sx={{ borderRadius: 3, mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Informasi Produk
                </Typography>
                <Divider sx={{ my: 2 }} />
                <TableContainer component={Paper} elevation={0}>
                  <Table>
                    <TableBody>
                      {product.author && (
                        <TableRow>
                          <TableCell
                            component="th"
                            sx={{ width: "40%", border: "none" }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  bgcolor: 'primary.light',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <PersonIcon fontSize="small" color="primary" />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                Penulis
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            <Typography variant="body2">
                              {product.author}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      {product.publisher && (
                        <TableRow>
                          <TableCell
                            component="th"
                            sx={{ width: "40%", border: "none" }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  bgcolor: 'primary.light',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <BusinessIcon fontSize="small" color="primary" />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                Penerbit
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            <Typography variant="body2">
                              {product.publisher}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      {product.level && (
                        <TableRow>
                          <TableCell
                            component="th"
                            sx={{ width: "40%", border: "none" }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  bgcolor: 'primary.light',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <SchoolIcon fontSize="small" color="primary" />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                Jenjang
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            <Typography variant="body2">
                              {product.level}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      {product.pages > 0 && (
                        <TableRow>
                          <TableCell
                            component="th"
                            sx={{ width: "40%", border: "none" }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  bgcolor: 'primary.light',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <MenuBookIcon fontSize="small" color="primary" />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                Jumlah Halaman
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            <Typography variant="body2">
                              {product.pages}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      {product.year && (
                        <TableRow>
                          <TableCell
                            component="th"
                            sx={{ width: "40%", border: "none" }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  bgcolor: 'primary.light',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <CalendarTodayIcon fontSize="small" color="primary" />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                Tahun Terbit
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            <Typography variant="body2">
                              {product.year}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      {product.size && (
                        <TableRow>
                          <TableCell
                            component="th"
                            sx={{ width: "40%", border: "none" }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  bgcolor: 'primary.light',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <AspectRatioIcon fontSize="small" color="primary" />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                Ukuran
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            <Typography variant="body2">
                              {product.size}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      {product.isbn && (
                        <TableRow>
                          <TableCell
                            component="th"
                            sx={{ width: "40%", border: "none" }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  bgcolor: 'primary.light',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <QrCodeIcon fontSize="small" color="primary" />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                ISBN
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ border: "none" }}>
                            <Typography variant="body2">
                              {product.isbn}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Related Products */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            gutterBottom
          >
            Produk Terkait
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item key={relatedProduct._id ? relatedProduct._id.toString() : relatedProduct.id} xs={12} sm={6} md={3} lg={3}>
                <ProductCard product={relatedProduct} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Card
          sx={{
            mt: 8,
            borderRadius: 3,
            bgcolor: "primary.main",
            color: "white",
            backgroundImage:
              "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)",
          }}
        >
          <CardContent sx={{ p: 6, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h3"
              fontWeight="bold"
              gutterBottom
            >
              Butuh Bantuan?
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{
                mb: 4,
                maxWidth: 600,
                mx: "auto",
                opacity: 0.9,
              }}
            >
              Tim kami siap membantu Anda untuk konsultasi dan pemesanan produk.
              Hubungi kami sekarang untuk mendapatkan penawaran terbaik.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<WhatsAppIcon />}
                component={Link}
                href="/kontak"
                sx={{
                  fontWeight: "bold",
                  py: 1.5,
                  px: 4,
                  bgcolor: "#25D366",
                  "&:hover": {
                    bgcolor: "#128C7E",
                  },
                }}
              >
                Chat WhatsApp
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                href="/kontak"
                sx={{
                  fontWeight: "bold",
                  py: 1.5,
                  px: 4,
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Hubungi Kami
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}