import BlogPostClient from '@/components/BlogPostClient';
import { ShieldAlert, ArrowLeft, WifiOff } from 'lucide-react';
import Link from 'next/link';
import { client, blogDetailQuery, urlFor } from '@/utils/sanity';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getPost(slug) {
  if (!slug || slug === 'undefined') return null;
  
  try {
    const sanityPost = await client.fetch(blogDetailQuery, { slug });
    return sanityPost;
  } catch (err) {
    console.error('>>> SANITY FETCH ERROR:', err);
    return { _error: true, message: err.message };
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || post._error) return { title: 'Intelligence Briefing Missing | ReconShield' };

  const description = post.excerpt || 'ReconShield Intelligence Briefing';
  const imageUrl = post.mainImageUrl || '/og-image.png';
  
  return {
    title: `${post.title} | ReconShield Intelligence`,
    description: description,
    alternates: {
      canonical: `https://reconshield.vercel.app/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: description,
      url: `https://reconshield.vercel.app/blog/${slug}`,
      siteName: 'ReconShield',
      images: [{ url: imageUrl }],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'Surendra Reddy'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [imageUrl],
    }
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || post._error) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto text-center py-20 px-4">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-display font-bold text-white tracking-wider uppercase">
          Intelligence Briefing Missing
        </h1>
        <p className="text-gray-500 font-mono mt-2 mb-8">
          The requested intelligence briefing does not exist or has been classified.
        </p>
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
    "@type": post.categories?.[0]?.title === "Cyber News" ? "NewsArticle" : "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.mainImageUrl || (post.mainImage ? urlFor(post.mainImage).url() : "https://reconshield.vercel.app/og-image.png"),
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Surendra Reddy"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ReconShield",
      "url": "https://reconshield.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reconshield.vercel.app/og-image.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://reconshield.vercel.app/blog/${slug}`
    }
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
