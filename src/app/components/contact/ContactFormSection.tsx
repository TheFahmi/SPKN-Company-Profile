'use client';

import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  TextField, 
  Button,
  Fade
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ContactForm as ContactFormType } from '../../types';

interface ContactFormSectionProps {
  isVisible: boolean;
}

// Skema validasi form kontak
const contactSchema = z.object({
  name: z.string().min(3, { message: 'Nama harus minimal 3 karakter' }),
  email: z.string().email({ message: 'Email tidak valid' }),
  phone: z.string().min(10, { message: 'Nomor telepon tidak valid' }),
  message: z.string().min(10, { message: 'Pesan harus minimal 10 karakter' }),
});

const ContactFormSection: React.FC<ContactFormSectionProps> = ({ isVisible }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormType) => {
    console.log(data);
    // Di sini Anda akan mengirim data ke backend
    // Untuk contoh ini, kita hanya menampilkan alert dan mereset form
    alert('Pesan Anda telah dikirim! Kami akan menghubungi Anda segera.');
    reset();
  };

  return (
    <Fade in={isVisible} timeout={1000}>
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
  );
};

export default ContactFormSection;