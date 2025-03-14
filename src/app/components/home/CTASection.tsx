'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  Fade
} from '@mui/material';
import Link from 'next/link';

interface CTASectionProps {
  isVisible: boolean;
}

const CTASection: React.FC<CTASectionProps> = ({ isVisible }) => {
  return (
    <Box id="cta" sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
      <Fade 
        in={isVisible} 
        timeout={800}
        style={{ 
          transitionDelay: isVisible ? '120ms' : '0ms',
          willChange: 'opacity, transform' 
        }}
      >
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              maxWidth: 800, 
              mx: 'auto', 
              textAlign: 'center',
              px: 3,
              py: 4,
              borderRadius: 4,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.6s ease-out'
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
              Butuh Solusi Percetakan?
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, opacity: 0.9 }}>
              Kami siap membantu mewujudkan kebutuhan percetakan Anda dengan kualitas terbaik dan layanan profesional.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              href="/kontak"
              sx={{ 
                fontWeight: 'bold', 
                py: 2, 
                px: 6,
                borderRadius: 3,
                fontSize: '1.1rem'
              }}
            >
              Hubungi Kami
            </Button>
          </Box>
        </Container>
      </Fade>
    </Box>
  );
};

export default CTASection;