import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/utils/sanity';
import { ChevronRight, FileText, Calendar, Clock } from 'lucide-react';

const CATEGORIES = {
  'internet-facing-assets': 'Internet-Facing Assets',
  'osint-and-analysis': 'OSINT & Analysis',
  'threat-intelligence': 'Threat Intelligence',
  'vulnerability-research': 'Vulnerability Research',
  'web-security': 'Web Security',
  'ai-cybersecurity': 'AI Cybersecurity'
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  
  if (!slug || !CATEGORIES[slug]) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${CATEGORIES[slug]} Research & Intelligence`,
    description: `Latest security research, analysis, and intelligence reports covering ${CATEGORIES[slug]}.`,
    alternates: {
      canonical: `https://reconshield.in/blog/category/${slug}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      url: `https://reconshield.in/blog/category/${slug}`,
      title: `${CATEGORIES[slug]} Intelligence Feed`,
      description: `Deep-dive articles and technical breakdowns on ${CATEGORIES[slug]}.`,
      type: 'website'
    }
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug || !CATEGORIES[slug]) {
    notFound();
  }

  // Fetch posts for this category
  const query = `*[_type == "post" && "${CATEGORIES[slug]}" in categories[]->title] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "readTime": readTime
  }`;
  
  let posts = [];
  try {
    posts = await client.fetch(query);
  } catch (error) {
    console.error(`Failed to fetch posts for category ${slug}:`, error);
  }

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://reconshield.in/blog' },
      { '@type': 'ListItem', position: 3, name: CATEGORIES[slug], item: `https://reconshield.in/blog/category/${slug}` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />
      <div className="min-h-screen pt-24 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/blog" className="hover:text-[#00ff88] transition-colors">Research Blog</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{CATEGORIES[slug]}</li>
            </ol>
          </nav>

          <header className="mb-12 border-b border-white/5 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {CATEGORIES[slug]}
            </h1>
            <p className="text-xl text-gray-400">
              Technical analysis and intelligence reports focusing on {CATEGORIES[slug].toLowerCase()}.
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
                <Link key={post._id} href={`/blog/${post.slug?.current || post.slug}`} className="group block h-full">
                  <article className="h-full bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/30 rounded-2xl p-6 transition-all flex flex-col">
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#00ff88] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                      {post.excerpt || 'Read the full intelligence report on this topic.'}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mt-auto pt-4 border-t border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {post.publishedAt 
                            ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : 'Unknown Date'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime || 5} min read</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
