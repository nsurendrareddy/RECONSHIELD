import BlogPostClient from '@/components/BlogPostClient';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Helper to get absolute API URL for server-side fetching
const getAbsoluteApiUrl = () => {
  // If defined in env, use it. Otherwise fallback to production API
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://reconshield-api.onrender.com';
  return `${baseUrl.replace(/\/$/, '')}/api`;
};

async function getPost(slug) {
  const API_BASE = getAbsoluteApiUrl();
  const url = `${API_BASE}/blog/${encodeURIComponent(slug)}`;
  
  console.log(`>>> SERVER FETCH: ${url}`);
  
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 } // Reduced cache for easier debugging
    });
    
    if (!res.ok) {
      console.error(`>>> SERVER FETCH FAILED: Status ${res.status} for ${url}`);
      return null;
    }
    
    return res.json();
  } catch (err) {
    console.error('>>> SERVER FETCH ERROR:', err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Intelligence Briefing Missing | ReconShield' };

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

  if (!post) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto text-center py-20 px-4">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-display font-bold text-white tracking-wider uppercase">Intelligence Briefing Missing</h1>
        <p className="text-gray-500 font-mono mt-2 mb-8">The requested intelligence briefing does not exist or has been classified.</p>
        <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-800 text-sm font-mono text-matrix-400 hover:bg-surface-700 transition-all border border-matrix-400/20">
          <ArrowLeft className="w-4 h-4" /> Return to Archives
        </Link>
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
