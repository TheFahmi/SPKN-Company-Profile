'use client';

import { ReactNode, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  TablePagination,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import AdminPageWrapper from '@/app/components/admin/AdminPageWrapper';
import DeleteConfirmDialog from '@/app/components/admin/DeleteConfirmDialog';

interface PaginationInfo {
  page: number;
  rowsPerPage: number;
  total: number;
}

export interface AdminListTemplateProps<T> {
  title: string;
  data: T[];
  loading: boolean;
  error: string | null;
  paginationInfo: PaginationInfo;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  onRefresh: () => void;
  onAddClick: () => void;
  onDeleteClick: (id: string) => void;
  onDeleteConfirm: () => void;
  deleteDialogOpen: boolean;
  onDeleteDialogClose: () => void;
  deleteLoading: boolean;
  searchPlaceholder?: string;
  addButtonText?: string;
  deleteDialogTitle?: string;
  deleteDialogContent?: string;
  renderTableHead: () => ReactNode;
  renderTableBody: () => ReactNode;
  renderEmptyState?: () => ReactNode;
  additionalActions?: ReactNode;
}

function AdminListTemplate<T>({
  title,
  data,
  loading,
  error,
  paginationInfo,
  searchTerm,
  onSearchChange,
  onSearch,
  onPageChange,
  onRowsPerPageChange,
  onRefresh,
  onAddClick,
  onDeleteClick,
  onDeleteConfirm,
  deleteDialogOpen,
  onDeleteDialogClose,
  deleteLoading,
  searchPlaceholder = 'Cari...',
  addButtonText = 'Tambah Baru',
  deleteDialogTitle = 'Konfirmasi Hapus',
  deleteDialogContent = 'Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.',
  renderTableHead,
  renderTableBody,
  renderEmptyState,
  additionalActions,
}: AdminListTemplateProps<T>) {
  
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  // Default empty state
  const defaultEmptyState = () => (
    <TableRow>
      <TableCell colSpan={12} align="center">
        <Typography variant="body2" color="text.secondary">
          Tidak ada data yang ditemukan.
        </Typography>
      </TableCell>
    </TableRow>
  );

  // Action buttons
  const actionButtons = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField
        size="small"
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{ width: 250 }}
      />
      <Button variant="outlined" onClick={onSearch}>
        Cari
      </Button>
      <Tooltip title="Refresh data">
        <IconButton onClick={onRefresh} color="primary">
          <RefreshIcon />
        </IconButton>
      </Tooltip>
      {additionalActions}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddClick}
      >
        {addButtonText}
      </Button>
    </Box>
  );

  return (
    <AdminPageWrapper
      title={title}
      loading={loading}
      error={error}
      skeletonType="table"
      actions={actionButtons}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {renderTableHead()}
          </TableHead>
          <TableBody>
            {data.length > 0 ? renderTableBody() : (renderEmptyState ? renderEmptyState() : defaultEmptyState())}
          </TableBody>
        </Table>
      </TableContainer>

      {paginationInfo.total > 0 && (
        <TablePagination
          component="div"
          count={paginationInfo.total}
          page={paginationInfo.page}
          onPageChange={handleChangePage}
          rowsPerPage={paginationInfo.rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Baris per halaman:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} dari ${count}`}
        />
      )}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={onDeleteDialogClose}
        onConfirm={onDeleteConfirm}
        loading={deleteLoading}
        title={deleteDialogTitle}
        content={deleteDialogContent}
      />
    </AdminPageWrapper>
  );
}

export default AdminListTemplate; 