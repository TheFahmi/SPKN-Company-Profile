'use client';

import React from 'react';
import { 
  Stack, 
  Pagination, 
  Typography 
} from '@mui/material';

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ProductPaginationProps {
  pagination: PaginationData;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  loading: boolean;
  error: string | null;
}

const ProductPagination: React.FC<ProductPaginationProps> = ({
  pagination,
  currentPage,
  onPageChange,
  loading,
  error
}) => {
  if (loading || error || !pagination || pagination.totalPages <= 1) {
    return null;
  }

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
      <Pagination
        count={pagination.totalPages}
        page={currentPage}
        color="primary"
        size="large"
        onChange={onPageChange}
        showFirstButton
        showLastButton
      />
      <Typography variant="body2" color="text.secondary">
        Menampilkan {(currentPage - 1) * pagination.limit + 1} - {Math.min(currentPage * pagination.limit, pagination.total)} dari {pagination.total} produk
        (Halaman {currentPage} dari {pagination.totalPages})
      </Typography>
    </Stack>
  );
};

export default ProductPagination;