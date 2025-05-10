'use client';

import React, { memo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Tooltip,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Delete as DeleteIcon,
  DoneAll as DoneAllIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { useNotifications, Notification } from '@/app/contexts/NotificationContext';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

// Memperluas tipe Notification untuk menambahkan properti url
interface ExtendedNotification extends Notification {
  url?: string;
}

// Definisikan style untuk text ellipsis
const textEllipsisStyle = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical' as const,
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

// Komponen NotificationItem yang dimemoized
const NotificationItem = memo(({ notification, onDelete, onMarkAsRead, onNavigate }: {
  notification: ExtendedNotification;
  onDelete: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onNavigate: (url: string) => void;
}) => {
  const theme = useTheme();
  
  // Fungsi untuk mendapatkan icon berdasarkan tipe notifikasi
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'info':
        return <InfoIcon sx={{ color: theme.palette.info.main }} />;
      case 'success':
        return <SuccessIcon sx={{ color: theme.palette.success.main }} />;
      case 'warning':
        return <WarningIcon sx={{ color: theme.palette.warning.main }} />;
      case 'error':
        return <ErrorIcon sx={{ color: theme.palette.error.main }} />;
      default:
        return <InfoIcon sx={{ color: theme.palette.info.main }} />;
    }
  };

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        borderRadius: 1,
        mb: 1,
        bgcolor: notification.read 
          ? 'transparent' 
          : (theme) => alpha(theme.palette.primary.main, 0.08),
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
        },
      }}
      secondaryAction={
        <Box sx={{ display: 'flex' }}>
          {notification.url && (
            <Tooltip title="Buka Link">
              <IconButton 
                edge="end" 
                size="small" 
                onClick={() => onNavigate(notification.url || '')}
                sx={{ mr: 0.5 }}
              >
                <LinkIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {!notification.read && (
            <Tooltip title="Tandai Sudah Dibaca">
              <IconButton 
                edge="end" 
                size="small" 
                onClick={() => onMarkAsRead(notification.id)}
                sx={{ mr: 0.5 }}
              >
                <DoneAllIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Hapus">
            <IconButton 
              edge="end" 
              size="small" 
              onClick={() => onDelete(notification.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      }
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1) }}>
          {getNotificationIcon()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: notification.read ? 'normal' : 'bold',
              color: theme.palette.text.primary,
            }}
          >
            {notification.title}
          </Typography>
        }
        secondary={
          <>
            <Typography
              variant="body2"
              sx={{
                ...textEllipsisStyle,
                color: theme.palette.text.secondary,
                mb: 0.5,
              }}
              component="span"
            >
              {notification.message}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
              component="span"
            >
              {formatDistanceToNow(new Date(notification.timestamp), { 
                addSuffix: true,
                locale: id 
              })}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
});

// Memastikan nama tampil di React DevTools
NotificationItem.displayName = 'NotificationItem';

// Komponen NotificationPanel yang dimemoized
const NotificationPanel = memo(() => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } = useNotifications();
  const router = useRouter();
  const theme = useTheme();
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (url: string) => {
    router.push(url);
    handleClose();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <Tooltip title="Notifikasi">
        <IconButton color="inherit" onClick={handleClick}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 360,
            maxWidth: '100%',
            maxHeight: 500,
            overflow: 'auto',
            mt: 1.5,
            boxShadow: theme.shadows[4],
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            Notifikasi
          </Typography>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </Box>
        
        <Divider />
        
        {notifications.length > 0 ? (
          <>
            <List sx={{ p: 1 }}>
              {notifications.map((notification) => (
                <NotificationItem 
                  key={notification.id}
                  notification={notification as ExtendedNotification}
                  onDelete={removeNotification}
                  onMarkAsRead={markAsRead}
                  onNavigate={handleNavigate}
                />
              ))}
            </List>
            
            <Divider />
            
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                size="small" 
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Tandai Semua Dibaca
              </Button>
              <Button 
                size="small" 
                onClick={clearAllNotifications}
                disabled={notifications.length === 0}
              >
                Hapus Semua
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Tidak ada notifikasi
            </Typography>
          </Box>
        )}
      </Menu>
    </>
  );
});

// Memastikan nama tampil di React DevTools
NotificationPanel.displayName = 'NotificationPanel';

export default NotificationPanel; 