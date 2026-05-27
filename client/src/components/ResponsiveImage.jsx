import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/utils/sanity';

/**
 * ResponsiveImage
 * 
 * Replaces standard next/image with an SEO-optimized implementation
 * natively connected to Sanity Assets CDN via our local proxy.
 * Bypasses Vercel's runtime optimization to save overages.
 */
export default function ResponsiveImage({ 
  image, // Sanity Image object or Sanity CDN URL
  alt = 'Image', 
  priority = false, 
  width = 1200,
  height = 800,
  className = "" 
}) {
  if (!image) return null;

  let thumbnail, medium, large, src;

  // Handle Sanity Image object using urlFor builder
  if (typeof image === 'object' && image.asset) {
    thumbnail = urlFor(image).width(400).quality(80).format('webp').url();
    medium = urlFor(image).width(800).quality(80).format('webp').url();
    large = urlFor(image).width(1200).quality(80).format('webp').url();
    src = large;
  } 
  // Handle direct string URLs (from Sanity CDN)
  else if (typeof image === 'string' && image.includes('sanity.io')) {
    const baseUrl = image.split('?')[0];
    thumbnail = `${baseUrl}?w=400&q=80&fm=webp`;
    medium = `${baseUrl}?w=800&q=80&fm=webp`;
    large = `${baseUrl}?w=1200&q=80&fm=webp`;
    src = large;
  } 
  // Handle external/static files normally
  else if (typeof image === 'string') {
    return (
      <Image 
        src={image} 
        alt={alt} 
        fill={!width || !height}
        width={width || undefined}
        height={height || undefined}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={`object-cover ${className}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }

  // Enforce Immutable Caching by routing through our Next.js rewrite proxy
  const proxyUrl = (url) => url.replace('https://cdn.sanity.io/', '/sanity-cdn/');

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: `${width}/${height}` }}>
      {/* Native img tag leveraging Sanity CDN responsive srcSet */}
      <img
        src={proxyUrl(src)}
        srcSet={`${proxyUrl(thumbnail)} 400w, ${proxyUrl(medium)} 800w, ${proxyUrl(large)} 1200w`}
        sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
