'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  Divider,
  Link as MuiLink,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { signIn, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      await signIn(data.email, data.password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Terjadi kesalahan saat login');
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
        background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={10} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <CardContent sx={{ p: 0, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            {/* Brand Section */}
            <Box 
              sx={{ 
                bgcolor: 'primary.dark',
                color: 'white',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: { xs: '100%', md: '40%' }
              }}
            >
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                Percetakan
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8, mb: 2 }}>
                Sistem Manajemen Percetakan
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={150}
                  height={150}
                  style={{ 
                    objectFit: 'contain',
                    opacity: 0.9
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </Box>
            </Box>

            {/* Form Section */}
            <Box sx={{ p: 4, width: { xs: '100%', md: '60%' } }}>
              <Typography 
                component="h1" 
                variant="h5" 
                fontWeight="bold"
                align="center"
                gutterBottom
              >
                Login
              </Typography>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                align="center"
                sx={{ mb: 3 }}
              >
                Masukkan kredensial Anda untuk mengakses panel admin
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email diperlukan',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Format email tidak valid'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      autoComplete="email"
                      autoFocus
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: 'Password diperlukan',
                    minLength: {
                      value: 6,
                      message: 'Password minimal 6 karakter'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ 
                    mt: 3, 
                    mb: 2,
                    py: 1.5,
                    fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'MASUK'}
                </Button>
                
                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    atau
                  </Typography>
                </Divider>

                <Box sx={{ textAlign: 'center', mt: 1 }}>
                  <MuiLink 
                    component={Link} 
                    href="/register" 
                    variant="body2"
                    underline="hover"
                  >
                    Belum punya akun? Daftar sekarang
                  </MuiLink>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
} 