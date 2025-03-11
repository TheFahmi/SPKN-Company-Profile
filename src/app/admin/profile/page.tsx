'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Email as EmailIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Isi form dengan data session ketika component mount
  useState(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
      }));
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validasi password baru jika diisi
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('Password baru dan konfirmasi password tidak cocok');
        }
        if (!formData.currentPassword) {
          throw new Error('Password saat ini harus diisi untuk mengubah password');
        }
      }

      // TODO: Implement API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi API call
      
      setSuccess(true);
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memperbarui profil');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <Container>
        <Alert severity="error">
          Anda harus login untuk mengakses halaman ini
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={0}
        sx={{ 
          p: 4,
          mt: 4,
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto',
              bgcolor: 'primary.main',
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 60 }} />
          </Avatar>
          <Typography variant="h4" sx={{ mt: 2, color: 'text.primary' }}>
            Profile Admin
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Kelola informasi profil Anda
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Profil berhasil diperbarui
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                Informasi Dasar
              </Typography>
              <TextField
                fullWidth
                label="Nama"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                type="email"
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                Ubah Password
              </Typography>
              <TextField
                fullWidth
                label="Password Saat Ini"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                variant="outlined"
                type="password"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password Baru"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                variant="outlined"
                type="password"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Konfirmasi Password Baru"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                variant="outlined"
                type="password"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={loading}
                >
                  {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
} 