# Dokumentasi Fitur Antivirus

## Pendahuluan

Fitur Antivirus adalah komponen keamanan yang terintegrasi dalam aplikasi untuk memindai file yang diunggah terhadap virus, malware, dan ancaman keamanan lainnya. Fitur ini menggunakan API VirusTotal untuk pemindaian file dan memberikan hasil pemindaian secara real-time.

## Konfigurasi

Untuk menggunakan fitur Antivirus, Anda perlu mengatur konfigurasi berikut di file `.env.local`:

```
ANTIVIRUS_API_KEY=your_virustotal_api_key_here
ANTIVIRUS_API_URL=https://www.virustotal.com/api/v3/files
```

Anda perlu mendapatkan API key dari [VirusTotal](https://www.virustotal.com/gui/join-us) dengan mendaftar akun.

## Instalasi Dependensi

Pastikan Anda telah menginstal dependensi yang diperlukan:

```bash
npm install formidable axios @types/formidable
```

## Cara Penggunaan

### 1. Halaman Pemindaian Antivirus

Akses halaman pemindaian antivirus melalui menu navigasi atau langsung di URL `/antivirus`. Halaman ini menyediakan antarmuka pengguna untuk mengunggah dan memindai file.

### 2. Mengunggah File

- Klik pada area drop atau tombol untuk memilih file
- Pilih satu atau beberapa file untuk diunggah
- File akan ditampilkan dalam daftar dengan opsi untuk menghapusnya

### 3. Memindai File

- Klik tombol "Pindai File" untuk memulai pemindaian
- Sistem akan mengunggah file dan memindainya menggunakan API VirusTotal
- Hasil pemindaian akan ditampilkan setelah proses selesai

### 4. Hasil Pemindaian

Hasil pemindaian akan menampilkan:
- Status keseluruhan (aman atau terinfeksi)
- Detail untuk setiap file yang dipindai
- Daftar ancaman yang terdeteksi (jika ada)

## Integrasi dengan Upload File

Fitur antivirus juga terintegrasi dengan API upload file umum di `/api/upload`. Semua file yang diunggah melalui API ini akan otomatis dipindai, dan file yang terinfeksi akan ditolak dan dihapus.

## Integrasi dengan Form Produk

Fitur antivirus telah diintegrasikan dengan form produk untuk memastikan keamanan file yang diunggah. Berikut adalah cara kerjanya:

### 1. Pemindaian Gambar Produk

Saat menambahkan atau mengedit produk, semua gambar yang diunggah akan dipindai terlebih dahulu menggunakan fitur antivirus sebelum disimpan ke server. Proses ini meliputi:

- Pengguna memilih gambar produk dari perangkat mereka
- Gambar dipindai menggunakan API VirusTotal
- Jika gambar aman, pengguna dapat melanjutkan untuk mengunggahnya
- Jika gambar terdeteksi mengandung ancaman, gambar akan ditolak dan tidak dapat diunggah

### 2. Alur Kerja Penambahan Produk

1. Pilih gambar produk yang ingin diunggah
2. Klik tombol "Pindai File" untuk memeriksa keamanan gambar
3. Jika hasil pemindaian menunjukkan gambar aman, klik tombol "Unggah File"
4. Setelah gambar berhasil diunggah, URL gambar akan otomatis disimpan dalam form
5. Isi data produk lainnya dan klik "Simpan Produk"

### 3. Keuntungan Integrasi

- **Keamanan Tinggi**: Semua file yang diunggah dipindai terlebih dahulu, mencegah penyebaran malware
- **Transparansi**: Pengguna dapat melihat hasil pemindaian sebelum mengunggah file
- **Pencegahan Dini**: File berbahaya ditolak sebelum memasuki sistem
- **Pengalaman Pengguna yang Baik**: Proses pemindaian terintegrasi dengan mulus dalam alur kerja penambahan produk

### 4. Penggunaan dalam Kode

Form produk menggunakan komponen `ProductForm` yang telah diperbarui dengan fitur pemindaian antivirus. Komponen ini menangani:

- Pemilihan file gambar
- Pemindaian file menggunakan API antivirus
- Pengunggahan file yang aman
- Penyimpanan URL gambar yang diunggah ke dalam data produk

Untuk menggunakan fitur ini, tidak diperlukan konfigurasi tambahan selain konfigurasi antivirus yang sudah ada.

## Implementasi Teknis

### Komponen Utama

1. **Utilitas Antivirus** (`src/lib/antivirus.ts`)
   - Fungsi untuk memindai file menggunakan API VirusTotal
   - Fungsi alternatif menggunakan ClamAV (jika diinstal di server)
   - Utilitas untuk memindai beberapa file sekaligus

2. **API Endpoint Pemindaian** (`src/pages/api/upload/scan.ts`)
   - Endpoint untuk mengunggah dan memindai file
   - Mengembalikan hasil pemindaian dalam format JSON

3. **Komponen UI Pemindai** (`src/app/components/FileUploadScanner.tsx`)
   - Antarmuka pengguna untuk mengunggah dan memindai file
   - Menampilkan hasil pemindaian dengan visual yang informatif

4. **Halaman Antivirus** (`src/app/antivirus/page.tsx`)
   - Halaman lengkap dengan informasi tentang pemindaian antivirus
   - Mengintegrasikan komponen pemindai file

### Alur Kerja Pemindaian

1. File diunggah ke server melalui formidable
2. File dikirim ke API VirusTotal untuk analisis
3. Sistem menunggu hasil analisis dengan polling
4. Hasil pemindaian diproses dan dikembalikan ke pengguna
5. File yang terinfeksi ditandai dan dapat dihapus secara otomatis

## Keamanan dan Privasi

- File yang diunggah untuk pemindaian disimpan sementara dan dapat dihapus setelah pemindaian
- Hasil pemindaian disimpan hanya selama sesi pengguna
- Tidak ada data sensitif yang dikirim ke layanan pihak ketiga selain file yang dipindai

## Batasan

- Ukuran file maksimum: 10MB
- Waktu pemindaian dapat bervariasi tergantung ukuran file dan beban server
- Pemindaian menggunakan API VirusTotal memiliki batas rate sesuai dengan jenis akun Anda

## Pemecahan Masalah

### File Tidak Dapat Diunggah

- Pastikan ukuran file tidak melebihi batas maksimum (10MB)
- Periksa koneksi internet Anda
- Pastikan format file didukung

### Pemindaian Gagal

- Periksa konfigurasi API key VirusTotal
- Pastikan server memiliki akses internet untuk menghubungi API VirusTotal
- Coba lagi nanti jika ada masalah dengan layanan VirusTotal

## Pengembangan Lebih Lanjut

Beberapa ide untuk pengembangan fitur antivirus di masa depan:

1. Integrasi dengan lebih banyak mesin antivirus
2. Pemindaian file yang sudah ada di server
3. Penjadwalan pemindaian otomatis
4. Laporan pemindaian yang lebih detail
5. Karantina file yang mencurigakan alih-alih menghapusnya langsung 