'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';

interface HeaderSectionProps {}

const HeaderSection: React.FC<HeaderSectionProps> = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/images/bg-pattern.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '400px',
          opacity: 0.1,
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{ 
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            textAlign: 'center'
          }}
        >
          Hubungi Kami
        </Typography>
        <Typography 
          variant="h6" 
          component="p"
          sx={{ 
            maxWidth: 700, 
            mx: 'auto', 
            textAlign: 'center',
            opacity: 0.9
          }}
        >
          Kami siap membantu mewujudkan kebutuhan percetakan Anda. Hubungi kami untuk konsultasi dan penawaran terbaik.
        </Typography>
      </Container>
    </Box>
  );
};

export default HeaderSection; 