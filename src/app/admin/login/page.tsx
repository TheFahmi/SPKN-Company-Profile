'use client';

import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert, 
  CircularProgress,
  Skeleton
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Error during login:', err);
      setError('Terjadi kesalahan saat login. Silakan coba lagi.');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          boxShadow: theme => 
            theme.palette.mode === 'dark' 
              ? '0 8px 32px rgba(0,0,0,0.5)' 
              : '0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Box sx={{ mb: 4 }}>
              <Skeleton variant="rectangular" width="60%" height={40} sx={{ mx: 'auto', mb: 3 }} />
              <Skeleton variant="rectangular" width="80%" height={20} sx={{ mx: 'auto', mb: 1 }} />
              <Skeleton variant="rectangular" width="40%" height={20} sx={{ mx: 'auto' }} />
            </Box>
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" width="100%" height={42} />
          </Box>
        ) : (
          <>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Admin Login
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary" paragraph>
              Masuk ke panel admin untuk mengelola konten website
            </Typography>

            {error && (
              <Alert severity="error" sx={{ my: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={loading}
              >
                Login
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
} 