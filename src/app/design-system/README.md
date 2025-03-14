# Sistem Desain PT Sarana Pancakarya Nusa

Sistem desain ini dirancang untuk memastikan konsistensi visual dan pengalaman pengguna di seluruh aplikasi PT Sarana Pancakarya Nusa. Dokumentasi ini memberikan panduan tentang penggunaan komponen, warna, tipografi, dan elemen desain lainnya.

## Komponen Utama

### Tema

Tema didefinisikan di `src/app/theme.ts` dan mencakup:

- **Palet Warna**: Warna primer, sekunder, dan warna status (success, error, warning, info).
- **Tipografi**: Hierarki font dan gaya teks.
- **Spacing**: Sistem spacing berbasis 8px.
- **Border Radius**: Radius sudut untuk elemen UI.
- **Shadows**: Bayangan untuk memberikan kedalaman pada elemen.
- **Transisi**: Durasi dan timing function untuk animasi.

### Mode Gelap (Dark Mode)

Sistem desain mendukung mode gelap dengan palet warna yang disesuaikan untuk pengalaman pengguna yang optimal dalam kondisi pencahayaan rendah.

## Panduan Penggunaan

### Warna

Gunakan warna dari palet yang telah ditentukan:

```tsx
<Box sx={{ color: 'primary.main' }}>Teks dengan warna primer</Box>
<Box sx={{ bgcolor: 'secondary.light' }}>Latar belakang dengan warna sekunder light</Box>
```

### Tipografi

Gunakan varian tipografi yang telah ditentukan:

```tsx
<Typography variant="h1">Heading 1</Typography>
<Typography variant="body1">Teks paragraf</Typography>
```

### Spacing

Gunakan sistem spacing yang konsisten:

```tsx
<Box sx={{ mt: 2, p: 3 }}>
  {/* margin-top: 16px (2*8px), padding: 24px (3*8px) */}
  Konten
</Box>
```

### Komponen

Gunakan komponen Material UI yang telah disesuaikan dengan tema:

```tsx
<Button variant="contained" color="primary">Tombol Primer</Button>
<Card>
  <CardContent>
    <Typography variant="h5">Judul Kartu</Typography>
    <Typography variant="body2">Konten kartu</Typography>
  </CardContent>
</Card>
```

## Prinsip Desain

1. **Konsistensi**: Gunakan komponen dan gaya yang konsisten di seluruh aplikasi.
2. **Hierarki**: Gunakan tipografi dan spacing untuk menciptakan hierarki visual yang jelas.
3. **Aksesibilitas**: Pastikan kontras warna yang cukup dan ukuran teks yang mudah dibaca.
4. **Responsif**: Desain harus beradaptasi dengan baik di berbagai ukuran layar.

## Implementasi

Sistem desain diimplementasikan menggunakan Material UI dan dapat diakses melalui:

1. **Halaman Dokumentasi**: Kunjungi `/design-system` untuk melihat dokumentasi lengkap dengan contoh visual.
2. **File Tema**: Gunakan tema yang didefinisikan di `src/app/theme.ts` untuk memastikan konsistensi.

## Pengembangan

Jika Anda perlu memperbarui sistem desain:

1. Perbarui file `src/app/theme.ts` dengan perubahan yang diperlukan.
2. Perbarui halaman dokumentasi di `src/app/design-system/page.tsx` untuk mencerminkan perubahan.
3. Dokumentasikan perubahan di file README ini.

## Referensi

- [Material UI Documentation](https://mui.com/material-ui/getting-started/)
- [Material Design Guidelines](https://material.io/design) 