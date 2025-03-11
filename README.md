# Cetak Buku - Website Percetakan Buku

Website landing page untuk percetakan buku dengan fitur backoffice untuk mengelola produk.

## Fitur

- **Landing Page** - Halaman utama dengan informasi tentang layanan percetakan
- **Halaman Produk** - Menampilkan berbagai produk percetakan yang tersedia
- **Detail Produk** - Halaman detail produk dengan spesifikasi, cara pemesanan, dan informasi pengiriman
- **Halaman Tentang Kami** - Informasi tentang perusahaan, visi, misi, dan tim
- **Halaman Kontak** - Form kontak dan informasi kontak perusahaan
- **Admin Dashboard** - Panel admin untuk mengelola produk
- **Ilustrasi SVG** - Semua gambar dibuat dengan SVG untuk tampilan yang responsif dan ringan

## Teknologi

- Next.js 15
- React 19
- Material UI 6
- TypeScript
- React Hook Form
- Zod (validasi)
- SVG Illustrations

## Cara Menjalankan

1. Clone repositori ini
2. Install dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
4. Buka [http://localhost:3000](http://localhost:3000) di browser Anda

## Struktur Proyek

```
src/
├── app/
│   ├── admin/                # Halaman admin
│   │   ├── dashboard/        # Dashboard admin
│   │   └── page.tsx          # Halaman login admin
│   ├── components/           # Komponen yang dapat digunakan kembali
│   │   ├── illustrations/    # Komponen ilustrasi SVG
│   │   ├── Footer.tsx        # Komponen footer
│   │   └── Navbar.tsx        # Komponen navbar
│   ├── kontak/               # Halaman kontak
│   ├── lib/                  # Utilitas dan konfigurasi
│   ├── produk/               # Halaman produk
│   │   ├── [id]/             # Halaman detail produk (dinamis)
│   │   └── page.tsx          # Halaman daftar produk
│   ├── tentang-kami/         # Halaman tentang kami
│   ├── types/                # Tipe TypeScript
│   ├── globals.css           # CSS global
│   ├── layout.tsx            # Layout utama
│   └── page.tsx              # Halaman beranda
```

## Halaman Detail Produk

Halaman detail produk menampilkan informasi lengkap tentang produk, termasuk:

- Deskripsi produk
- Fitur utama
- Spesifikasi teknis
- Status ketersediaan
- Cara pemesanan
- Informasi pengiriman
- Produk terkait

Halaman ini menggunakan dynamic routing Next.js dengan parameter ID produk.

## Ilustrasi

Semua ilustrasi dibuat dengan SVG dan diimplementasikan sebagai komponen React. Ini memberikan beberapa keuntungan:

- **Ringan** - Tidak perlu mengunduh gambar besar
- **Responsif** - Menyesuaikan dengan ukuran layar
- **Kustomisasi** - Mudah diubah warna dan ukurannya
- **Performa** - Lebih cepat dimuat dibandingkan gambar raster

Ilustrasi dapat ditemukan di folder `src/app/components/illustrations/`.

## Kredensial Admin

Untuk mengakses dashboard admin, gunakan kredensial berikut:

- Username: admin
- Password: admin123

## Catatan

- Ini adalah proyek contoh dan tidak terhubung ke backend yang sebenarnya
- Untuk produksi, tambahkan validasi dan autentikasi yang lebih kuat
