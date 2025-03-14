'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdminPagination from './AdminPagination';
import type { Product } from '@/types/mongodb';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  currentPage: number;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onView?: (product: Product) => void;
  showActions?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  pagination,
  onPageChange,
  currentPage,
  onEdit,
  onDelete,
  onView,
  showActions = true
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Daftar Produk {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
          </Typography>
          {pagination && (
            <Typography variant="body2" color="text.secondary">
              Total: {pagination.total} produk
            </Typography>
          )}
        </Box>
        
        {products.length === 0 && !loading ? (
          <Alert severity="info">Belum ada produk</Alert>
        ) : (
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} key={product._id?.toString()}>
                <Box sx={{ 
                  p: 2, 
                  border: '1px solid #eee', 
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Kategori: {product.category}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Rp {product.price?.toLocaleString('id-ID')}
                    </Typography>
                  </Box>
                  
                  {showActions && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {onView && (
                        <Tooltip title="Lihat Detail">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => onView(product)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      
                      {onEdit && (
                        <Tooltip title="Edit Produk">
                          <IconButton 
                            size="small" 
                            color="secondary"
                            onClick={() => onEdit(product)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      
                      {onDelete && (
                        <Tooltip title="Hapus Produk">
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => onDelete(product)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <AdminPagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            onPageChange={onPageChange}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ProductList; 