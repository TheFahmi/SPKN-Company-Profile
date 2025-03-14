'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card,
  Chip,
  Fade,
  Grow
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';

interface KeunggulanSectionProps {
  isVisible: boolean;
}

const KeunggulanSection: React.FC<KeunggulanSectionProps> = ({ isVisible }) => {
  const keunggulanItems = [
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
  ];

  const renderIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'TimelineIcon':
        return <TimelineIcon fontSize="medium" />;
      case 'BuildIcon':
        return <BuildIcon fontSize="medium" />;
      case 'CheckCircleIcon':
        return <CheckCircleIcon fontSize="medium" />;
      case 'SecurityIcon':
        return <SecurityIcon fontSize="medium" />;
      default:
        return null;
    }
  };

  return (
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
            {keunggulanItems.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
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
                          transition: 'all 0.3s ease-in-out',
                          overflow: 'hidden'
                        }}
                      >
                        {renderIcon(item.icon, item.color)}
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
  );
};

export default KeunggulanSection;