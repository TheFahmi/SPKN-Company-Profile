## 🚀 Fitur Utama

- **Landing Page** dengan informasi layanan percetakan
- **Katalog Produk** dengan pencarian dan filter
- **Detail Produk** dengan gambar, deskripsi, dan spesifikasi
- **Panel Admin** untuk mengelola produk, pengguna, dan konten
- **Autentikasi** menggunakan NextAuth.js
- **Responsive Design** untuk tampilan optimal di semua perangkat

## ⚙️ Teknologi

- **Frontend**: Next.js, React.js, Material UI
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Autentikasi**: NextAuth.js
- **Styling**: Material UI, CSS Modules
- **State Management**: React Hooks, Context API
- **Deployment**: Vercel

## 🛠️ Instalasi

1. **Clone repositori**

```bash
git clone https://github.com/username/percetakan-profile.git
cd percetakan-profile
```

2. **Install dependensi**

```bash
npm install
# atau
yarn install
```

3. **Setup environment variables**

Buat file `.env` berdasarkan `.env.example`:

```bash
cp .env.example .env
```

Lalu edit file `.env` dengan konfigurasi yang sesuai.

## 🌐 Konfigurasi Environment Variables

Konfigurasi environment variables yang harus diatur:

```ini
# Database Configuration
MONGODB_URI=mongodb://username:password@localhost:27017/percetakan-profile
MONGODB_DB=percetakan-profile

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Admin Configuration
ADMIN_EMAILS=admin@example.com,superadmin@example.com

# Site Configuration
SITE_URL=http://localhost:3000
SITE_NAME=Percetakan Profile
NEXT_PUBLIC_APP_NAME=Percetakan Profile
```

## 🚀 Menjalankan Aplikasi

### Development

```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm run start
# atau
yarn build
yarn start
```

## 🧹 Membersihkan Cache

Jika mengalami masalah dengan cache, gunakan perintah berikut:

```bash
# Untuk Linux/Mac
npm run clean

# Untuk Windows
npm run clean:win
```

## 📁 Struktur Folder

```
percetakan-profile/
├── public/               # File statis
├── src/
│   ├── app/              # Aplikasi Next.js App Router
│   │   ├── (auth)/       # Halaman autentikasi (login/register)
│   │   ├── (error-pages)/# Halaman error kustom
│   │   ├── admin/        # Panel admin
│   │   ├── api/          # API endpoints
│   │   ├── components/   # Komponen React
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Library dan utility functions
│   │   ├── models/       # Model data
│   │   ├── produk/       # Halaman produk
│   │   └── utils/        # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── middleware.ts     # Next.js middleware
├── .env.example          # Template variabel lingkungan
├── .gitignore            # Files to ignore in git
├── next.config.js        # Konfigurasi Next.js
├── package.json          # Dependencies dan scripts
└── README.md             # Dokumentasi proyek
```

## 👥 Fitur Admin

1. **Manajemen Produk**
   - Menambah, mengedit, dan menghapus produk
   - Upload gambar produk
   - Mengatur kategori dan detail produk

2. **Manajemen Pengguna**
   - Menambah, mengedit, dan menghapus pengguna
   - Mengatur role dan hak akses
   - Verifikasi pengguna

3. **Import Produk**
   - Import produk dari file XML WordPress
   - Ekstraksi gambar dan metadata

## 🔒 Keamanan

- Semua data sensitif disimpan di environment variables
- Password dienkripsi menggunakan bcrypt
- Autentikasi JWT menggunakan NextAuth.js
- CSRF protection
- Rate limiting untuk API endpoints

## 📚 Dokumentasi API

API endpoints tersedia di `/api/`:

- `GET /api/products` - Mendapatkan daftar produk
- `GET /api/products/[id]` - Mendapatkan detail produk
- `POST /api/admin/products` - Menambah produk baru (admin)
- `PUT /api/admin/products/[id]` - Memperbarui produk (admin)
- `DELETE /api/admin/products/[id]` - Menghapus produk (admin)
- `POST /api/auth/register` - Registrasi pengguna baru
- `GET /api/admin/users` - Mendapatkan daftar pengguna (admin)

## 🤝 Kontribusi

Kontribusi selalu diterima. Untuk berkontribusi:

1. Fork repositori
2. Buat branch untuk fitur baru (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📜 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## 📧 Kontak

Untuk pertanyaan, hubungi tim kami di [email@example.com](mailto:me@mfah.me).

---

Dibuat dengan ❤️ untuk Percetakan Profile.
