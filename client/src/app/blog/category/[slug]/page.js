import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client, blogListQuery, urlFor } from '@/utils/sanity';
import { 
  Shield, Target, Network, Search, 
  AlertTriangle, Cpu, ChevronRight, Clock,
  ArrowLeft
} from 'lucide-react';

export const revalidate = 60;

const CATEGORIES = [
  { name: "Threat Intelligence", title: "Threat Intelligence", icon: Target, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", hover: "hover:border-red-500/50", slug: "threat-intelligence", desc: "Latest intel on APTs, malware campaigns, and emerging threat actors." },
  { name: "OSINT & Recon", title: "OSINT & Reconnaissance", icon: Search, color: "text-matrix-400", bg: "bg-matrix-500/10", border: "border-matrix-500/20", hover: "hover:border-matrix-500/50", slug: "osint-reconnaissance", desc: "Techniques and tools for open-source intelligence gathering and attribution." },
  { name: "Web Security", title: "Web Security", icon: Shield, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", hover: "hover:border-blue-500/50", slug: "web-security", desc: "Deep dives into application security, WAF bypasses, and secure coding." },
  { name: "AI Cybersecurity", title: "AI Cybersecurity", icon: Cpu, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", hover: "hover:border-purple-500/50", slug: "ai-cybersecurity", desc: "The intersection of artificial intelligence, machine learning, and offensive/defensive cyber operations." },
  { name: "Vulnerability Research", title: "Vulnerability Research", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", hover: "hover:border-orange-500/50", slug: "vulnerability-research", desc: "Zero-day disclosures, CVE analysis, and exploit reverse engineering." },
  { name: "Attack Surface", title: "Attack Surface Analysis", icon: Network, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", hover: "hover:border-cyan-500/50", slug: "attack-surface-analysis", desc: "Mapping digital footprints, shadow IT discovery, and infrastructure hardening." }
];

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }) {
  const category = CATEGORIES.find(c => c.slug === params.slug);
  
  if (!category) {
    return { title: 'Category Not Found | ReconShield' };
  }

  return {
    title: `${category.title} Research & Articles | ReconShield Blog`,
    description: `Read the latest cybersecurity research, tools, and tutorials on ${category.title}. ${category.desc}`,
    alternates: {
      canonical: `https://reconshield.in/blog/category/${category.slug}`,
    },
    openGraph: {
      title: `${category.title} Cybersecurity Research`,
      description: category.desc,
      url: `https://reconshield.in/blog/category/${category.slug}`,
      type: 'website',
    }
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = params;
  const categoryDef = CATEGORIES.find(c => c.slug === slug);

  if (!categoryDef) {
    notFound();
  }

  let allPosts = [];
  try {
    allPosts = await client.fetch(blogListQuery);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  // Filter posts based on category name matching (case insensitive or exact)
  const categoryPosts = allPosts.filter(post => 
    post.categories?.some(cat => 
      cat.title.toLowerCase().includes(categoryDef.name.toLowerCase().split(' ')[0]) || 
      cat.title.toLowerCase() === categoryDef.title.toLowerCase()
    )
  );

  const Icon = categoryDef.icon;

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      timeZone: 'UTC' 
    }).format(date).toUpperCase();
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": `https://reconshield.in/blog/category/${slug}#collection`,
                "name": `${categoryDef.title} Articles`,
                "url": `https://reconshield.in/blog/category/${slug}`,
                "description": categoryDef.desc
              },
              {
                "@type": "BreadcrumbList",
                "@id": `https://reconshield.in/blog/category/${slug}#breadcrumb`,
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
                  { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://reconshield.in/blog" },
                  { "@type": "ListItem", "position": 3, "name": categoryDef.title, "item": `https://reconshield.in/blog/category/${slug}` }
                ]
              }
            ]
          })
        }}
      />

      <div className="bg-[#05080f] min-h-screen pb-24">
        
        {/* Header / Hero */}
        <section className="relative pt-24 pb-16 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] ${categoryDef.bg} blur-[100px] rounded-full pointer-events-none -z-10`} />
          
          <div className="max-w-[1200px] mx-auto px-6">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-white font-mono text-xs uppercase tracking-widest mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Publication
            </Link>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className={`w-20 h-20 rounded-2xl ${categoryDef.bg} ${categoryDef.border} border flex items-center justify-center shrink-0`}>
                <Icon className={`w-10 h-10 ${categoryDef.color}`} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                  {categoryDef.title}
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                  {categoryDef.desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="max-w-[1200px] mx-auto px-6 pt-16">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-mono text-xs tracking-[4px] uppercase text-gray-500 font-bold">// RESEARCH ARCHIVE</h2>
            <div className="h-[1px] flex-1 bg-[#1a2332]" />
            <span className="font-mono text-xs text-gray-500">{categoryPosts.length} REPORTS</span>
          </div>

          {categoryPosts.length === 0 ? (
            <div className="text-center py-24 bg-surface-900 border border-white/5 rounded-3xl">
              <Icon className={`w-16 h-16 ${categoryDef.color} mx-auto mb-6 opacity-50`} />
              <h3 className="text-2xl font-bold text-white mb-2">No Reports Found</h3>
              <p className="text-gray-400">Our analysts are currently compiling intelligence for this sector. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post._id} className={`group flex flex-col bg-[#0d1117] border border-[#1a2332] ${categoryDef.hover} transition-all duration-300 rounded-xl overflow-hidden`}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#1a2332]">
                    {post.mainImage && (
                      <Image 
                        src={urlFor(post.mainImage).width(600).height(338).fit('crop').auto('format').url()} 
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        quality={75}
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className={`font-mono text-[9px] tracking-[2px] uppercase ${categoryDef.color} mb-3 font-bold`}>
                      {categoryDef.name}
                    </span>
                    <h3 className="text-lg font-semibold text-white mb-3 leading-snug group-hover:text-gray-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1a2332]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1a2332] flex items-center justify-center font-mono text-[10px] text-gray-400">
                          {getInitials(post.author?.name)}
                        </div>
                        <span className="font-mono text-[9px] tracking-[2px] uppercase text-gray-400">
                          {post.author?.name || 'RECON'}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] tracking-[2px] uppercase text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(post.publishedAt || post._createdAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </>
  );
}
