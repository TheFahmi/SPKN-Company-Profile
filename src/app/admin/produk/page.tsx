'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Alert,
  SelectChangeEvent
} from '@mui/material';
import { useAuth } from '@/app/hooks/useAuth';
import { useAdmin } from '@/app/hooks/useAdmin';
import { useProducts } from '@/app/hooks/useProducts';
import type { Product } from '@/types/mongodb';
import AdminSkeleton from '@/app/components/admin/AdminSkeleton';

// Import komponen-komponen yang baru dibuat
import AdminHeader from '@/app/components/admin/AdminHeader';
import ProductForm from '@/app/components/admin/ProductForm';
import ProductList from '@/app/components/admin/ProductList';

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

  const handleSubmit = async (productData: Partial<Product>, selectedImage: File | null) => {
    if (!selectedImage) {
      alert('Pilih gambar produk');
      return null;
    }

    return await addProduct(productData, selectedImage);
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
      <AdminHeader 
        title="Kelola Produk"
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        onRefresh={handleRefresh}
      />

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
            <ProductForm 
              onSubmit={handleSubmit}
              loading={loading}
            />
          </Grid>

          {/* Daftar Produk */}
          <Grid item xs={12} md={6}>
            <ProductList 
              products={products}
              loading={loading}
              pagination={pagination}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
} 