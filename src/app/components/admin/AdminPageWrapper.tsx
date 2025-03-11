'use client';

import { ReactNode } from 'react';
import { Container, Alert, Box, Typography } from '@mui/material';
import AdminSkeleton from './AdminSkeleton';

interface AdminPageWrapperProps {
  children: ReactNode;
  loading: boolean;
  error: string | null;
  skeletonType?: 'dashboard' | 'table' | 'form' | 'detail';
  title?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  actions?: ReactNode;
}

export default function AdminPageWrapper({
  children,
  loading,
  error,
  skeletonType = 'table',
  title,
  maxWidth = 'lg',
  actions
}: AdminPageWrapperProps) {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 4 }}>
      {title && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4
        }}>
          <Typography variant="h4" gutterBottom={!actions}>
            {title}
          </Typography>
          {actions && <Box>{actions}</Box>}
        </Box>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <>
          {skeletonType === 'dashboard' && <AdminSkeleton type="dashboard" />}
          {skeletonType === 'table' && <AdminSkeleton type="table" />}
          {skeletonType === 'form' && <AdminSkeleton type="form" />}
          {skeletonType === 'detail' && <AdminSkeleton type="detail" />}
        </>
      ) : (
        <Box>
          {children}
        </Box>
      )}
    </Container>
  );
} 