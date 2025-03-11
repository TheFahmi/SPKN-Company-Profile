'use client';

import { ReactNode } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Divider,
  Grid,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import AdminPageWrapper from '@/app/components/admin/AdminPageWrapper';

export interface FormSection {
  title: string;
  content: ReactNode;
}

export interface AdminFormTemplateProps {
  title: string;
  isEdit?: boolean;
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
  success?: boolean;
  successMessage?: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  sections: FormSection[];
  additionalActions?: ReactNode;
}

const AdminFormTemplate = ({
  title,
  isEdit = false,
  loading,
  isSubmitting,
  error,
  success = false,
  successMessage = 'Data berhasil disimpan.',
  onSubmit,
  onCancel,
  sections,
  additionalActions,
}: AdminFormTemplateProps) => {
  
  // Action buttons for AdminPageWrapper
  const actionButtons = (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={onCancel}
    >
      Kembali
    </Button>
  );

  return (
    <AdminPageWrapper
      title={title}
      loading={loading}
      error={error}
      skeletonType="form"
      actions={actionButtons}
    >
      {success ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      ) : (
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={onSubmit}>
            <Grid container spacing={3}>
              {sections.map((section, index) => (
                <Grid item xs={12} key={index}>
                  {/* Section Title */}
                  <Typography variant="h6" gutterBottom sx={{ mt: index > 0 ? 2 : 0 }}>
                    {section.title}
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  {/* Section Content */}
                  {section.content}
                </Grid>
              ))}

              {/* Form Actions */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  {additionalActions}
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={onCancel}
                    disabled={isSubmitting}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} />
                    ) : isEdit ? (
                      'Simpan Perubahan'
                    ) : (
                      'Simpan'
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )}
    </AdminPageWrapper>
  );
};

export default AdminFormTemplate; 