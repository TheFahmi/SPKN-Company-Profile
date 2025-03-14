'use client';

import { useEffect, useState } from 'react';

interface ImageOptimizationOptions {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  placeholder?: 'blur' | 'empty';
  priority?: boolean;
}

export default function useImageOptimization({
  src,
  width,
  height,
  quality = 75,
  format = 'auto',
  placeholder = 'empty',
  priority = false,
}: ImageOptimizationOptions) {
  const [optimizedSrc, setOptimizedSrc] = useState<string>(src);
  const [loading, setLoading] = useState<'lazy' | 'eager'>(priority ? 'eager' : 'lazy');
  const [blurDataURL, setBlurDataURL] = useState<string | undefined>(undefined);

  useEffect(() => {
    // If it's an external URL, we can't optimize it with Next.js
    if (src.startsWith('http') && !src.includes('spkn.co.id')) {
      return;
    }

    // For Next.js Image optimization
    let optimizedUrl = src;

    // Add blur placeholder if needed
    if (placeholder === 'blur' && !blurDataURL) {
      // Simple base64 blur placeholder (very small, low quality image)
      // In a real app, you'd generate this server-side
      setBlurDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAI8V7yQCgAAAABJRU5ErkJggg==');
    }

    // Set loading strategy
    setLoading(priority ? 'eager' : 'lazy');

    // Set optimized source
    setOptimizedSrc(optimizedUrl);
  }, [src, width, height, quality, format, placeholder, priority, blurDataURL]);

  return {
    optimizedSrc,
    blurDataURL,
    loading,
    fetchPriority: priority ? 'high' : 'auto' as 'high' | 'auto',
  };
}