'use client';
import React, { useState, useEffect } from 'react';
import BlogPostClient from '@/components/BlogPostClient';
import { API_BASE } from '@/utils/api';
import { ShieldAlert, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const slug = params.slug;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    
    console.log(`>>> CLIENT FETCH: slug='${slug}', base='${API_BASE}'`);
    
    fetch(`${API_BASE}/blog/${encodeURIComponent(slug)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Article not found (Status: ${res.status})`);
        }
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-matrix-400 animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto text-center py-20">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-display font-bold text-white tracking-wider uppercase">Article Not Found</h1>
        <p className="text-gray-500 font-mono mt-2 mb-8">{error || 'The requested intelligence briefing does not exist or has been classified.'}</p>
        <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-800 text-sm font-mono text-matrix-400 hover:bg-surface-700 transition-all border border-matrix-400/20">
          <ArrowLeft className="w-4 h-4" /> Return to Archives
        </Link>
      </div>
    );
  }

  return <BlogPostClient post={post} />;
}
