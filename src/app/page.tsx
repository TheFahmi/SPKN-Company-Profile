'use client';

import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Paper,
  Stack,
  Fade,
  Slide,
  Grow
} from '@mui/material';
import Link from 'next/link';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HeroIllustration from './components/illustrations/HeroIllustration';

export default function Home() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    keunggulan: false,
    produk: false,
    testimonial: false,
    pengalaman: false,
    cta: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'keunggulan', 'produk', 'testimonial', 'pengalaman', 'cta'];
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top <= window.innerHeight * 0.75;
          setIsVisible(prev => ({ ...prev, [section]: isInView }));
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Box
        id="hero"
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 16 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Fade in={isVisible.hero} timeout={1000}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Slide direction="right" in={isVisible.hero} timeout={1200}>
                  <Box>
                    <Typography
                      variant="h2"
                      component="h1"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ 
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                        transform: isVisible.hero ? 'translateY(0)' : 'translateY(20px)',
                        opacity: isVisible.hero ? 1 : 0,
                        transition: 'all 0.6s ease-out'
                      }}
                    >
                      PT Sarana Pancakarya Nusa
                    </Typography>
                    <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.9 }}>
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
                </Slide>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Slide direction="left" in={isVisible.hero} timeout={1200}>
                  <Box sx={{ position: 'relative', height: 400, width: '100%' }}>
                    <HeroIllustration />
                  </Box>
                </Slide>
              </Grid>
            </Grid>
          </Container>
        </Fade>
      </Box>

      {/* Keunggulan Section */}
      <Container id="keunggulan" maxWidth="lg" sx={{ py: 8 }}>
        <Fade in={isVisible.keunggulan} timeout={1000}>
          <Box>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              gutterBottom
              fontWeight="bold"
              sx={{ 
                mb: 6,
                transform: isVisible.keunggulan ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible.keunggulan ? 1 : 0,
                transition: 'all 0.6s ease-out'
              }}
            >
              Keunggulan Kami
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Grow
                  in={isVisible.keunggulan}
                  timeout={1000}
                >
                  <Paper elevation={0} sx={{ 
                    p: 3, 
                    height: '100%', 
                    textAlign: 'center', 
                    borderRadius: 4, 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transform: isVisible.keunggulan ? 'translateY(0)' : 'translateY(40px)',
                    opacity: isVisible.keunggulan ? 1 : 0,
                    transition: 'all 0.6s ease-out'
                  }}>
                    <LocalPrintshopIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Pengalaman Sejak 1966
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lebih dari 55 tahun pengalaman dalam industri percetakan dan penerbitan.
                    </Typography>
                  </Paper>
                </Grow>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Grow
                  in={isVisible.keunggulan}
                  timeout={1200}
                >
                  <Paper elevation={0} sx={{ 
                    p: 3, 
                    height: '100%', 
                    textAlign: 'center', 
                    borderRadius: 4, 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transform: isVisible.keunggulan ? 'translateY(0)' : 'translateY(40px)',
                    opacity: isVisible.keunggulan ? 1 : 0,
                    transition: 'all 0.6s ease-out'
                  }}>
                    <AutoStoriesIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Solusi Lengkap
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Menyediakan layanan percetakan, penerbitan, dan solusi digital yang komprehensif.
                    </Typography>
                  </Paper>
                </Grow>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Grow
                  in={isVisible.keunggulan}
                  timeout={1400}
                >
                  <Paper elevation={0} sx={{ 
                    p: 3, 
                    height: '100%', 
                    textAlign: 'center', 
                    borderRadius: 4, 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transform: isVisible.keunggulan ? 'translateY(0)' : 'translateY(40px)',
                    opacity: isVisible.keunggulan ? 1 : 0,
                    transition: 'all 0.6s ease-out'
                  }}>
                    <VerifiedIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Kualitas Terjamin
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Menggunakan teknologi modern dan standar kualitas tinggi dalam setiap produksi.
                    </Typography>
                  </Paper>
                </Grow>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Grow
                  in={isVisible.keunggulan}
                  timeout={1600}
                >
                  <Paper elevation={0} sx={{ 
                    p: 3, 
                    height: '100%', 
                    textAlign: 'center', 
                    borderRadius: 4, 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transform: isVisible.keunggulan ? 'translateY(0)' : 'translateY(40px)',
                    opacity: isVisible.keunggulan ? 1 : 0,
                    transition: 'all 0.6s ease-out'
                  }}>
                    <SupportAgentIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Pelayanan Prima
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Memberikan pelayanan profesional dan solusi terbaik untuk setiap kebutuhan klien.
                    </Typography>
                  </Paper>
                </Grow>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>

      {/* Produk & Layanan Section */}
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
        <Fade in={isVisible.produk} timeout={1000}>
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
              {[
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
              ].map((item, index) => (
                <Grid item key={index} xs={12} sm={6} lg={3}>
                  <Grow
                    in={isVisible.produk}
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
                          {item.icon === 'LocalPrintshopIcon' && <LocalPrintshopIcon fontSize="medium" />}
                          {item.icon === 'GppGoodIcon' && <VerifiedIcon fontSize="medium" />}
                          {item.icon === 'AutoStoriesIcon' && <AutoStoriesIcon fontSize="medium" />}
                          {item.icon === 'DevicesIcon' && <SupportAgentIcon fontSize="medium" />}
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

      {/* Testimonial Section */}
      <Box id="testimonial" sx={{ 
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Fade in={isVisible.testimonial} timeout={1000}>
          <Container maxWidth="lg">
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
              {[
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
                },
              ].map((testimonial, index) => (
                <Grid item key={index} xs={12} md={4}>
                  <Grow
                    in={isVisible.testimonial}
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
                          <FormatQuoteIcon sx={{ fontSize: 40, color: 'primary.main', opacity: 0.5 }} />
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

      {/* Pengalaman Kami Section */}
      <Box 
        id="pengalaman"
        sx={{ 
          py: 8,
          bgcolor: '#f8fafc'
        }}
      >
        <Fade in={isVisible.pengalaman} timeout={1000}>
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              <Typography
                variant="h3"
                component="h2"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  mb: 1,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Pengalaman Kami
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ 
                  mb: 6, 
                  maxWidth: 600, 
                  mx: 'auto',
                  color: 'text.secondary'
                }}
              >
                Berbagai proyek yang telah kami kerjakan dengan dedikasi dan profesionalisme
              </Typography>

              <Stack spacing={3}>
                {/* 2023 */}
                <Slide direction="right" in={isVisible.pengalaman} timeout={1200}>
                  <Box
                    sx={{
                      p: 3,
                      borderLeft: '3px solid',
                      borderColor: 'primary.main',
                      bgcolor: 'white',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      borderRadius: '0 4px 4px 0',
                      transition: 'all 0.3s ease',
                      transform: isVisible.pengalaman ? 'translateX(0)' : 'translateX(-20px)',
                      opacity: isVisible.pengalaman ? 1 : 0,
                      '&:hover': {
                        transform: 'translateX(4px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <Typography 
                      variant="overline" 
                      color="primary"
                      sx={{ 
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        letterSpacing: 0.5,
                        display: 'block',
                        mb: 0.5
                      }}
                    >
                      Tahun Anggaran 2023
                    </Typography>
                    <Typography 
                      variant="body1"
                      sx={{ 
                        color: 'text.primary',
                        lineHeight: 1.6,
                        fontSize: '0.95rem'
                      }}
                    >
                      Pengadaan Pembuatan Buku Panduan Pelaksanaan Kebersihan, Kesehatan, Keselamatan, dan Kelestarian Lingkungan bagi Pelaku Usaha Pariwisata.
                    </Typography>
                  </Box>
                </Slide>

                {/* 2020 Projects */}
                <Box>
                  <Stack spacing={3}>
                    {[
                      'Pengadaan materiil Mutasi Luar Daerah Korlantas Polri',
                      'Pengadaan Cetak Buku Himpunan Peraturan Kapolri dan Peraturan Polri Tahun 2019 Divisi Hukum Polri',
                      'Kontrak Katalog Elektronik Sektoral Penyediaan Buku Panduan Pendidik Tahun 2020 Provinsi Nusa Tenggara Timur'
                    ].map((project, index) => (
                      <Slide
                        key={index}
                        direction="right"
                        in={isVisible.pengalaman}
                        timeout={1200 + (index * 200)}
                      >
                        <Box
                          sx={{
                            p: 3,
                            borderLeft: '3px solid',
                            borderColor: 'primary.main',
                            bgcolor: 'white',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            borderRadius: '0 4px 4px 0',
                            transition: 'all 0.3s ease',
                            transform: isVisible.pengalaman ? 'translateX(0)' : 'translateX(-20px)',
                            opacity: isVisible.pengalaman ? 1 : 0,
                            '&:hover': {
                              transform: 'translateX(4px)',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                            }
                          }}
                        >
                          <Typography 
                            variant="overline" 
                            color="primary"
                            sx={{ 
                              fontWeight: 500,
                              fontSize: '0.75rem',
                              letterSpacing: 0.5,
                              display: 'block',
                              mb: 0.5
                            }}
                          >
                            Tahun Anggaran 2020
                          </Typography>
                          <Typography 
                            variant="body1"
                            sx={{ 
                              color: 'text.primary',
                              lineHeight: 1.6,
                              fontSize: '0.95rem'
                            }}
                          >
                            {project}
                          </Typography>
                        </Box>
                      </Slide>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Container>
        </Fade>
      </Box>

      {/* CTA Section */}
      <Box id="cta" sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Fade in={isVisible.cta} timeout={1000}>
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
                transform: isVisible.cta ? 'translateY(0)' : 'translateY(40px)',
                opacity: isVisible.cta ? 1 : 0,
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
    </>
  );
}