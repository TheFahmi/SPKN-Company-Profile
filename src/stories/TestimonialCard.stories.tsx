import type { Meta, StoryObj } from '@storybook/react';
import TestimonialCard from '../components/TestimonialCard';
import ThemeProvider from './ThemeProvider';

// Metadata untuk komponen TestimonialCard
const meta = {
  title: 'Komponen/TestimonialCard',
  component: TestimonialCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'TestimonialCard adalah komponen untuk menampilkan testimoni pelanggan dalam format kartu yang menarik.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'ID unik testimoni',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Nama pelanggan',
      table: {
        type: { summary: 'string' },
      },
    },
    role: {
      control: 'text',
      description: 'Jabatan pelanggan (opsional)',
      table: {
        type: { summary: 'string' },
      },
    },
    company: {
      control: 'text',
      description: 'Perusahaan pelanggan (opsional)',
      table: {
        type: { summary: 'string' },
      },
    },
    avatarUrl: {
      control: 'text',
      description: 'URL avatar pelanggan (opsional)',
      table: {
        type: { summary: 'string' },
      },
    },
    testimonial: {
      control: 'text',
      description: 'Teks testimoni',
      table: {
        type: { summary: 'string' },
      },
    },
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 0.5 },
      description: 'Rating (0-5)',
      table: {
        type: { summary: 'number' },
      },
    },
    date: {
      control: 'text',
      description: 'Tanggal testimoni (opsional)',
      table: {
        type: { summary: 'string' },
      },
    },
    productOrService: {
      control: 'text',
      description: 'Produk atau layanan yang diulas (opsional)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider mode="light">
        <div style={{ padding: '1rem', maxWidth: '400px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof TestimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story dasar
export const Default: Story = {
  args: {
    id: '1',
    name: 'Budi Santoso',
    testimonial: 'Kualitas cetakan sangat bagus dan pengiriman tepat waktu. Sangat puas dengan layanan yang diberikan.',
    rating: 5,
  },
};

// Testimoni dengan informasi lengkap
export const Complete: Story = {
  args: {
    id: '2',
    name: 'Dewi Lestari',
    role: 'Marketing Manager',
    company: 'PT Maju Bersama',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    testimonial: 'Kami telah menggunakan jasa percetakan ini untuk kebutuhan marketing perusahaan selama 3 tahun terakhir. Hasilnya selalu memuaskan dan tim sangat profesional dalam menangani permintaan kami.',
    rating: 4.5,
    date: '15 Maret 2023',
    productOrService: 'Cetak Brosur dan Katalog',
  },
};

// Testimoni dengan rating rendah
export const LowRating: Story = {
  args: {
    id: '3',
    name: 'Ahmad Rizki',
    role: 'Pemilik',
    company: 'Toko Berkah',
    testimonial: 'Kualitas cetakan cukup baik, tetapi pengiriman terlambat dari jadwal yang dijanjikan. Semoga bisa ditingkatkan lagi untuk ke depannya.',
    rating: 3,
    date: '5 April 2023',
    productOrService: 'Cetak Spanduk',
  },
};

// Testimoni dengan teks panjang
export const LongTestimonial: Story = {
  args: {
    id: '4',
    name: 'Siti Rahayu',
    role: 'Event Organizer',
    company: 'Kreasi Event',
    avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    testimonial: 'Saya sangat terkesan dengan layanan yang diberikan. Tim desain sangat membantu dalam memberikan masukan untuk desain yang kami inginkan. Proses revisi sangat cepat dan mereka sangat sabar menghadapi permintaan perubahan dari kami. Hasil cetakan sangat berkualitas dan tahan lama. Bahkan setelah event selesai, banyak pengunjung yang menanyakan dimana kami mencetak material promosi kami. Pasti akan menggunakan jasa mereka lagi untuk event-event berikutnya.',
    rating: 5,
    date: '20 Februari 2023',
    productOrService: 'Paket Promosi Event',
  },
};

// Testimoni tanpa avatar
export const NoAvatar: Story = {
  args: {
    id: '5',
    name: 'Hendra Wijaya',
    role: 'CEO',
    company: 'Wijaya Digital',
    testimonial: 'Kerjasama yang sangat menyenangkan. Tim sangat responsif dan hasil cetakan sesuai dengan ekspektasi.',
    rating: 4.5,
    date: '10 Mei 2023',
    productOrService: 'Company Profile',
  },
};

// Testimoni tanpa role dan company
export const BasicInfo: Story = {
  args: {
    id: '6',
    name: 'Rina Putri',
    avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    testimonial: 'Undangan pernikahan kami mendapat banyak pujian dari tamu. Terima kasih atas desain dan cetakan yang indah.',
    rating: 5,
    date: '12 Juni 2023',
    productOrService: 'Undangan Pernikahan',
  },
}; 