'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  Button,
  Chip,
  Stack,
  Grow,
  Fade
} from '@mui/material';
import Link from 'next/link';
import EventIcon from '@mui/icons-material/Event';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface PengalamanSectionProps {
  isVisible: boolean;
}

const PengalamanSection: React.FC<PengalamanSectionProps> = ({ isVisible }) => {
  return (
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
                <Grow in={isVisible} timeout={1000}>
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
                <Grow in={isVisible} timeout={1200}>
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
                <Grow in={isVisible} timeout={1400}>
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
                <Grow in={isVisible} timeout={1600}>
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
  );
};

export default PengalamanSection;