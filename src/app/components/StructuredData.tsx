'use client';

import { useEffect, useRef } from 'react';

// Organization structured data interface
interface OrganizationStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: {
    '@type': string;
    url: string;
    width?: number;
    height?: number;
  };
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
    email?: string;
  };
  sameAs: string[];
  foundingDate: string;
}

// Product structured data interface
interface ProductStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  image: string | string[];
  description: string;
  sku?: string;
  mpn?: string;
  brand?: {
    '@type': string;
    name: string;
  };
  offers?: {
    '@type': string;
    url: string;
    priceCurrency: string;
    price: number;
    priceValidUntil?: string;
    availability?: string;
    itemCondition?: string;
  };
}

// Article structured data interface
interface ArticleStructuredData {
  '@context': string;
  '@type': string;
  headline: string;
  image: string | string[];
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': string;
    name: string;
    url?: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo?: {
      '@type': string;
      url: string;
    };
  };
  description: string;
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
  };
}

// BreadcrumbList structured data interface
interface BreadcrumbListStructuredData {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item?: string;
  }>;
}

// FAQ structured data interface
interface FAQStructuredData {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

// LocalBusiness structured data interface
interface LocalBusinessStructuredData extends OrganizationStructuredData {
  '@type': 'LocalBusiness' | string;
  priceRange?: string;
  geo?: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: Array<{
    '@type': string;
    dayOfWeek: string | string[];
    opens: string;
    closes: string;
  }>;
}

// WebSite structured data interface
interface WebSiteStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  potentialAction?: {
    '@type': string;
    target: string | { '@type': string; urlTemplate: string };
    'query-input'?: string;
  };
}

// Props interface
interface StructuredDataProps {
  type: 'organization' | 'product' | 'article' | 'breadcrumb' | 'faq' | 'localbusiness' | 'website';
  data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Default organization data
    const organizationData: OrganizationStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'PT Sarana Pancakarya Nusa',
      url: 'https://spkn.co.id',
      logo: {
        '@type': 'ImageObject',
        url: 'https://spkn.co.id/images/logo.png',
        width: 300,
        height: 274
      },
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
        email: 'info@spkn.co.id'
      },
      sameAs: [
        'https://www.facebook.com/spkn',
        'https://www.instagram.com/spkn',
        'https://www.linkedin.com/company/spkn',
      ],
      foundingDate: '1966',
    };

    // Default website data
    const websiteData: WebSiteStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'PT Sarana Pancakarya Nusa',
      url: 'https://spkn.co.id',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://spkn.co.id/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
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
      case 'breadcrumb':
        structuredData = data;
        break;
      case 'faq':
        structuredData = data;
        break;
      case 'localbusiness':
        structuredData = data || { ...organizationData, '@type': 'LocalBusiness' };
        break;
      case 'website':
        structuredData = data || websiteData;
        break;
      default:
        structuredData = organizationData;
    }

    // Remove existing script if it exists
    if (scriptRef.current) {
      document.head.removeChild(scriptRef.current);
      scriptRef.current = null;
    }

    // Add the structured data to the page
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
      scriptRef.current = script;
    }

    // Clean up
    return () => {
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [type, data]);

  // This component doesn't render anything visible
  return null;
}