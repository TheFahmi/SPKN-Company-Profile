import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak | PT Sarana Pancakarya Nusa',
  description: 'Hubungi PT Sarana Pancakarya Nusa untuk kebutuhan percetakan dan penerbitan Anda. Kami siap memberikan solusi terbaik untuk bisnis Anda.',
  keywords: 'kontak percetakan, alamat percetakan, telepon percetakan, email percetakan, lokasi percetakan, percetakan jakarta, penerbitan jakarta',
};

export default function KontakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
} 