'use client';

import Image, { ImageProps } from 'next/image';
import useImageOptimization from '../hooks/useImageOptimization';

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'loading' | 'fetchPriority' | 'blurDataURL'> {
  src: string;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  placeholder?: 'blur' | 'empty';
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  width,
  height,
  quality = 75,
  format = 'auto',
  placeholder = 'empty',
  priority = false,
  alt,
  ...rest
}: OptimizedImageProps) {
  const { optimizedSrc, blurDataURL, loading, fetchPriority } = useImageOptimization({
    src,
    width: typeof width === 'number' ? width : undefined,
    height: typeof height === 'number' ? height : undefined,
    quality,
    format,
    placeholder,
    priority,
  });

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      blurDataURL={blurDataURL}
      placeholder={placeholder === 'blur' ? 'blur' : undefined}
      {...rest}
    />
  );
}