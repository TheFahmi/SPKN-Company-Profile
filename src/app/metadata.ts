import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PT SPKN - Sarana Pancakarya Nusa | Percetakan & Penerbitan Berkualitas',
  description: 'Perusahaan percetakan dan penerbitan terpercaya sejak 1966, menyediakan solusi cetak berkualitas tinggi untuk berbagai kebutuhan bisnis dan institusi.',
  viewport: 'width=device-width, initial-scale=1',
  applicationName: 'PT Sarana Pancakarya Nusa',
  keywords: ['percetakan', 'penerbitan', 'security printing', 'digital printing', 'jakarta', 'indonesia'],
  authors: [{ name: 'PT Sarana Pancakarya Nusa' }],
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'PT Sarana Pancakarya Nusa | Percetakan & Penerbitan Berkualitas',
    description: 'Perusahaan percetakan dan penerbitan yang berpengalaman sejak tahun 1966, menyediakan solusi cetak berkualitas untuk berbagai kebutuhan.',
    url: 'https://spkn.co.id',
    siteName: 'PT Sarana Pancakarya Nusa',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://spkn.co.id/wp-content/uploads/2023/11/banner5.jpg',
        width: 1200,
        height: 630,
        alt: 'PT Sarana Pancakarya Nusa Banner'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT Sarana Pancakarya Nusa | Percetakan & Penerbitan Berkualitas',
    description: 'Perusahaan percetakan dan penerbitan terpercaya sejak 1966, menyediakan solusi cetak berkualitas tinggi.',
    images: ['https://spkn.co.id/wp-content/uploads/2023/11/banner5.jpg'],
  },
  robots: {
    index: true,
    follow: true,
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
  },
}; 