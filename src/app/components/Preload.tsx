'use client';

import React from 'react';
import Head from 'next/head';

interface PreloadProps {
  resources?: string[];
}

/**
 * Preload component for critical resources
 * This helps improve LCP by prioritizing the loading of important assets
 */
export default function Preload({ resources = [] }: PreloadProps) {
  // Critical resources to preload - prioritized for LCP improvement
  const criticalResources = [
    // Logo - critical for branding
    '/images/logo.png',
    // Hero image - likely the LCP element
    '/images/hero-image.webp',
    // Critical fonts
    '/fonts/inter-var-latin.woff2',
    // Critical CSS
    '/styles/critical.css',
  ];

  // Important but non-critical resources
  const importantResources = [
    // Background patterns
    '/images/bg-pattern.png',
    // Icons
    '/images/icons/icon-192.png',
    '/images/icons/icon-512.png',
  ];

  // External domains for DNS prefetch and preconnect
  const domains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'spkn.co.id',
    'cdn.jsdelivr.net',
  ];

  // Helper function to determine resource type
  const getResourceAttributes = (resource: string) => {
    if (resource.endsWith('.png')) {
      return { as: 'image', type: 'image/png' };
    } else if (resource.endsWith('.jpg') || resource.endsWith('.jpeg')) {
      return { as: 'image', type: 'image/jpeg' };
    } else if (resource.endsWith('.webp')) {
      return { as: 'image', type: 'image/webp' };
    } else if (resource.endsWith('.avif')) {
      return { as: 'image', type: 'image/avif' };
    } else if (resource.endsWith('.svg')) {
      return { as: 'image', type: 'image/svg+xml' };
    } else if (resource.endsWith('.css') || resource.includes('css?')) {
      return { as: 'style' };
    } else if (resource.endsWith('.js')) {
      return { as: 'script' };
    } else if (resource.endsWith('.woff2')) {
      return { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' };
    } else if (resource.endsWith('.woff')) {
      return { as: 'font', type: 'font/woff', crossOrigin: 'anonymous' };
    }
    return { as: 'fetch' };
  };

  return (
    <Head>
      {/* Preload critical resources with high priority */}
      {criticalResources.map((resource, index) => {
        const { as, type, crossOrigin } = getResourceAttributes(resource);
        return (
          <link
            key={`critical-${index}`}
            rel="preload"
            href={resource}
            as={as}
            type={type}
            crossOrigin={crossOrigin}
            fetchPriority="high"
          />
        );
      })}

      {/* Preload important resources with normal priority */}
      {importantResources.map((resource, index) => {
        const { as, type, crossOrigin } = getResourceAttributes(resource);
        return (
          <link
            key={`important-${index}`}
            rel="preload"
            href={resource}
            as={as}
            type={type}
            crossOrigin={crossOrigin}
          />
        );
      })}

      {/* Preload user-provided resources */}
      {resources.map((resource, index) => {
        const { as, type, crossOrigin } = getResourceAttributes(resource);
        return (
          <link
            key={`user-${index}`}
            rel="preload"
            href={resource}
            as={as}
            type={type}
            crossOrigin={crossOrigin}
          />
        );
      })}

      {/* DNS prefetch and preconnect for external domains */}
      {domains.map((domain, index) => (
        <React.Fragment key={`domain-${index}`}>
          <link rel="dns-prefetch" href={`//${domain}`} />
          <link 
            rel="preconnect" 
            href={`//${domain}`}
            crossOrigin={domain.includes('fonts.') ? 'anonymous' : undefined}
          />
        </React.Fragment>
      ))}
    </Head>
  );
}