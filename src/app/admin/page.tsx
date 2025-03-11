'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Alert,
  InputAdornment,
  IconButton,
  Grid,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import AdminIllustration from '../components/illustrations/AdminIllustration';

// Skema validasi form login
const loginSchema = z.object({
  username: z.string().min(3, { message: 'Username harus minimal 3 karakter' }),
  password: z.string().min(6, { message: 'Password harus minimal 6 karakter' }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginForm) => {
    // Untuk contoh ini, kita hanya memeriksa kredensial sederhana
    // Pada implementasi nyata, Anda akan mengirim permintaan ke backend
    if (data.username === 'admin' && data.password === 'admin123') {
      // Login berhasil, arahkan ke dashboard admin
      router.push('/admin/dashboard');
    } else {
      // Login gagal, tampilkan pesan error
      setLoginError('Username atau password salah');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}
            >
              <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                <LockIcon color="primary" sx={{ fontSize: 60 }} />
              </Box>
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                Admin Login
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Masuk ke panel admin untuk mengelola produk dan konten
              </Typography>

              {loginError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {loginError}
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mb: 3 }}>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Username"
                        variant="outlined"
                        fullWidth
                        error={!!errors.username}
                        helperText={errors.username?.message}
                      />
                    )}
                  />
                </Box>
                <Box sx={{ mb: 4 }}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Masuk
                </Button>
              </form>

              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Lupa password? Hubungi administrator sistem
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ height: 400 }}>
              <AdminIllustration />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 