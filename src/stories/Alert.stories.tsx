import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, Stack } from '@mui/material';
import ThemeProvider from './ThemeProvider';

// Metadata untuk komponen Alert
const meta = {
  title: 'Komponen/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Alert adalah komponen yang menampilkan pesan singkat dan penting kepada pengguna.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
      description: 'Tingkat keparahan alert yang menentukan warna dan ikon',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'success' },
      },
    },
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'outlined'],
      description: 'Variasi alert yang menentukan gaya visual',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'standard' },
      },
    },
    color: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
      description: 'Warna alert, biasanya sama dengan severity',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'boolean',
      description: 'Apakah menampilkan ikon',
      table: {
        type: { summary: 'React.ReactNode | boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onClose: { action: 'closed' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider mode="light">
        <div style={{ padding: '1rem', width: '500px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story dasar
export const Default: Story = {
  args: {
    severity: 'success',
    children: 'Ini adalah alert success',
  },
};

// Variasi severity
export const Success: Story = {
  args: {
    severity: 'success',
    children: 'Ini adalah alert success',
  },
};

export const Info: Story = {
  args: {
    severity: 'info',
    children: 'Ini adalah alert info',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    children: 'Ini adalah alert warning',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    children: 'Ini adalah alert error',
  },
};

// Variasi variant
export const Standard: Story = {
  args: {
    severity: 'info',
    variant: 'standard',
    children: 'Ini adalah alert standard',
  },
};

export const Filled: Story = {
  args: {
    severity: 'info',
    variant: 'filled',
    children: 'Ini adalah alert filled',
  },
};

export const Outlined: Story = {
  args: {
    severity: 'info',
    variant: 'outlined',
    children: 'Ini adalah alert outlined',
  },
};

// Alert dengan judul
export const WithTitle: Story = {
  args: {
    severity: 'success',
    children: (
      <>
        <AlertTitle>Sukses</AlertTitle>
        Operasi berhasil dilakukan.
      </>
    ),
  },
};

// Alert dengan tindakan tutup
export const Closable: Story = {
  args: {
    severity: 'info',
    onClose: () => {},
    children: 'Ini adalah alert yang dapat ditutup',
  },
};

// Alert tanpa ikon
export const NoIcon: Story = {
  args: {
    severity: 'warning',
    icon: false,
    children: 'Ini adalah alert tanpa ikon',
  },
};

// Contoh penggunaan multiple alerts
export const MultipleAlerts: Story = {
  render: () => (
    <Stack spacing={2}>
      <Alert severity="success">
        <AlertTitle>Sukses</AlertTitle>
        Data berhasil disimpan
      </Alert>
      <Alert severity="info">
        <AlertTitle>Informasi</AlertTitle>
        Pembaruan tersedia
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Peringatan</AlertTitle>
        Sesi akan berakhir dalam 5 menit
      </Alert>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Terjadi kesalahan saat memproses permintaan
      </Alert>
    </Stack>
  ),
}; 