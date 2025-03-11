'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Alert,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  CircularProgress,
  Container,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Info as InfoIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminSkeleton from '@/app/components/admin/AdminSkeleton';

interface SettingsState {
  emailNotifications: boolean;
  darkMode: boolean;
  companyName: string;
  supportEmail: string;
  maintenanceMode: boolean;
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [settings, setSettings] = useState<SettingsState>({
    emailNotifications: true,
    darkMode: false,
    companyName: 'Percetakan Profile',
    supportEmail: 'support@example.com',
    maintenanceMode: false,
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Cek status login
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
    
    // Load settings from localStorage or API
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedEmailNotifications = localStorage.getItem('emailNotifications') !== 'false';
    setSettings({
      ...settings,
      darkMode: savedDarkMode,
      emailNotifications: savedEmailNotifications,
    });
  }, [status, router]);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (!response.ok) throw new Error('Gagal mengambil pengaturan');
      const data = await response.json();
      
      // Pastikan nilai boolean diproses dengan benar
      const processedSettings = {
        emailNotifications: Boolean(data.emailNotifications),
        darkMode: Boolean(data.darkMode),
        companyName: data.companyName || 'Percetakan Profile',
        supportEmail: data.supportEmail || 'support@example.com',
        maintenanceMode: Boolean(data.maintenanceMode),
      };
      
      console.log('Fetched settings:', data);
      console.log('Processed settings:', processedSettings);
      
      setSettings(processedSettings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleMaintenanceModeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    console.log('Changing maintenance mode to:', newValue);
    
    try {
      setSaving(true);
      setError(null);
      
      const updatedSettings = {
        ...settings,
        maintenanceMode: newValue,
      };
      
      console.log('Sending updated settings:', updatedSettings);
      
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store',
        body: JSON.stringify(updatedSettings),
      });

      let result;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        throw new Error('Server returned non-JSON response');
      }

      if (!response.ok) {
        throw new Error(result.message || 'Gagal memperbarui mode pemeliharaan');
      }

      console.log('Update result:', result);

      // Refresh settings dari server
      await fetchSettings();

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error updating maintenance mode:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memperbarui pengaturan');
      // Kembalikan state ke nilai sebelumnya jika gagal
      setSettings(prev => ({
        ...prev,
        maintenanceMode: !newValue
      }));
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (name: keyof SettingsState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    console.log(`Setting ${name} to:`, value);
    
    if (name === 'maintenanceMode') {
      handleMaintenanceModeChange(event);
      return;
    }
    
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const settingsToSend = {
        ...settings,
        emailNotifications: Boolean(settings.emailNotifications),
        darkMode: Boolean(settings.darkMode),
        maintenanceMode: Boolean(settings.maintenanceMode),
      };

      console.log('Sending settings:', settingsToSend);

      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsToSend),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Gagal menyimpan pengaturan');
      }

      const result = await response.json();
      console.log('Save result:', result);

      if (result.settings) {
        const processedSettings = {
          emailNotifications: Boolean(result.settings.emailNotifications),
          darkMode: Boolean(result.settings.darkMode),
          companyName: result.settings.companyName || 'Percetakan Profile',
          supportEmail: result.settings.supportEmail || 'support@example.com',
          maintenanceMode: Boolean(result.settings.maintenanceMode),
        };
        
        console.log('Setting processed result:', processedSettings);
        setSettings(processedSettings);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      
      // Refresh settings setelah menyimpan
      await fetchSettings();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  };

  const settingsSections = [
    {
      title: 'Notifikasi',
      icon: <NotificationsIcon />,
      content: (
        <>
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(settings.emailNotifications)}
                onChange={handleChange('emailNotifications')}
              />
            }
            label="Notifikasi Email"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Terima notifikasi email untuk aktivitas penting
          </Typography>
        </>
      ),
    },
    {
      title: 'Tampilan',
      icon: <PaletteIcon />,
      content: (
        <>
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(settings.darkMode)}
                onChange={handleChange('darkMode')}
              />
            }
            label="Mode Gelap"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Aktifkan tema gelap untuk tampilan yang lebih nyaman di malam hari
          </Typography>
        </>
      ),
    },
    {
      title: 'Keamanan',
      icon: <SecurityIcon />,
      content: (
        <>
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(settings.maintenanceMode)}
                onChange={handleChange('maintenanceMode')}
              />
            }
            label="Mode Pemeliharaan"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Aktifkan mode pemeliharaan untuk menonaktifkan akses publik sementara.
            Ketika diaktifkan, pengunjung akan melihat halaman pemeliharaan.
            Status saat ini: {settings.maintenanceMode ? 'Aktif' : 'Nonaktif'}
          </Typography>
        </>
      ),
    },
    {
      title: 'Informasi Perusahaan',
      icon: <InfoIcon />,
      content: (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Nama Perusahaan"
            value={settings.companyName}
            onChange={handleChange('companyName')}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email Support"
            value={settings.supportEmail}
            onChange={handleChange('supportEmail')}
            margin="normal"
            type="email"
          />
        </Box>
      ),
    },
  ];

  if (status === 'loading') {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <AdminSkeleton type="form" />
      </Container>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect in useEffect
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pengaturan
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Tampilan
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          {settingsSections.map((section) => (
            <Grid item xs={12} md={6} key={section.title}>
              <Card>
                <CardHeader
                  avatar={section.icon}
                  title={section.title}
                  action={
                    <Tooltip title={`Pengaturan ${section.title}`}>
                      <IconButton>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  }
                />
                <Divider />
                <CardContent>{section.content}</CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={saving}
            sx={{ 
              minWidth: 120,
              position: 'relative',
            }}
          >
            {saving ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Simpan'
            )}
          </Button>
        </Box>
        
        {saved && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Pengaturan berhasil disimpan
          </Alert>
        )}
      </Paper>
    </Container>
  );
} 