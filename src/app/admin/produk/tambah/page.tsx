'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, Alert, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Home as HomeIcon, Inventory as InventoryIcon, Add as AddIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { useProducts } from '@/app/hooks/useProducts';
import ProductForm from '@/app/components/admin/ProductForm';
import AdminSkeleton from '@/app/components/admin/AdminSkeleton';
import type { Product } from '@/types/mongodb';

export default function TambahProdukPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { addProduct, loading, error } = useProducts();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (productData: Partial<Product>) => {
    try {
      const result = await addProduct(productData);
      
      if (result) {
        setSuccess(true);
        setMessage('Produk berhasil ditambahkan');
        
        // Redirect ke halaman produk setelah 2 detik
        setTimeout(() => {
          router.push('/admin/produk');
        }, 2000);
      }
    } catch (err) {
      console.error('Error submitting product:', err);
      setSuccess(false);
      setMessage('Terjadi kesalahan saat menambahkan produk');
    }
  };

  if (authLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AdminSkeleton type="form" />
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
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <MuiLink component={Link} href="/admin/dashboard" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Dashboard
          </MuiLink>
          <MuiLink component={Link} href="/admin/produk" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
            <InventoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Produk
          </MuiLink>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <AddIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Tambah Produk
          </Typography>
        </Breadcrumbs>
        
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Tambah Produk Baru
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Tambahkan produk baru ke katalog. Semua gambar yang diunggah akan dipindai terlebih dahulu untuk keamanan.
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 4 }}>
          {message}
        </Alert>
      )}
      
      <ProductForm onSubmit={handleSubmit} />
    </Container>
  );
} 