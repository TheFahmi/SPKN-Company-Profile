'use client';

import React from 'react';
import { 
  Grid, 
  Box, 
  Typography,
  CircularProgress
} from '@mui/material';
import { Product } from '@/app/types';
import ProductCard from '../ProductCard';
import ProductSkeleton from './ProductSkeleton';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  itemsPerPage: number;
  categories: { id: string; name: string }[];
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  error,
  itemsPerPage,
  categories
}) => {
  return (
    <Grid container spacing={3}>
      {loading ? (
        // Show skeletons while loading
        Array.from(new Array(itemsPerPage)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
            <ProductSkeleton />
          </Grid>
        ))
      ) : error ? (
        // Show error message if there's an error
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
        // Show products if available
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
        // Show no products message if no products are available
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
  );
};

export default ProductGrid;