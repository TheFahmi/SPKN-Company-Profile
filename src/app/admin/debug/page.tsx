'use client';

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAdmin } from '../../hooks/useAdmin';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';

export default function DebugPage() {
  const { user, isLoading, isAdmin } = useAuth();
  const { makeUserAdmin, loading: adminLoading, error: adminError } = useAdmin();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMakeAdmin = async () => {
    if (!user?.id) return;

    try {
      setError(null);
      setSuccess(null);
      await makeUserAdmin(user.id);
      setSuccess('Berhasil mengubah peran pengguna menjadi admin');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mengubah peran pengguna');
    }
  };

  if (isLoading || adminLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Debug Admin
          </Typography>

          <Typography variant="body1" paragraph>
            Email: <strong>{user?.email}</strong>
          </Typography>

          <Typography variant="body1" paragraph>
            Status Admin: <strong>{isAdmin ? 'Ya' : 'Tidak'}</strong>
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {adminError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {adminError}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleMakeAdmin}
            disabled={isAdmin || !user}
          >
            Jadikan Admin
          </Button>
        </Paper>
      </Box>
    </Container>
  );
} 