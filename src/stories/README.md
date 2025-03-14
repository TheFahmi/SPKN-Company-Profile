# Storybook untuk Sistem Desain PT Sarana Pancakarya Nusa

## Tentang Storybook

Storybook adalah alat untuk mengembangkan komponen UI secara terisolasi. Ini memungkinkan kita untuk membangun komponen UI yang terorganisir dan efisien tanpa kerumitan aplikasi. Storybook juga berfungsi sebagai dokumentasi interaktif untuk sistem desain.

## Cara Menjalankan Storybook

Untuk menjalankan Storybook secara lokal, gunakan perintah berikut:

```bash
npm run storybook
```

Storybook akan berjalan di `http://localhost:6006` secara default.

## Struktur Storybook

Storybook diorganisir dalam beberapa kategori:

1. **Dokumentasi**
   - Introduction - Pengenalan sistem desain
   - Colors - Dokumentasi palet warna
   - Typography - Dokumentasi tipografi
   - SpacingShadows - Dokumentasi spacing dan shadows

2. **Komponen**
   - Button - Dokumentasi dan variasi tombol
   - TextField - Dokumentasi dan variasi input teks
   - Card - Dokumentasi dan variasi kartu
   - Alert - Dokumentasi dan variasi alert
   - ProductCard - Dokumentasi dan variasi kartu produk
   - ServiceCard - Dokumentasi dan variasi kartu layanan
   - TestimonialCard - Dokumentasi dan variasi kartu testimoni
   - PricingCard - Dokumentasi dan variasi kartu harga

## Cara Menambahkan Story Baru

Untuk menambahkan story baru, ikuti langkah-langkah berikut:

1. Buat file baru di direktori `src/stories` dengan format `[NamaKomponen].stories.tsx`
2. Impor komponen yang ingin didokumentasikan
3. Definisikan metadata komponen menggunakan format Storybook
4. Buat variasi komponen sebagai story

Contoh:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import MyComponent from '../components/MyComponent';
import ThemeProvider from './ThemeProvider';

const meta = {
  title: 'Komponen/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider mode="light">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // props untuk komponen
  },
};
```

## ThemeProvider

Untuk memastikan komponen menggunakan tema yang benar, kita menggunakan komponen `ThemeProvider` khusus yang tersedia di `src/stories/ThemeProvider.tsx`. Komponen ini menangani error saat mendapatkan tema dengan menggunakan tema fallback jika terjadi error.

```tsx
import ThemeProvider from './ThemeProvider';

// Gunakan dalam decorator
decorators: [
  (Story) => (
    <ThemeProvider mode="light">
      <Story />
    </ThemeProvider>
  ),
],
```

## Praktik Terbaik

1. **Dokumentasi yang Jelas**: Berikan deskripsi yang jelas untuk setiap komponen dan story.
2. **Variasi yang Komprehensif**: Tampilkan berbagai variasi komponen untuk menunjukkan kemungkinan penggunaan.
3. **Konsistensi**: Gunakan format yang konsisten untuk semua story.
4. **Tema**: Selalu bungkus komponen dengan `ThemeProvider` untuk memastikan komponen menggunakan tema yang benar.
5. **Aksesibilitas**: Pastikan komponen memenuhi standar aksesibilitas.

## Integrasi dengan Sistem Desain

Storybook terintegrasi dengan sistem desain PT Sarana Pancakarya Nusa dan menggunakan tema yang sama dengan aplikasi utama. Ini memastikan konsistensi antara dokumentasi dan implementasi.

## Kontribusi

Jika Anda ingin berkontribusi pada Storybook:

1. Pastikan Anda memahami sistem desain dan komponen yang ingin didokumentasikan
2. Ikuti panduan penulisan story yang konsisten
3. Uji story Anda di berbagai ukuran layar
4. Berikan dokumentasi yang jelas dan komprehensif

## Sumber Daya

- [Dokumentasi Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [Dokumentasi Material UI](https://mui.com/material-ui/getting-started/overview/)
- [Sistem Desain PT Sarana Pancakarya Nusa](/design-system) 