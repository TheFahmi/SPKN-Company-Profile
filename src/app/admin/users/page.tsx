'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  TableCell,
  TableRow,
  Box,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AdminPanelSettings as AdminIcon,
  Person as UserIcon,
} from '@mui/icons-material';
import AdminListTemplate from '@/app/components/admin/AdminListTemplate';
import { formatDate } from '@/app/utils/formatters';

interface User {
  _id?: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [adminRoleLoading, setAdminRoleLoading] = useState<string | null>(null);

  // Fungsi untuk memuat data pengguna
  const loadUsers = async (searchQuery = '', currentPage = 0, limit = 10) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        page: (currentPage + 1).toString(),
        limit: limit.toString(),
      });

      if (searchQuery) {
        queryParams.append('search', searchQuery);
      }

      const response = await fetch(`/api/admin/users?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Gagal memuat data pengguna');
      }

      const data = await response.json();
      setUsers(data.users || []);
      setTotalUsers(data.pagination?.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(searchTerm, page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleSearch = () => {
    setPage(0);
    loadUsers(searchTerm, 0, rowsPerPage);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  // Fungsi untuk membuka dialog konfirmasi hapus
  const handleDeleteClick = (id: string) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Fungsi untuk menghapus pengguna
  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      setDeleteLoading(true);
      const response = await fetch(`/api/admin/users/${userToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Gagal menghapus pengguna');
      }

      // Hapus pengguna dari state
      setUsers(users.filter(user => user._id !== userToDelete));
      setDeleteDialogOpen(false);
      
      // Refresh data jika page terakhir menjadi kosong
      if (users.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        loadUsers(searchTerm, page, rowsPerPage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat menghapus');
    } finally {
      setDeleteLoading(false);
      setUserToDelete(null);
    }
  };

  // Fungsi untuk mengubah status admin user
  const handleToggleAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      setAdminRoleLoading(userId);
      
      const response = await fetch(`/api/admin/users/${userId}/make-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin: !currentStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Gagal mengubah status admin');
      }

      // Update state
      setUsers(
        users.map((user) => {
          if (user._id === userId) {
            return { ...user, isAdmin: !currentStatus };
          }
          return user;
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengubah status admin');
    } finally {
      setAdminRoleLoading(null);
    }
  };

  // Function untuk render header tabel
  const renderTableHead = () => (
    <TableRow>
      <TableCell>Nama</TableCell>
      <TableCell>Email</TableCell>
      <TableCell align="center">Role</TableCell>
      <TableCell>Terdaftar</TableCell>
      <TableCell align="center">Aksi</TableCell>
    </TableRow>
  );

  // Function untuk render body tabel
  const renderTableBody = () => (
    <>
      {users.map((user) => (
        <TableRow key={user._id?.toString()}>
          <TableCell>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '200px',
                display: 'block',
              }}
              title={user.name}
            >
              {user.name}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              variant="body2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '200px',
                display: 'block',
              }}
              title={user.email}
            >
              {user.email}
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Chip
                icon={user.isAdmin ? <AdminIcon fontSize="small" /> : <UserIcon fontSize="small" />}
                label={user.isAdmin ? 'Admin' : 'User'}
                color={user.isAdmin ? 'primary' : 'default'}
                variant={user.isAdmin ? 'filled' : 'outlined'}
                size="small"
              />
              <Tooltip title="Ubah status admin">
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={user.isAdmin}
                      onChange={() => handleToggleAdmin(user._id?.toString() || '', user.isAdmin)}
                      disabled={adminRoleLoading === user._id}
                    />
                  }
                  label=""
                  sx={{ ml: 1, mb: 0 }}
                />
              </Tooltip>
            </Box>
          </TableCell>
          <TableCell>
            {user.createdAt && (
              <Typography variant="body2">
                {formatDate(user.createdAt)}
              </Typography>
            )}
          </TableCell>
          <TableCell align="center">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => router.push(`/admin/users/edit/${user._id}`)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Hapus">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteClick(user._id?.toString() || '')}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <AdminListTemplate
      title="Kelola Pengguna"
      data={users}
      loading={loading}
      error={error}
      paginationInfo={{
        page,
        rowsPerPage,
        total: totalUsers,
      }}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onSearch={handleSearch}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      onRefresh={() => loadUsers(searchTerm, page, rowsPerPage)}
      onAddClick={() => router.push('/admin/users/add')}
      onDeleteClick={handleDeleteClick}
      onDeleteConfirm={handleDeleteConfirm}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogClose={() => setDeleteDialogOpen(false)}
      deleteLoading={deleteLoading}
      searchPlaceholder="Cari pengguna..."
      addButtonText="Tambah Pengguna"
      deleteDialogTitle="Hapus Pengguna"
      deleteDialogContent="Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan."
      renderTableHead={renderTableHead}
      renderTableBody={renderTableBody}
    />
  );
} 