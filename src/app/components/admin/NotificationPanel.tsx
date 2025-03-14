'use client';

import React from 'react';
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

// Definisikan style untuk text ellipsis
const textEllipsisStyle = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical' as const,
  WebkitLineClamp: 2,
  overflow: 'hidden',
  mb: 0.5,
  lineHeight: '1.2em',
};

export default function NotificationPanel() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
  } = useNotifications();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const theme = useTheme();

  // Debug log untuk memastikan notifikasi dimuat
  React.useEffect(() => {
    console.log('Current notifications:', notifications);
    console.log('Unread count:', unreadCount);
  }, [notifications, unreadCount]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    console.log('Opening notification menu');
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification: Notification) => {
    try {
      markAsRead(notification.id);
      
      if (notification.link) {
        router.push(notification.link);
      }
      
      handleClose();
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

  const handleRemoveNotification = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      removeNotification(id);
    } catch (error) {
      console.error('Error removing notification:', error);
    }
  };

  const handleMarkAllAsRead = () => {
    try {
      markAllAsRead();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleClearAll = () => {
    try {
      clearAllNotifications();
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    const iconProps = { sx: { color: theme.palette[type].main } };
    switch (type) {
      case 'info':
        return <InfoIcon {...iconProps} />;
      case 'success':
        return <SuccessIcon {...iconProps} />;
      case 'warning':
        return <WarningIcon {...iconProps} />;
      case 'error':
        return <ErrorIcon {...iconProps} />;
      default:
        return <InfoIcon {...iconProps} />;
    }
  };

  return (
    <>
      <Tooltip title="Notifikasi">
        <IconButton
          size="large"
          aria-label="show notifications"
          aria-controls="notification-menu"
          aria-haspopup="true"
          onClick={handleOpen}
          sx={{
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <Badge 
            badgeContent={unreadCount} 
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
              },
            }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 360,
            maxHeight: 480,
            overflow: 'auto',
            mt: 1.5,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
          },
        }}
      >
        <Box 
          sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.text.primary,
            }}
          >
            Notifikasi
          </Typography>
          <Box>
            {unreadCount > 0 && (
              <Tooltip title="Tandai semua sudah dibaca">
                <IconButton 
                  size="small" 
                  onClick={handleMarkAllAsRead} 
                  sx={{ 
                    mr: 1,
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <DoneAllIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {notifications.length > 0 && (
              <Tooltip title="Hapus semua notifikasi">
                <IconButton 
                  size="small" 
                  onClick={handleClearAll}
                  sx={{ 
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.error.main,
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
        
        {notifications.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ color: theme.palette.text.secondary }}
            >
              Tidak ada notifikasi
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    px: 2,
                    py: 1.5,
                    cursor: 'pointer',
                    backgroundColor: notification.read 
                      ? 'transparent' 
                      : alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.1 : 0.05),
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.15 : 0.08),
                    },
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                  onClick={() => handleNotificationClick(notification)}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      size="small" 
                      onClick={(e) => handleRemoveNotification(e, notification.id)}
                      sx={{ 
                        color: theme.palette.text.secondary,
                        '&:hover': {
                          color: theme.palette.error.main,
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar 
                      sx={{ 
                        bgcolor: alpha(theme.palette[notification.type].main, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                        color: theme.palette[notification.type].main,
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: notification.read ? 'normal' : 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          color: theme.palette.text.primary,
                        }}
                      >
                        {notification.title}
                        {notification.link && (
                          <LinkIcon 
                            fontSize="small" 
                            sx={{ 
                              ml: 0.5, 
                              fontSize: 14,
                              color: theme.palette.primary.main,
                            }} 
                          />
                        )}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          sx={{
                            ...textEllipsisStyle,
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ 
                            display: 'block',
                            color: theme.palette.text.secondary,
                            opacity: 0.8,
                          }}
                        >
                          {formatDistanceToNow(notification.timestamp, { 
                            addSuffix: true,
                            locale: id
                          })}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        )}
        
        {notifications.length > 0 && (
          <Box 
            sx={{ 
              p: 2, 
              textAlign: 'center',
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              backgroundColor: theme.palette.mode === 'light' 
                ? alpha(theme.palette.background.paper, 0.8)
                : alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(8px)',
              position: 'sticky',
              bottom: 0,
              zIndex: 1,
            }}
          >
            <Button 
              size="small" 
              onClick={handleClose}
              variant="contained"
              disableElevation
              sx={{ 
                textTransform: 'none',
                borderRadius: '8px',
                px: 3,
                py: 0.75,
                backgroundColor: alpha(theme.palette.primary.main, 0.9),
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                },
                transition: 'all 0.2s ease',
              }}
            >
              Tutup
            </Button>
          </Box>
        )}
      </Menu>
    </>
  );
} 