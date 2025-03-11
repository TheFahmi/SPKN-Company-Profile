import { Box, Typography, Container, Paper } from '@mui/material';
import Image from 'next/image';
import { Metadata } from 'next';
import { Build as BuildIcon } from '@mui/icons-material';

export const metadata: Metadata = {
  title: 'Maintenance Mode - PT SPKN',
  description: 'Website sedang dalam perbaikan',
};

export default function MaintenancePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200%',
            height: '200%',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 15s infinite linear',
          },
          '@keyframes ripple': {
            '0%': {
              transform: 'translate(-50%, -50%) scale(0.8)',
              opacity: 0.5,
            },
            '50%': {
              transform: 'translate(-50%, -50%) scale(1)',
              opacity: 0.3,
            },
            '100%': {
              transform: 'translate(-50%, -50%) scale(0.8)',
              opacity: 0.5,
            },
          },
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper
          elevation={24}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Image
              src="https://spkn.co.id/wp-content/uploads/elementor/thumbs/LOGO-SPKN-NEW-300x274-removebg-preview-1-qfqh90c9we3vc1w52kgko3f13r707nf8egy7ksj0fc.png"
              alt="Logo SPKN"
              width={180}
              height={180}
              priority
              style={{ 
                filter: 'brightness(0) invert(1)',
                marginBottom: '1rem'
              }}
            />
          </Box>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mb: 3 
          }}>
            <BuildIcon sx={{ 
              fontSize: 40, 
              mr: 2,
              color: 'white',
              animation: 'spin 4s infinite linear',
              '@keyframes spin': {
                '0%': {
                  transform: 'rotate(0deg)',
                },
                '100%': {
                  transform: 'rotate(360deg)',
                },
              },
            }} />
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              Maintenance Mode
            </Typography>
          </Box>

          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              color: 'white',
              opacity: 0.9,
              fontWeight: 300,
            }}
          >
            Website Sedang Dalam Perbaikan
          </Typography>

          <Typography 
            sx={{ 
              color: 'white',
              opacity: 0.8,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Mohon maaf atas ketidaknyamanannya. Tim kami sedang melakukan pembaruan
            dan peningkatan sistem untuk memberikan layanan yang lebih baik.
            <br />
            Silakan kembali beberapa saat lagi.
          </Typography>

          <Box sx={{ mt: 6, color: 'white', opacity: 0.7 }}>
            <Typography variant="body2">
              PT. SPKN - Sistem Manajemen Percetakan
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}