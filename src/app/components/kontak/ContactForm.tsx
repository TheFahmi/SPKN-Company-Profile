'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ContactFormProps {}

const ContactForm: React.FC<ContactFormProps> = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    perusahaan: '',
    pesan: ''
  });
  
  const [errors, setErrors] = useState({
    nama: false,
    email: false,
    telepon: false,
    pesan: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      nama: formData.nama.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      telepon: formData.telepon.trim() === '',
      pesan: formData.pesan.trim() === ''
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, you would send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSnackbar({
        open: true,
        message: 'Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.',
        severity: 'success'
      });
      
      // Reset form
      setFormData({
        nama: '',
        email: '',
        telepon: '',
        perusahaan: '',
        pesan: ''
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          borderRadius: 4,
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          height: '100%'
        }}
        id="form-kontak"
      >
        <Typography 
          variant="h4" 
          component="h2" 
          fontWeight="bold" 
          gutterBottom
          sx={{ 
            mb: 3,
            color: 'text.primary'
          }}
        >
          Kirim Pesan
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          paragraph
          sx={{ mb: 4 }}
        >
          Silakan isi formulir di bawah ini untuk mengirimkan pesan kepada kami. Tim kami akan segera menghubungi Anda.
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Nama Lengkap"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                error={errors.nama}
                helperText={errors.nama ? 'Nama tidak boleh kosong' : ''}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                helperText={errors.email ? 'Format email tidak valid' : ''}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Nomor Telepon"
                name="telepon"
                value={formData.telepon}
                onChange={handleChange}
                error={errors.telepon}
                helperText={errors.telepon ? 'Nomor telepon tidak boleh kosong' : ''}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Perusahaan/Institusi"
                name="perusahaan"
                value={formData.perusahaan}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Pesan"
                name="pesan"
                value={formData.pesan}
                onChange={handleChange}
                error={errors.pesan}
                helperText={errors.pesan ? 'Pesan tidak boleh kosong' : ''}
                multiline
                rows={5}
                variant="outlined"
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                sx={{ 
                  py: 1.5, 
                  px: 4,
                  fontWeight: 'bold',
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(25, 118, 210, 0.4)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.6)',
                  }
                }}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      {/* Snackbar for form submission feedback */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContactForm; 