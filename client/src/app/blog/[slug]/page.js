import BlogPostClient from '@/components/BlogPostClient';
import { API_BASE } from '@/utils/api';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Fetch post data on the server
async function getPost(slug) {
  try {
    const res = await fetch(`${API_BASE}/blog/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error('Error fetching post:', err);
    return null;
  }
}

// Dynamic Metadata Generation for SEO
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Article Not Found | ReconShield' };

  const description = post.meta_description || post.content.substring(0, 160).replace(/[#*]/g, '').trim();
  
  return {
    title: `${post.title} | ReconShield Intelligence`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      url: `https://reconshield.vercel.app/blog/${post.slug}`,
      siteName: 'ReconShield',
      images: [
        {
          url: post.image_url || '/og-image.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.created_at,
      authors: ['ReconShield Team'],
      tags: [post.category, 'Cybersecurity', 'OSINT', 'Threat Intelligence'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [post.image_url || '/og-image.png'],
    },
    alternates: {
      canonical: `https://reconshield.vercel.app/blog/${post.slug}`,
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

  // JSON-LD Structured Data for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://reconshield.vercel.app/blog/${post.slug}`
    },
    "headline": post.title,
    "image": post.image_url || 'https://reconshield.vercel.app/og-image.png',
    "datePublished": post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "author": {
      "@type": "Organization",
      "name": "ReconShield Team",
      "url": "https://reconshield.vercel.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ReconShield",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reconshield.vercel.app/icon.png"
      }
    },
    "description": post.meta_description || post.content.substring(0, 160).trim()
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
