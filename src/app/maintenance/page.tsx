'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

export default function ImportProductsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [importedProducts, setImportedProducts] = useState<any[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type !== 'text/xml') {
        setError('File harus berformat XML');
        return;
      }
      setFile(file);
      setError('');
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setLoading(true);
    setError('');
    setSuccess('');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/products/import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan saat mengimpor produk');
      }

      setSuccess(`Berhasil mengimpor ${data.importedCount} produk`);
      setImportedProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengimpor produk');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={0} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Import Produk dari WordPress
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Upload file XML ekspor dari WordPress untuk mengimpor produk
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        <Box sx={{ mb: 4 }}>
          <label htmlFor="import-file">
            <Input
              accept=".xml"
              id="import-file"
              type="file"
              onChange={handleFileChange}
            />
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{ mr: 2 }}
            >
              Pilih File XML
            </Button>
          </label>
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              File terpilih: {file.name}
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          onClick={handleImport}
          disabled={!file || loading}
          startIcon={loading ? <CircularProgress size={20} /> : undefined}
        >
          {loading ? 'Mengimpor...' : 'Import Produk'}
        </Button>

        {importedProducts.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Produk yang Diimpor
            </Typography>
            <List>
              {importedProducts.map((product, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={product.name}
                    secondary={`Kategori: ${product.category || 'Tanpa Kategori'}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Container>
  );
}