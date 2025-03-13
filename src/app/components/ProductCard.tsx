'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
} from '@mui/material';
import Link from 'next/link';
import { Product } from '@/app/types';

// Format price to Rupiah
function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

interface ProductCardProps {
  product: Product;
  categoryName?: string; // Optional category name for display
}

export default function ProductCard({ product, categoryName }: ProductCardProps) {
  // Use the provided category name or fallback to the product's category
  const displayCategory = categoryName || product.category;
  
  // Get the product ID (handle both _id and id)
  const productId = product._id ? product._id.toString() : product.id;

  return (
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
        label={displayCategory}
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
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl || "/placeholder.jpg"}
          alt={product.name}
          sx={{
            objectFit: "contain",
            maxWidth: '80%',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        
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
            href={`/produk/${productId}`}
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
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {product.name}
        </Typography>

        {/* Product features as chips */}
        {product.features && product.features.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {product.features.slice(0, 2).map((feature, idx) => (
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
            {product.features.length > 2 && (
              <Chip
                label={`+${product.features.length - 2}`}
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
          {product.author && (
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
                {product.author}
              </Typography>
            </Box>
          )}

          {/* Publisher info with icon */}
          {product.publisher && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'secondary.light',
                  color: 'secondary.main',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                }}
              >
                P
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
                {product.publisher}
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
              {formatPrice(product.price)}
            </Typography>
            
            {/* Stock indicator */}
            {product.inStock !== undefined && (
              <Chip
                label={product.inStock ? "Tersedia" : "Habis"}
                color={product.inStock ? "success" : "error"}
                size="small"
                variant="outlined"
                sx={{ height: 24 }}
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}