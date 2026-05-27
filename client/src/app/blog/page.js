import Image from 'next/image';
import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';
import { client, blogListQuery, urlFor } from '@/utils/sanity';
import { 
  Shield, Target, Terminal, Activity, Network, 
  Search, BookOpen, AlertTriangle, ChevronRight, 
  Clock, CheckCircle2, Zap, Mail, Cpu, Star
} from 'lucide-react';
import BlogClient from './BlogClient';

export const revalidate = 60; // ISR revalidate every 1 minute

export const metadata = {
  title: "Cybersecurity Research & Threat Intelligence Publication",
  description: "Enterprise cybersecurity publication. Deep-dive OSINT research, vulnerability analysis, AI security intelligence, and attack surface mapping tutorials.",
  alternates: {
    canonical: 'https://reconshield.in/blog',
  },
  openGraph: {
    title: "Cybersecurity Research & Threat Intelligence Publication",
    description: "Enterprise cybersecurity publication. Deep-dive OSINT research, vulnerability analysis, AI security intelligence, and attack surface mapping tutorials.",
    url: 'https://reconshield.in/blog',
    type: 'website',
  }
};

const CATEGORIES = [
  { name: "Threat Intelligence", icon: Target, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", hover: "hover:border-red-500/20", slug: "threat-intelligence" },
  { name: "OSINT & Recon", icon: Search, color: "text-matrix-400", bg: "bg-matrix-500/10", border: "border-matrix-500/20", hover: "hover:border-matrix-500/20", slug: "osint-reconnaissance" },
  { name: "Web Security", icon: Shield, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", hover: "hover:border-blue-500/20", slug: "web-security" },
  { name: "AI Cybersecurity", icon: Cpu, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", hover: "hover:border-purple-500/20", slug: "ai-cybersecurity" },
  { name: "Vulnerability Research", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", hover: "hover:border-orange-500/20", slug: "vulnerability-research" },
  { name: "Attack Surface", icon: Network, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", hover: "hover:border-cyan-500/20", slug: "attack-surface-analysis" }
];

export default async function BlogPage() {
  let posts = [];
  
  try {
    posts = await client.fetch(blogListQuery);
  } catch (error) {
    console.error('Error fetching blog posts from Sanity:', error);
  }

  // Fallback static posts if Sanity fetch fails or is empty for demo purposes
  const featuredPost = posts[0] || null;
  const latestPosts = posts.slice(1, 7) || [];

  return (
    <>
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": "https://reconshield.in/blog#collection",
                "name": "ReconShield Cybersecurity Intelligence Publication",
                "url": "https://reconshield.in/blog",
                "description": "Enterprise publication covering OSINT, Threat Intelligence, and Vulnerability Research."
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://reconshield.in/blog#breadcrumb",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
                  { "@type": "ListItem", "position": 2, "name": "Intelligence Publication", "item": "https://reconshield.in/blog" }
                ]
              }
            ]
          })
        }}
      />

      <div className="bg-[#05080f] min-h-screen">
        
        {/* 1. Hero Section */}
        <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          
          <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Enterprise Research & Editorial</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight">
              Cybersecurity Research & <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-matrix-400">Threat Intelligence</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Deep-dive operational intelligence, zero-day vulnerability analysis, and comprehensive OSINT methodologies authored by the ReconShield research division.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Fact Checked</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Analyst Authored</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-matrix-400" /> Peer Reviewed</div>
            </div>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-6 py-20 space-y-32">

          {/* 3. Category Navigation Grid */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-mono text-xs tracking-[4px] uppercase text-gray-500 font-bold">// RESEARCH DIRECTIVES</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <Link href={`/blog/category/${cat.slug}`} key={idx} className={`p-4 rounded-2xl bg-surface-900 border border-white/5 ${cat.hover} transition-all group flex flex-col items-center text-center`}>
                    <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${cat.color}`} />
                    </div>
                    <span className="text-xs font-bold text-white group-hover:text-gray-300 transition-colors">{cat.name}</span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* 2. Featured Research Articles (Server Rendered) */}
          {featuredPost && (
            <section>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                  <Star className="w-6 h-6 text-amber-500" /> Headlining Intelligence
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-amber-500/20 to-transparent" />
              </div>
              
              <Link href={`/blog/${featuredPost.slug?.current || featuredPost.slug}`} className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-surface-900">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full">
                    {featuredPost.mainImage && (
                      <Image 
                        src={urlFor(featuredPost.mainImage).width(800).auto('format').url()} 
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent lg:bg-gradient-to-r" />
                  </div>
                  
                  <div className="p-10 lg:p-16 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-mono uppercase tracking-widest rounded mb-6 w-fit">
                      <Activity className="w-3 h-3" /> Featured Report
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 group-hover:text-amber-500 transition-colors leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed mb-8">
                      {featuredPost.excerpt || "Read our latest comprehensive research report detailing emerging attack vectors and mitigation strategies for enterprise infrastructure."}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {new Date(featuredPost.publishedAt || featuredPost._createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3"/> {featuredPost.author?.name || "Surendra Reddy"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* 4. Latest Threat Intelligence (Client Side Grid for Pagination) */}
          <section>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                <Zap className="w-6 h-6 text-matrix-400" /> Latest Threat Briefings
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-matrix-500/20 to-transparent" />
            </div>
            
            {/* Injecting the existing BlogClient here for the masonry/paginated grid of the rest of the posts */}
            <div className="-mx-6">
              <BlogClient posts={posts} />
            </div>
          </section>

          {/* 5. Latest Research & OSINT Guides */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-white/5 pt-20">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-2xl font-display font-bold text-white">Vulnerability Research</h3>
              </div>
              <div className="space-y-4">
                {posts.slice(0, 3).length > 0 ? posts.slice(0, 3).map((post, i) => (
                  <Link href={`/blog/${post.slug?.current || post.slug}`} key={i} className="block p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-red-500/30 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-widest">
                        {post.categories?.[0]?.title || 'Research'}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
                      </span>
                    </div>
                    <h4 className="text-white font-bold mb-2 group-hover:text-red-400 transition-colors">{post.title}</h4>
                    <p className="text-sm text-gray-400 line-clamp-2">{post.excerpt || 'Read the full research report.'}</p>
                  </Link>
                )) : (
                  <Link href="/blog" className="block p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-red-500/30 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-widest">Research</span>
                    </div>
                    <h4 className="text-white font-bold mb-2 group-hover:text-red-400 transition-colors">Explore our Vulnerability Research Library</h4>
                    <p className="text-sm text-gray-400">In-depth analysis of security vulnerabilities, CVE breakdowns, and defensive countermeasures.</p>
                  </Link>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <Search className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-display font-bold text-white">OSINT Research Guides</h3>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Automating Infrastructure Attribution with RDAP", target: "/tools/whois" },
                  { title: "Hunting Phishing Campaigns via Passive DNS", target: "/tools/dns-lookup" },
                  { title: "Mapping Shadow IT using Attack Surface Scanners", target: "/tools/port-scanner" }
                ].map((guide, i) => (
                  <Link href={guide.target} key={i} className="block p-6 rounded-2xl bg-surface-900 border border-white/5 hover:border-cyan-500/30 transition-colors group">
                    <div className="flex justify-between items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <h4 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">{guide.title}</h4>
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Interactive Tutorial</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* 7. AI Security & 8. Tutorials */}
          <section className="p-10 rounded-3xl bg-gradient-to-br from-[#0d1117] to-surface-900 border border-purple-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Cpu className="w-64 h-64 text-purple-500" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-mono uppercase tracking-widest rounded mb-6">
                <Cpu className="w-3 h-3" /> Next-Gen Defense
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">AI in Cybersecurity Intelligence</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Explore our cutting-edge research on how Large Language Models (LLMs) and machine learning algorithms are revolutionizing threat hunting, automated triage, and defensive posture generation.
              </p>
              <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors">
                Read AI Research <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* 9. Newsletter Section */}
          <section className="text-center max-w-3xl mx-auto border-t border-white/5 pt-20">
            <Mail className="w-12 h-12 text-matrix-400 mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold text-white mb-4">Join the Reconnaissance Briefing</h2>
            <p className="text-gray-400 mb-8">
              Get zero-day alerts, OSINT tradecraft, and exclusive threat intelligence reports delivered directly to your inbox. No spam. Unsubscribe anytime.
            </p>
            <NewsletterForm
              accentColor="bg-matrix-600 hover:bg-matrix-500"
              buttonTextColor="text-white"
              inputClass="px-6 py-4 w-full sm:w-96"
              buttonClass="px-8 py-4"
            />
          </section>

          {/* 10. Internal Linking Hub */}
          <section className="pt-10 border-t border-white/5">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-mono text-xs tracking-[4px] uppercase text-blue-400 font-bold">// RESEARCH & TOOLS DIRECTORY</h2>
              <div className="h-[1px] flex-1 bg-[#1a2332]" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/vulnerability-scanner" className="text-sm font-mono text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Vulnerability Scanner
              </Link>
              <Link href="/tools/ip-lookup" className="text-sm font-mono text-gray-400 hover:text-matrix-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> IP Intelligence
              </Link>
              <Link href="/tools/dns-lookup" className="text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> DNS Security Analysis
              </Link>
              <Link href="/tools/whois" className="text-sm font-mono text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> WHOIS Lookup
              </Link>
              <Link href="/tools/http-headers" className="text-sm font-mono text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Security Headers
              </Link>
              <Link href="/tools/port-scanner" className="text-sm font-mono text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Port Scanner
              </Link>
              <Link href="/tools/ssl-checker" className="text-sm font-mono text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> SSL/TLS Checker
              </Link>
              <Link href="/tools" className="text-sm font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> All Security Tools
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
