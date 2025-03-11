'use client';

import { Box, Typography, Button, Container, Paper } from '@mui/material';
import Link from 'next/link';
import { BugReport as BugIcon } from '@mui/icons-material';

export default function ErrorPage() {
  return (
    <Box 
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            textAlign: 'center',
            p: { xs: 3, md: 5 },
          }}
        >
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BugIcon 
              color="error" 
              sx={{ 
                fontSize: 100,
                mb: 2,
              }} 
            />
            
            <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
              Error
            </Typography>
            
            <Typography 
              variant="h5" 
              component="h2" 
              fontWeight="500" 
              gutterBottom
            >
              Terjadi Kesalahan
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ mb: 4, maxWidth: '80%', mx: 'auto' }}
            >
              Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button
                component={Link}
                href="/"
                variant="contained"
                color="primary"
                size="large"
                sx={{ minWidth: 120, py: 1 }}
              >
                Ke Beranda
              </Button>
              
              <Button
                onClick={() => window.location.reload()}
                variant="outlined"
                size="large"
                sx={{ minWidth: 120, py: 1 }}
              >
                Coba Lagi
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
} 