# Komponen-komponen Kustom untuk Sistem Desain

## Ringkasan

Sebagai bagian dari sistem desain PT Sarana Pancakarya Nusa, kami telah mengembangkan beberapa komponen kustom yang dirancang khusus untuk kebutuhan aplikasi percetakan. Komponen-komponen ini telah didokumentasikan dalam Storybook dan siap digunakan dalam pengembangan aplikasi.

## Komponen yang Dikembangkan

### 1. ProductCard

ProductCard adalah komponen untuk menampilkan informasi produk percetakan dalam format kartu yang menarik. Komponen ini memiliki fitur:

- Tampilan gambar produk dengan dukungan badge "Baru" dan "Best Seller"
- Informasi produk termasuk judul, deskripsi, dan harga
- Dukungan untuk harga diskon
- Rating produk dengan tampilan bintang
- Tombol aksi untuk melihat detail dan menambahkan ke keranjang

Komponen ini ideal untuk halaman katalog produk, halaman kategori, atau bagian produk unggulan di halaman beranda.

### 2. ServiceCard

ServiceCard adalah komponen untuk menampilkan layanan percetakan dalam format kartu yang informatif. Komponen ini memiliki fitur:

- Tampilan gambar layanan dengan aksen warna primer
- Badge "Populer" untuk layanan unggulan
- Informasi layanan termasuk judul, deskripsi, harga, dan estimasi waktu
- Daftar fitur dengan ikon centang
- Tombol aksi untuk memesan dan mempelajari lebih lanjut

Komponen ini cocok untuk halaman layanan, halaman beranda, atau bagian layanan unggulan.

### 3. TestimonialCard

TestimonialCard adalah komponen untuk menampilkan testimoni pelanggan dalam format kartu yang menarik. Komponen ini memiliki fitur:

- Tampilan testimoni dengan ikon kutipan
- Avatar pelanggan dengan dukungan inisial otomatis jika tidak ada gambar
- Informasi pelanggan termasuk nama, jabatan, dan perusahaan
- Rating dengan tampilan bintang
- Informasi produk/layanan yang diulas
- Tanggal testimoni

Komponen ini ideal untuk halaman testimoni, bagian testimoni di halaman beranda, atau bagian testimoni di halaman produk/layanan.

### 4. PricingCard

PricingCard adalah komponen untuk menampilkan paket harga dalam format kartu yang informatif. Komponen ini memiliki fitur:

- Tampilan paket harga dengan dukungan untuk paket populer dan disorot
- Informasi paket termasuk judul, deskripsi, harga, dan periode
- Daftar fitur dengan ikon centang untuk fitur yang tersedia dan ikon silang untuk fitur yang tidak tersedia
- Tombol aksi untuk memilih paket
- Dukungan untuk styling khusus pada paket yang disorot

Komponen ini cocok untuk halaman harga, halaman layanan, atau bagian paket di halaman beranda.

## Integrasi dengan Material UI

Semua komponen kustom ini dibangun di atas Material UI dan menggunakan tema yang telah didefinisikan dalam sistem desain. Komponen-komponen ini:

1. Menggunakan palet warna yang konsisten
2. Mengikuti tipografi yang telah didefinisikan
3. Menggunakan spacing dan shadows sesuai dengan sistem desain
4. Responsif dan dapat beradaptasi dengan berbagai ukuran layar
5. Mendukung tema terang dan gelap

## Penggunaan dalam Aplikasi

Untuk menggunakan komponen-komponen ini dalam aplikasi, cukup impor komponen yang diinginkan dari direktori komponen:

```jsx
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import PricingCard from '../components/PricingCard';
```

Kemudian gunakan komponen tersebut dengan props yang sesuai. Contoh penggunaan untuk setiap komponen dapat dilihat dalam dokumentasi Storybook.

## Dokumentasi Lengkap

Dokumentasi lengkap untuk setiap komponen, termasuk props yang tersedia, variasi, dan contoh penggunaan, dapat dilihat dalam Storybook. Untuk menjalankan Storybook, gunakan perintah:

```bash
npm run storybook
```

Storybook akan berjalan di `http://localhost:6006` secara default.

## Pengembangan Selanjutnya

Komponen-komponen ini akan terus dikembangkan sesuai dengan kebutuhan aplikasi. Beberapa pengembangan yang direncanakan:

1. Penambahan variasi baru untuk setiap komponen
2. Optimasi performa dan aksesibilitas
3. Penambahan animasi dan transisi yang lebih canggih
4. Integrasi dengan sistem analitik
5. Penambahan komponen-komponen baru sesuai kebutuhan

## Kontribusi

Jika Anda ingin berkontribusi pada pengembangan komponen-komponen ini, silakan ikuti panduan kontribusi di repositori GitHub. Pastikan untuk mengikuti standar kode dan praktik terbaik yang telah ditetapkan. 