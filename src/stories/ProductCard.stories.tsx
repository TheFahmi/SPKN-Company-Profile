import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from '../components/ProductCard';
import ThemeProvider from './ThemeProvider';
import { action } from '@storybook/addon-actions';

// Metadata untuk komponen ProductCard
const meta = {
  title: 'Komponen/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ProductCard adalah komponen untuk menampilkan informasi produk dalam format kartu yang menarik.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'ID unik produk',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Nama produk',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Deskripsi produk',
      table: {
        type: { summary: 'string' },
      },
    },
    price: {
      control: 'number',
      description: 'Harga produk',
      table: {
        type: { summary: 'number' },
      },
    },
    discountPrice: {
      control: 'number',
      description: 'Harga diskon produk (opsional)',
      table: {
        type: { summary: 'number' },
      },
    },
    imageUrl: {
      control: 'text',
      description: 'URL gambar produk',
      table: {
        type: { summary: 'string' },
      },
    },
    category: {
      control: 'text',
      description: 'Kategori produk',
      table: {
        type: { summary: 'string' },
      },
    },
    isNew: {
      control: 'boolean',
      description: 'Apakah produk baru',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isBestSeller: {
      control: 'boolean',
      description: 'Apakah produk best seller',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onAddToCart: {
      action: 'added to cart',
      description: 'Callback saat tombol tambah ke keranjang diklik',
      table: {
        type: { summary: '(id: string) => void' },
      },
    },
    onViewDetail: {
      action: 'view detail',
      description: 'Callback saat tombol detail diklik',
      table: {
        type: { summary: '(id: string) => void' },
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider mode="light">
        <div style={{ padding: '1rem', maxWidth: '300px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story dasar
export const Default: Story = {
  args: {
    id: '1',
    name: 'Brosur Premium A4',
    description: 'Brosur full color dengan kertas art paper 150gsm, cetak dua sisi dengan finishing laminasi doff.',
    price: 250000,
    imageUrl: 'https://source.unsplash.com/random/300x200?brochure',
    category: 'brosur',
    onAddToCart: action('added to cart'),
    onViewDetail: action('view detail'),
  },
};

// Produk dengan diskon
export const WithDiscount: Story = {
  args: {
    id: '2',
    name: 'Kartu Nama Premium',
    description: 'Kartu nama dengan kertas fancy paper 260gsm, cetak full color dua sisi dengan finishing emboss.',
    price: 150000,
    discountPrice: 120000,
    imageUrl: 'https://source.unsplash.com/random/300x200?business-card',
    category: 'kartu-nama',
    onAddToCart: action('added to cart'),
    onViewDetail: action('view detail'),
  },
};

// Produk baru
export const NewProduct: Story = {
  args: {
    id: '3',
    name: 'Kalender Meja 2024',
    description: 'Kalender meja dengan 12 halaman, kertas art paper 190gsm, dengan desain modern dan elegan.',
    price: 85000,
    imageUrl: 'https://source.unsplash.com/random/300x200?calendar',
    category: 'kalender',
    isNew: true,
    onAddToCart: action('added to cart'),
    onViewDetail: action('view detail'),
  },
};

// Produk best seller
export const BestSeller: Story = {
  args: {
    id: '4',
    name: 'Stiker Vinyl Premium',
    description: 'Stiker vinyl tahan air dan sinar UV, dengan cutting presisi dan kualitas cetak tinggi.',
    price: 75000,
    imageUrl: 'https://source.unsplash.com/random/300x200?sticker',
    category: 'stiker',
    isBestSeller: true,
    onAddToCart: action('added to cart'),
    onViewDetail: action('view detail'),
  },
};

// Produk baru dan best seller
export const NewAndBestSeller: Story = {
  args: {
    id: '5',
    name: 'Undangan Pernikahan Premium',
    description: 'Undangan pernikahan dengan kertas fancy paper, amplop custom, dan pita satin premium.',
    price: 350000,
    discountPrice: 299000,
    imageUrl: 'https://source.unsplash.com/random/300x200?wedding-invitation',
    category: 'undangan',
    isNew: true,
    isBestSeller: true,
    onAddToCart: action('added to cart'),
    onViewDetail: action('view detail'),
  },
};

// Produk tanpa rating
export const NoRating: Story = {
  args: {
    id: '6',
    name: 'Spanduk Outdoor',
    description: 'Spanduk outdoor dengan bahan flexi korea 280gsm, tahan cuaca dan sinar UV.',
    price: 120000,
    imageUrl: 'https://source.unsplash.com/random/300x200?banner',
    category: 'spanduk',
    onAddToCart: action('added to cart'),
    onViewDetail: action('view detail'),
  },
};

// Produk dengan judul panjang
export const LongTitle: Story = {
  args: {
    id: '7',
    name: 'Paket Lengkap Stationary Perusahaan dengan Desain Kustom dan Kualitas Premium',
    description: 'Paket lengkap stationary perusahaan termasuk kartu nama, kop surat, amplop, dan folder.',
    price: 500000,
    imageUrl: 'https://source.unsplash.com/random/300x200?stationary',
    category: 'paket',
    onAddToCart: action('added to cart'),
    onViewDetail: action('view detail'),
  },
};

// Produk dengan deskripsi panjang
export const LongDescription: Story = {
  args: {
    id: '8',
    name: 'X-Banner Standard',
    description: 'X-Banner dengan ukuran 60x160 cm, bahan flexi korea 280gsm, dilengkapi dengan standing bracket aluminium yang kokoh dan tas carrying case. Cocok untuk promosi produk, pameran, atau event. Desain dapat disesuaikan dengan kebutuhan Anda.',
    price: 180000,
    imageUrl: 'https://source.unsplash.com/random/300x200?banner',
    category: 'banner',
    onAddToCart: action('added to cart'),
    onViewDetail: action('view detail'),
  },
}; 