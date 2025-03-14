'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  Paper
} from '@mui/material';
import Link from 'next/link';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import VerifiedIcon from '@mui/icons-material/Verified';

interface CTASectionProps {}

const CTASection: React.FC<CTASectionProps> = () => {
  const services = [
    {
      icon: <LocalPrintshopIcon sx={{ fontSize: 40 }} />,
      title: 'Percetakan Umum',
      description: 'Solusi cetak berkualitas tinggi untuk berbagai kebutuhan bisnis dan personal.',
      link: '/produk#percetakan-umum'
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
      title: 'Security Printing',
      description: 'Cetak dokumen berharga dengan fitur keamanan canggih untuk mencegah pemalsuan.',
      link: '/produk#security-printing'
    },
    {
      icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />,
      title: 'Penerbitan',
      description: 'Layanan penerbitan profesional untuk buku, majalah, dan publikasi lainnya.',
      link: '/produk#penerbitan'
    }
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 8 
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
          >
            Solusi Percetakan untuk Kebutuhan Anda
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ 
              maxWidth: 700, 
              mx: 'auto' 
            }}
          >
            Kami menyediakan berbagai layanan percetakan dan penerbitan berkualitas tinggi
            untuk memenuhi kebutuhan bisnis dan institusi Anda.
          </Typography>
        </Box>
        
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {services.map((service, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 15px 35px rgba(25, 118, 210, 0.15)',
                  }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    mb: 3,
                    mx: 'auto'
                  }}
                >
                  {service.icon}
                </Box>
                
                <Typography
                  variant="h5"
                  component="h3"
                  fontWeight="bold"
                  align="center"
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  {service.title}
                </Typography>
                
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  paragraph
                  sx={{ mb: 3 }}
                >
                  {service.description}
                </Typography>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    href={service.link}
                    sx={{
                      borderRadius: 2,
                      py: 1,
                      px: 3,
                      fontWeight: 'medium',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white'
                      }
                    }}
                  >
                    Pelajari Lebih Lanjut
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Siap untuk Memulai Proyek Anda?
          </Typography>
          
          <Typography
            variant="body1"
            paragraph
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              mb: 4,
              opacity: 0.9
            }}
          >
            Hubungi kami sekarang untuk konsultasi gratis dan penawaran terbaik untuk kebutuhan percetakan Anda.
            Tim kami siap membantu mewujudkan visi Anda dengan kualitas terbaik.
          </Typography>
          
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component="a"
            href="#form-kontak"
            sx={{
              py: 1.5,
              px: 4,
              fontWeight: 'bold',
              borderRadius: 2,
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
              }
            }}
          >
            Hubungi Kami Sekarang
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default CTASection; 