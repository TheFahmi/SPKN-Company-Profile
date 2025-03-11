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
            <Box
              sx={{
                opacity: isVisible.form ? 1 : 0,
                transform: isVisible.form ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease-out'
              }}
            >
              <Paper elevation={0} sx={{ p: 4 }}>
                <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                  Kirim Pesan
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4 }}>
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
                        sx={{ py: 1.5, px: 4 }}
                      >
                        Kirim Pesan
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                opacity: isVisible.info ? 1 : 0,
                transform: isVisible.info ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.5s ease-out'
              }}
            >
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Informasi Kontak
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4 }}>
                  Anda juga dapat menghubungi kami melalui informasi di bawah ini:
                </Typography>
                
                <List disablePadding>
                  <ListItem disableGutters sx={{ pb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <LocationOnIcon color="primary" fontSize="large" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Alamat" 
                      secondary="Jl. Percetakan No. 123, Jakarta Selatan, 12345"
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                    />
                  </ListItem>
                  <ListItem disableGutters sx={{ pb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <EmailIcon color="primary" fontSize="large" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email" 
                      secondary="info@cetakbuku.com"
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                    />
                  </ListItem>
                  <ListItem disableGutters sx={{ pb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <PhoneIcon color="primary" fontSize="large" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Telepon" 
                      secondary="+62 812-3456-7890"
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <AccessTimeIcon color="primary" fontSize="large" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Jam Operasional" 
                      secondary="Senin - Jumat: 08.00 - 17.00 WIB"
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Social Media */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                  Ikuti Kami
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  Dapatkan informasi terbaru dan promo menarik melalui media sosial kami:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="outlined" color="primary" href="#" target="_blank">
                    Facebook
                  </Button>
                  <Button variant="outlined" color="primary" href="#" target="_blank">
                    Instagram
                  </Button>
                  <Button variant="outlined" color="primary" href="#" target="_blank">
                    Twitter
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <Box sx={{ height: 400, width: '100%', mt: 4 }}>
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
    </>
  );
} 