'use client';

import { useState, useCallback } from 'react';
import { Product } from '@/types/mongodb';

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface UseProductsHook {
  products: Product[];
  pagination: PaginationData | null;
  loading: boolean;
  error: string | null;
  getProducts: (page?: number, limit?: number) => Promise<void>;
  addProduct: (product: Partial<Product>, image: File) => Promise<Product | null>;
}

export function useProducts(): UseProductsHook {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProducts = useCallback(async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Gagal mengambil data produk');
      }

      const data = await response.json();
      
      // Handle both old and new API response formats
      if (Array.isArray(data)) {
        // Old format
        setProducts(data);
        setPagination(null);
      } else {
        // New format with pagination
        setProducts(data.products || []);
        setPagination(data.pagination || null);
      }
    } catch (error: any) {
      console.error('Error getting products:', error);
      setError(error.message || 'Terjadi kesalahan saat mengambil data produk');
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = async (product: Partial<Product>, image: File): Promise<Product | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('image', image);
      formData.append('product', JSON.stringify(product));
      
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menambahkan produk');
      }
      
      const newProduct = await response.json();
      
      // Refresh the product list after adding
      await getProducts();
      
      return newProduct;
    } catch (error: any) {
      console.error('Error adding product:', error);
      setError(error.message || 'Terjadi kesalahan saat menambahkan produk');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    pagination,
    loading,
    error,
    getProducts,
    addProduct,
  };
} 