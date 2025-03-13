'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Breadcrumbs,
  Link as MuiLink,
  Fade
} from '@mui/material';
import Link from 'next/link';
import { ContactIllustration } from '../illustrations';

interface ContactHeaderProps {
  isVisible: boolean;
}

const ContactHeader: React.FC<ContactHeaderProps> = ({ isVisible }) => {
  return (
    <Fade in={isVisible} timeout={1000}>
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
  );
};

export default ContactHeader;