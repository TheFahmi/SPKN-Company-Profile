'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface SecuritySummary {
  totalFiles: number;
  scannedFiles: number;
  cleanFiles: number;
  infectedFiles: number;
  lastScanDate: string;
  recentThreats: string[];
}

export default function SecurityStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [securitySummary, setSecuritySummary] = useState<SecuritySummary>({
    totalFiles: 0,
    scannedFiles: 0,
    cleanFiles: 0,
    infectedFiles: 0,
    lastScanDate: '-',
    recentThreats: [],
  });

  // Fungsi untuk memuat data keamanan
  const loadSecurityData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Panggil API untuk mendapatkan data keamanan
      const response = await axios.get('/api/admin/security-status');
      setSecuritySummary(response.data);
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading security data:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Terjadi kesalahan saat memuat data keamanan'
      );
      setLoading(false);
      
      // Fallback ke data simulasi jika API gagal
      setSecuritySummary({
        totalFiles: 128,
        scannedFiles: 120,
        cleanFiles: 118,
        infectedFiles: 2,
        lastScanDate: new Date().toLocaleString('id-ID'),
        recentThreats: ['Trojan.PDF.Exploit', 'Malware.ZIP.Suspicious'],
      });
    }
  };

  // Memuat data saat komponen dimount
  useEffect(() => {
    loadSecurityData();
  }, []);

  // Menghitung persentase file yang dipindai
  const scanPercentage = securitySummary.totalFiles > 0
    ? Math.round((securitySummary.scannedFiles / securitySummary.totalFiles) * 100)
    : 0;

  // Menghitung persentase file yang bersih dari yang dipindai
  const cleanPercentage = securitySummary.scannedFiles > 0
    ? Math.round((securitySummary.cleanFiles / securitySummary.scannedFiles) * 100)
    : 0;

  return (
    <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SecurityIcon color="primary" sx={{ fontSize: 28, mr: 2 }} />
          <Typography variant="h6" component="h2" fontWeight="bold">
            Status Keamanan
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Muat ulang data keamanan">
            <IconButton 
              onClick={loadSecurityData} 
              disabled={loading}
              size="small"
            >
              {loading ? <CircularProgress size={20} /> : <RefreshIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          {/* Statistik Pemindaian */}
          <Box sx={{ 
            flex: '1 1 200px', 
            p: 2, 
            bgcolor: 'background.default', 
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              File Dipindai
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
              <CircularProgress
                variant="determinate"
                value={scanPercentage}
                size={80}
                thickness={4}
                sx={{ color: 'primary.main' }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" component="div" fontWeight="bold">
                  {`${scanPercentage}%`}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" fontWeight="medium">
              {securitySummary.scannedFiles} dari {securitySummary.totalFiles} file
            </Typography>
          </Box>

          {/* Statistik File Bersih */}
          <Box sx={{ 
            flex: '1 1 200px', 
            p: 2, 
            bgcolor: 'background.default', 
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              File Aman
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
              <CircularProgress
                variant="determinate"
                value={cleanPercentage}
                size={80}
                thickness={4}
                sx={{ color: 'success.main' }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" component="div" fontWeight="bold">
                  {`${cleanPercentage}%`}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" fontWeight="medium">
              {securitySummary.cleanFiles} dari {securitySummary.scannedFiles} dipindai
            </Typography>
          </Box>

          {/* Statistik Ancaman */}
          <Box sx={{ 
            flex: '1 1 200px', 
            p: 2, 
            bgcolor: securitySummary.infectedFiles > 0 ? 'error.light' : 'success.light', 
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Ancaman Terdeteksi
            </Typography>
            <Typography 
              variant="h4" 
              component="div" 
              fontWeight="bold"
              color={securitySummary.infectedFiles > 0 ? 'error.main' : 'success.main'}
              sx={{ mb: 1 }}
            >
              {securitySummary.infectedFiles}
            </Typography>
            <Chip 
              label={securitySummary.infectedFiles > 0 ? "Perlu Perhatian" : "Aman"} 
              color={securitySummary.infectedFiles > 0 ? "error" : "success"}
              size="small"
            />
          </Box>
        </Box>

        {/* Informasi Pemindaian Terakhir */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Pemindaian Terakhir
          </Typography>
          <Typography variant="body2">
            {securitySummary.lastScanDate}
          </Typography>
        </Box>

        {/* Daftar Ancaman Terbaru */}
        {securitySummary.recentThreats.length > 0 && (
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Ancaman Terbaru
            </Typography>
            <List disablePadding sx={{ bgcolor: 'background.default', borderRadius: 1 }}>
              {securitySummary.recentThreats.map((threat, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemIcon>
                      <WarningIcon color="error" />
                    </ListItemIcon>
                    <ListItemText primary={threat} />
                    <Tooltip title="Hapus ancaman">
                      <IconButton edge="end" size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        {/* Tombol Aksi */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="outlined"
            startIcon={<SecurityIcon />}
            component="a"
            href="/antivirus"
            sx={{ mr: 1 }}
          >
            Buka Pemindai
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={loadSecurityData}
            disabled={loading}
          >
            {loading ? 'Memuat...' : 'Pindai Ulang'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
} 