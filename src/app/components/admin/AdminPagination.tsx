'use client';

import React from 'react';
import { Stack, Pagination, Typography } from '@mui/material';

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const AdminPagination: React.FC<AdminPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
      <Pagination 
        count={totalPages} 
        page={currentPage}
        color="primary"
        size="large"
        onChange={onPageChange}
        showFirstButton
        showLastButton
      />
      <Typography variant="body2" color="text.secondary">
        Halaman {currentPage} dari {totalPages}
        {totalItems !== undefined && ` (Total: ${totalItems} item)`}
      </Typography>
    </Stack>
  );
};

export default AdminPagination; 