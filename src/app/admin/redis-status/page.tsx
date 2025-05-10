'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { CheckCircle, Error, Refresh } from '@mui/icons-material';
import { useAuth } from '@/app/hooks/useAuth';

interface RedisStatus {
  status: 'success' | 'error';
  message: string;
  error?: string;
  connectionInfo: {
    redisUrl?: string;
    isConnectionWorking?: boolean;
    testValue?: string;
    clientInfo?: string;
  };
}

export default function RedisStatusPage() {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [redisStatus, setRedisStatus] = useState<RedisStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkRedisStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Periksa status Redis
      const response = await fetch('/api/redis-status');
      const data = await response.json();
      setRedisStatus(data);
    } catch (err) {
      console.error('Error checking Redis status:', err);
      setError('Gagal memeriksa status Redis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && isAdmin) {
      checkRedisStatus();
    }
  }, [authLoading, isAdmin]);

  if (authLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!isAdmin) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">
          Anda tidak memiliki akses ke halaman ini. Halaman ini hanya untuk admin.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h5" component="h1">
            Status Redis
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Refresh />} 
            onClick={checkRedisStatus}
            disabled={loading}
          >
            Refresh Status
          </Button>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center" py={4}>
            <CircularProgress size={40} sx={{ mr: 2 }} />
            <Typography>Memeriksa status Redis...</Typography>
          </Box>
        ) : (
          <Box>
            <Box mb={4}>
              <Typography variant="h6" gutterBottom>
                Status Koneksi
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  {redisStatus?.status === 'success' ? (
                    <CheckCircle color="success" sx={{ mr: 1 }} />
                  ) : (
                    <Error color="error" sx={{ mr: 1 }} />
                  )}
                  <Typography variant="h6">
                    {redisStatus?.status === 'success' ? 'Terhubung' : 'Tidak Terhubung'}
                  </Typography>
                  <Chip 
                    label={redisStatus?.status === 'success' ? 'OK' : 'Error'} 
                    color={redisStatus?.status === 'success' ? 'success' : 'error'}
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
                
                <Typography variant="body1" gutterBottom>
                  {redisStatus?.message}
                </Typography>
                
                {redisStatus?.error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    Error: {redisStatus.error}
                  </Alert>
                )}
              </Paper>
            </Box>
            
            <Box mb={4}>
              <Typography variant="h6" gutterBottom>
                Informasi Koneksi
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="URL Redis" 
                      secondary={redisStatus?.connectionInfo?.redisUrl || 'Tidak tersedia'} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="Status Koneksi" 
                      secondary={redisStatus?.connectionInfo?.isConnectionWorking ? 'Berfungsi' : 'Tidak Berfungsi'} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary="Nilai Test" 
                      secondary={redisStatus?.connectionInfo?.testValue || 'Tidak tersedia'} 
                    />
                  </ListItem>
                </List>
              </Paper>
            </Box>
            
            {redisStatus?.connectionInfo?.clientInfo && (
              <Box mb={4}>
                <Typography variant="h6" gutterBottom>
                  Informasi Client Redis
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Box 
                    component="pre" 
                    sx={{ 
                      whiteSpace: 'pre-wrap', 
                      wordBreak: 'break-word',
                      fontSize: '0.875rem',
                      maxHeight: '300px',
                      overflow: 'auto',
                      bgcolor: 'background.default',
                      p: 2,
                      borderRadius: 1
                    }}
                  >
                    {redisStatus.connectionInfo.clientInfo}
                  </Box>
                </Paper>
              </Box>
            )}
            
            <Box>
              <Typography variant="h6" gutterBottom>
                Panduan Konfigurasi Redis
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Untuk mengkonfigurasi Redis, pastikan variabel lingkungan berikut telah diatur:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="REDIS_URL" 
                      secondary="URL koneksi ke server Redis, contoh: redis://username:password@host:port" 
                    />
                  </ListItem>
                </List>
                <Alert severity="info" sx={{ mt: 2 }}>
                  Pastikan server Redis Anda berjalan dan dapat diakses dari aplikasi ini.
                </Alert>
              </Paper>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
} 