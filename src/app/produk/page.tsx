"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Pagination,
  Breadcrumbs,
  Link as MuiLink,
  Stack,
  Fade,
  Slide,
  CardMedia,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { Product } from "@/app/types";
import { ProductCard, ProductIllustration } from "../components/illustrations";
import { ObjectId } from "mongodb";

// Data produk dummy
const dummyProducts: Product[] = [
  {
    id: "1",
    name: "BELAJAR AKTIF MATEMATIKA KELAS VI",
    description:
      "Buku pelajaran matematika untuk siswa kelas 6 SD/MI dengan pendekatan pembelajaran aktif.",
    price: 120000,
    imageUrl: "/products/matematika-6.jpg",
    category: "buku-pelajaran",
    features: [
      "Kurikulum Terbaru",
      "Dilengkapi Latihan",
      "Full Color",
      "Pendekatan Aktif",
    ],
    specifications: {
      ukuran: "B5",
      kertas_isi: "HVS 70gsm",
      kertas_cover: "Art Carton 230gsm",
      finishing: "Laminasi Glossy",
      jilid: "Perfect Binding",
    },
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "BELAJAR AKTIF MATEMATIKA KELAS V",
    description:
      "Buku pelajaran matematika untuk siswa kelas 5 SD/MI dengan metode pembelajaran interaktif.",
    price: 125600,
    imageUrl: "/products/matematika-5.jpg",
    category: "buku-pelajaran",
    features: [
      "Kurikulum Terbaru",
      "Latihan Interaktif",
      "Full Color",
      "Pendekatan Aktif",
    ],
    specifications: {
      ukuran: "B5",
      kertas_isi: "HVS 70gsm",
      kertas_cover: "Art Carton 230gsm",
      finishing: "Laminasi Glossy",
      jilid: "Perfect Binding",
    },
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Jelajah Dunia Mamalia",
    description:
      "Buku pengetahuan tentang dunia mamalia untuk anak-anak dengan ilustrasi menarik.",
    price: 86000,
    imageUrl: "/products/mamalia.jpg",
    category: "buku-anak",
    features: [
      "Ilustrasi Full Color",
      "Edukatif",
      "Bahasa Sederhana",
      "Fun Facts",
    ],
    specifications: {
      ukuran: "A4",
      kertas_isi: "Art Paper 150gsm",
      kertas_cover: "Art Carton 260gsm",
      finishing: "Laminasi Glossy",
      jilid: "Perfect Binding",
    },
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Cula si Baba",
    description:
      "Buku cerita anak dengan pesan moral tentang kepedulian terhadap satwa langka.",
    price: 29000,
    imageUrl: "/products/cula-baba.jpg",
    category: "buku-anak",
    features: [
      "Cerita Edukatif",
      "Ilustrasi Menarik",
      "Nilai Moral",
      "Full Color",
    ],
    specifications: {
      ukuran: "A5",
      kertas_isi: "Art Paper 120gsm",
      kertas_cover: "Art Carton 260gsm",
      finishing: "Laminasi Doff",
      jilid: "Staples",
    },
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Pendidikan Kebersihan dan Lingkungan Hidup (PKLH) Kelas 6",
    description:
      "Buku pendidikan kebersihan dan lingkungan hidup untuk siswa kelas 6 SD/MI.",
    price: 35000,
    imageUrl: "/products/pklh-6.jpg",
    category: "buku-pelajaran",
    features: [
      "Materi Lengkap",
      "Aktivitas Praktis",
      "Ilustrasi Full Color",
      "Panduan Guru",
    ],
    specifications: {
      ukuran: "B5",
      kertas_isi: "HVS 70gsm",
      kertas_cover: "Art Carton 230gsm",
      finishing: "Laminasi Glossy",
      jilid: "Perfect Binding",
    },
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Berbeda Tapi Tetap Harmonis",
    description:
      "Buku cerita anak yang mengajarkan tentang toleransi dan keberagaman.",
    price: 22800,
    imageUrl: "/products/harmonis.jpg",
    category: "buku-anak",
    features: [
      "Cerita Inspiratif",
      "Nilai Moral",
      "Ilustrasi Menarik",
      "Full Color",
    ],
    specifications: {
      ukuran: "A5",
      kertas_isi: "Art Paper 120gsm",
      kertas_cover: "Art Carton 230gsm",
      finishing: "Laminasi Doff",
      jilid: "Staples",
    },
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Komik Pendidikan: Aku Senang Belajar Pecahan",
    description:
      "Komik edukatif yang membantu anak-anak memahami konsep pecahan dengan cara yang menyenangkan.",
    price: 22000,
    imageUrl: "/products/komik-pecahan.jpg",
    category: "komik-edukasi",
    features: [
      "Format Komik",
      "Materi Matematika",
      "Ilustrasi Menarik",
      "Full Color",
    ],
    specifications: {
      ukuran: "A5",
      kertas_isi: "Art Paper 120gsm",
      kertas_cover: "Art Carton 230gsm",
      finishing: "Laminasi Glossy",
      jilid: "Staples",
    },
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "BELAJAR AKTIF MATEMATIKA untuk SD/MI Kelas I",
    description:
      "Buku pelajaran matematika untuk siswa kelas 1 SD/MI dengan metode belajar aktif.",
    price: 125000,
    imageUrl: "/products/matematika-1.jpg",
    category: "buku-pelajaran",
    features: [
      "Kurikulum Terbaru",
      "Aktivitas Interaktif",
      "Full Color",
      "Panduan Guru",
    ],
    specifications: {
      ukuran: "B5",
      kertas_isi: "HVS 70gsm",
      kertas_cover: "Art Carton 230gsm",
      finishing: "Laminasi Glossy",
      jilid: "Perfect Binding",
    },
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Kategori produk
const categories = [
  { id: "all", name: "Semua Kategori" },
  { id: "buku-pelajaran", name: "Buku Pelajaran" },
  { id: "buku-anak", name: "Buku Anak" },
  { id: "komik-edukasi", name: "Komik Edukasi" },
  { id: "pklh", name: "PKLH" },
];

// Format harga ke format Rupiah
function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Komponen ProductSkeleton
const ProductSkeleton = () => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton
        variant="rectangular"
        height={300}
        animation="wave"
        sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton
          variant="text"
          height={32}
          width="90%"
          animation="wave"
          sx={{ mb: 1, bgcolor: "rgba(0,0,0,0.07)" }}
        />
        <Skeleton
          variant="text"
          height={20}
          width="60%"
          animation="wave"
          sx={{ mb: 1, bgcolor: "rgba(0,0,0,0.07)" }}
        />
        <Skeleton
          variant="text"
          height={28}
          width="40%"
          animation="wave"
          sx={{ mb: 2, bgcolor: "rgba(0,0,0,0.07)" }}
        />
        <Skeleton
          variant="rectangular"
          height={36}
          width="100%"
          animation="wave"
          sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
        />
      </CardContent>
    </Card>
  );
};

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchProducts = async (page = 1, limit = itemsPerPage) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("Gagal mengambil data produk");
      }
      const data = await response.json();
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newLimit = Number(event.target.value);
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset ke halaman pertama saat ukuran halaman berubah
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        py: 4,
      }}
    >
      {/* Add the header section here */}
      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            pt: { xs: 6, md: 8 },
            pb: { xs: 8, md: 10 },
            position: "relative",
            overflow: "hidden",
            mb: 4,
          }}
        >
          {/* Background Illustration */}
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
            <ProductIllustration />
          </Box>

          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h3"
                  component="h1"
                  fontWeight="bold"
                  gutterBottom
                >
                  Produk Kami
                </Typography>
                <Typography
                  variant="h6"
                  color="rgba(255, 255, 255, 0.8)"
                  sx={{ mb: 3 }}
                >
                  Temukan Berbagai Pilihan Produk Berkualitas
                </Typography>
                <Breadcrumbs
                  aria-label="breadcrumb"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  <MuiLink
                    component={Link}
                    href="/"
                    color="inherit"
                    underline="hover"
                  >
                    Beranda
                  </MuiLink>
                  <Typography color="white">Produk</Typography>
                </Breadcrumbs>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: 200,
                    width: "100%",
                  }}
                >
                  <ProductIllustration />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Fade>
      <Container>
        {/* Filter dan Pengaturan */}
        {!loading && !error && products.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 3,
            }}
          >
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="items-per-page-label">Tampilkan</InputLabel>
              <Select
                labelId="items-per-page-label"
                id="items-per-page"
                value={itemsPerPage}
                label="Tampilkan"
                onChange={handleItemsPerPageChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        <Grid container spacing={3}>
          {loading ? (
            // Tampilkan skeleton saat loading
            Array.from(new Array(itemsPerPage)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductSkeleton />
              </Grid>
            ))
          ) : error ? (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "60vh",
                }}
              >
                <Typography color="error">{error}</Typography>
              </Box>
            </Grid>
          ) : // Tampilkan produk ketika data sudah dimuat
          products.length > 0 ? (
            products.map((product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={product._id.toString()}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? '0 8px 16px rgba(0,0,0,0.4)' 
                        : '0 8px 16px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: (theme) => 
                        theme.palette.mode === 'dark' 
                          ? '0 16px 32px rgba(0,0,0,0.5)' 
                          : '0 16px 32px rgba(0,0,0,0.15)',
                      '& .MuiCardMedia-root': {
                        transform: 'scale(1.05)',
                      },
                    },
                  }}
                >
                  {/* Badge kategori */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 10,
                      bgcolor: 'primary.main',
                      color: 'white',
                      py: 0.5,
                      px: 1.5,
                      borderRadius: '16px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    {product.category}
                  </Box>

                  {/* Container gambar dengan efek hover */}
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={product.imageUrl || "/placeholder.jpg"}
                      alt={product.name}
                      sx={{
                        objectFit: "contain",
                        bgcolor: "background.paper",
                        p: 2,
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </Box>

                  {/* Content area */}
                  <CardContent 
                    sx={{ 
                      flexGrow: 1, 
                      display: 'flex', 
                      flexDirection: 'column',
                      p: 3,
                    }}
                  >
                    {/* Judul produk dengan ellipsis */}
                    <Typography
                      variant="h6"
                      component="h2"
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
                      }}
                    >
                      {product.name}
                    </Typography>

                    {/* Atribut produk penting */}
                    <Box sx={{ mt: 'auto', mb: 2 }}>
                      {/* Penulis */}
                      {product.author && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontWeight: 500 }}
                          >
                            Penulis: <Box component="span" sx={{ color: 'text.primary' }}>{product.author}</Box>
                          </Typography>
                        </Box>
                      )}

                      {/* Penerbit */}
                      {product.publisher && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontWeight: 500 }}
                          >
                            Penerbit: <Box component="span" sx={{ color: 'text.primary' }}>{product.publisher}</Box>
                          </Typography>
                        </Box>
                      )}
                      
                      {/* Harga */}
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                          }}
                        >
                          {formatPrice(product.price)}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Tombol lihat detail */}
                    <Link
                      href={`/produk/${product._id}`}
                      passHref
                      style={{ textDecoration: "none", marginTop: 'auto' }}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          borderRadius: 2,
                          py: 1,
                          textTransform: 'none',
                          fontWeight: 600,
                          boxShadow: 2,
                        }}
                      >
                        Detail Produk
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  minHeight: "60vh",
                }}
              >
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  Tidak ada produk yang tersedia
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Silakan coba lagi nanti
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {!loading && !error && pagination && pagination.totalPages > 1 && (
          <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
            <Pagination
              count={pagination.totalPages}
              page={currentPage}
              color="primary"
              size="large"
              onChange={handlePageChange}
              showFirstButton
              showLastButton
            />
            <Typography variant="body2" color="text.secondary">
              Menampilkan {products.length} dari {pagination.total} produk
              (Halaman {currentPage} dari {pagination.totalPages})
            </Typography>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
