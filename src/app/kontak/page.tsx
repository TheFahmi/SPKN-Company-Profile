'use client';

import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  Breadcrumbs,
  Link as MuiLink,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade
} from '@mui/material';
import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ContactForm as ContactFormType } from '../types';
import { ContactIllustration } from '../components/illustrations';
import ContactForm from '../components/ContactForm';
import PlaceIcon from '@mui/icons-material/Place';

// Skema validasi form kontak
const contactSchema = z.object({
  name: z.string().min(3, { message: 'Nama harus minimal 3 karakter' }),
  email: z.string().email({ message: 'Email tidak valid' }),
  phone: z.string().min(10, { message: 'Nomor telepon tidak valid' }),
  message: z.string().min(10, { message: 'Pesan harus minimal 10 karakter' }),
});

export default function ContactPage() {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const [isVisible, setIsVisible] = useState({
    header: false,
    form: false,
    info: false
  });

  useEffect(() => {
    setIsVisible({
      header: true,
      form: true,
      info: true
    });
  }, []);

  const onSubmit = (data: ContactFormType) => {
    console.log(data);
    // Di sini Anda akan mengirim data ke backend
    // Untuk contoh ini, kita hanya menampilkan alert dan mereset form
    alert('Pesan Anda telah dikirim! Kami akan menghubungi Anda segera.');
    reset();
  };

  return (
    <>
      <Fade in={isVisible.header} timeout={1000}>
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            pt: { xs: 6, md: 8 },
            pb: { xs: 8, md: 10 },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Illustration */}
          <Box
            sx={{
              position: 'absolute',
              right: -100,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '600px',
              height: '600px',
              opacity: 0.1,
              display: { xs: 'none', md: 'block' }
            }}
          >
            <ContactIllustration />
          </Box>

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                  Hubungi Kami
                </Typography>
                <Typography variant="h6" color="rgba(255, 255, 255, 0.8)" sx={{ mb: 3 }}>
                  Kami Siap Membantu Mewujudkan Kebutuhan Cetak Anda
                </Typography>
                <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  <MuiLink component={Link} href="/" color="inherit" underline="hover">
                    Beranda
                  </MuiLink>
                  <Typography color="white">Kontak</Typography>
                </Breadcrumbs>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Box
                  sx={{
                    position: 'relative',
                    height: 200,
                    width: '100%',
                  }}
                >
                  <ContactIllustration />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Fade>

      {/* Contact Form & Info Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Fade in={isVisible.form} timeout={1000}>
              <Paper elevation={3} sx={{ 
                p: { xs: 3, md: 5 }, 
                borderRadius: 4, 
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '6px',
                  background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                }
              }}>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1
                  }}
                >
                  Kirim Pesan
                </Typography>
                <Typography 
                  variant="body1" 
                  paragraph 
                  color="text.secondary" 
                  sx={{ mb: 4 }}
                >
                  Isi formulir di bawah ini untuk mengirim pesan kepada kami. Kami akan merespons secepat mungkin.
                </Typography>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Nama Lengkap"
                            variant="outlined"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            InputProps={{
                              sx: { borderRadius: 2 }
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            InputProps={{
                              sx: { borderRadius: 2 }
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Nomor Telepon"
                            variant="outlined"
                            fullWidth
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                            InputProps={{
                              sx: { borderRadius: 2 }
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="message"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Pesan"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            error={!!errors.message}
                            helperText={errors.message?.message}
                            InputProps={{
                              sx: { borderRadius: 2 }
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<SendIcon />}
                        sx={{ 
                          py: 1.5, 
                          px: 4, 
                          borderRadius: 2,
                          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                          boxShadow: '0 4px 14px rgba(25, 118, 210, 0.4)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 6px 20px rgba(25, 118, 210, 0.6)',
                          }
                        }}
                      >
                        Kirim Pesan
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Fade>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Fade in={isVisible.info} timeout={1000} style={{ transitionDelay: '300ms' }}>
              <Box>
                <Paper elevation={3} sx={{ 
                  p: 4, 
                  borderRadius: 4, 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
                  mb: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: 'radial-gradient(circle, rgba(25, 118, 210, 0.1) 0%, rgba(255,255,255,0) 70%)',
                    borderRadius: '0 0 0 100%',
                    zIndex: 0
                  }
                }}>
                  <Typography 
                    variant="h5" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{
                      background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    Informasi Kontak
                  </Typography>
                  <Typography 
                    variant="body1" 
                    paragraph 
                    color="text.secondary" 
                    sx={{ mb: 4, position: 'relative', zIndex: 1 }}
                  >
                    Anda juga dapat menghubungi kami melalui informasi di bawah ini:
                  </Typography>
                  
                  <List disablePadding sx={{ position: 'relative', zIndex: 1 }}>
                    <ListItem 
                      disableGutters 
                      sx={{ 
                        pb: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 50 }}>
                        <Box sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: '50%', 
                          bgcolor: 'rgba(25, 118, 210, 0.1)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          <LocationOnIcon color="primary" />
                        </Box>
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                            Alamat
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Jl. Percetakan No. 123, Jakarta Selatan, 12345
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem 
                      disableGutters 
                      sx={{ 
                        pb: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 50 }}>
                        <Box sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: '50%', 
                          bgcolor: 'rgba(25, 118, 210, 0.1)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          <EmailIcon color="primary" />
                        </Box>
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                            Email
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            info@cetakbuku.com
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem 
                      disableGutters 
                      sx={{ 
                        pb: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 50 }}>
                        <Box sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: '50%', 
                          bgcolor: 'rgba(25, 118, 210, 0.1)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          <PhoneIcon color="primary" />
                        </Box>
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                            Telepon
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            +62 812-3456-7890
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem 
                      disableGutters 
                      sx={{ 
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 50 }}>
                        <Box sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: '50%', 
                          bgcolor: 'rgba(25, 118, 210, 0.1)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          <AccessTimeIcon color="primary" />
                        </Box>
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                            Jam Operasional
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Senin - Jumat: 08.00 - 17.00 WIB
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Paper>

                {/* Social Media */}
                <Paper elevation={3} sx={{ 
                  p: 4, 
                  borderRadius: 4, 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{
                      color: 'text.primary',
                      mb: 1
                    }}
                  >
                    Ikuti Kami
                  </Typography>
                  <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 3 }}>
                    Dapatkan informasi terbaru dan promo menarik melalui media sosial kami:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      href="#" 
                      target="_blank"
                      sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        bgcolor: '#1877F2',
                        '&:hover': {
                          bgcolor: '#0E63D1',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 6px 20px rgba(14, 99, 209, 0.4)',
                        }
                      }}
                    >
                      Facebook
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      href="#" 
                      target="_blank"
                      sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        bgcolor: '#E4405F',
                        '&:hover': {
                          bgcolor: '#D32E50',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 6px 20px rgba(211, 46, 80, 0.4)',
                        }
                      }}
                    >
                      Instagram
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      href="#" 
                      target="_blank"
                      sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        bgcolor: '#1DA1F2',
                        '&:hover': {
                          bgcolor: '#0C8BD9',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 6px 20px rgba(12, 139, 217, 0.4)',
                        }
                      }}
                    >
                      Twitter
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <Box sx={{ 
        mt: 8, 
        mb: 8,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: { xs: 2, md: 4 },
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      }}>
        <Box sx={{ 
          p: 4, 
          bgcolor: 'primary.main', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <PlaceIcon fontSize="large" />
          <Typography variant="h5" fontWeight="bold">
            Lokasi Kami
          </Typography>
        </Box>
        <Box sx={{ height: 450, width: '100%' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.29279605123!2d106.7588548!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1647834456970!5m2!1sid!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Lokasi Cetak Buku"
          />
        </Box>
      </Box>
    </>
  );
} 