import Link from 'next/link';
import Image from 'next/image';
import { client, homepageBlogQuery, urlFor } from '@/utils/sanity';
import { fallbackPostsList } from '@/utils/fallbackPosts';
import { 
  Shield, Target, Activity, Cpu, MapPin, Network, 
  Search, Terminal, Lock, Layers, Mail, CheckCircle2, 
  Globe, Database, ArrowRight, Clock, User, Award, 
  BookOpen, Star, AlertTriangle, ChevronRight, MessageSquare 
} from 'lucide-react';

import { generateBaseMetadata } from '@/utils/metadata';

import DynamicDashboardClient from '@/components/DynamicDashboardClient';
import NewsletterForm from '@/components/NewsletterForm';
import TopActiveThreats from '@/components/TopActiveThreats';

export const metadata = generateBaseMetadata({
  title: "ReconShield | Cybersecurity Research & Threat Intelligence Publication",
  description: "ReconShield is a professional cybersecurity educational platform. Read peer-reviewed OSINT threat analysis, CVE vulnerability writeups, and use passive diagnostics to secure internet-facing assets.",
  path: '/'
});

// Fallback high-quality editorial articles
const MOCK_POSTS = fallbackPostsList;

export default async function Page() {
  let sanityPosts = [];
  try {
    sanityPosts = await client.fetch(homepageBlogQuery);
  } catch (error) {
    console.error('Error fetching blog posts for homepage:', error);
  }

  // De-duplicate: filter out local fallbacks if the same slug is returned by Sanity
  const sanityPostsList = sanityPosts || [];
  const sanitySlugs = new Set(sanityPostsList.map(p => p.slug?.current || p.slug));
  const filteredFallbacks = fallbackPostsList.filter(p => !sanitySlugs.has(p.slug));
  
  // Merge lists to preserve all high-value intelligence articles
  const posts = [...sanityPostsList, ...filteredFallbacks];

  // Organize articles for publication layout
  const featuredPost = posts[0] || MOCK_POSTS[0];
  const trendingBriefings = posts.slice(1, 5);
  const secondaryArticles = posts.slice(5, 8);

  const getInitials = (name) => {
    if (!name) return 'SR';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  };

  const calculateReadTime = (post) => {
    if (post.estimatedWordCount) return Math.max(1, Math.ceil(post.estimatedWordCount / 5 / 200));
    return 6;
  };

  return (
    <>
      {/* Structured Schema Markup (WebSite and Organization) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://reconshield.in/#website",
                "url": "https://reconshield.in",
                "name": "ReconShield Cybersecurity Research & Threat Intelligence",
                "description": "Educational platform providing peer-reviewed threat intelligence briefings, OSINT methodologies, and passive security assessment guides.",
                "publisher": {
                  "@id": "https://reconshield.in/#organization"
                }
              },
              {
                "@type": "Organization",
                "@id": "https://reconshield.in/#organization",
                "name": "ReconShield",
                "url": "https://reconshield.in",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://reconshield.in/og-image.png"
                },
                "sameAs": [
                  "https://linkedin.com/in/surendrareddy3",
                  "https://github.com/nsurendrareddy"
                ]
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://reconshield.in/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://reconshield.in"
                  }
                ]
              }
            ]
          })
        }}
      />

      <div className="bg-[#05080f] min-h-screen">
        {/* ================= HERO SECTION (Magazine Layout) ================= */}
        <section className="relative pt-24 pb-20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
          <div className="absolute inset-0 bg-[url('/matrix-bg.png')] bg-repeat opacity-[0.01] -z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-matrix-400/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            {/* Editorial Brand Header */}
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-matrix-400/10 border border-matrix-400/20 text-matrix-400 text-xs font-semibold uppercase tracking-widest mb-6">
                <Activity className="w-4 h-4" />
                <span>Security Research & Threat Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-4 uppercase">
                ReconShield <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-400 to-matrix-300">Intelligence</span> Journal
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base font-sans leading-relaxed">
                Peer-reviewed OSINT analysis, CVE research reports, and technical guides authored by cybersecurity engineers to assist defensive security auditing.
              </p>
            </div>

            {/* Split Magazine Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Big Featured Story (2/3 width) */}
              <div className="lg:col-span-2 group">
                <Link href={`/blog/${featuredPost.slug?.current || featuredPost.slug}`} className="block h-full bg-surface-900 border border-white/5 hover:border-matrix-400/30 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col">
                  <div className="relative aspect-[16/9] w-full bg-surface-950 overflow-hidden">
                    {featuredPost.mainImage ? (
                      <Image
                        src={urlFor(featuredPost.mainImage).width(800).height(450).fit('crop').auto('format').url()}
                        alt={featuredPost.title}
                        width={800}
                        height={450}
                        sizes="(max-width: 1024px) 100vw, 800px"
                        priority
                        className="object-cover w-full h-auto group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-matrix-900/30 via-surface-950 to-surface-900 flex items-center justify-center">
                        <Shield className="w-16 h-16 text-matrix-400/20" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-matrix-400/90 text-surface-950 text-[10px] font-mono font-bold uppercase tracking-wider rounded">
                        {featuredPost.categories?.[0]?.title || 'OSINT'}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-4 group-hover:text-matrix-400 transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-white/5 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#1a2332] flex items-center justify-center text-[#00ff88] text-[8px] font-bold">
                          {getInitials(featuredPost.author?.name)}
                        </div>
                        <span className="text-gray-300 font-sans font-bold">{featuredPost.author?.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {calculateReadTime(featuredPost)} MIN READ</span>
                        <span>{formatDate(featuredPost.publishedAt || featuredPost._createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Right Column: Trending News Feed (1/3 width) */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                  <Star className="w-4 h-4 text-amber-500" />
                  <h3 className="font-mono text-xs text-amber-500 font-bold uppercase tracking-wider">Trending Intelligence</h3>
                </div>
                <div className="flex flex-col gap-5 flex-1 justify-between">
                  {trendingBriefings.map((post, idx) => (
                    <Link href={`/blog/${post.slug?.current || post.slug}`} key={post._id} className="group flex gap-4 p-3 rounded-2xl border border-transparent hover:border-white/5 hover:bg-surface-900/40 transition-all duration-300">
                      <span className="font-mono text-lg font-bold text-matrix-400/40 group-hover:text-matrix-400 tracking-wider">0{idx + 1}</span>
                      <div className="min-w-0">
                        <span className="block font-mono text-[9px] text-[#00ff88] uppercase tracking-widest mb-1">
                          {post.categories?.[0]?.title || 'OSINT'}
                        </span>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#00ff88] transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                        <span className="block font-mono text-[8px] text-gray-500 mt-2 uppercase">
                          {formatDate(post.publishedAt || post._createdAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= THREAT PULSE SECTION ================= */}
        <section className="bg-[#05080f] py-12 border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <TopActiveThreats />
          </div>
        </section>

        {/* ================= CATEGORY DIRECTIVES ================= */}
        <section className="py-24 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="font-mono text-xs text-[#00ff88] font-bold uppercase tracking-widest">// CATEGORY ARCHIVES</span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2 uppercase">Research Directives</h3>
              </div>
              <Link href="/blog" className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-[#00ff88] hover:text-white uppercase tracking-widest transition-colors">
                All Directives <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Threat Intelligence", icon: Target, slug: "threat-intelligence", color: "text-red-400" },
                { name: "OSINT & Analysis", icon: Search, slug: "osint-analysis", color: "text-matrix-400" },
                { name: "Web Security", icon: Shield, slug: "web-security", color: "text-blue-400" },
                { name: "AI Cybersecurity", icon: Cpu, slug: "ai-cybersecurity", color: "text-purple-400" },
                { name: "Vulnerability Research", icon: AlertTriangle, slug: "vulnerability-research", color: "text-orange-400" },
                { name: "Internet-Facing Assets", icon: Network, slug: "internet-facing-assets", color: "text-cyan-400" }
              ].map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <Link href={`/blog?category=${encodeURIComponent(cat.name)}`} key={idx} className="p-5 rounded-2xl bg-surface-900 border border-white/5 hover:border-matrix-400/30 transition-all duration-300 group flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-surface-950 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-white/5">
                      <Icon className={`w-5 h-5 ${cat.color}`} />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-white group-hover:text-matrix-400 transition-colors leading-tight">{cat.name.toUpperCase()}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= LATEST EDITORIAL GUIDES ================= */}
        <section className="py-24 bg-[#05080f] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
              <div>
                <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">// RECENT BRIEFINGS</span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2 uppercase">Vulnerability Writeups & OSINT Guides</h3>
              </div>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {secondaryArticles.map((post) => (
                <Link href={`/blog/${post.slug?.current || post.slug}`} key={post._id} className="group flex flex-col bg-surface-900 border border-white/5 hover:border-matrix-400/30 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
                  <div className="relative aspect-video w-full bg-surface-950 overflow-hidden border-b border-white/5">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(360).height(202).fit('crop').auto('format').url()}
                        alt={post.title}
                        width={360}
                        height={202}
                        sizes="(max-width: 768px) 100vw, 360px"
                        className="object-cover w-full h-auto group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-surface-950 to-surface-900 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-matrix-400/10" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-[#00ff88] mb-3">
                      {post.categories?.[0]?.title || 'INTEL'}
                    </span>
                    <h4 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-matrix-400 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[9px] text-gray-500 uppercase">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {calculateReadTime(post)} MIN READ</span>
                      <span>{formatDate(post.publishedAt || post._createdAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="flex justify-center mt-12">
              <Link href="/blog" className="px-6 py-3 bg-surface-900 hover:bg-surface-800 text-white border border-white/10 hover:border-matrix-400/30 rounded-xl text-xs font-mono uppercase tracking-widest transition-all">
                Access Entire Archives
              </Link>
            </div>
          </div>
        </section>

        {/* ================= INTERACTIVE COMPLIANCE AUDITING (Passive Tool) ================= */}
        <section className="py-24 bg-[#0a0d14] relative border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-4">
                <Terminal className="w-4 h-4" />
                <span>Passive Diagnostics Suite</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 uppercase">Infrastructure Exposure Diagnostics</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
                Validate email security (SPF/DMARC), inspect SSL cipher health, check HTTP headers, and locate open ports. Our passive audit queries cached global threat logs with zero traffic sent directly to targets.
              </p>
            </div>

            {/* Embedded Scanning Widget in a sleek frame */}
            <div className="max-w-3xl mx-auto bg-surface-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                </div>
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Authorized Research Console</span>
              </div>
              <DynamicDashboardClient />
              
              <div className="mt-6 flex items-center justify-center gap-8 text-[11px] font-mono text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-matrix-400" /> 100% Passive</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-matrix-400" /> Zero Packets Sent</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-matrix-400" /> RFC Compliance Only</div>
              </div>
            </div>

            {/* Regulatory Compliance & Guidelines Alert */}
            <div className="mt-12 max-w-2xl mx-auto p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-center">
              <p className="text-amber-500 text-[11px] font-mono m-0 uppercase tracking-widest flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Defensive Auditing Notice: ReconShield provides passive assessments under authorized security guidelines.
              </p>
            </div>
          </div>
        </section>

        {/* ================= CYBERSECURITY INTELLIGENCE LEARNING CENTER (Knowledge Hubs) ================= */}
        <section className="py-24 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-12">
              <span className="font-mono text-xs text-[#00ff88] font-bold uppercase tracking-widest">// RECONSHIELD KNOWLEDGE HUBS</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2 uppercase">Cybersecurity Intelligence & Learning Centers</h3>
              <p className="text-gray-400 text-sm mt-2 max-w-2xl">
                Explore our curated topical authority clusters, mapping protocols, vulnerabilities, OSINT intelligence networks, and defensive recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Threat Intelligence & Attribution",
                  desc: "Analyze attacker indicators of compromise (IoCs), tracking known threat actors, and mapping infrastructure footprints across regional ASNs.",
                  links: [
                    { title: "BGP Hijacking & Route Leaks Guide", url: "/blog/securing-bgp-route-leaks" },
                    { title: "IP Telemetry Analysis Node", url: "/tools/ip-lookup" }
                  ]
                },
                {
                  title: "Passive OSINT & Reconnaissance",
                  desc: "Learn passive network mapping methodologies using cached certificate logs, public registries, and passive DNS records without triggering security alerts.",
                  links: [
                    { title: "Anatomy of Passive OSINT Guide", url: "/blog/anatomy-of-passive-osint" },
                    { title: "Global WHOIS Registrar Directory", url: "/tools/whois" }
                  ]
                },
                {
                  title: "Attack Surface Management",
                  desc: "Discover and catalog internet-facing assets, exposed services, administrative panels, and database ports before adversary exploitation.",
                  links: [
                    { title: "Shadow IT Discovery & Telemetry", url: "/blog/shadow-it-exposed-ports" },
                    { title: "Network Port Exposure Scanner", url: "/tools/port-scanner" }
                  ]
                },
                {
                  title: "DNS Security & Routing Verification",
                  desc: "Understand secure domain resolution protocols including DNSSEC validation, SPF mechanisms, DMARC configurations, and registrar locking standards.",
                  links: [
                    { title: "DMARC Phishing Authentication Blueprint", url: "/blog/spf-dkim-dmarc-blueprint" },
                    { title: "Recursive Anycast DNS Diagnostics", url: "/tools/dns-lookup" }
                  ]
                },
                {
                  title: "SSL/TLS Cryptographic Analysis",
                  desc: "Audit public transport layer keys, active cipher suite vulnerabilities (e.g. logjam, sweet32), TLS protocols validation, and certificate chain expiry.",
                  links: [
                    { title: "Cryptographic Regulatory Compliance Guide", url: "/blog/ssl-tls-regulatory-compliance" },
                    { title: "Automated SSL/TLS Certificate Auditor", url: "/tools/ssl-checker" }
                  ]
                },
                {
                  title: "Vulnerability Intelligence & CVEs",
                  desc: "Track software flaw disclosures, parsing Common Vulnerability Scoring System (CVSS v3/v4) indicators, and analyzing EPSS exploit probability rankings.",
                  links: [
                    { title: "OWASP Top 10 Web Headers Hardening", url: "/blog/owasp-http-headers-hardening" },
                    { title: "Passive Vulnerability Analysis Suite", url: "/tools/vulnerability-scanner" }
                  ]
                }
              ].map((hub, idx) => (
                <div key={idx} className="bg-surface-900 border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-matrix-400/30 transition-all duration-300">
                  <div>
                    <h4 className="text-white text-base font-bold mb-2 uppercase tracking-wide">{hub.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mb-6">{hub.desc}</p>
                  </div>
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    {hub.links.map((link, lidx) => (
                      <Link key={lidx} href={link.url} className="text-xs text-matrix-400 hover:text-white transition-colors flex items-center gap-1">
                        <span>→</span> <span>{link.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Glossary / Entity Linking Panel */}
            <div className="mt-8 p-6 rounded-2xl bg-surface-900/30 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="font-mono text-xs">
                <span className="text-[#00ff88] uppercase font-bold tracking-wider">// Semantic Entity Relations: </span>
                <span className="text-gray-500">Autonomous Systems (ASN) • IP Footprints • DNSSEC Keys • TLS Cipher Suites • CVE Metadata • Port Scan Telemetry</span>
              </div>
              <Link href="/tools" className="text-xs font-mono text-matrix-400 hover:underline uppercase tracking-wider shrink-0">
                Launch Research Centers →
              </Link>
            </div>
          </div>
        </section>

        {/* ================= E-E-A-T AUTHOR & EDITORIAL TRUST SIGNALS ================= */}
        <section className="py-24 bg-[#05080f] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              
              {/* Author Highlight Card */}
              <div className="bg-surface-900 border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-matrix-400/10 text-matrix-400 text-[10px] font-mono uppercase tracking-widest rounded mb-6">
                    <Award className="w-3.5 h-3.5" /> Researcher & Lead Editor
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">Surendra Reddy</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 font-mono">
                    Surendra Reddy is a cybersecurity engineer, OSINT developer, and lead publisher of ReconShield. Specializing in defensive threat analysis and internet-facing assets mapping, Surendra oversees editorial validation, fact-checking technical guides, and securing programmatic resources.
                  </p>
                  <div className="space-y-2 mb-8">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> Certified Threat Intelligence Analyst (CTIA)
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> Passive Reconnaissance and Threat Hunting Specialist
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6">
                  <div className="flex gap-4">
                    <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-gray-400 hover:text-matrix-400 transition-colors flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3" /></a>
                    <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3" /></a>
                  </div>
                  <Link href="/author/surendra-reddy" className="text-xs font-mono text-matrix-400 hover:underline uppercase tracking-widest">
                    Author Profile →
                  </Link>
                </div>
              </div>

              {/* Editorial Standards Card */}
              <div className="bg-surface-900 border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-mono uppercase tracking-widest rounded mb-6">
                    <Shield className="w-3.5 h-3.5" /> Integrity Assurance
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">Editorial Integrity & Ethics</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                    ReconShield is dedicated to lawful and authorized cybersecurity auditing. We believe that public threat intelligence must serve as defensive assets, not offensive instruction. Our editorial staff enforces strict constraints:
                  </p>
                  <ul className="space-y-4 text-xs text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-matrix-400 font-mono font-bold shrink-0">1.</span>
                      <span><strong>Technical Validation:</strong> Vulnerabilities are tested in lab parameters and cross-referenced with vendor security disclosures.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-matrix-400 font-mono font-bold shrink-0">2.</span>
                      <span><strong>Zero Abuse Payload:</strong> We never distribute active exploit scripts. Our focus is configuration mitigation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-matrix-400 font-mono font-bold shrink-0">3.</span>
                      <span><strong>Responsible Disclosures:</strong> Unpatched vulnerabilities are escalated to registry administrators privately first.</span>
                    </li>
                  </ul>
                </div>
                <div className="border-t border-white/5 pt-6 mt-6 flex justify-between items-center">
                  <Link href="/editorial-policy" className="text-xs font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-1">Editorial Policy <ChevronRight className="w-3 h-3" /></Link>
                  <Link href="/about" className="text-xs font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-1">About Our Mission <ChevronRight className="w-3 h-3" /></Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= WEEKLY INTEL BRIEFING (Newsletter) ================= */}
        <section className="py-24 bg-[#0a0d14] relative overflow-hidden">
          <div className="absolute inset-0 bg-matrix-400/5 -z-10" />
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Mail className="w-12 h-12 text-[#00ff88] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 uppercase tracking-wider">Stay Ahead of Emerging Threat Vectors</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Join thousands of cybersecurity analysts, developers, and compliance auditors who receive our weekly threat briefings, zero-day CVE alerts, and defensive tutorials.
            </p>
            
            <NewsletterForm 
              accentColor="bg-matrix-600 hover:bg-matrix-500"
              buttonTextColor="text-white"
              inputClass="px-6 py-4 w-full sm:w-96 text-sm"
              buttonClass="px-8 py-4 text-xs font-mono tracking-widest"
            />
            <p className="text-xs text-gray-600 mt-4 font-mono">Fact checked intelligence. 100% spam-free. Unsubscribe anytime.</p>
          </div>
        </section>
      </div>
    </>
  );
}
