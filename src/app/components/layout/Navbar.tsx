// Tambahkan import untuk ikon Security
import SecurityIcon from '@mui/icons-material/Security';

// Tambahkan menu Antivirus ke dalam array pages
const pages = [
  { title: "Beranda", path: "/" },
  { title: "Tentang", path: "/tentang" },
  { title: "Produk", path: "/produk" },
  { title: "Layanan", path: "/layanan" },
  { title: "Portofolio", path: "/portofolio" },
  { title: "Antivirus", path: "/antivirus", icon: <SecurityIcon /> },
  { title: "Kontak", path: "/kontak" },
]; 