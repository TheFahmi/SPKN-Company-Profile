# API Documentation PT Sarana Pancakarya Nusa

Dokumentasi API untuk sistem PT Sarana Pancakarya Nusa.

## Akses Dokumentasi

Dokumentasi API dapat diakses melalui:

- **Swagger UI**: `/api/docs`
- **JSON Format**: `/api/docs/swagger.json`

## Autentikasi

API menggunakan autentikasi JWT (JSON Web Token). Untuk mengakses endpoint yang memerlukan autentikasi, Anda perlu:

1. Login melalui endpoint `/api/auth/login`
2. Dapatkan token JWT
3. Sertakan token di header Authorization: `Bearer <token>`

## Endpoint Utama

### Produk

- `GET /api/products` - Mendapatkan daftar produk
- `GET /api/products/{id}` - Mendapatkan detail produk
- `POST /api/admin/products` - Menambahkan produk baru (admin)
- `PUT /api/admin/products/{id}` - Memperbarui produk (admin)
- `DELETE /api/admin/products/{id}` - Menghapus produk (admin)

### Autentikasi

- `POST /api/auth/login` - Login pengguna
- `POST /api/auth/register` - Registrasi pengguna baru

### Pengguna

- `GET /api/users/me` - Mendapatkan profil pengguna
- `PUT /api/users/me` - Memperbarui profil pengguna
- `GET /api/admin/users` - Mendapatkan daftar pengguna (admin)

### Kontak

- `POST /api/contact` - Mengirim pesan kontak

## Pagination

Endpoint yang mengembalikan daftar item mendukung pagination dengan parameter:

- `page` - Nomor halaman (default: 1)
- `limit` - Jumlah item per halaman (default: 10)

## Format Response

Semua response dalam format JSON dengan struktur:

```json
{
  "data": { ... },  // Data utama
  "pagination": {   // Informasi pagination (jika ada)
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  },
  "message": "..."  // Pesan sukses/error
}
```

## Error Handling

Error response memiliki format:

```json
{
  "message": "Pesan error",
  "status": 400,        // HTTP status code
  "error": "BadRequest" // Tipe error
}
```

## Pengembangan

Dokumentasi API dibuat menggunakan OpenAPI 3.0 (Swagger). File definisi dapat ditemukan di `src/app/api/docs/swagger.json`. 