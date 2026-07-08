import { cache } from 'react';
import BlogPostClient from '@/components/BlogPostClient';
import { ShieldAlert, ArrowLeft, WifiOff } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client, blogDetailQuery, urlFor, blogSidebarQuery } from '@/utils/sanity';
// ISR disabled, relying on Sanity webhook

import { MOCK_POSTS_DATA } from '@/utils/mockBlogData';


const getPost = cache(async (slug) => {
  if (!slug || slug === 'undefined') return null;
  
  let post = null;
  try {
    const sanityPost = await client.fetch(blogDetailQuery, { slug });
    if (sanityPost) post = sanityPost;
  } catch (err) {
    console.error('>>> SANITY FETCH ERROR:', err);
  }

  if (!post) {
    post = MOCK_POSTS_DATA[slug] || null;
  }

  if (post) {
    try {
      let serialized = JSON.stringify(post);
      serialized = serialized
        .replaceAll('/compare/port-scan-vs-vulnerability-scan', '/compare/port-scanner-vs-vulnerability-scanner')
        .replaceAll('/ssl/ssl-vs-tls', '/compare/ssl-vs-tls')
        .replaceAll('/ssl/tls-1-2-vs-tls-1-3', '/compare/tls-1-2-vs-tls-1-3')
        .replaceAll('/blog/attack-surface-discovery', '/blog/anatomy-of-passive-osint')
        .replaceAll('/blog/reconnaissance-guide', '/blog/osint-fundamentals')
        .replaceAll('/blog/continuous-monitoring-guide', '/blog/shadow-it-exposed-ports');
      return JSON.parse(serialized);
    } catch (replaceErr) {
      console.error('Error rewriting links in post:', replaceErr);
    }
  }

  return post;
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || post._error) {
    notFound();
  }

  const description = post.excerpt;
  const imageUrl = post.mainImageUrl || '/og-image.png';
  const authorName = post.author?.name ?? "ReconShield Team";
  
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
    notFound();
  }

  // Fetch sidebar and related data in a single optimized query
  let sidebarData = { recent: [], categories: [], related: [] };
  try {
    const data = await client.fetch(blogSidebarQuery, { slug });
    if (data) {
      sidebarData = {
        recent: data.recent || [],
        categories: data.categories || [],
        related: data.related || []
      };
    }
  } catch (err) {
    console.error('Error fetching optimized sidebar data:', err);
  }
  
  const recentPosts = sidebarData.recent;
  const categories = sidebarData.categories;
  const relatedPosts = sidebarData.related;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": post.categories?.[0]?.title === "Cyber News" ? "NewsArticle" : "Article",
        "@id": `https://reconshield.in/blog/${slug}#article`,
        "headline": post.title,
        "description": post.excerpt,
        "image": post.mainImageUrl || (post.mainImage ? urlFor(post.mainImage).url() : "https://reconshield.in/og-image.png"),
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://reconshield.in/blog/${slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://reconshield.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://reconshield.in/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://reconshield.in/blog/${slug}`
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient 
        post={post} 
        recentPosts={recentPosts || []} 
        categories={categories || []} 
        relatedPosts={relatedPosts || []}
      />
    </>
  );
}
