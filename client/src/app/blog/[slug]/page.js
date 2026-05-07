import React from 'react';
import BlogPostClient from '@/components/BlogPostClient';
import { API_BASE } from '@/utils/api';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

async function getPost(slug) {
  try {
    const res = await fetch(`${API_BASE}/blog/${encodeURIComponent(slug)}`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`Blog fetch failed for slug: ${slug}, status: ${res.status}`);
      return null;
    }
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'Article Not Found | ReconShield',
    };
  }

  return {
    title: `${post.title} | ReconShield Blog`,
    description: post.meta_description || post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.meta_description,
      images: [post.image_url],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto text-center py-20">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-display font-bold text-white tracking-wider uppercase">Article Not Found</h1>
        <p className="text-gray-500 font-mono mt-2 mb-8">The requested intelligence briefing does not exist or has been classified.</p>
        <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-800 text-sm font-mono text-matrix-400 hover:bg-surface-700 transition-all border border-matrix-400/20">
          <ArrowLeft className="w-4 h-4" /> Return to Archives
        </Link>
      </div>
    );
  }

  return <BlogPostClient post={post} />;
}
