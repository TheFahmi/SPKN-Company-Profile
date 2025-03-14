import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sistem Desain | PT Sarana Pancakarya Nusa',
  description: 'Dokumentasi sistem desain untuk PT Sarana Pancakarya Nusa, berisi panduan komponen UI, palet warna, tipografi, dan elemen desain lainnya.',
  keywords: 'sistem desain, design system, UI components, palet warna, tipografi, percetakan, PT Sarana Pancakarya Nusa',
};

export default function DesignSystemLayout({
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