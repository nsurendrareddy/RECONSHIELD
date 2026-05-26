import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client, blogListQuery, urlFor } from '@/utils/sanity';
import { 
  Shield, Target, Terminal, Activity, Network, 
  Search, BookOpen, AlertTriangle, ChevronRight, 
  Clock, CheckCircle2, Zap, Cpu, ArrowLeft
} from 'lucide-react';

export const revalidate = 60; // ISR revalidate every 1 minute

const CATEGORIES = [
  { name: "Threat Intelligence", icon: Target, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", hover: "hover:border-red-500/20", slug: "threat-intelligence" },
  { name: "OSINT & Recon", icon: Search, color: "text-matrix-400", bg: "bg-matrix-500/10", border: "border-matrix-500/20", hover: "hover:border-matrix-500/20", slug: "osint-reconnaissance" },
  { name: "Web Security", icon: Shield, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", hover: "hover:border-blue-500/20", slug: "web-security" },
  { name: "AI Cybersecurity", icon: Cpu, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", hover: "hover:border-purple-500/20", slug: "ai-cybersecurity" },
  { name: "Vulnerability Research", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", hover: "hover:border-orange-500/20", slug: "vulnerability-research" },
  { name: "Attack Surface", icon: Network, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", hover: "hover:border-cyan-500/20", slug: "attack-surface-analysis" }
];

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const category = CATEGORIES.find(c => c.slug === slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} | Cybersecurity Research`,
    description: `Browse all articles, guides, and threat briefings in the ${category.name} research directive.`,
    alternates: {
      canonical: `https://reconshield.in/blog/category/${slug}`,
    },
    openGraph: {
      title: `${category.name} | Cybersecurity Research`,
      description: `Browse all articles, guides, and threat briefings in the ${category.name} research directive.`,
      url: `https://reconshield.in/blog/category/${slug}`,
      type: 'website',
    }
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const category = CATEGORIES.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  let allPosts = [];
  try {
    allPosts = await client.fetch(blogListQuery);
  } catch (err) {
    console.error('Error fetching blog list for category:', err);
  }

  // Filter posts that match this category
  const posts = allPosts.filter(post => 
    post.categories?.some(cat => {
      const matchSlug = cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return matchSlug === slug || cat.title.toLowerCase() === category.name.toLowerCase();
    })
  );

  const Icon = category.icon;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://reconshield.in/blog" },
      { "@type": "ListItem", "position": 3, "name": category.name, "item": `https://reconshield.in/blog/category/${slug}` }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <div className="bg-[#05080f] min-h-screen pt-24 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Publication
          </Link>

          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/5 mb-16">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl ${category.bg} ${category.border} border flex items-center justify-center`}>
                <Icon className={`w-8 h-8 ${category.color}`} />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
                  {category.name}
                </h1>
                <p className="text-gray-400 text-sm">
                  Research Directive Archive
                </p>
              </div>
            </div>
            <div className="bg-surface-900 border border-white/10 px-4 py-2 rounded-xl text-xs font-mono text-gray-400">
              {posts.length} {posts.length === 1 ? 'Article' : 'Articles'} Found
            </div>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post._id} className="group bg-[#0d1117]/40 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all flex flex-col h-full">
                  <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden bg-surface-900">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(338).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-w-768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                        <BookOpen className="w-12 h-12" />
                      </div>
                    )}
                  </Link>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      {post.categories?.map((cat, i) => (
                        <span key={i} className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">
                          {cat.title}
                        </span>
                      ))}
                      {post.publishedAt && (
                        <span className="text-[10px] font-mono text-gray-500 ml-auto">
                          {new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-display font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                      <span className="text-gray-500">By {post.author?.name || 'ReconShield Research'}</span>
                      <Link href={`/blog/${post.slug}`} className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Report <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface-900/50 border border-white/5 rounded-3xl">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4 animate-pulse" />
              <h3 className="text-white font-bold text-lg mb-2">No Reports Found</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                We are actively analyzing vectors and compiling intelligence for this directive. Check back soon for the next publication.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
