'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Alert, 
  Snackbar, 
  CircularProgress 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function ContactForm() {
  // State untuk form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // State untuk mengontrol loading dan notifikasi
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handle perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat mengirim pesan');
      }

      // Reset form jika berhasil
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setSuccessMessage('Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda!');
      setOpenSnackbar(true);
    } catch (error: any) {
      setErrorMessage(error.message || 'Terjadi kesalahan saat mengirim pesan');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Hubungi Kami
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Kirim pesan kepada kami untuk pertanyaan, pemesanan, atau informasi lebih lanjut tentang layanan percetakan kami.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Nama"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Subjek"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Pesan"
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Mengirim...' : 'Kirim Pesan'}
        </Button>
      </Box>

      {/* Snackbar untuk notifikasi */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={successMessage ? "success" : "error"} 
          sx={{ width: '100%' }}
        >
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
} 