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
} from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { ProductDetailIllustration } from "../../components/illustrations";
import { Product } from "@/app/types";

// Format harga ke format Rupiah
function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Fungsi untuk membersihkan CSS Elementor dan HTML tags
function cleanElementorCSS(text: string): string {
  if (!text) return '';
  
  return text
    // Hapus CSS Elementor
    .replace(/\/\*![\s\S]*?\*\/[\s\S]*?{[\s\S]*?}/g, '')
    // Hapus style tags dan kontennya
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Hapus link stylesheet Elementor
    .replace(/<link[^>]*elementor[^>]*>/gi, '')
    // Bersihkan HTML lainnya jika diperlukan
    .trim();
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
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 3 }} 
          />
          <Skeleton 
            variant="text" 
            width="70%" 
            height={60} 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 2 }} 
          />
          <Skeleton 
            variant="rectangular" 
            width={100} 
            height={32} 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} 
          />
        </Container>
      </Box>

      {/* Main Content Skeleton */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Left Column Skeleton */}
          <Grid item xs={12} md={7}>
            <Card sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Skeleton 
                  variant="rectangular" 
                  height={400} 
                  sx={{ bgcolor: 'rgba(0,0,0,0.07)', mb: 2 }} 
                />
                <Box sx={{ display: 'flex', mb: 1 }}>
                  {Array.from(new Array(4)).map((_, index) => (
                    <Skeleton 
                      key={index}
                      variant="rectangular" 
                      width={80} 
                      height={80} 
                      sx={{ bgcolor: 'rgba(0,0,0,0.07)', mr: 1 }} 
                    />
                  ))}
                </Box>
                <Skeleton 
                  variant="text" 
                  width={200} 
                  height={48} 
                  sx={{ bgcolor: 'rgba(0,0,0,0.07)', mb: 2 }} 
                />
                <Stack direction="row" spacing={2}>
                  <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height={48} 
                    sx={{ bgcolor: 'rgba(0,0,0,0.07)' }} 
                  />
                  <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height={48} 
                    sx={{ bgcolor: 'rgba(0,0,0,0.07)' }} 
                  />
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Skeleton 
                  variant="text" 
                  width={200} 
                  height={32} 
                  sx={{ bgcolor: 'rgba(0,0,0,0.07)', mb: 2 }} 
                />
                <Skeleton 
                  variant="text" 
                  width="100%" 
                  height={20} 
                  sx={{ bgcolor: 'rgba(0,0,0,0.07)', mb: 1 }} 
                />
                <Skeleton 
                  variant="text" 
                  width="100%" 
                  height={20} 
                  sx={{ bgcolor: 'rgba(0,0,0,0.07)', mb: 1 }} 
                />
                <Skeleton 
                  variant="text" 
                  width="90%" 
                  height={20} 
                  sx={{ bgcolor: 'rgba(0,0,0,0.07)', mb: 1 }} 
                />
                <Skeleton 
                  variant="text" 
                  width="95%" 
                  height={20} 
                  sx={{ bgcolor: 'rgba(0,0,0,0.07)', mb: 1 }} 
                />
                <Skeleton 
                  variant="text" 
                  width="80%" 
                  height={20} 
                  sx={{ bgcolor: 'rgba(0,0,0,0.07)' }} 
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column Skeleton */}
          <Grid item xs={12} md={5}>
            <Card sx={{ borderRadius: 3, mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Skeleton 
                  variant="text" 
                  width={200} 
                  height={32} 
                  sx={{ bgcolor: 'rgba(0,0,0,0.07)', mb: 2 }} 
                />
                <Stack spacing={2}>
                  {Array.from(new Array(6)).map((_, index) => (
                    <Box sx={{ display: 'flex' }} key={index}>
                      <Skeleton 
                        variant="text" 
                        width="40%" 
                        height={24} 
                        sx={{ bgcolor: 'rgba(0,0,0,0.07)', mr: 2 }} 
                      />
                      <Skeleton 
                        variant="text" 
                        width="60%" 
                        height={24} 
                        sx={{ bgcolor: 'rgba(0,0,0,0.07)' }} 
                      />
                    </Box>
                  ))}
                </Stack>
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
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          data.product.description = cleanElementorCSS(data.product.description);
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
                  <>
                    <Box 
                      sx={{ 
                        height: 400, 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        p: 2
                      }}
                    >
                      <img
                        src={selectedImage || product.imageUrl}
                        alt={product.name}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </Box>
                    {product.images && product.images.length > 1 && (
                      <ImageList
                        sx={{ 
                          gridAutoFlow: 'column',
                          gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr)) !important',
                          gridAutoColumns: 'minmax(100px, 1fr)',
                          mt: 2,
                          mb: 4
                        }}
                        gap={8}
                      >
                        {product.images.map((image, index) => (
                          <ImageListItem 
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            sx={{ 
                              cursor: 'pointer',
                              border: selectedImage === image ? '2px solid' : 'none',
                              borderColor: 'primary.main',
                              borderRadius: 1,
                              overflow: 'hidden',
                              height: '100px !important'
                            }}
                          >
                            <img
                              src={image}
                              alt={`${product.name} ${index + 1}`}
                              style={{ 
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    )}
                  </>
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
                    sx={{ py: 1.5 }}
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
                    sx={{ py: 1.5 }}
                  >
                    Pesan Sekarang
                  </Button>
                </Stack>
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
                          <TableCell component="th" sx={{ width: '40%', border: 'none' }}>
                            <Typography variant="body2" color="text.secondary">Penulis</Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                            <Typography variant="body2">{product.author}</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      {product.publisher && (
                        <TableRow>
                          <TableCell component="th" sx={{ width: '40%', border: 'none' }}>
                            <Typography variant="body2" color="text.secondary">Penerbit</Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                            <Typography variant="body2">{product.publisher}</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      {product.level && (
                        <TableRow>
                          <TableCell component="th" sx={{ width: '40%', border: 'none' }}>
                            <Typography variant="body2" color="text.secondary">Jenjang</Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                            <Typography variant="body2">{product.level}</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      {product.pages > 0 && (
                        <TableRow>
                          <TableCell component="th" sx={{ width: '40%', border: 'none' }}>
                            <Typography variant="body2" color="text.secondary">Jumlah Halaman</Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                            <Typography variant="body2">{product.pages}</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      {product.year && (
                        <TableRow>
                          <TableCell component="th" sx={{ width: '40%', border: 'none' }}>
                            <Typography variant="body2" color="text.secondary">Tahun Terbit</Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                            <Typography variant="body2">{product.year}</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      {product.size && (
                        <TableRow>
                          <TableCell component="th" sx={{ width: '40%', border: 'none' }}>
                            <Typography variant="body2" color="text.secondary">Ukuran</Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                            <Typography variant="body2">{product.size}</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      {product.isbn && (
                        <TableRow>
                          <TableCell component="th" sx={{ width: '40%', border: 'none' }}>
                            <Typography variant="body2" color="text.secondary">ISBN</Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                            <Typography variant="body2">{product.isbn}</Typography>
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
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 15px 35px rgba(25, 118, 210, 0.15)',
                      '& .MuiCardMedia-root': {
                        transform: 'scale(1.05)',
                      },
                      '& .product-quick-actions': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  {/* Category badge with improved styling */}
                  <Chip
                    label={relatedProduct.category}
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 10,
                      fontWeight: 'bold',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      '& .MuiChip-label': {
                        px: 1,
                      }
                    }}
                  />

                  {/* Image container with enhanced hover effect */}
                  <Box 
                    sx={{ 
                      position: 'relative', 
                      overflow: 'hidden',
                      bgcolor: 'grey.50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pt: 2,
                      pb: 2,
                    }}
                  >
                    {relatedProduct.imageUrl ? (
                      <CardMedia
                        component="img"
                        height="180"
                        image={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        sx={{
                          objectFit: "contain",
                          maxWidth: '80%',
                          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                    ) : (
                      <Box sx={{ p: 2, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ProductDetailIllustration index={0} />
                      </Box>
                    )}
                    
                    {/* Quick action buttons that appear on hover */}
                    <Box 
                      className="product-quick-actions"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        justifyContent: 'center',
                        py: 1.5,
                        opacity: 0,
                        transform: 'translateY(10px)',
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      <Link
                        href={`/produk/${relatedProduct._id ? relatedProduct._id.toString() : relatedProduct.id}`}
                        passHref
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            borderRadius: 2,
                            px: 2,
                            fontWeight: 600,
                            boxShadow: 2,
                            textTransform: 'none',
                          }}
                        >
                          Lihat Detail
                        </Button>
                      </Link>
                    </Box>
                  </Box>

                  {/* Content area with improved typography and layout */}
                  <CardContent 
                    sx={{ 
                      flexGrow: 1, 
                      display: 'flex', 
                      flexDirection: 'column',
                      p: 3,
                      pt: 2,
                    }}
                  >
                    {/* Product title with gradient effect */}
                    <Typography
                      variant="h6"
                      component="h4"
                      sx={{
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        lineHeight: 1.4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        height: '3.1em',
                        mb: 1,
                        background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {relatedProduct.name}
                    </Typography>

                    {/* Product features as chips */}
                    {relatedProduct.features && relatedProduct.features.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {relatedProduct.features.slice(0, 2).map((feature, idx) => (
                          <Chip
                            key={idx}
                            label={feature}
                            size="small"
                            variant="outlined"
                            sx={{ 
                              fontSize: '0.7rem',
                              height: 24,
                              '& .MuiChip-label': { px: 1 }
                            }}
                          />
                        ))}
                        {relatedProduct.features.length > 2 && (
                          <Chip
                            label={`+${relatedProduct.features.length - 2}`}
                            size="small"
                            sx={{ 
                              fontSize: '0.7rem',
                              height: 24,
                              bgcolor: 'grey.100',
                              '& .MuiChip-label': { px: 1 }
                            }}
                          />
                        )}
                      </Box>
                    )}

                    {/* Product attributes with improved styling */}
                    <Box sx={{ mt: 'auto' }}>
                      {/* Author info with icon */}
                      {relatedProduct.author && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: 'primary.light',
                              color: 'primary.main',
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                            }}
                          >
                            A
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{ 
                              color: 'text.secondary',
                              fontSize: '0.85rem',
                              fontWeight: 500,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {relatedProduct.author}
                          </Typography>
                        </Box>
                      )}
                      
                      {/* Price with enhanced styling */}
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          mt: 2,
                          pt: 2,
                          borderTop: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                          }}
                        >
                          {formatPrice ? formatPrice(relatedProduct.price) : `Rp ${relatedProduct.price.toLocaleString("id-ID")}`}
                        </Typography>
                        
                        {/* Stock indicator */}
                        {relatedProduct.inStock !== undefined && (
                          <Chip
                            label={relatedProduct.inStock ? "Tersedia" : "Habis"}
                            color={relatedProduct.inStock ? "success" : "error"}
                            size="small"
                            variant="outlined"
                            sx={{ height: 24 }}
                          />
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
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