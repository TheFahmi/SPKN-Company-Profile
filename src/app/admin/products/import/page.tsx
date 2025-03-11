'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Grid,
  Typography,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import AdminFormTemplate, { FormSection } from '@/app/components/admin/AdminFormTemplate';

const Input = styled('input')({
  display: 'none',
});

export default function ImportProductsPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [importedProducts, setImportedProducts] = useState<any[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!file.name.endsWith('.xml')) {
        setError('File harus berformat XML');
        return;
      }
      setFile(file);
      setError(null);
    }
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccess(false);
    
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

      setSuccess(true);
      setImportedProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengimpor produk');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.push('/admin/products');
  };

  const formSections: FormSection[] = [
    {
      title: 'Upload File',
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                Upload file XML ekspor dari WordPress untuk mengimpor produk
              </Typography>
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
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  File terpilih: {file.name}
                </Typography>
              )}
            </Box>
          </Grid>
          {importedProducts.length > 0 && (
            <Grid item xs={12}>
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
            </Grid>
          )}
        </Grid>
      ),
    },
  ];

  return (
    <AdminFormTemplate
      title="Import Produk dari WordPress"
      loading={false}
      isSubmitting={loading}
      error={error}
      success={success}
      successMessage={`Berhasil mengimpor ${importedProducts.length} produk`}
      onSubmit={handleImport}
      onCancel={handleGoBack}
      sections={formSections}
    />
  );
} 