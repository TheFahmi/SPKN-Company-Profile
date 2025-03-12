import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PT SPKN - Sarana Pancakarya Nusa | Percetakan & Penerbitan Berkualitas',
  description: 'Perusahaan percetakan dan penerbitan terpercaya sejak 1966, menyediakan solusi cetak berkualitas tinggi untuk berbagai kebutuhan bisnis dan institusi.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  applicationName: 'PT Sarana Pancakarya Nusa',
  keywords: ['percetakan', 'penerbitan', 'security printing', 'digital printing', 'jakarta', 'indonesia', 'buku', 'majalah', 'dokumen', 'cetak berkualitas'],
  authors: [{ name: 'PT Sarana Pancakarya Nusa', url: 'https://spkn.co.id' }],
  creator: 'PT Sarana Pancakarya Nusa',
  publisher: 'PT Sarana Pancakarya Nusa',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  metadataBase: new URL('https://spkn.co.id'),
  alternates: {
    canonical: '/',
    languages: {
      'id-ID': '/',
      'en-US': '/en',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#1976d2' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'PT Sarana Pancakarya Nusa | Percetakan & Penerbitan Berkualitas',
    description: 'Perusahaan percetakan dan penerbitan yang berpengalaman sejak tahun 1966, menyediakan solusi cetak berkualitas untuk berbagai kebutuhan.',
    url: 'https://spkn.co.id',
    siteName: 'PT Sarana Pancakarya Nusa',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://spkn.co.id/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PT Sarana Pancakarya Nusa Banner',
        type: 'image/jpeg',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT Sarana Pancakarya Nusa | Percetakan & Penerbitan Berkualitas',
    description: 'Perusahaan percetakan dan penerbitan terpercaya sejak 1966, menyediakan solusi cetak berkualitas tinggi.',
    images: ['https://spkn.co.id/images/og-image.jpg'],
    creator: '@spkn_id',
    site: '@spkn_id',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
    other: {
      me: ['info@spkn.co.id'],
    },
  },
  category: 'business',
  classification: 'Percetakan dan Penerbitan',
  other: {
    'msapplication-TileColor': '#1976d2',
    'theme-color': '#ffffff',
  }
};