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
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

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
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a237e', // Warna biru tua sesuai SPKN
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Image
                src="https://spkn.co.id/wp-content/uploads/elementor/thumbs/LOGO-SPKN-NEW-300x274-removebg-preview-1-qfqh90c9we3vc1w52kgko3f13r707nf8egy7ksj0fc.png"
                alt="SPKN Logo"
                width={100}
                height={91}
                style={{ 
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)' // Membuat logo menjadi putih
                }}
                priority
              />
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              PT Sarana Pancakarya Nusa - Perusahaan percetakan dan penerbitan yang berpengalaman sejak tahun 1966.
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Jl. Percetakan No. 123, Jakarta Selatan, 12345
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +62 812-3456-7890
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  info@spkn.co.id
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Navigation Links */}
          {footerLinks.map((section) => (
            <Grid item xs={12} sm={6} md={2} key={section.title}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link) => (
                  <MuiLink
                    key={link.name}
                    component={Link}
                    href={link.href}
                    sx={{
                      color: 'white',
                      opacity: 0.8,
                      textDecoration: 'none',
                      '&:hover': {
                        opacity: 1,
                        textDecoration: 'underline',
                      },
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
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Ikuti Kami
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton 
                href="https://facebook.com" 
                target="_blank"
                sx={{ color: 'white' }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                href="https://instagram.com" 
                target="_blank"
                sx={{ color: 'white' }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                href="https://twitter.com" 
                target="_blank"
                sx={{ color: 'white' }}
              >
                <TwitterIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', mt: 6, pt: 3 }}>
          <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} PT Sarana Pancakarya Nusa. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 