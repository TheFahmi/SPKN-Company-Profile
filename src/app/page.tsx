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
// Add these imports after the existing imports
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import BusinessIcon from '@mui/icons-material/Business';
import TimelineIcon from '@mui/icons-material/Timeline';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';

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

      {/* Keunggulan Kami Section */}
      <Box id="keunggulan" sx={{ 
        py: { xs: 8, md: 12 },
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
        <Fade in={isVisible.keunggulan} timeout={1000}>
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
                MENGAPA MEMILIH KAMI
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
                Keunggulan Kami
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
                Dengan pengalaman lebih dari 55 tahun, kami menawarkan solusi percetakan terbaik
                dengan standar kualitas tinggi dan layanan profesional.
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {[
                {
                  title: 'Pengalaman Sejak 1966',
                  description: 'Lebih dari 55 tahun pengalaman dalam industri percetakan dan penerbitan dengan rekam jejak yang terbukti.',
                  icon: 'TimelineIcon',
                  color: '#4caf50',
                  features: ['Terpercaya', 'Berpengalaman', 'Profesional']
                },
                {
                  title: 'Solusi Lengkap',
                  description: 'Menyediakan layanan percetakan, penerbitan, dan solusi digital yang komprehensif untuk semua kebutuhan.',
                  icon: 'BuildIcon',
                  color: '#ff9800',
                  features: ['All-in-One', 'Terintegrasi', 'Fleksibel']
                },
                {
                  title: 'Kualitas Terjamin',
                  description: 'Menggunakan teknologi modern dan standar kualitas tinggi dalam setiap produksi untuk hasil terbaik.',
                  icon: 'CheckCircleIcon',
                  color: '#2196f3',
                  features: ['Presisi', 'Konsisten', 'Tahan Lama']
                },
                {
                  title: 'Keamanan Tinggi',
                  description: 'Menerapkan fitur keamanan canggih untuk dokumen berharga dan material sensitif lainnya.',
                  icon: 'SecurityIcon',
                  color: '#f44336',
                  features: ['Anti-Pemalsuan', 'Terenkripsi', 'Terlindungi']
                },
              ].map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <Grow
                    in={isVisible.keunggulan}
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
                          '& .MuiBox-root.feature-icon': {
                            transform: 'scale(1.1) rotate(10deg)',
                            bgcolor: item.color,
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
                          className="feature-icon"
                          sx={{ 
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: `${item.color}20`,
                            color: item.color,
                            transition: 'all 0.3s ease-in-out'
                          }}
                        >
                          {item.icon === 'TimelineIcon' && <TimelineIcon fontSize="medium" />}
                          {item.icon === 'BuildIcon' && <BuildIcon fontSize="medium" />}
                          {item.icon === 'CheckCircleIcon' && <CheckCircleIcon fontSize="medium" />}
                          {item.icon === 'SecurityIcon' && <SecurityIcon fontSize="medium" />}
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
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {item.features.map((feature, idx) => (
                            <Chip
                              key={idx}
                              label={feature}
                              size="small"
                              sx={{ 
                                bgcolor: `${item.color}10`,
                                color: item.color,
                                fontWeight: 500,
                                '&:hover': {
                                  bgcolor: `${item.color}20`,
                                }
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Card>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Fade>
      </Box>

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
        <Fade in={isVisible.testimonial} timeout={1000}>
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

      {/* Pengalaman Kami Section */}
      <Box 
        id="pengalaman"
        sx={{ 
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#f8fafc',
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
        }}
      >
        <Fade in={isVisible.pengalaman} timeout={1000}>
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
                REKAM JEJAK KAMI
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
                Pengalaman Kami
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
                Berbagai proyek yang telah kami kerjakan dengan dedikasi dan profesionalisme
                selama lebih dari lima dekade melayani klien-klien terkemuka.
              </Typography>
            </Box>

            <Box sx={{ position: 'relative', maxWidth: 900, mx: 'auto' }}>
              {/* Timeline center line */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  left: '50%', 
                  top: 0, 
                  bottom: 0, 
                  width: 4, 
                  bgcolor: 'rgba(25, 118, 210, 0.1)', 
                  transform: 'translateX(-50%)',
                  zIndex: 0,
                  display: { xs: 'none', md: 'block' }
                }} 
              />

              {/* Timeline Items */}
              <Stack spacing={6}>
                {/* 2023 Project */}
                <Box>
                  <Grow in={isVisible.pengalaman} timeout={1000}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'flex-start', md: 'center' },
                        position: 'relative'
                      }}
                    >
                      {/* Year chip - visible on mobile and desktop */}
                      <Box 
                        sx={{ 
                          position: { xs: 'relative', md: 'absolute' },
                          left: { md: '50%' },
                          top: { md: -30 },
                          transform: { md: 'translateX(-50%)' },
                          zIndex: 2,
                          mb: { xs: 2, md: 0 }
                        }}
                      >
                        <Chip
                          icon={<EventIcon />}
                          label="2023"
                          color="primary"
                          sx={{ 
                            fontWeight: 'bold',
                            px: 1,
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }}
                        />
                      </Box>

                      {/* Timeline node - only visible on desktop */}
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          left: '50%', 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          bgcolor: 'primary.main', 
                          transform: 'translateX(-50%)',
                          zIndex: 1,
                          boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.2)',
                          display: { xs: 'none', md: 'block' }
                        }} 
                      />

                      {/* Left side (empty for first item) */}
                      <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }} />

                      {/* Right side (content) */}
                      <Box 
                        sx={{ 
                          flex: 1, 
                          pl: { md: 4 },
                          width: { xs: '100%', md: 'auto' }
                        }}
                      >
                        <Card
                          sx={{
                            borderRadius: 3,
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 15px 35px rgba(25, 118, 210, 0.15)',
                            }
                          }}
                        >
                          <Box 
                            sx={{ 
                              p: 0.5, 
                              bgcolor: 'primary.main',
                              background: 'linear-gradient(90deg, #1976d2, #42a5f5)'
                            }} 
                          />
                          <Box sx={{ p: 3 }}>
                            <Typography 
                              variant="subtitle1" 
                              fontWeight="bold"
                              color="primary.main"
                              gutterBottom
                            >
                              Kementerian Pariwisata
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Pengadaan Pembuatan Buku Panduan Pelaksanaan Kebersihan, Kesehatan, Keselamatan, dan Kelestarian Lingkungan bagi Pelaku Usaha Pariwisata.
                            </Typography>
                          </Box>
                        </Card>
                      </Box>
                    </Box>
                  </Grow>
                </Box>

                {/* 2020 Projects */}
                <Box>
                  <Grow in={isVisible.pengalaman} timeout={1200}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'flex-start', md: 'center' },
                        position: 'relative'
                      }}
                    >
                      {/* Year chip */}
                      <Box 
                        sx={{ 
                          position: { xs: 'relative', md: 'absolute' },
                          left: { md: '50%' },
                          top: { md: -30 },
                          transform: { md: 'translateX(-50%)' },
                          zIndex: 2,
                          mb: { xs: 2, md: 0 }
                        }}
                      >
                        <Chip
                          icon={<EventIcon />}
                          label="2020"
                          color="secondary"
                          sx={{ 
                            fontWeight: 'bold',
                            px: 1,
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }}
                        />
                      </Box>

                      {/* Timeline node */}
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          left: '50%', 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          bgcolor: 'secondary.main', 
                          transform: 'translateX(-50%)',
                          zIndex: 1,
                          boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.2)',
                          display: { xs: 'none', md: 'block' }
                        }} 
                      />

                      {/* Left side (content) - opposite of first item */}
                      <Box 
                        sx={{ 
                          flex: 1, 
                          pr: { md: 4 },
                          width: { xs: '100%', md: 'auto' }
                        }}
                      >
                        <Card
                          sx={{
                            borderRadius: 3,
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 15px 35px rgba(156, 39, 176, 0.15)',
                            }
                          }}
                        >
                          <Box 
                            sx={{ 
                              p: 0.5, 
                              bgcolor: 'secondary.main',
                              background: 'linear-gradient(90deg, #9c27b0, #ba68c8)'
                            }} 
                          />
                          <Box sx={{ p: 3 }}>
                            <Typography 
                              variant="subtitle1" 
                              fontWeight="bold"
                              color="secondary.main"
                              gutterBottom
                            >
                              Korlantas Polri
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Pengadaan materiil Mutasi Luar Daerah Korlantas Polri dengan standar keamanan tinggi dan kualitas premium.
                            </Typography>
                          </Box>
                        </Card>
                      </Box>

                      {/* Right side (empty for second item) */}
                      <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }} />
                    </Box>
                  </Grow>
                </Box>

                {/* 2020 Project 2 */}
                <Box>
                  <Grow in={isVisible.pengalaman} timeout={1400}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'flex-start', md: 'center' },
                        position: 'relative'
                      }}
                    >
                      {/* Timeline node */}
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          left: '50%', 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          bgcolor: 'secondary.main', 
                          transform: 'translateX(-50%)',
                          zIndex: 1,
                          boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.2)',
                          display: { xs: 'none', md: 'block' }
                        }} 
                      />

                      {/* Left side (empty) */}
                      <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }} />

                      {/* Right side (content) */}
                      <Box 
                        sx={{ 
                          flex: 1, 
                          pl: { md: 4 },
                          width: { xs: '100%', md: 'auto' }
                        }}
                      >
                        <Card
                          sx={{
                            borderRadius: 3,
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 15px 35px rgba(156, 39, 176, 0.15)',
                            }
                          }}
                        >
                          <Box 
                            sx={{ 
                              p: 0.5, 
                              bgcolor: 'secondary.main',
                              background: 'linear-gradient(90deg, #9c27b0, #ba68c8)'
                            }} 
                          />
                          <Box sx={{ p: 3 }}>
                            <Typography 
                              variant="subtitle1" 
                              fontWeight="bold"
                              color="secondary.main"
                              gutterBottom
                            >
                              Divisi Hukum Polri
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Pengadaan Cetak Buku Himpunan Peraturan Kapolri dan Peraturan Polri Tahun 2019 dengan standar kualitas tinggi.
                            </Typography>
                          </Box>
                        </Card>
                      </Box>
                    </Box>
                  </Grow>
                </Box>

                {/* 2020 Project 3 */}
                <Box>
                  <Grow in={isVisible.pengalaman} timeout={1600}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'flex-start', md: 'center' },
                        position: 'relative'
                      }}
                    >
                      {/* Timeline node */}
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          left: '50%', 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          bgcolor: 'secondary.main', 
                          transform: 'translateX(-50%)',
                          zIndex: 1,
                          boxShadow: '0 0 0 4px rgba(156, 39, 176, 0.2)',
                          display: { xs: 'none', md: 'block' }
                        }} 
                      />

                      {/* Left side (content) */}
                      <Box 
                        sx={{ 
                          flex: 1, 
                          pr: { md: 4 },
                          width: { xs: '100%', md: 'auto' }
                        }}
                      >
                        <Card
                          sx={{
                            borderRadius: 3,
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 15px 35px rgba(156, 39, 176, 0.15)',
                            }
                          }}
                        >
                          <Box 
                            sx={{ 
                              p: 0.5, 
                              bgcolor: 'secondary.main',
                              background: 'linear-gradient(90deg, #9c27b0, #ba68c8)'
                            }} 
                          />
                          <Box sx={{ p: 3 }}>
                            <Typography 
                              variant="subtitle1" 
                              fontWeight="bold"
                              color="secondary.main"
                              gutterBottom
                            >
                              Provinsi Nusa Tenggara Timur
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Kontrak Katalog Elektronik Sektoral Penyediaan Buku Panduan Pendidik Tahun 2020 untuk meningkatkan kualitas pendidikan di daerah.
                            </Typography>
                          </Box>
                        </Card>
                      </Box>

                      {/* Right side (empty) */}
                      <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }} />
                    </Box>
                  </Grow>
                </Box>
              </Stack>

              {/* View More Projects Button */}
              <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={Link}
                  href="/tentang-kami"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    fontWeight: 'bold', 
                    py: 1.5, 
                    px: 4,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)',
                    }
                  }}
                >
                  Lihat Lebih Banyak Proyek
                </Button>
              </Box>
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