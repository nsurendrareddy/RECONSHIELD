import BlogPostClient from '@/components/BlogPostClient';
import { ShieldAlert, ArrowLeft, WifiOff } from 'lucide-react';
import Link from 'next/link';

// Helper to get absolute API URL for server-side fetching
const getAbsoluteApiUrl = () => {
  // Use the env var set in Vercel/Local
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  return `${baseUrl.replace(/\/$/, '')}/api`;
};

async function getPost(slug) {
  const API_BASE = getAbsoluteApiUrl();
  const url = `${API_BASE}/blog/${encodeURIComponent(slug)}`;
  
  try {
    const res = await fetch(url, {
      next: { revalidate: 10 }, // Short cache for responsiveness
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!res.ok) {
      return { _error: true, status: res.status, url };
    }
    
    const data = await res.json();
    return data;
  } catch (err) {
    return { _error: true, message: err.message, url };
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post || post._error) return { title: 'Intelligence Briefing Missing | ReconShield' };

  const description = post.meta_description || post.content.substring(0, 160).replace(/[#*]/g, '').trim();
  
  return {
    title: `${post.title} | ReconShield Intelligence`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      url: `https://reconshield.vercel.app/blog/${post.slug}`,
      siteName: 'ReconShield',
      images: [{ url: post.image_url || '/og-image.png' }],
      type: 'article',
    }
  };
}

export default async function Page({ params }) {
  const post = await getPost(params.slug);

  if (!post || post._error) {
    const isConnectionError = post?._error && !post?.status;
    
    return (
      <div className="animate-fade-in max-w-4xl mx-auto text-center py-20 px-4">
        {isConnectionError ? (
          <WifiOff className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        ) : (
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
        )}
        
        <h1 className="text-3xl font-display font-bold text-white tracking-wider uppercase">
          {isConnectionError ? 'Connection Interrupted' : 'Intelligence Briefing Missing'}
        </h1>
        
        <p className="text-gray-500 font-mono mt-2 mb-4">
          {isConnectionError 
            ? 'Unable to reach the intelligence database. Please verify your connection or try again later.'
            : 'The requested intelligence briefing does not exist or has been classified.'}
        </p>

        {post?._error && (
          <div className="mb-8 p-3 bg-white/5 rounded-lg border border-white/10 inline-block">
            <code className="text-[10px] text-gray-500 font-mono">
              Status: {post.status || 'Connection Failed'} | Target: {post.url}
            </code>
          </div>
        )}
        
        <div className="block">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-800 text-sm font-mono text-matrix-400 hover:bg-surface-700 transition-all border border-matrix-400/20">
            <ArrowLeft className="w-4 h-4" /> Return to Archives
          </Link>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.created_at,
    "description": post.meta_description || post.content.substring(0, 160)
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
