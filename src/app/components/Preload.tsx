'use client';

import { useEffect } from 'react';

interface PreloadProps {
  resources?: string[];
}

export default function Preload({ resources = [] }: PreloadProps) {
  useEffect(() => {
    // Critical resources to preload - prioritized for LCP improvement
    const criticalResources = [
      // Logo - critical for branding
      '/images/logo.png',
      // Hero image - likely the LCP element
      '/images/hero-image.webp',
      // Critical fonts
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
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

    // Combine all resources with user-provided ones
    const allResources = [...criticalResources, ...importantResources, ...resources];

    // Function to create and append preload links
    const createPreloadLink = (resource: string, priority: 'high' | 'low' = 'low') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      
      // Determine the as attribute based on the resource type
      if (resource.endsWith('.png') || resource.endsWith('.jpg') || 
          resource.endsWith('.jpeg') || resource.endsWith('.webp') || 
          resource.endsWith('.avif') || resource.endsWith('.svg')) {
        link.as = 'image';
        link.setAttribute('fetchpriority', priority);
        // Add image type for better browser handling
        if (resource.endsWith('.webp')) link.setAttribute('type', 'image/webp');
        if (resource.endsWith('.avif')) link.setAttribute('type', 'image/avif');
      } else if (resource.endsWith('.css') || resource.includes('css?')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.endsWith('.woff2')) {
        link.as = 'font';
        link.setAttribute('crossorigin', 'anonymous');
        link.setAttribute('type', 'font/woff2');
      } else if (resource.endsWith('.woff')) {
        link.as = 'font';
        link.setAttribute('crossorigin', 'anonymous');
        link.setAttribute('type', 'font/woff');
      }
      
      link.href = resource;
      document.head.appendChild(link);
      return link;
    };

    // Preload critical resources first with high priority
    const criticalLinks = criticalResources.map(resource => 
      createPreloadLink(resource, 'high')
    );

    // Preload important resources with normal priority
    const importantLinks = importantResources.map(resource => 
      createPreloadLink(resource)
    );

    // Preload user-provided resources
    const userLinks = resources.map(resource => 
      createPreloadLink(resource)
    );

    // DNS prefetch and preconnect for external domains
    const domains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'spkn.co.id',
      'cdn.jsdelivr.net',
    ];

    const connectionLinks: HTMLLinkElement[] = [];

    domains.forEach(domain => {
      // DNS prefetch
      const dnsPrefetch = document.createElement('link');
      dnsPrefetch.rel = 'dns-prefetch';
      dnsPrefetch.href = `//${domain}`;
      document.head.appendChild(dnsPrefetch);
      connectionLinks.push(dnsPrefetch);

      // Preconnect
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = `//${domain}`;
      
      // Add crossorigin for font domains
      if (domain.includes('fonts.')) {
        preconnect.setAttribute('crossorigin', 'anonymous');
      }
      
      document.head.appendChild(preconnect);
      connectionLinks.push(preconnect);
    });

    // Clean up
    return () => {
      // Remove all created links on unmount
      [...criticalLinks, ...importantLinks, ...userLinks, ...connectionLinks].forEach(link => {
        if (link && document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [resources]);

  // This component doesn't render anything visible
  return null;
}