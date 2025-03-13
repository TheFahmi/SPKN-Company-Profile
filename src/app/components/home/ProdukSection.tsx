'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  Button,
  Grow,
  Fade
} from '@mui/material';
import Link from 'next/link';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import VerifiedIcon from '@mui/icons-material/Verified';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface ProdukSectionProps {
  isVisible: boolean;
}

const ProdukSection: React.FC<ProdukSectionProps> = ({ isVisible }) => {
  const productItems = [
    {
      title: 'Percetakan Umum',
      description: 'Layanan cetak berkualitas tinggi untuk berbagai kebutuhan bisnis dan personal, termasuk brosur, kartu nama, banner, dan material promosi.',
      icon: 'LocalPrintshopIcon',
      features: ['Brosur & Flyer', 'Kartu Nama', 'Banner & Spanduk', 'Material Promosi']
    },
    {
      title: 'Security Printing',
      description: 'Solusi cetak dokumen berharga dengan fitur keamanan khusus untuk mencegah pemalsuan dan menjamin keaslian dokumen Anda.',
      icon: 'GppGoodIcon',
      features: ['Hologram', 'Watermark', 'Microtext', 'Invisible Ink']
    },
    {
      title: 'Penerbitan',
      description: 'Layanan penerbitan profesional untuk buku, majalah, dan publikasi lainnya dengan standar kualitas internasional.',
      icon: 'AutoStoriesIcon',
      features: ['Buku', 'Majalah', 'Jurnal', 'Annual Report']
    },
    {
      title: 'Solusi Digital',
      description: 'Layanan digital printing dan manajemen konten untuk era modern dengan teknologi terkini dan hasil berkualitas tinggi.',
      icon: 'DevicesIcon',
      features: ['Digital Printing', 'Print on Demand', 'Variable Data', 'Web to Print']
    }
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'LocalPrintshopIcon':
        return <LocalPrintshopIcon fontSize="medium" />;
      case 'GppGoodIcon':
        return <VerifiedIcon fontSize="medium" />;
      case 'AutoStoriesIcon':
        return <AutoStoriesIcon fontSize="medium" />;
      case 'DevicesIcon':
        return <SupportAgentIcon fontSize="medium" />;
      default:
        return null;
    }
  };

  return (
    <Box id="produk" sx={{ 
      py: { xs: 8, md: 12 },
      position: 'relative',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
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
        opacity: 0.05,
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
              SOLUSI LENGKAP UNTUK ANDA
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
              Produk & Layanan
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
              Kami menyediakan berbagai solusi percetakan dan penerbitan berkualitas tinggi
              untuk memenuhi kebutuhan bisnis dan institusi Anda.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {productItems.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} lg={3}>
                <Grow
                  in={isVisible}
                  timeout={1000 + (index * 200)}
                >
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      borderRadius: 4, 
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 15px 35px rgba(25, 118, 210, 0.15)',
                        '& .MuiBox-root.product-icon': {
                          transform: 'scale(1.1) rotate(5deg)',
                          bgcolor: 'primary.main',
                          color: 'white'
                        }
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        p: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        fontWeight="bold"
                        sx={{ color: 'text.primary' }}
                      >
                        {item.title}
                      </Typography>
                      <Box 
                        className="product-icon"
                        sx={{ 
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'primary.light',
                          color: 'primary.main',
                          transition: 'all 0.3s ease-in-out'
                        }}
                      >
                        {renderIcon(item.icon)}
                      </Box>
                    </Box>
                    
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 3 }}
                      >
                        {item.description}
                      </Typography>
                      
                      <Typography 
                        variant="subtitle2" 
                        fontWeight="bold"
                        sx={{ 
                          mb: 2,
                          color: 'primary.main',
                          textTransform: 'uppercase',
                          fontSize: '0.75rem',
                          letterSpacing: 0.5
                        }}
                      >
                        Fitur Utama:
                      </Typography>
                      
                      <Box component="ul" sx={{ pl: 2, mb: 0, mt: 0 }}>
                        {item.features.map((feature, idx) => (
                          <Typography 
                            key={idx} 
                            component="li" 
                            variant="body2"
                            sx={{ 
                              mb: 0.5,
                              color: 'text.secondary'
                            }}
                          >
                            {feature}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                    
                    <Box 
                      sx={{ 
                        p: 3, 
                        pt: 0,
                        mt: 'auto',
                        borderTop: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Button 
                        fullWidth
                        variant="outlined" 
                        color="primary" 
                        component={Link} 
                        href="/produk"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          py: 1,
                          fontWeight: 600,
                          borderRadius: 2,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: 'primary.main',
                            color: 'white',
                            transform: 'translateX(5px)'
                          }
                        }}
                      >
                        Pelajari Lebih Lanjut
                      </Button>
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
              Butuh solusi percetakan khusus untuk kebutuhan Anda?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              href="/produk"
              startIcon={<LocalPrintshopIcon />}
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
              Lihat Semua Produk & Layanan
            </Button>
          </Box>
        </Container>
      </Fade>
    </Box>
  );
};

export default ProdukSection;