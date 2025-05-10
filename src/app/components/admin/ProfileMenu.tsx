'use client';

import React, { memo, useCallback } from 'react';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Memperluas tipe User untuk menambahkan properti image
interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  role?: string | null;
  image?: string | null;
}

const ProfileMenu = memo(() => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { data: session } = useSession();
  const router = useRouter();
  const theme = useTheme();
  
  // Menggunakan tipe yang diperluas
  const user = session?.user as ExtendedUser | undefined;

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(async () => {
    handleClose();
    await signOut({ redirect: false });
    router.push('/login');
  }, [handleClose, router]);

  const handleProfileClick = useCallback(() => {
    handleClose();
    router.push('/admin/profile');
  }, [handleClose, router]);

  const handleSettingsClick = useCallback(() => {
    handleClose();
    router.push('/admin/settings');
  }, [handleClose, router]);

  // Mendapatkan inisial dari nama pengguna
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Mendapatkan warna avatar berdasarkan nama pengguna
  const getAvatarColor = (name: string) => {
    const colors = [
      '#1976d2', // blue
      '#388e3c', // green
      '#d32f2f', // red
      '#f57c00', // orange
      '#7b1fa2', // purple
      '#0288d1', // light blue
      '#00796b', // teal
      '#c2185b', // pink
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const userInitials = user?.name ? getInitials(user.name) : '?';
  const avatarColor = user?.name ? getAvatarColor(user.name) : '#757575';

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Akun">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {user?.image ? (
              <Avatar 
                src={user.image} 
                alt={user.name || 'User'} 
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  bgcolor: avatarColor,
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}
              >
                {userInitials}
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
            mt: 1.5,
            width: 220,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold' }}>
            {user?.name || 'Pengguna'}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {user?.email || 'email@example.com'}
          </Typography>
        </Box>
        
        <Divider />
        
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profil Saya
        </MenuItem>
        
        {user?.role === 'admin' && (
          <MenuItem onClick={() => router.push('/admin')}>
            <ListItemIcon>
              <AdminIcon fontSize="small" />
            </ListItemIcon>
            Dashboard Admin
          </MenuItem>
        )}
        
        <MenuItem onClick={handleSettingsClick}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Pengaturan
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Keluar
        </MenuItem>
      </Menu>
    </>
  );
});

// Memastikan nama tampil di React DevTools
ProfileMenu.displayName = 'ProfileMenu';

export default ProfileMenu; 