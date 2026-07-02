import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/utils/sanity';
import { ChevronRight, FileText } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import { generateBaseMetadata, getCategoryFallbackImage } from '@/utils/metadata';

// Maps incoming URL slugs to display names and database category titles
const CATEGORY_MAP = {
  'internet-facing-assets': {
    displayName: 'Internet-Facing Assets',
    dbTitle: 'Attack Surface Analysis'
  },
  'osint-and-analysis': {
    displayName: 'OSINT & Analysis',
    dbTitle: 'OSINT & Reconnaissance'
  },
  'osint-analysis': {
    displayName: 'OSINT & Analysis',
    dbTitle: 'OSINT & Reconnaissance'
  },
  'threat-intelligence': {
    displayName: 'Threat Intelligence',
    dbTitle: 'Threat Intelligence'
  },
  'vulnerability-research': {
    displayName: 'Vulnerability Research',
    dbTitle: 'Vulnerability Research'
  },
  'web-security': {
    displayName: 'Web Security',
    dbTitle: 'Web Security'
  },
  'ai-cybersecurity': {
    displayName: 'AI Cybersecurity',
    dbTitle: 'AI Cybersecurity'
  },
  'attack-surface-analysis': {
    displayName: 'Attack Surface Analysis',
    dbTitle: 'Attack Surface Analysis'
  },
  'online-fraud': {
    displayName: 'Online Fraud',
    dbTitle: 'Online Fraud'
  },
  'attack-surface-management': {
    displayName: 'Attack Surface Management',
    dbTitle: 'Attack Surface Management'
  },
  'cyber-awareness': {
    displayName: 'Cyber Awareness',
    dbTitle: 'Cyber Awareness'
  },
  'email-security': {
    displayName: 'Email Security',
    dbTitle: 'Email Security'
  }
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  
  if (!slug || !CATEGORY_MAP[slug]) {
    return { title: 'Category Not Found' };
  }

  const categoryName = CATEGORY_MAP[slug].displayName;
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

  if (!slug || !CATEGORY_MAP[slug]) {
    notFound();
  }

  const categoryConfig = CATEGORY_MAP[slug];
  const categoryName = categoryConfig.displayName;
  const dbTitle = categoryConfig.dbTitle;

  // Fetch posts for this category, using array-reference filtering with a title fallback for dataset robustness
  const query = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**")) && (
    $slug in categories[]->slug.current ||
    $dbTitle in categories[]->title
  )] | order(coalesce(publishedAt, _createdAt) desc) {
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
    "categories": categories[]->{ title, "slug": slug.current },
    excerpt,
    "author": author->{ name, "slug": slug.current },
    "estimatedWordCount": length(pt::text(body))
  }`;
  
  let posts = [];
  try {
    posts = await client.fetch(query, { slug, dbTitle });
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


