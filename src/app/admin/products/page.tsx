'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  TableCell,
  TableRow,
  Box,
  Typography,
  Chip,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import AdminListTemplate from '@/app/components/admin/AdminListTemplate';
import { formatCurrency } from '@/app/utils/formatters';
import type { Product } from '@/app/models/product';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fungsi untuk memuat data produk
  const loadProducts = async (searchQuery = '', currentPage = 0, limit = 10) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        page: (currentPage + 1).toString(),
        limit: limit.toString(),
      });

      if (searchQuery) {
        queryParams.append('search', searchQuery);
      }

      const response = await fetch(`/api/admin/products?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Gagal memuat data produk');
      }

      const data = await response.json();
      setProducts(data.products || []);
      setTotalProducts(data.pagination?.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(searchTerm, page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleSearch = () => {
    setPage(0);
    loadProducts(searchTerm, 0, rowsPerPage);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  // Fungsi untuk membuka dialog konfirmasi hapus
  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Fungsi untuk menghapus produk
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      setDeleteLoading(true);
      const response = await fetch(`/api/admin/products/${productToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Gagal menghapus produk');
      }

      // Hapus produk dari state
      setProducts(products.filter(product => product._id !== productToDelete));
      setDeleteDialogOpen(false);
      
      // Refresh data jika page terakhir menjadi kosong
      if (products.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        loadProducts(searchTerm, page, rowsPerPage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat menghapus');
    } finally {
      setDeleteLoading(false);
      setProductToDelete(null);
    }
  };

  // Function untuk render header tabel
  const renderTableHead = () => (
    <TableRow>
      <TableCell>Gambar</TableCell>
      <TableCell>Nama Produk</TableCell>
      <TableCell>Penulis</TableCell>
      <TableCell>Penerbit</TableCell>
      <TableCell>Kategori</TableCell>
      <TableCell>Harga</TableCell>
      <TableCell align="center">Aksi</TableCell>
    </TableRow>
  );

  // Function untuk render body tabel
  const renderTableBody = () => (
    <>
      {products.map((product) => (
        <TableRow key={product._id?.toString()}>
          <TableCell>
            {product.imageUrl ? (
              <Box
                component="img"
                src={product.imageUrl}
                alt={product.name}
                sx={{
                  width: 60,
                  height: 60,
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
            ) : (
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: 'grey.200',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  No Image
                </Typography>
              </Box>
            )}
          </TableCell>
          <TableCell>
            <Box>
              <Typography
                variant="body2"
                title={product.name}
                sx={{
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '250px',
                  display: 'block',
                }}
              >
                {product.name}
              </Typography>
              {product.isbn && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block' }}
                >
                  ISBN: {product.isbn}
                </Typography>
              )}
            </Box>
          </TableCell>
          <TableCell>
            <Typography
              variant="body2"
              title={product.author || "-"}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '150px',
                display: 'block',
              }}
            >
              {product.author || "-"}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              variant="body2"
              title={product.publisher || "-"}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '150px',
                display: 'block',
              }}
            >
              {product.publisher || "-"}
            </Typography>
            {product.year && (
              <Typography variant="caption" color="text.secondary">
                {product.year}
              </Typography>
            )}
          </TableCell>
          <TableCell>
            <Chip
              label={product.category ? product.category.replace(/-/g, ' ') : "Uncategorized"}
              size="small"
              color={
                product.category === 'buku-pelajaran'
                  ? 'primary'
                  : product.category === 'buku-anak'
                  ? 'secondary'
                  : product.category === 'komik-edukasi'
                  ? 'info'
                  : product.category === 'pklh'
                  ? 'success'
                  : 'default'
              }
              variant="outlined"
            />
            {product.pages && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                {product.pages} halaman
              </Typography>
            )}
            {product.size && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                {product.size}
              </Typography>
            )}
          </TableCell>
          <TableCell>
            <Typography variant="body2" fontWeight={500}>
              {formatCurrency(product.price)}
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title="Lihat Detail">
                <IconButton
                  size="small"
                  color="info"
                  onClick={() => router.push(`/produk/${product._id}`)}
                  sx={{ mr: 1 }}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => router.push(`/admin/products/edit/${product._id}`)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Hapus">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteClick(product._id?.toString() || '')}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <AdminListTemplate
      title="Kelola Produk"
      data={products}
      loading={loading}
      error={error}
      paginationInfo={{
        page,
        rowsPerPage,
        total: totalProducts,
      }}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onSearch={handleSearch}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      onRefresh={() => loadProducts(searchTerm, page, rowsPerPage)}
      onAddClick={() => router.push('/admin/products/add')}
      onDeleteClick={handleDeleteClick}
      onDeleteConfirm={handleDeleteConfirm}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogClose={() => setDeleteDialogOpen(false)}
      deleteLoading={deleteLoading}
      searchPlaceholder="Cari produk..."
      addButtonText="Tambah Produk"
      deleteDialogTitle="Hapus Produk"
      deleteDialogContent="Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan."
      renderTableHead={renderTableHead}
      renderTableBody={renderTableBody}
    />
  );
} 