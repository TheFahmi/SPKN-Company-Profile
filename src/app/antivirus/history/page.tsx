'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  AlertTitle,
  Button,
} from '@mui/material';
import Link from 'next/link';
import {
  Home as HomeIcon,
  Security as SecurityIcon,
  History as HistoryIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import axios from 'axios';

// Interface untuk item riwayat pemindaian
interface ScanHistoryItem {
  id: string;
  fileName: string;
  fileSize: number;
  scanDate: string;
  isClean: boolean;
  threatCount: number;
  threatNames: string[];
}

export default function AntivirusHistoryPage() {
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fungsi untuk memuat data riwayat pemindaian
  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Dalam implementasi nyata, ini akan memanggil API
      // const response = await axios.get('/api/antivirus/history');
      // setHistory(response.data);
      
      // Simulasi data untuk demo
      setTimeout(() => {
        const demoData: ScanHistoryItem[] = Array.from({ length: 25 }, (_, i) => ({
          id: `scan-${i + 1}`,
          fileName: `file-${i + 1}.${['pdf', 'docx', 'xlsx', 'zip', 'jpg'][i % 5]}`,
          fileSize: Math.floor(Math.random() * 10000000),
          scanDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
          isClean: Math.random() > 0.2,
          threatCount: Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 1 : 0,
          threatNames: Math.random() > 0.8 ? ['Trojan.PDF.Exploit', 'Malware.ZIP.Suspicious'].slice(0, Math.floor(Math.random() * 2) + 1) : [],
        }));
        
        setHistory(demoData);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error loading scan history:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Terjadi kesalahan saat memuat riwayat pemindaian'
      );
      setLoading(false);
    }
  };

  // Memuat data saat komponen dimount
  useEffect(() => {
    loadHistory();
  }, []);

  // Menangani perubahan halaman
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Menangani perubahan jumlah baris per halaman
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Format ukuran file
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format tanggal
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          position: 'relative',
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}
          >
            <MuiLink
              component={Link}
              href="/"
              color="inherit"
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Beranda
            </MuiLink>
            <MuiLink
              component={Link}
              href="/antivirus"
              color="inherit"
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <SecurityIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Pemindai Antivirus
            </MuiLink>
            <Typography color="white" sx={{ display: 'flex', alignItems: 'center' }}>
              <HistoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Riwayat Pemindaian
            </Typography>
          </Breadcrumbs>
          
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              maxWidth: '800px',
            }}
          >
            Riwayat Pemindaian Antivirus
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: '800px',
              opacity: 0.9,
              fontWeight: 'normal',
            }}
          >
            Lihat dan kelola riwayat pemindaian file Anda
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2" fontWeight="bold">
            Riwayat Pemindaian
          </Typography>
          
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SecurityIcon />}
              component={Link}
              href="/antivirus"
              sx={{ mr: 2 }}
            >
              Pemindai Baru
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={loadHistory}
              disabled={loading}
            >
              Muat Ulang
            </Button>
          </Box>
        </Box>

        {/* Pesan error */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}

        {/* Tabel Riwayat Pemindaian */}
        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 2 }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="riwayat pemindaian">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nama File</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ukuran</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tanggal Pemindaian</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ancaman</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <CircularProgress size={40} sx={{ mb: 2 }} />
                      <Typography variant="body1">Memuat riwayat pemindaian...</Typography>
                    </TableCell>
                  </TableRow>
                ) : history.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1">Tidak ada riwayat pemindaian</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  history
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell>{item.fileName}</TableCell>
                        <TableCell>{formatFileSize(item.fileSize)}</TableCell>
                        <TableCell>{formatDate(item.scanDate)}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.isClean ? 'Aman' : 'Terinfeksi'}
                            color={item.isClean ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {item.threatCount > 0 ? (
                            <Tooltip title={item.threatNames.join(', ')}>
                              <Chip
                                label={`${item.threatCount} terdeteksi`}
                                color="error"
                                variant="outlined"
                                size="small"
                              />
                            </Tooltip>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              Tidak ada
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Lihat Detail">
                            <IconButton size="small" color="primary">
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Hapus">
                            <IconButton size="small" color="error">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={history.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Baris per halaman:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} dari ${count}`}
          />
        </Paper>

        {/* Informasi Tambahan */}
        <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Tentang Riwayat Pemindaian
          </Typography>
          <Typography variant="body2" paragraph>
            Riwayat pemindaian menyimpan informasi tentang semua file yang telah dipindai menggunakan pemindai antivirus kami.
            Anda dapat melihat status keamanan setiap file dan detail ancaman yang terdeteksi.
          </Typography>
          <Typography variant="body2">
            Riwayat pemindaian disimpan selama 30 hari sebelum dihapus secara otomatis dari sistem.
            Anda juga dapat menghapus riwayat pemindaian secara manual kapan saja.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 