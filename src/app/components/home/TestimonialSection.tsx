'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  Button,
  Avatar,
  Rating,
  Grow,
  Fade
} from '@mui/material';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import BusinessIcon from '@mui/icons-material/Business';

interface TestimonialSectionProps {
  isVisible: boolean;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ isVisible }) => {
  const testimonials = [
    {
      name: 'Bank Indonesia',
      role: 'Institusi Keuangan',
      text: 'Mitra terpercaya dalam mencetak dokumen-dokumen penting dengan standar keamanan tinggi. Kualitas hasil dan profesionalisme tim sangat memuaskan.',
      rating: 5,
      bgColor: '#bbdefb',
      avatar: 'B',
    },
    {
      name: 'Kementerian Keuangan',
      role: 'Institusi Pemerintah',
      text: 'Layanan percetakan berkualitas tinggi untuk berbagai dokumen resmi dan publikasi pemerintah. Selalu tepat waktu dan sesuai spesifikasi yang diminta.',
      rating: 5,
      bgColor: '#c8e6c9',
      avatar: 'K',
    },
    {
      name: 'BNI',
      role: 'Perbankan',
      text: 'Solusi security printing yang handal dan profesional untuk kebutuhan perbankan. Fitur keamanan yang diterapkan sangat membantu dalam mencegah pemalsuan dokumen.',
      rating: 5,
      bgColor: '#ffecb3',
      avatar: 'B',
    }
  ];

  return (
    <Box id="testimonial" sx={{ 
      py: { xs: 8, md: 12 },
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        backgroundImage: 'url(/images/bg-pattern.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '400px',
        opacity: 0.03,
        zIndex: 0,
      }
    }}>
      <Fade in={isVisible} timeout={1000}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography
              variant="overline"
              component="p"
              sx={{ 
                color: 'primary.main',
                fontWeight: 600,
                letterSpacing: 1.5,
                mb: 1
              }}
            >
              DIPERCAYA OLEH
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              sx={{ 
                mb: 2,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Klien Kami
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ 
                maxWidth: 650,
                mx: 'auto',
                mb: 6
              }}
            >
              Kami telah dipercaya oleh berbagai institusi terkemuka di Indonesia untuk
              memberikan solusi percetakan dan penerbitan berkualitas tinggi.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item key={index} xs={12} md={4}>
                <Grow
                  in={isVisible}
                  timeout={1000 + (index * 200)}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 15px 35px rgba(25, 118, 210, 0.15)',
                      }
                    }}
                  >
                    <Box sx={{ 
                      p: 3, 
                      bgcolor: testimonial.bgColor,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: -15,
                        left: 30,
                        width: 0,
                        height: 0,
                        borderLeft: '15px solid transparent',
                        borderRight: '15px solid transparent',
                        borderTop: `15px solid ${testimonial.bgColor}`,
                      }
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Box component={FormatQuoteIcon} sx={{ fontSize: 40, color: 'primary.main', opacity: 0.5 }} />
                        <Rating 
                          value={testimonial.rating} 
                          readOnly 
                          precision={0.5}
                          icon={<StarIcon fontSize="small" />}
                          emptyIcon={<StarIcon fontSize="small" style={{ opacity: 0.3 }} />}
                        />
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontStyle: 'italic',
                          color: 'text.primary',
                          fontWeight: 500
                        }}
                      >
                        "{testimonial.text}"
                      </Typography>
                    </Box>
                    
                    <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main',
                          width: 50,
                          height: 50,
                          mr: 2,
                          fontWeight: 'bold'
                        }}
                      >
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="primary.main" fontWeight={500}>
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
          
          <Box 
            sx={{ 
              mt: 8, 
              textAlign: 'center',
              p: 4,
              borderRadius: 4,
              bgcolor: 'rgba(25, 118, 210, 0.04)',
              border: '1px dashed',
              borderColor: 'primary.light'
            }}
          >
            <Typography 
              variant="h5" 
              component="p" 
              fontWeight="medium"
              sx={{ mb: 3, color: 'text.primary' }}
            >
              Bergabunglah dengan ratusan klien puas kami
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              href="/kontak"
              startIcon={<BusinessIcon />}
              sx={{ 
                fontWeight: 'bold', 
                py: 1.5, 
                px: 4,
                borderRadius: 3,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                boxShadow: '0 4px 14px rgba(25, 118, 210, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.6)',
                }
              }}
            >
              Jadilah Klien Kami
            </Button>
          </Box>
        </Container>
      </Fade>
    </Box>
  );
};

export default TestimonialSection;