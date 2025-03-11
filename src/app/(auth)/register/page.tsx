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
  Person as PersonIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);

      // Validasi password
      if (data.password !== data.confirmPassword) {
        setError('Password tidak cocok');
        return;
      }

      // Registrasi pengguna
      await registerUser(data.email, data.password, data.name);
      
      // Redirect ke halaman login setelah berhasil
      router.push('/login');
    } catch (err: any) {
      console.error('Register error:', err);
      setError(err.message || 'Terjadi kesalahan saat registrasi');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                Daftar Akun
              </Typography>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                align="center"
                sx={{ mb: 3 }}
              >
                Buat akun baru untuk mengakses sistem
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: 'Nama diperlukan',
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Nama Lengkap"
                      autoComplete="name"
                      autoFocus
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

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
                      autoComplete="new-password"
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

                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: 'Konfirmasi password diperlukan',
                    validate: (value, formValues) => 
                      value === formValues.password || 'Password tidak cocok'
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      label="Konfirmasi Password"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                  {isLoading ? <CircularProgress size={24} /> : 'DAFTAR'}
                </Button>
                
                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    atau
                  </Typography>
                </Divider>

                <Box sx={{ textAlign: 'center', mt: 1 }}>
                  <MuiLink 
                    component={Link} 
                    href="/login" 
                    variant="body2"
                    underline="hover"
                  >
                    Sudah punya akun? Login sekarang
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