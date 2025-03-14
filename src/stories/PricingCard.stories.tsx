import type { Meta, StoryObj } from '@storybook/react';
import PricingCard from '../components/PricingCard';
import ThemeProvider from './ThemeProvider';
import { action } from '@storybook/addon-actions';

// Metadata untuk komponen PricingCard
const meta = {
  title: 'Komponen/PricingCard',
  component: PricingCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'PricingCard adalah komponen untuk menampilkan paket harga dalam format kartu yang informatif.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'ID unik paket',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: 'text',
      description: 'Judul paket',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Deskripsi paket (opsional)',
      table: {
        type: { summary: 'string' },
      },
    },
    price: {
      control: 'text',
      description: 'Harga paket',
      table: {
        type: { summary: 'string' },
      },
    },
    period: {
      control: 'text',
      description: 'Periode harga (opsional)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'per pesanan' },
      },
    },
    features: {
      control: { type: 'object' },
      description: 'Fitur-fitur paket',
      table: {
        type: { summary: 'PricingFeature[]' },
      },
    },
    buttonText: {
      control: 'text',
      description: 'Teks tombol (opsional)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Pilih Paket' },
      },
    },
    isPopular: {
      control: 'boolean',
      description: 'Apakah paket populer',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isHighlighted: {
      control: 'boolean',
      description: 'Apakah paket disorot',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onSelectPlan: {
      action: 'select plan',
      description: 'Callback saat tombol pilih paket diklik',
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
} satisfies Meta<typeof PricingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story dasar
export const Default: Story = {
  args: {
    id: '1',
    title: 'Paket Dasar',
    description: 'Paket cetak untuk kebutuhan dasar',
    price: 'Rp 250.000',
    features: [
      { title: 'Cetak full color', included: true },
      { title: 'Kertas art paper 150gsm', included: true },
      { title: 'Revisi desain 1x', included: true },
      { title: 'Pengiriman gratis', included: false },
      { title: 'Finishing laminasi', included: false },
    ],
    onSelectPlan: action('select plan'),
  },
};

// Paket populer
export const Popular: Story = {
  args: {
    id: '2',
    title: 'Paket Premium',
    description: 'Paket cetak terlaris dengan fitur lengkap',
    price: 'Rp 500.000',
    features: [
      { title: 'Cetak full color', included: true },
      { title: 'Kertas art paper 200gsm', included: true },
      { title: 'Revisi desain 3x', included: true },
      { title: 'Pengiriman gratis', included: true },
      { title: 'Finishing laminasi doff/glossy', included: true },
    ],
    isPopular: true,
    onSelectPlan: action('select plan'),
  },
};

// Paket disorot
export const Highlighted: Story = {
  args: {
    id: '3',
    title: 'Paket Bisnis',
    description: 'Paket cetak untuk kebutuhan bisnis',
    price: 'Rp 750.000',
    features: [
      { title: 'Cetak full color', included: true },
      { title: 'Kertas art paper 260gsm', included: true },
      { title: 'Revisi desain unlimited', included: true },
      { title: 'Pengiriman gratis', included: true },
      { title: 'Finishing laminasi premium', included: true },
      { title: 'Konsultasi desain', included: true },
    ],
    isHighlighted: true,
    buttonText: 'Pilih Paket Bisnis',
    onSelectPlan: action('select plan'),
  },
};

// Paket populer dan disorot
export const PopularAndHighlighted: Story = {
  args: {
    id: '4',
    title: 'Paket Ultimate',
    description: 'Paket cetak terlengkap dengan semua fitur premium',
    price: 'Rp 1.250.000',
    features: [
      { title: 'Cetak full color kualitas tinggi', included: true },
      { title: 'Kertas premium import', included: true },
      { title: 'Revisi desain unlimited', included: true },
      { title: 'Pengiriman express gratis', included: true },
      { title: 'Finishing laminasi premium', included: true },
      { title: 'Konsultasi desain prioritas', included: true },
      { title: 'Garansi hasil cetak', included: true },
    ],
    isPopular: true,
    isHighlighted: true,
    buttonText: 'Pilih Paket Ultimate',
    onSelectPlan: action('select plan'),
  },
};

// Paket dengan periode berbeda
export const CustomPeriod: Story = {
  args: {
    id: '5',
    title: 'Paket Langganan',
    description: 'Paket cetak berlangganan untuk kebutuhan rutin',
    price: 'Rp 1.500.000',
    period: 'per bulan',
    features: [
      { title: 'Cetak 1000 brosur per bulan', included: true },
      { title: 'Cetak 500 kartu nama per bulan', included: true },
      { title: 'Revisi desain 5x per bulan', included: true },
      { title: 'Pengiriman gratis', included: true },
      { title: 'Konsultasi desain', included: true },
      { title: 'Prioritas pengerjaan', included: true },
    ],
    buttonText: 'Berlangganan Sekarang',
    onSelectPlan: action('select plan'),
  },
};

// Paket dengan banyak fitur
export const ManyFeatures: Story = {
  args: {
    id: '6',
    title: 'Paket Korporat',
    description: 'Paket cetak lengkap untuk kebutuhan perusahaan',
    price: 'Rp 5.000.000',
    period: 'per proyek',
    features: [
      { title: 'Cetak company profile', included: true },
      { title: 'Cetak kartu nama (500 pcs)', included: true },
      { title: 'Cetak kop surat (1000 pcs)', included: true },
      { title: 'Cetak amplop (500 pcs)', included: true },
      { title: 'Cetak folder dokumen (100 pcs)', included: true },
      { title: 'Cetak brosur (1000 pcs)', included: true },
      { title: 'Cetak katalog produk (200 pcs)', included: true },
      { title: 'Desain logo (jika diperlukan)', included: true },
      { title: 'Revisi desain unlimited', included: true },
      { title: 'Pengiriman gratis', included: true },
      { title: 'Konsultasi branding', included: true },
      { title: 'Garansi hasil cetak', included: true },
    ],
    isHighlighted: true,
    buttonText: 'Konsultasi Sekarang',
    onSelectPlan: action('select plan'),
  },
}; 