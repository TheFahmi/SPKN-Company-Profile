'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Alert, Breadcrumbs, Link as MuiLink, CircularProgress } from '@mui/material';
import { Home as HomeIcon, Inventory as InventoryIcon, Edit as EditIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import ProductForm from '@/app/components/admin/ProductForm';
import AdminSkeleton from '@/app/components/admin/AdminSkeleton';
import type { Product } from '@/types/mongodb';

export default function EditProdukPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  // Ambil data produk berdasarkan ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Gagal mengambil data produk');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil data produk');
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  // Handler untuk submit form
  const handleSubmit = async (productData: Partial<Product>) => {
    try {
      setLoading(true);
      
      const response = await fetch(`/api/admin/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal memperbarui produk');
      }
      
      setSuccess(true);
      setMessage('Produk berhasil diperbarui');
      
      // Redirect ke halaman produk setelah 2 detik
      setTimeout(() => {
        router.push('/admin/produk');
      }, 2000);
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memperbarui produk');
    } finally {
      setLoading(false);
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
            <EditIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Edit Produk
          </Typography>
        </Breadcrumbs>
        
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Edit Produk
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Edit informasi produk. Semua gambar baru yang diunggah akan dipindai terlebih dahulu untuk keamanan.
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
      
      {loading && !product ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        product && <ProductForm onSubmit={handleSubmit} initialData={product} />
      )}
    </Container>
  );
} 