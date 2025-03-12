'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  Stack,
  IconButton,
  TextField,
  Button,
  Divider,
  useTheme,
  alpha,
  Paper,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

const footerLinks = [
  {
    title: 'Navigasi',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Produk', href: '/produk' },
      { name: 'Tentang Kami', href: '/tentang-kami' },
      { name: 'Kontak', href: '/kontak' },
    ],
  },
  {
    title: 'Produk',
    links: [
      { name: 'Buku Pelajaran', href: '/produk?category=buku-pelajaran' },
      { name: 'Buku Anak', href: '/produk?category=buku-anak' },
      { name: 'Komik Edukasi', href: '/produk?category=komik-edukasi' },
      { name: 'PKLH', href: '/produk?category=pklh' },
    ],
  },
];

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: isDark ? 'background.paper' : '#1A2235',
        color: isDark ? 'text.primary' : 'white',
        position: 'relative',
        mt: 'auto',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%)',
          opacity: 0.4,
          zIndex: 0,
        }
      }}
    >
      {/* Newsletter Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ pt: 12, maxWidth: 800, textAlign: 'center', mx: 'auto', color: 'white'}}>
          <Paper
            elevation={isDark ? 3 : 0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              bgcolor: isDark ? alpha(theme.palette.primary.main, 0.05) : alpha('#ffffff', 0.03),
              backdropFilter: 'blur(10px)',
              border: `1px solid ${isDark ? alpha(theme.palette.primary.main, 0.1) : alpha('#ffffff', 0.1)}`,
              boxShadow: isDark 
                ? `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}` 
                : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
              transform: 'translateY(-50px)',
              color: 'white',
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                  Dapatkan Informasi Terbaru
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, mb: 2 }}>
                  Berlangganan newsletter kami untuk mendapatkan informasi terbaru tentang produk dan layanan kami.
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box sx={{ display: 'flex' }}>
                  <TextField
                    fullWidth
                    placeholder="Alamat email Anda"
                    variant="outlined"
                    size="medium"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: isDark ? alpha(theme.palette.background.paper, 0.5) : alpha('#ffffff', 0.05),
                        borderRadius: '8px 0 0 8px',
                        '& fieldset': {
                          borderColor: isDark ? alpha(theme.palette.primary.main, 0.2) : alpha('#ffffff', 0.2),
                          borderRight: 'none',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark ? alpha(theme.palette.primary.main, 0.3) : alpha('#ffffff', 0.3),
                        },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: '0 8px 8px 0',
                      px: 3,
                      boxShadow: theme.shadows[3],
                    }}
                  >
                    <SendIcon />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>

      <Divider sx={{ 
        borderColor: isDark ? alpha(theme.palette.divider, 0.1) : alpha('#ffffff', 0.1),
        mx: { xs: 3, md: 8 }
      }} />

      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} sx={{ py: 8 }}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: 'background.paper',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: theme.shadows[2],
                  mr: 2,
                }}
              >
                <Image
                  src="https://spkn.co.id/wp-content/uploads/elementor/thumbs/LOGO-SPKN-NEW-300x274-removebg-preview-1-qfqh90c9we3vc1w52kgko3f13r707nf8egy7ksj0fc.png"
                  alt="SPKN Logo"
                  width={40}
                  height={40}
                  style={{ 
                    objectFit: 'contain',
                  }}
                  priority
                />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 0 }}>
                  PT Sarana Pancakarya Nusa
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  Sejak 1966
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.8 }}>
              Perusahaan percetakan dan penerbitan yang berpengalaman sejak tahun 1966, menyediakan solusi cetak berkualitas untuk berbagai kebutuhan.
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              fontWeight="bold" 
              gutterBottom 
              sx={{ 
                mb: 3,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              Informasi Kontak
            </Typography>
            
            <Paper
              elevation={isDark ? 3 : 0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: isDark ? alpha(theme.palette.primary.main, 0.05) : alpha('#ffffff', 0.03),
                backdropFilter: 'blur(10px)',
                border: `1px solid ${isDark ? alpha(theme.palette.primary.main, 0.1) : alpha('#ffffff', 0.1)}`,
                boxShadow: isDark 
                  ? `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}` 
                  : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
                mb: 3,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: isDark 
                    ? `0 12px 40px ${alpha(theme.palette.common.black, 0.25)}` 
                    : `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}`,
                }
              }}
            >
              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box 
                    sx={{ 
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      flexShrink: 0
                    }}
                  >
                    <LocationOnIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
                      Alamat
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                      Jl. Percetakan No. 123, Jakarta Selatan, 12345
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box 
                    sx={{ 
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      flexShrink: 0
                    }}
                  >
                    <PhoneIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
                      Telepon
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      +62 812-3456-7890
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box 
                    sx={{ 
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      flexShrink: 0
                    }}
                  >
                    <EmailIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
                      Email
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      info@spkn.co.id
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Navigation Links */}
          {footerLinks.map((section) => (
            <Grid item xs={12} sm={6} md={2} key={section.title}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                {section.title}
              </Typography>
              <Stack spacing={2}>
                {section.links.map((link) => (
                  <MuiLink
                    key={link.name}
                    component={Link}
                    href={link.href}
                    sx={{
                      color: isDark ? 'text.primary' : 'white',
                      opacity: 0.8,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {
                        opacity: 1,
                        color: theme.palette.primary.main,
                        transform: 'translateX(5px)',
                      },
                      '&::before': {
                        content: '""',
                        width: '0',
                        height: '2px',
                        borderRadius: '1px',
                        bgcolor: 'primary.main',
                        transition: 'all 0.2s ease',
                        mr: 0,
                        opacity: 0,
                      },
                      '&:hover::before': {
                        width: '12px',
                        mr: 1,
                        opacity: 1,
                      }
                    }}
                  >
                    {link.name}
                  </MuiLink>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="subtitle1" 
              fontWeight="bold" 
              gutterBottom 
              sx={{ 
                mb: 3,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              Ikuti Kami
            </Typography>
            
            <Paper
              elevation={isDark ? 3 : 0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: isDark ? alpha(theme.palette.primary.main, 0.05) : alpha('#ffffff', 0.03),
                backdropFilter: 'blur(10px)',
                border: `1px solid ${isDark ? alpha(theme.palette.primary.main, 0.1) : alpha('#ffffff', 0.1)}`,
                boxShadow: isDark 
                  ? `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}` 
                  : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
                mb: 4,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: isDark 
                    ? `0 12px 40px ${alpha(theme.palette.common.black, 0.25)}` 
                    : `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}`,
                }
              }}
            >
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Temukan kami di media sosial untuk mendapatkan update terbaru dan informasi menarik lainnya.
              </Typography>
              
              <Stack direction="row" spacing={2} sx={{ mb: 0 }}>
                <Button
                  variant="contained"
                  startIcon={<FacebookIcon />}
                  href="https://facebook.com"
                  target="_blank"
                  sx={{ 
                    flex: 1,
                    bgcolor: '#1877F2',
                    '&:hover': {
                      bgcolor: '#0E63D8',
                      transform: 'translateY(-3px)',
                    },
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 10px rgba(24, 119, 242, 0.3)',
                  }}
                >
                  Facebook
                </Button>
                
                <Button
                  variant="contained"
                  startIcon={<InstagramIcon />}
                  href="https://instagram.com"
                  target="_blank"
                  sx={{ 
                    flex: 1,
                    background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #e6683c, #dc2743, #cc2366, #bc1888, #f09433)',
                      transform: 'translateY(-3px)',
                    },
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 10px rgba(220, 39, 67, 0.3)',
                  }}
                >
                  Instagram
                </Button>
              </Stack>
              
              <Button
                variant="contained"
                startIcon={<TwitterIcon />}
                href="https://x.com"
                target="_blank"
                fullWidth
                sx={{ 
                  mt: 2,
                  bgcolor: '#000000', // Updated color for X (formerly Twitter)
                  '&:hover': {
                    bgcolor: '#333333',
                    transform: 'translateY(-3px)',
                  },
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                }}
              >
                X
              </Button>
            </Paper>

            <Typography 
              variant="subtitle1" 
              fontWeight="bold" 
              gutterBottom 
              sx={{ 
                mb: 2,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              Jam Operasional
            </Typography>
            
            <Paper
              elevation={isDark ? 3 : 0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: isDark ? alpha(theme.palette.primary.main, 0.05) : alpha('#ffffff', 0.03),
                backdropFilter: 'blur(10px)',
                border: `1px solid ${isDark ? alpha(theme.palette.primary.main, 0.1) : alpha('#ffffff', 0.1)}`,
                boxShadow: isDark 
                  ? `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}` 
                  : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: isDark 
                    ? `0 12px 40px ${alpha(theme.palette.common.black, 0.25)}` 
                    : `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}`,
                }
              }}
            >
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ opacity: 0.8, display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                  <span>Senin - Jumat:</span> <span>08:00 - 17:00</span>
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ opacity: 0.8, display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                  <span>Sabtu:</span> <span>09:00 - 14:00</span>
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8, display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                  <span>Minggu & Hari Libur:</span> <span>Tutup</span>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Copyright */}
      <Box 
        sx={{ 
          borderTop: `1px solid ${isDark ? alpha(theme.palette.divider, 0.1) : alpha('#ffffff', 0.1)}`, 
          py: 3,
          bgcolor: isDark ? alpha(theme.palette.common.black, 0.2) : alpha('#000000', 0.2),
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ opacity: 0.7, textAlign: { xs: 'center', md: 'left' } }}>
                © {new Date().getFullYear()} PT Sarana Pancakarya Nusa. All rights reserved.
              </Typography>
            </Grid>
            {/* <Grid item xs={12} md={6} sx={{ mt: { xs: 2, md: 0 } }}>
              <Stack 
                direction="row" 
                spacing={3} 
                divider={<Box component="span" sx={{ opacity: 0.3 }}>•</Box>}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
              >
                <MuiLink 
                  href="/privacy-policy" 
                  sx={{ 
                    color: 'inherit', 
                    opacity: 0.7, 
                    textDecoration: 'none',
                    '&:hover': { opacity: 1, color: theme.palette.primary.main }
                  }}
                >
                  Privacy Policy
                </MuiLink>
                <MuiLink 
                  href="/terms" 
                  sx={{ 
                    color: 'inherit', 
                    opacity: 0.7, 
                    textDecoration: 'none',
                    '&:hover': { opacity: 1, color: theme.palette.primary.main }
                  }}
                >
                  Terms of Service
                </MuiLink>
              </Stack>
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}