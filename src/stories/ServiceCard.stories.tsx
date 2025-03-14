import type { Meta, StoryObj } from '@storybook/react';
import ServiceCard from '../components/ServiceCard';
import ThemeProvider from './ThemeProvider';
import { action } from '@storybook/addon-actions';

// Metadata untuk komponen ServiceCard
const meta = {
  title: 'Komponen/ServiceCard',
  component: ServiceCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ServiceCard adalah komponen untuk menampilkan layanan percetakan dalam format kartu yang informatif.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'ID unik layanan',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: 'text',
      description: 'Judul layanan',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Deskripsi layanan',
      table: {
        type: { summary: 'string' },
      },
    },
    imageUrl: {
      control: 'text',
      description: 'URL gambar layanan',
      table: {
        type: { summary: 'string' },
      },
    },
    features: {
      control: { type: 'object' },
      description: 'Fitur-fitur layanan',
      table: {
        type: { summary: 'string[]' },
      },
    },
    price: {
      control: 'text',
      description: 'Harga layanan (format string)',
      table: {
        type: { summary: 'string' },
      },
    },
    estimatedTime: {
      control: 'text',
      description: 'Estimasi waktu pengerjaan',
      table: {
        type: { summary: 'string' },
      },
    },
    isPopular: {
      control: 'boolean',
      description: 'Apakah layanan populer',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onOrderNow: {
      action: 'order now',
      description: 'Callback saat tombol pesan sekarang diklik',
      table: {
        type: { summary: '(id: string) => void' },
      },
    },
    onLearnMore: {
      action: 'learn more',
      description: 'Callback saat tombol pelajari diklik',
      table: {
        type: { summary: '(id: string) => void' },
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider mode="light">
        <div style={{ padding: '1rem', maxWidth: '350px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ServiceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story dasar
export const Default: Story = {
  args: {
    id: '1',
    title: 'Cetak Brosur',
    description: 'Layanan cetak brosur berkualitas tinggi untuk kebutuhan promosi bisnis Anda.',
    imageUrl: 'https://source.unsplash.com/random/350x180?brochure',
    features: [
      'Kertas art paper 150gsm',
      'Cetak full color dua sisi',
      'Finishing laminasi doff/glossy',
      'Desain gratis (syarat & ketentuan berlaku)',
    ],
    price: 'Rp 250.000',
    estimatedTime: '2-3 hari',
    onOrderNow: action('order now'),
    onLearnMore: action('learn more'),
  },
};

// Layanan populer
export const Popular: Story = {
  args: {
    id: '2',
    title: 'Cetak Kartu Nama',
    description: 'Layanan cetak kartu nama premium untuk kesan profesional bisnis Anda.',
    imageUrl: 'https://source.unsplash.com/random/350x180?business-card',
    features: [
      'Kertas fancy paper 260gsm',
      'Cetak full color dua sisi',
      'Finishing emboss/spot UV',
      'Desain gratis (syarat & ketentuan berlaku)',
      'Gratis kotak kartu nama',
    ],
    price: 'Rp 150.000',
    estimatedTime: '1-2 hari',
    isPopular: true,
    onOrderNow: action('order now'),
    onLearnMore: action('learn more'),
  },
};

// Layanan tanpa harga (custom)
export const CustomPrice: Story = {
  args: {
    id: '3',
    title: 'Desain Grafis',
    description: 'Layanan desain grafis profesional untuk berbagai kebutuhan bisnis Anda.',
    imageUrl: 'https://source.unsplash.com/random/350x180?graphic-design',
    features: [
      'Desain oleh tim profesional',
      'Revisi hingga 3 kali',
      'Format file siap cetak',
      'Konsultasi desain gratis',
      'Hak cipta desain diberikan kepada klien',
    ],
    estimatedTime: '3-5 hari',
    onOrderNow: action('order now'),
    onLearnMore: action('learn more'),
  },
};

// Layanan tanpa estimasi waktu
export const NoEstimatedTime: Story = {
  args: {
    id: '4',
    title: 'Cetak Spanduk',
    description: 'Layanan cetak spanduk outdoor berkualitas tinggi dengan bahan tahan cuaca.',
    imageUrl: 'https://source.unsplash.com/random/350x180?banner',
    features: [
      'Bahan flexi korea 280gsm',
      'Cetak full color resolusi tinggi',
      'Tahan cuaca dan sinar UV',
      'Finishing mata ayam/selongsong',
      'Gratis desain untuk pemesanan min. 5 meter',
    ],
    price: 'Rp 35.000/m²',
    onOrderNow: action('order now'),
    onLearnMore: action('learn more'),
  },
};

// Layanan dengan banyak fitur
export const ManyFeatures: Story = {
  args: {
    id: '5',
    title: 'Paket Pernikahan',
    description: 'Paket lengkap cetak kebutuhan pernikahan dengan desain eksklusif.',
    imageUrl: 'https://source.unsplash.com/random/350x180?wedding',
    features: [
      'Undangan pernikahan premium (100 pcs)',
      'Kartu ucapan terima kasih (100 pcs)',
      'Buku tamu (1 pcs)',
      'Amplop angpau custom (2 pcs)',
      'Name tag meja (10 pcs)',
      'Banner selamat datang (1 pcs)',
      'Kartu souvenir (100 pcs)',
      'Desain custom sesuai tema',
      'Gratis konsultasi dengan desainer',
    ],
    price: 'Rp 2.500.000',
    estimatedTime: '7-10 hari',
    isPopular: true,
    onOrderNow: action('order now'),
    onLearnMore: action('learn more'),
  },
};

// Layanan dengan deskripsi panjang
export const LongDescription: Story = {
  args: {
    id: '6',
    title: 'Cetak Buku',
    description: 'Layanan cetak buku berkualitas tinggi untuk berbagai keperluan seperti novel, buku pelajaran, company profile, katalog produk, buku tahunan, dan lainnya. Kami menawarkan berbagai pilihan kertas, jilid, dan finishing untuk memenuhi kebutuhan spesifik Anda.',
    imageUrl: 'https://source.unsplash.com/random/350x180?book-printing',
    features: [
      'Berbagai pilihan kertas isi dan cover',
      'Jilid softcover atau hardcover',
      'Finishing laminasi doff/glossy',
      'Cetak full color atau hitam putih',
      'Tersedia dalam berbagai ukuran',
    ],
    price: 'Rp 75.000/buku',
    estimatedTime: '5-7 hari',
    onOrderNow: action('order now'),
    onLearnMore: action('learn more'),
  },
}; 