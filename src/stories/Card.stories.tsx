import type { Meta, StoryObj } from '@storybook/react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  CardMedia, 
  Typography, 
  Button,
  Divider,
  Box,
  Avatar,
  IconButton
} from '@mui/material';
import ThemeProvider from './ThemeProvider';

// Metadata untuk komponen Card
const meta = {
  title: 'Komponen/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card adalah komponen permukaan yang menampilkan konten dan tindakan tentang satu subjek.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevation', 'outlined'],
      description: 'Variasi kartu yang menentukan gaya visual',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'elevation' },
      },
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: 'Tingkat elevasi kartu (bayangan)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    square: {
      control: 'boolean',
      description: 'Apakah kartu memiliki sudut persegi (tanpa border radius)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider mode="light">
        <div style={{ padding: '1rem', width: '350px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story dasar
export const Default: Story = {
  args: {
    variant: 'elevation',
    elevation: 1,
    children: (
      <>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Judul Kartu
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ini adalah contoh konten kartu. Kartu dapat digunakan untuk menampilkan informasi dalam format yang terstruktur.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Tindakan 1</Button>
          <Button size="small">Tindakan 2</Button>
        </CardActions>
      </>
    ),
  },
};

// Kartu dengan media
export const WithMedia: Story = {
  args: {
    variant: 'elevation',
    elevation: 2,
    children: (
      <>
        <CardMedia
          component="img"
          height="140"
          image="https://source.unsplash.com/random/800x450?printing"
          alt="Gambar Percetakan"
        />
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Kartu dengan Media
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kartu ini menampilkan gambar di bagian atas. Gambar dapat digunakan untuk menarik perhatian pengguna.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Lihat Detail</Button>
          <Button size="small" color="primary">
            Bagikan
          </Button>
        </CardActions>
      </>
    ),
  },
};

// Kartu dengan outline
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Kartu Outlined
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kartu ini menggunakan variasi outlined, yang menampilkan border tanpa bayangan.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Tindakan</Button>
        </CardActions>
      </>
    ),
  },
};

// Kartu dengan elevasi tinggi
export const HighElevation: Story = {
  args: {
    variant: 'elevation',
    elevation: 8,
    children: (
      <>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Kartu Elevasi Tinggi
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kartu ini memiliki elevasi yang lebih tinggi, memberikan efek bayangan yang lebih jelas.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Tindakan</Button>
        </CardActions>
      </>
    ),
  },
};

// Kartu produk
export const ProductCard: Story = {
  args: {
    variant: 'elevation',
    elevation: 2,
    children: (
      <>
        <CardMedia
          component="img"
          height="160"
          image="https://source.unsplash.com/random/800x450?brochure"
          alt="Brosur"
        />
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            Brosur Premium
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Brosur full color dengan kertas art paper 150gsm
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
            Rp 250.000
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Button size="small" color="primary" variant="contained" fullWidth>
            Tambah ke Keranjang
          </Button>
        </CardActions>
      </>
    ),
  },
};

// Kartu profil
export const ProfileCard: Story = {
  args: {
    variant: 'elevation',
    elevation: 2,
    children: (
      <>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{ width: 56, height: 56, mr: 2, bgcolor: 'primary.main' }}
          >
            SP
          </Avatar>
          <Box>
            <Typography variant="h6">Sarana Pancakarya Nusa</Typography>
            <Typography variant="body2" color="text.secondary">
              Percetakan & Penerbitan
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent>
          <Typography variant="body2">
            Perusahaan percetakan dan penerbitan dengan pengalaman lebih dari 20 tahun dalam industri.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Lihat Profil</Button>
          <Button size="small" color="primary">
            Hubungi
          </Button>
        </CardActions>
      </>
    ),
  },
}; 