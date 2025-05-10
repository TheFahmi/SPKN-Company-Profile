'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import { CheckCircle, Error, Refresh, Storage } from '@mui/icons-material';
import Link from 'next/link';

interface RedisStatus {
  status: 'success' | 'error';
  message: string;
  connectionInfo: {
    redisUrl?: string;
    isConnectionWorking?: boolean;
  };
}

export default function RedisStatusWidget() {
  const [loading, setLoading] = useState(true);
  const [redisStatus, setRedisStatus] = useState<RedisStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = async () => {
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
    checkStatus();
  }, []);

  const getStatusIcon = (status: RedisStatus | null) => {
    if (!status) return <CircularProgress size={20} />;
    return status.status === 'success' ? 
      <CheckCircle color="success" /> : 
      <Error color="error" />;
  };

  const getStatusText = (status: RedisStatus | null) => {
    if (!status) return 'Memeriksa...';
    return status.status === 'success' ? 'Terhubung' : 'Tidak Terhubung';
  };

  const getStatusColor = (status: RedisStatus | null) => {
    if (!status) return 'default';
    return status.status === 'success' ? 'success' : 'error';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            <Storage sx={{ mr: 1 }} />
            <Typography variant="h6">Status Redis</Typography>
          </Box>
          <Button 
            startIcon={<Refresh />} 
            size="small" 
            onClick={checkStatus}
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {error && (
          <Box mb={2}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}
        
        <Box mb={2}>
          {loading ? (
            <Box display="flex" alignItems="center">
              <CircularProgress size={20} sx={{ mr: 1 }} />
              <Typography>Memeriksa status Redis...</Typography>
            </Box>
          ) : (
            <Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="body1" sx={{ mr: 1 }}>Status:</Typography>
                <Chip 
                  icon={getStatusIcon(redisStatus)} 
                  label={getStatusText(redisStatus)} 
                  color={getStatusColor(redisStatus) as any}
                  size="small"
                />
              </Box>
              
              {redisStatus && (
                <Typography variant="body2" color="text.secondary">
                  {redisStatus.message}
                </Typography>
              )}
            </Box>
          )}
        </Box>
        
        <Box textAlign="right">
          <Link href="/admin/redis-status" passHref>
            <Button size="small">Detail Selengkapnya</Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
} 