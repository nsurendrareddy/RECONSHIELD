import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { urlFor } from '@/utils/sanity';
import { getCategoryFallbackImage } from '@/utils/metadata';

export default function BlogCard({ post, defaultCategory }) {
  const primaryCategory = post.categories?.[0]?.title || defaultCategory || 'Intelligence';
  
  // Extract or build the image URL
  let imageUrl = '';
  const imgObj = post.featuredImage || post.mainImage || post.coverImage;
  if (imgObj) {
    if (typeof imgObj === 'object' && imgObj.asset) {
      try {
        imageUrl = urlFor(imgObj).width(360).height(202).fit('crop').auto('format').url();
      } catch (e) {
        console.error('Error building Sanity image URL:', e);
      }
    } else if (typeof imgObj === 'string') {
      imageUrl = imgObj;
    }
  }
  if (!imageUrl) {
    const urlStr = post.featuredImageUrl || post.imageUrl || post.coverImageUrl;
    if (typeof urlStr === 'string' && urlStr) {
      imageUrl = urlStr;
    }
  }
  
  // Fallback to category default image
  if (!imageUrl) {
    imageUrl = getCategoryFallbackImage(primaryCategory);
  }

  // Get author details
  const authorName = post.author?.name || 'Surendra Reddy';
  const initials = authorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'SR';

  // Calculate read time
  const readTime = post.readTime || (post.estimatedWordCount ? Math.max(1, Math.ceil(post.estimatedWordCount / 5 / 200)) : 6);

  // Format date
  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Jun 2026';

  const postSlug = post.slug?.current || post.slug || '';

  return (
    <Link
      href={`/blog/${postSlug}`}
      className="group flex flex-col justify-between bg-surface-900 border border-white/5 hover:border-matrix-400/30 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-0.5"
    >
      <div>
        {/* Cover / Featured Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-surface-950 border-b border-white/5">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title || 'ReconShield Research'}
              width={360}
              height={202}
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover w-full h-auto group-hover:scale-[1.02] transition-transform duration-700"
              loading="lazy"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-surface-950 to-surface-900 flex items-center justify-center">
              <Clock className="w-10 h-10 text-matrix-400/10" />
            </div>
          )}
          
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 bg-matrix-400 text-surface-950 text-[9px] font-mono font-bold uppercase tracking-wider rounded">
              {primaryCategory}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-matrix-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-6">
            {post.excerpt || 'Read the full intelligence report on this topic.'}
          </p>
        </div>
      </div>

      {/* Metadata Row */}
      <div className="px-6 pb-6 mt-auto">
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-surface-950 flex items-center justify-center font-mono text-[9px] text-[#00ff88] border border-white/5">
              {initials}
            </div>
            <span className="text-[10px] font-mono text-gray-300 font-bold">
              {authorName}
            </span>
          </div>

          {/* Read Time & Date */}
          <div className="flex items-center gap-3 text-[9px] font-mono text-gray-400">
            <span className="flex items-center gap-0.5">
              <Clock className="w-3 h-3" /> {readTime}M
            </span>
            <span>{publishDate.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
