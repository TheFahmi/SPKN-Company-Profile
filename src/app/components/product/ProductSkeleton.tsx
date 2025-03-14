'use client';

import React from 'react';
import { 
  Card, 
  Box, 
  Skeleton 
} from '@mui/material';

const ProductSkeleton: React.FC = () => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      }}
    >
      {/* Category badge skeleton */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
        }}
      >
        <Skeleton
          variant="rectangular"
          width={80}
          height={24}
          animation="wave"
          sx={{ borderRadius: 4, bgcolor: "rgba(0,0,0,0.04)" }}
        />
      </Box>

      {/* Image container with skeleton */}
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
        <Skeleton
          variant="rectangular"
          width="80%"
          height={200}
          animation="wave"
          sx={{ 
            bgcolor: "rgba(0,0,0,0.04)",
            borderRadius: 1
          }}
        />
        
        {/* Quick action button skeleton */}
        <Box 
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'rgba(255,255,255,0.9)',
            display: 'flex',
            justifyContent: 'center',
            py: 1.5,
          }}
        >
          <Skeleton
            variant="rectangular"
            width={120}
            height={32}
            animation="wave"
            sx={{ borderRadius: 2, bgcolor: "rgba(0,0,0,0.04)" }}
          />
        </Box>
      </Box>

      {/* Content area with skeletons */}
      <Box sx={{ flexGrow: 1, p: 3, pt: 2 }}>
        {/* Product title skeleton */}
        <Skeleton
          variant="text"
          height={32}
          width="90%"
          animation="wave"
          sx={{ mb: 1, bgcolor: "rgba(0,0,0,0.04)" }}
        />
        
        {/* Product features as chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
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
          <Skeleton
            variant="rectangular"
            height={24}
            width={40}
            animation="wave"
            sx={{ borderRadius: 4, bgcolor: "rgba(0,0,0,0.04)" }}
          />
        </Box>

        <Box sx={{ mt: 'auto' }}>
          {/* Author info skeleton */}
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
          
          {/* Publisher info skeleton */}
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
          
          {/* Price and stock indicator */}
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
      </Box>
    </Card>
  );
};

export default ProductSkeleton;