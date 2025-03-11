'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  Alert,
  Pagination,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useAuth } from '@/app/hooks/useAuth';
import { useAdmin } from '@/app/hooks/useAdmin';
import { useProducts } from '@/app/hooks/useProducts';
import type { Product } from '@/app/types';
import RefreshIcon from '@mui/icons-material/Refresh';
import AdminSkeleton from '@/app/components/admin/AdminSkeleton';

export default function AdminProdukPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { users, loading: adminLoading } = useAdmin();
  const { 
    products, 
    pagination, 
    loading, 
    error, 
    getProducts,
    addProduct 
  } = useProducts();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    author: '',
    publisher: '',
    level: '',
    pages: '',
    year: '',
    size: '',
    isbn: '',
  });
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (user?.isAdmin) {
      getProducts(currentPage, itemsPerPage);
    }
  }, [getProducts, currentPage, itemsPerPage, user, refreshTrigger]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newLimit = Number(event.target.value);
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset ke halaman pertama
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      alert('Pilih gambar produk');
      return;
    }

    const productData: Partial<Product> = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      imageUrl: '', // Ini akan diisi oleh fungsi addProduct
      author: formData.author,
      publisher: formData.publisher,
      level: formData.level,
      pages: Number(formData.pages),
      year: formData.year,
      size: formData.size,
      isbn: formData.isbn || undefined,
    };

    const result = await addProduct(productData, selectedImage);
    if (result) {
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        author: '',
        publisher: '',
        level: '',
        pages: '',
        year: '',
        size: '',
        isbn: '',
      });
      setSelectedImage(null);
    }
  };

  if (authLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AdminSkeleton type="form" />
        <AdminSkeleton type="table" />
      </Container>
    );
  }

  if (!user?.isAdmin) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">Anda tidak memiliki akses ke halaman ini</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Kelola Produk
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
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
          <Tooltip title="Refresh data">
            <IconButton onClick={handleRefresh} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <>
          <AdminSkeleton type="form" />
          <AdminSkeleton type="table" />
        </>
      ) : (
        <Grid container spacing={4}>
          {/* Form Tambah Produk */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tambah Produk Baru
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Nama Produk"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Deskripsi"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    margin="normal"
                    multiline
                    rows={4}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Harga"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    margin="normal"
                    required
                  />
                  <FormControl fullWidth margin="normal" required>
                    <InputLabel>Kategori</InputLabel>
                    <Select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as string })}
                    >
                      <MenuItem value="buku-pelajaran">Buku Pelajaran</MenuItem>
                      <MenuItem value="buku-anak">Buku Anak</MenuItem>
                      <MenuItem value="komik-edukasi">Komik Edukasi</MenuItem>
                      <MenuItem value="pklh">PKLH</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Penulis"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Penerbit"
                    value={formData.publisher}
                    onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Jenjang"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Jumlah Halaman"
                    type="number"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Tahun Terbit"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Ukuran"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="ISBN"
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    margin="normal"
                  />
                  <Box sx={{ mt: 2 }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="product-image"
                      type="file"
                      onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                    />
                    <label htmlFor="product-image">
                      <Button variant="outlined" component="span" sx={{ mr: 2 }}>
                        Pilih Gambar
                      </Button>
                      {selectedImage && (
                        <Typography variant="body2" component="span">
                          {selectedImage.name}
                        </Typography>
                      )}
                    </label>
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ mt: 3 }}
                  >
                    {loading ? 'Menyimpan...' : 'Simpan Produk'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Daftar Produk */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Daftar Produk {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
                  </Typography>
                  {pagination && (
                    <Typography variant="body2" color="text.secondary">
                      Total: {pagination.total} produk
                    </Typography>
                  )}
                </Box>
                
                {products.length === 0 && !loading ? (
                  <Alert severity="info">Belum ada produk</Alert>
                ) : (
                  <Grid container spacing={2}>
                    {products.map((product) => (
                      <Grid item xs={12} key={product._id?.toString()}>
                        <Box sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Kategori: {product.category}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Rp {product.price?.toLocaleString('id-ID')}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
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
                      Halaman {currentPage} dari {pagination.totalPages}
                    </Typography>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
} 