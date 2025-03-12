'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Slide,
  Fade,
  Avatar,
  Divider,
  ListItemButton,
  alpha,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Produk', href: '/produk' },
  { name: 'Tentang Kami', href: '/tentang-kami' },
  { name: 'Kontak', href: '/kontak' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrolled = currentScrollPos > 20;
      
      // Set scrolled state for styling purposes
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Determine scroll direction and visibility
      // Show header when scrolling up, hide when scrolling down
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      
      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, prevScrollPos]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Slide appear={false} direction="down" in={visible}>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={scrolled ? 2 : 0}
        sx={{ 
          bgcolor: scrolled ? 
            (theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.95) : alpha(theme.palette.background.paper, 0.95)) : 
            (theme.palette.mode === 'dark' ? 'transparent' : 'transparent'),
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: scrolled ? 'none' : `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 1, md: 1.5 } }}>
            {/* Logo */}
            <Fade in={true} timeout={1000}>
              <Link href="/" passHref style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}>
                  <Avatar 
                    sx={{ 
                      width: { xs: 40, md: 50 }, 
                      height: { xs: 40, md: 50 },
                      bgcolor: 'background.paper',
                      boxShadow: theme.shadows[1],
                      p: 0.5,
                      mr: 1.5,
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
                  </Avatar>
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Box sx={{ 
                      fontWeight: 700, 
                      fontSize: '1.2rem',
                      color: theme.palette.text.primary,
                      letterSpacing: '-0.01em',
                    }}>
                      SPKN
                    </Box>
                    <Box sx={{ 
                      fontSize: '0.75rem',
                      color: theme.palette.text.secondary,
                      letterSpacing: '0.02em',
                    }}>
                      Sarana Pancakarya Nusa
                    </Box>
                  </Box>
                </Box>
              </Link>
            </Fade>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Fade in={true} timeout={1200}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Button
                        key={item.name}
                        component={Link}
                        href={item.href}
                        sx={{
                          color: isActive ? 'primary.main' : 'text.primary',
                          fontWeight: isActive ? 600 : 500,
                          fontSize: '0.95rem',
                          px: 2,
                          py: 1,
                          borderRadius: '8px',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: isActive ? '10%' : '50%',
                            width: isActive ? '80%' : '0%',
                            height: '3px',
                            bgcolor: 'primary.main',
                            transition: 'all 0.3s ease',
                            borderRadius: '3px 3px 0 0',
                            opacity: isActive ? 1 : 0,
                          },
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                            '&::after': {
                              width: '80%',
                              left: '10%',
                              opacity: 1,
                            },
                          },
                        }}
                      >
                        {item.name}
                      </Button>
                    );
                  })}
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href="/kontak"
                    sx={{
                      ml: 2,
                      px: 3,
                      fontWeight: 600,
                      boxShadow: theme.shadows[2],
                    }}
                  >
                    Hubungi Kami
                  </Button>
                </Box>
              </Fade>
            )}

            {/* Mobile Navigation Icon */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  bgcolor: mobileOpen ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>

        {/* Mobile Navigation Drawer */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              borderRadius: '16px 0 0 16px',
              boxShadow: theme.shadows[8],
            },
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%',
            p: 0,
          }}>
            {/* Drawer Header */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 40, 
                    height: 40,
                    bgcolor: 'background.paper',
                    boxShadow: theme.shadows[1],
                    p: 0.5,
                    mr: 1.5,
                  }}
                >
                  <Image
                    src="https://spkn.co.id/wp-content/uploads/elementor/thumbs/LOGO-SPKN-NEW-300x274-removebg-preview-1-qfqh90c9we3vc1w52kgko3f13r707nf8egy7ksj0fc.png"
                    alt="SPKN Logo"
                    width={30}
                    height={30}
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </Avatar>
                <Box>
                  <Box sx={{ 
                    fontWeight: 700, 
                    fontSize: '1rem',
                    color: theme.palette.text.primary,
                  }}>
                    SPKN
                  </Box>
                  <Box sx={{ 
                    fontSize: '0.7rem',
                    color: theme.palette.text.secondary,
                  }}>
                    Sarana Pancakarya Nusa
                  </Box>
                </Box>
              </Box>
              <IconButton 
                onClick={handleDrawerToggle}
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Navigation Links */}
            <List sx={{ py: 2, px: 1, flexGrow: 1 }}>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                      component={Link}
                      href={item.href}
                      onClick={handleDrawerToggle}
                      sx={{
                        borderRadius: '8px',
                        py: 1.5,
                        bgcolor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                        color: isActive ? 'primary.main' : 'text.primary',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        }
                      }}
                    >
                      <ListItemText 
                        primary={item.name} 
                        primaryTypographyProps={{ 
                          fontWeight: isActive ? 600 : 500,
                          fontSize: '1rem',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>

            {/* Contact Button */}
            <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/kontak"
                fullWidth
                size="large"
                onClick={handleDrawerToggle}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: theme.shadows[2],
                }}
              >
                Hubungi Kami
              </Button>
            </Box>
          </Box>
        </Drawer>
      </AppBar>
    </Slide>
  );
}