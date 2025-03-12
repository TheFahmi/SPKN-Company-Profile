'use client';

import { useEffect } from 'react';

interface OrganizationStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': string;
    telephone: string;
    contactType: string;
  };
  sameAs: string[];
  foundingDate: string;
}

interface StructuredDataProps {
  type: 'organization' | 'product' | 'article';
  data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    // Default organization data
    const organizationData: OrganizationStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'PT Sarana Pancakarya Nusa',
      url: 'https://spkn.co.id',
      logo: 'https://spkn.co.id/wp-content/uploads/elementor/thumbs/LOGO-SPKN-NEW-300x274-removebg-preview-1-qfqh90c9we3vc1w52kgko3f13r707nf8egy7ksj0fc.png',
      description: 'Perusahaan percetakan dan penerbitan yang berpengalaman sejak tahun 1966, menyediakan solusi cetak berkualitas untuk berbagai kebutuhan.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jl. Raya Jakarta',
        addressLocality: 'Jakarta',
        addressRegion: 'DKI Jakarta',
        postalCode: '10000',
        addressCountry: 'ID',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62-21-1234567',
        contactType: 'customer service',
      },
      sameAs: [
        'https://www.facebook.com/spkn',
        'https://www.instagram.com/spkn',
      ],
      foundingDate: '1966',
    };

    // Determine which structured data to use
    let structuredData;
    
    switch (type) {
      case 'organization':
        structuredData = data || organizationData;
        break;
      case 'product':
        structuredData = data;
        break;
      case 'article':
        structuredData = data;
        break;
      default:
        structuredData = organizationData;
    }

    // Add the structured data to the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Clean up
    return () => {
      document.head.removeChild(script);
    };
  }, [type, data]);

  // This component doesn't render anything visible
  return null;
}