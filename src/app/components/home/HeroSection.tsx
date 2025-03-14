'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Stack
} from '@mui/material';
import Link from 'next/link';
import HeroIllustration from '../illustrations/HeroIllustration';

const HeroSection: React.FC = () => {
  return (
    <Box
      id="hero"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 16 },
        position: 'relative',
        overflow: 'hidden',
        // Add content-visibility for better performance
        contentVisibility: 'auto',
        // Reserve space to prevent layout shifts
        containIntrinsicSize: '0 500px',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h2"
                component="h1"
                fontWeight="bold"
                gutterBottom
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  // Add GPU acceleration for text rendering
                  transform: 'translateZ(0)',
                }}
              >
                PT Sarana Pancakarya Nusa
              </Typography>
              <Typography 
                variant="h5" 
                paragraph 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  // Add GPU acceleration for text rendering
                  transform: 'translateZ(0)',
                }}
              >
                Perusahaan percetakan dan penerbitan yang berpengalaman sejak tahun 1966, menyediakan solusi cetak berkualitas untuk berbagai kebutuhan.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={Link}
                  href="/produk"
                  sx={{ fontWeight: 'bold', py: 1.5, px: 3 }}
                >
                  Produk & Layanan
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  component={Link}
                  href="/kontak"
                  sx={{ 
                    fontWeight: 'bold', 
                    py: 1.5, 
                    px: 3, 
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Hubungi Kami
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box 
              sx={{ 
                position: 'relative', 
                height: 400, 
                width: '100%',
                // Add will-change to hint browser about animation
                willChange: 'transform',
              }}
            >
              <HeroIllustration />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;