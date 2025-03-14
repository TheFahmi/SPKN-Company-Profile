'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pages = [
  { name: 'Beranda', path: '/' },
  { name: 'Produk', path: '/produk' },
  { name: 'Tentang Kami', path: '/tentang-kami' },
  { name: 'Kontak', path: '/kontak' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo untuk desktop */}
          <LocalPrintshopIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CETAK BUKU
          </Typography>

          {/* Menu untuk mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu navigasi"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={page.path}
                  selected={pathname === page.path}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo untuk mobile */}
          <LocalPrintshopIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CETAK BUKU
          </Typography>

          {/* Menu untuk desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                href={page.path}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  fontWeight: pathname === page.path ? 'bold' : 'normal',
                  borderBottom: pathname === page.path ? '2px solid white' : 'none',
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Admin & Design System buttons */}
          <Box sx={{ flexGrow: 0, display: 'flex', gap: 2 }}>
            <Button 
              component={Link} 
              href="/design-system" 
              variant="outlined" 
              color="inherit"
              sx={{ 
                borderColor: 'white', 
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'white'
                } 
              }}
            >
              Sistem Desain
            </Button>
            <Button 
              component={Link} 
              href="/admin" 
              variant="outlined" 
              color="inherit"
              sx={{ 
                borderColor: 'white', 
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'white'
                } 
              }}
            >
              Admin
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
} 