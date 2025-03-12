'use client';

import { useEffect } from 'react';

interface PreloadProps {
  resources?: string[];
}

export default function Preload({ resources = [] }: PreloadProps) {
  useEffect(() => {
    // Default critical resources to preload
    const defaultResources = [
      // Logo
      'https://spkn.co.id/wp-content/uploads/elementor/thumbs/LOGO-SPKN-NEW-300x274-removebg-preview-1-qfqh90c9we3vc1w52kgko3f13r707nf8egy7ksj0fc.png',
      // Fonts
      'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
      // Background patterns
      '/images/bg-pattern.png',
    ];

    // Combine default and custom resources
    const allResources = [...defaultResources, ...resources];

    // Preload resources
    allResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      
      // Determine the as attribute based on the resource type
      if (resource.endsWith('.png') || resource.endsWith('.jpg') || resource.endsWith('.jpeg') || resource.endsWith('.webp')) {
        link.as = 'image';
      } else if (resource.endsWith('.css') || resource.includes('css?')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.endsWith('.woff2')) {
        link.as = 'font';
        link.setAttribute('crossorigin', 'anonymous');
      }
      
      link.href = resource;
      document.head.appendChild(link);
    });

    // DNS prefetch for external domains
    const domains = [
      'spkn.co.id',
      'fonts.googleapis.com',
      'fonts.gstatic.com',
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });

    // Clean up
    return () => {
      // Remove preload links on unmount if needed
      // This is optional as they don't harm if left in the DOM
    };
  }, [resources]);

  // This component doesn't render anything visible
  return null;
}