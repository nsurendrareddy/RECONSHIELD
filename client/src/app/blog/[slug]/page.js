import BlogPostClient from '@/components/BlogPostClient';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { client, blogDetailQuery, urlFor, recentPostsQuery, categoriesWithCountQuery, relatedPostsQuery } from '@/utils/sanity';
import { fallbackPosts, fallbackPostsList } from '@/utils/fallbackPosts';

export const revalidate = 60;

export async function generateStaticParams() {
  let sanitySlugs = [];
  try {
    const posts = await client.fetch(`*[_type == "post" && defined(slug.current)] { "slug": slug.current }`);
    sanitySlugs = posts.map(p => ({ slug: p.slug }));
  } catch (err) {
    console.error('>>> generateStaticParams error:', err);
  }
  
  const fallbackSlugs = Object.keys(fallbackPosts).map(slug => ({ slug }));
  
  // Combine unique slugs
  const allSlugs = [...sanitySlugs, ...fallbackSlugs];
  const uniqueSlugs = Array.from(new Set(allSlugs.map(s => s.slug))).map(slug => ({ slug }));
  
  return uniqueSlugs;
}

async function getPost(slug) {
  if (!slug || slug === 'undefined') return null;
  
  console.log(`>>> Fetching blog post details for slug: "${slug}"`);
  
  try {
    const sanityPost = await client.fetch(blogDetailQuery, { slug });
    if (sanityPost) {
      console.log(`>>> Retrieved post "${slug}" from Sanity CMS.`);
      return sanityPost;
    }
  } catch (err) {
    console.error('>>> SANITY FETCH ERROR FOR SLUG:', slug, err);
  }
  
  // Check fallback registry
  if (fallbackPosts[slug]) {
    console.log(`>>> Resolving local fallback data for slug: "${slug}"`);
    return fallbackPosts[slug];
  }
  
  console.warn(`>>> Blog post slug "${slug}" not found in Sanity or fallback registry.`);
  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || post._error) {
    return { 
      title: 'Intelligence Briefing Missing | ReconShield',
      description: 'The requested intelligence briefing does not exist or has been classified.'
    };
  }

  const description = post.excerpt || '';
  const imageUrl = post.mainImageUrl || '/og-image.png';
  const authorName = post.author?.name ?? "Surendra Reddy";
  
  return {
    title: `${post.title} | Intelligence`,
    description: description,
    alternates: {
      canonical: `https://reconshield.in/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: description,
      url: `https://reconshield.in/blog/${slug}`,
      siteName: 'ReconShield',
      images: [{ url: imageUrl }],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [authorName],
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

  // Fetch sidebar and related data
  let recentPosts = [];
  let categories = [];
  let relatedPosts = [];

  try {
    const [resRecent, resCategories, resRelated] = await Promise.all([
      client.fetch(recentPostsQuery, { slug }),
      client.fetch(categoriesWithCountQuery),
      client.fetch(relatedPostsQuery, { slug })
    ]);
    recentPosts = resRecent || [];
    categories = resCategories || [];
    relatedPosts = resRelated || [];
  } catch (err) {
    console.error('>>> Error fetching supporting blog data:', err);
  }

  // Fallback for empty sidebar modules
  if (recentPosts.length === 0) {
    recentPosts = fallbackPostsList.filter(p => p.slug !== slug).slice(0, 3);
  }
  if (relatedPosts.length === 0) {
    relatedPosts = fallbackPostsList.filter(p => p.slug !== slug).slice(0, 3);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": post.categories?.[0]?.title === "Cyber News" ? "NewsArticle" : "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.mainImageUrl || "https://reconshield.in/og-image.png",
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Surendra Reddy",
      "url": `https://reconshield.in/author/${post.author?.slug?.current || post.author?.slug || 'surendra-reddy'}`,
      "sameAs": [
        "https://linkedin.com/in/surendrareddy3",
        "https://github.com/nsurendrareddy"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "ReconShield",
      "url": "https://reconshield.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reconshield.in/og-image.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://reconshield.in/blog/${slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient 
        post={post} 
        recentPosts={recentPosts} 
        categories={categories} 
        relatedPosts={relatedPosts}
      />
    </>
  );
}
