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
import { ProductIllustration } from "../components/illustrations";
import ProductCard from "../components/ProductCard";
import { ObjectId } from "mongodb";

// Data produk dummy
const dummyProducts: Product[] = [
  {
    _id: "1",
    name: "Buku 1",
    description: "Deskripsi buku 1",
    price: 100000,
    category: "Buku",
    imageUrl: "/book1.jpg",
    author: "Penulis 1",
    publisher: "Penerbit 1",
    pages: 200,
    year: "2021",
    size: "A5",
    isbn: "123-456-789"
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

// Komponen ProductSkeleton
const ProductSkeleton = () => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
      }}
    >
      <Box sx={{ position: 'relative', pt: 2, pb: 2, bgcolor: 'grey.50' }}>
        <Skeleton
          variant="rectangular"
          height={200}
          animation="wave"
          sx={{ bgcolor: "rgba(0,0,0,0.04)" }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Skeleton
          variant="text"
          height={32}
          width="90%"
          animation="wave"
          sx={{ mb: 1, bgcolor: "rgba(0,0,0,0.04)" }}
        />
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Skeleton
            variant="rectangular"
            height={24}
            width={60}
            animation="wave"
            sx={{ borderRadius: 4, bgcolor: "rgba(0,0,0,0.04)" }}
          />
          <Skeleton
            variant="rectangular"
            height={24}
            width={60}
            animation="wave"
            sx={{ borderRadius: 4, bgcolor: "rgba(0,0,0,0.04)" }}
          />
        </Box>
        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              animation="wave"
              sx={{ bgcolor: "rgba(0,0,0,0.04)" }}
            />
            <Skeleton
              variant="text"
              height={20}
              width="60%"
              animation="wave"
              sx={{ bgcolor: "rgba(0,0,0,0.04)" }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              animation="wave"
              sx={{ bgcolor: "rgba(0,0,0,0.04)" }}
            />
            <Skeleton
              variant="text"
              height={20}
              width="70%"
              animation="wave"
              sx={{ bgcolor: "rgba(0,0,0,0.04)" }}
            />
          </Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mt: 2,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}>
            <Skeleton
              variant="text"
              height={28}
              width="40%"
              animation="wave"
              sx={{ bgcolor: "rgba(0,0,0,0.04)" }}
            />
            <Skeleton
              variant="rectangular"
              height={24}
              width={60}
              animation="wave"
              sx={{ borderRadius: 4, bgcolor: "rgba(0,0,0,0.04)" }}
            />
          </Box>
        </Box>
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 0,
  });

  const fetchProducts = async (page = 1, limit = itemsPerPage) => {
    try {
      setLoading(true);
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory !== 'all' && { category: selectedCategory })
      });

      const response = await fetch(`/api/products?${searchParams.toString()}`);
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
    // Reset halaman ke 1 ketika pencarian atau kategori berubah
    setCurrentPage(1);
    fetchProducts(1, itemsPerPage);
  }, [currentPage, itemsPerPage, searchTerm, selectedCategory]);

  // Tambahkan debounce untuk pencarian
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (currentPage === 1) {
        fetchProducts(1, itemsPerPage);
      } else {
        setCurrentPage(1); // Ini akan memicu useEffect di atas
      }
    }, 500); // Tunggu 500ms setelah user selesai mengetik

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

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
    <>
    
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
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Search Bar */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  bgcolor: 'background.paper',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            
            {/* Category Filter */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="medium">
                <InputLabel id="category-select-label">Kategori</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={selectedCategory}
                  label="Kategori"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Items per page */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="medium">
                <InputLabel id="items-per-page-label">Tampilkan</InputLabel>
                <Select
                  labelId="items-per-page-label"
                  id="items-per-page"
                  value={itemsPerPage}
                  label="Tampilkan"
                  onChange={handleItemsPerPageChange}
                >
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                  <MenuItem value={32}>32</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3}>
          {loading ? (
            // Tambahkan key yang lebih unik untuk skeleton
            Array.from(new Array(itemsPerPage)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
                <ProductSkeleton />
              </Grid>
            ))
          ) : error ? (
            <Grid item xs={12} key="error-message">
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
          ) : products.length > 0 ? (
            products.map((product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={product._id?.toString() || `product-${product.name}`}
              >
                <ProductCard 
                  product={product} 
                  categoryName={categories.find(c => c.id === product.category)?.name}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} key="no-products">
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
    </>     
  );
}