import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/utils/sanity';
import { ChevronRight, FileText } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import { generateBaseMetadata, getCategoryFallbackImage } from '@/utils/metadata';

const CATEGORIES = {
  'internet-facing-assets': 'Internet-Facing Assets',
  'osint-and-analysis': 'OSINT & Analysis',
  'threat-intelligence': 'Threat Intelligence',
  'vulnerability-research': 'Vulnerability Research',
  'web-security': 'Web Security',
  'ai-cybersecurity': 'AI Cybersecurity',
  'attack-surface-analysis': 'Attack Surface Analysis',
  'online-fraud': 'Online Fraud',
  'attack-surface-management': 'Attack Surface Management',
  'cyber-awareness': 'Cyber Awareness'
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  
  if (!slug || !CATEGORIES[slug]) {
    return { title: 'Category Not Found' };
  }

  const categoryName = CATEGORIES[slug];
  const image = getCategoryFallbackImage(categoryName);

  return generateBaseMetadata({
    title: `${categoryName} Research & Intelligence`,
    description: `Latest security research, analysis, and intelligence reports covering ${categoryName}.`,
    path: `/blog/category/${slug}`,
    image: image
  });
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug || !CATEGORIES[slug]) {
    notFound();
  }

  const categoryName = CATEGORIES[slug];

  // Fetch posts for this category, including all image fields, author, categories, and estimated word count
  const query = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**")) && "${categoryName}" in categories[]->title] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
    featuredImage,
    mainImage,
    coverImage,
    "imageUrl": mainImage.asset->url,
    "featuredImageUrl": featuredImage.asset->url,
    "coverImageUrl": coverImage.asset->url,
    publishedAt,
    "categories": categories[]->{ title },
    excerpt,
    "author": author->{ name, "slug": slug.current },
    "estimatedWordCount": length(pt::text(body))
  }`;
  
  let posts = [];
  try {
    posts = await client.fetch(query);
  } catch (error) {
    console.error(`Failed to fetch posts for category ${slug}:`, error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://reconshield.in/blog/category/${slug}`,
        "url": `https://reconshield.in/blog/category/${slug}`,
        "name": `${categoryName} Research & Intelligence`,
        "description": `Latest security research, analysis, and intelligence reports covering ${categoryName}.`,
        "image": `https://reconshield.in${getCategoryFallbackImage(categoryName)}`,
        "publisher": {
          "@type": "Organization",
          "name": "ReconShield",
          "url": "https://reconshield.in"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://reconshield.in/blog" },
          { "@type": "ListItem", "position": 3, "name": categoryName, "item": `https://reconshield.in/blog/category/${slug}` }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen pt-24 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/blog" className="hover:text-[#00ff88] transition-colors">Research Blog</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{categoryName}</li>
            </ol>
          </nav>

          <header className="mb-12 border-b border-white/5 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {categoryName}
            </h1>
            <p className="text-xl text-gray-400">
              Technical analysis and intelligence reports focusing on {categoryName.toLowerCase()}.
            </p>
          </header>

          {posts.length === 0 ? (
            <div className="p-8 text-center bg-[#0a0d14] border border-white/5 rounded-2xl">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">No Research Directives Yet</h2>
              <p className="text-gray-400">We are currently analyzing intelligence for this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} defaultCategory={categoryName} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

