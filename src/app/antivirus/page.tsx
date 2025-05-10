'use client';

import React from 'react';
import { Container, Typography, Box, Breadcrumbs, Link as MuiLink, Button } from '@mui/material';
import Link from 'next/link';
import { Home as HomeIcon, Security as SecurityIcon, History as HistoryIcon } from '@mui/icons-material';
import FileUploadScanner from '../components/FileUploadScanner';

export default function AntivirusPage() {
  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          position: 'relative',
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}
          >
            <MuiLink
              component={Link}
              href="/"
              color="inherit"
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Beranda
            </MuiLink>
            <Typography color="white" sx={{ display: 'flex', alignItems: 'center' }}>
              <SecurityIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Pemindai Antivirus
            </Typography>
          </Breadcrumbs>
          
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              maxWidth: '800px',
            }}
          >
            Pemindai Antivirus
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: '800px',
              opacity: 0.9,
              fontWeight: 'normal',
            }}
          >
            Lindungi sistem Anda dengan memindai file terhadap virus, malware, dan ancaman keamanan lainnya
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<HistoryIcon />}
            component={Link}
            href="/antivirus/history"
          >
            Lihat Riwayat Pemindaian
          </Button>
        </Box>
        
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            Pemindaian File yang Aman
          </Typography>
          <Typography variant="body1" paragraph>
            Layanan pemindaian antivirus kami menggunakan teknologi canggih untuk mendeteksi dan melindungi Anda dari berbagai jenis ancaman keamanan. 
            Unggah file Anda dan dapatkan hasil pemindaian secara instan.
          </Typography>
          <Typography variant="body1" paragraph>
            Kami mendukung berbagai format file termasuk dokumen, spreadsheet, presentasi, PDF, gambar, dan file terkompresi.
            Semua file yang diunggah akan dipindai menggunakan mesin antivirus terkemuka untuk memastikan keamanan maksimal.
          </Typography>
        </Box>

        {/* Komponen Pemindai File */}
        <FileUploadScanner />

        {/* Informasi Tambahan */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
            Mengapa Pemindaian Antivirus Penting?
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 3 }}>
            <Box sx={{ flex: 1, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Keamanan Data
              </Typography>
              <Typography variant="body2">
                Melindungi data sensitif Anda dari pencurian dan kerusakan yang disebabkan oleh malware.
                File yang terinfeksi dapat mengakibatkan kebocoran data dan kerugian finansial.
              </Typography>
            </Box>
            
            <Box sx={{ flex: 1, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Pencegahan Infeksi
              </Typography>
              <Typography variant="body2">
                Mendeteksi dan menghentikan penyebaran malware sebelum menginfeksi sistem Anda.
                Pemindaian rutin membantu mencegah serangan siber yang dapat merusak perangkat Anda.
              </Typography>
            </Box>
            
            <Box sx={{ flex: 1, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Kepatuhan Regulasi
              </Typography>
              <Typography variant="body2">
                Membantu organisasi memenuhi persyaratan kepatuhan keamanan data dan regulasi industri.
                Pemindaian antivirus adalah bagian penting dari praktik keamanan siber yang baik.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 