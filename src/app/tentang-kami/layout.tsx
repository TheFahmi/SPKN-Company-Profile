import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Kami | PT Sarana Pancakarya Nusa',
  description: 'Mengenal lebih dekat PT Sarana Pancakarya Nusa, perusahaan percetakan dan penerbitan terpercaya sejak 1966 dengan pengalaman lebih dari 55 tahun dalam industri.',
  keywords: 'tentang percetakan, sejarah percetakan, visi misi percetakan, tim percetakan, percetakan jakarta, penerbitan jakarta',
};

export default function TentangKamiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 