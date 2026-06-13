import Link from 'next/link';
import Image from 'next/image';
import ResponsiveImage from '@/components/ResponsiveImage';
import { client, homepageBlogQuery, urlFor } from '@/utils/sanity';
import { 
  Shield, Target, Activity, Cpu, MapPin, Network, 
  Search, Terminal, Lock, Layers, Mail, CheckCircle2, 
  Globe, Database, ArrowRight, Clock, User, Award, 
  BookOpen, Star, AlertTriangle, ChevronRight, MessageSquare 
} from 'lucide-react';

import { generateBaseMetadata } from '@/utils/metadata';
import {
  DynamicNewsletterForm,
  DynamicTopActiveThreats,
  DynamicHeroSocVisual,
  DynamicNativeBanner
} from '@/components/DynamicWidgets';

export const metadata = generateBaseMetadata({
  title: "ReconShield | Cybersecurity Research & Threat Intelligence Publication",
  description: "ReconShield is a professional cybersecurity educational platform. Read peer-reviewed OSINT threat analysis, CVE vulnerability writeups, and use passive diagnostics to secure internet-facing assets.",
  path: '/'
});

// Fallback high-quality editorial articles in case Sanity fetch returns empty
const MOCK_POSTS = [
  {
    _id: "mock-1",
    title: "The Anatomy of Passive OSINT: Mapping Infrastructure Without Noise",
    slug: "anatomy-of-passive-osint",
    publishedAt: "2026-05-28T09:00:00Z",
    excerpt: "Learn how modern threat hunters map enterprise footprints entirely through cached DNS, transparency logs, and global RIR data without triggering network intrusion detection systems.",
    categories: [{ title: "OSINT & Analysis" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1520
  },
  {
    _id: "mock-2",
    title: "Securing BGP Route Leaks: Why Large ASNs Fall Victim to Hijacking Campaigns",
    slug: "securing-bgp-route-leaks",
    publishedAt: "2026-05-25T11:30:00Z",
    excerpt: "A deep dive into Autonomous System Number (ASN) path verification, peer filtering mechanisms, and the crucial role of RPKI repository deployment in preventing routing exposures.",
    categories: [{ title: "Threat Intelligence" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1840
  },
  {
    _id: "mock-3",
    title: "Demystifying SPF, DKIM, and DMARC: A Blueprint for Email Spoofing Defense",
    slug: "spf-dkim-dmarc-blueprint",
    publishedAt: "2026-05-22T08:15:00Z",
    excerpt: "Misconfigured mail records remain the leading vector for business email compromise (BEC). We breakdown how to implement strict authentication protocols to protect corporate brands.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1390
  },
  {
    _id: "mock-4",
    title: "OWASP Top 10 Web Configuration Audits: Hardening HTTP Headers",
    slug: "owasp-http-headers-hardening",
    publishedAt: "2026-05-19T14:00:00Z",
    excerpt: "Why Content-Security-Policy (CSP), Strict-Transport-Security, and X-Frame-Options are the first line of defense against cross-site scripting and modern clickjacking attacks.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1250
  },
  {
    _id: "mock-5",
    title: "The Critical Role of SSL/TLS Ciphers in Regulatory Compliance Frameworks",
    slug: "ssl-tls-regulatory-compliance",
    publishedAt: "2026-05-15T10:45:00Z",
    excerpt: "Outdated transport protocols are direct compliance violations under GDPR and PCI-DSS. Here is how to perform passive checks and audit your cryptography trust chains.",
    categories: [{ title: "Vulnerability Research" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2100
  },
  {
    _id: "mock-6",
    title: "Shadow IT Discovery: Passive Identification of Exposed Database and Administrative Ports",
    slug: "shadow-it-exposed-ports",
    publishedAt: "2026-05-10T16:20:00Z",
    excerpt: "Exposing SSH, RDP, or raw database interfaces to the public internet presents catastrophic risk. We explore how to inventory assets using regional passive telemetry databases.",
    categories: [{ title: "Network Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1670
  }
];

export default async function Page() {
  let posts = [];
  try {
    posts = await client.fetch(homepageBlogQuery);
  } catch (error) {
    console.error('Error fetching blog posts for homepage:', error);
  }

  // Use mock posts if Sanity query fails or yields empty results (mitigates "thin-content" penalties)
  if (!posts || posts.length === 0) {
    posts = MOCK_POSTS;
  }

  // Organize articles for publication layout
  const featuredPost = posts[0] || MOCK_POSTS[0];
  const secondaryArticles = posts.slice(1, 4).length > 0 ? posts.slice(1, 4) : MOCK_POSTS.slice(1, 4);

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
        {/* ================= 1. HERO SECTION ================= */}
        <section className="relative pt-28 pb-20 overflow-hidden border-b border-white/5 bg-[#070b12]">
          <div className="absolute inset-0 bg-[url('/matrix-bg.svg')] bg-repeat opacity-[0.01] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[#00ff88]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Heading and Value Proposition */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-[10px] font-mono uppercase tracking-widest">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Defensive Threat Research Center</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] uppercase">
                  ENTERPRISE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#38bdf8]">THREAT INTELLIGENCE</span> & AUDITING
                </h1>
                
                <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed max-w-xl">
                  ReconShield is a premium intelligence publication dedicated to documenting threat actor activities, verifying DNS security protocols, auditing cryptographic layers, and preventing network exposures.
                </p>
                
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/blog" className="px-5 py-3 bg-[#00ff88] hover:bg-[#00e077] text-surface-950 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                    Explore Publications
                  </Link>
                  <Link href="/scanner" className="px-5 py-3 bg-surface-900 hover:bg-surface-800 text-white border border-white/10 hover:border-white/20 text-xs font-mono uppercase tracking-widest rounded-xl transition-all">
                    Launch Scanner Suite
                  </Link>
                </div>
              </div>

              {/* Right Column: Animated SOC Telemetry Box */}
              <div className="lg:col-span-5 min-h-[352px] flex items-center">
                <DynamicHeroSocVisual />
              </div>

            </div>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-6 pt-12">
          <DynamicNativeBanner />
        </div>

        {/* ================= 2. FEATURED EDITORIAL RESEARCH ================= */}
        <section className="py-24 bg-[#05080f] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold">// FEATURED RESEARCH</h2>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            <div className="group">
              <Link href={`/blog/${featuredPost.slug?.current || featuredPost.slug}`} className="block bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Image Grid Column */}
                  <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[300px] bg-surface-950 overflow-hidden">
                    {featuredPost.mainImage ? (
                      <ResponsiveImage
                        image={featuredPost.mainImage}
                        alt={featuredPost.title}
                        fill={true}
                        priority={true}
                        sizes="(max-width: 1024px) 100vw, 680px"
                        className="group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-surface-900 to-surface-950 flex items-center justify-center">
                        <Shield className="w-20 h-20 text-[#00ff88]/10" />
                      </div>
                    )}
                    <div className="absolute top-6 left-6">
                      <span className="px-3.5 py-1.5 bg-[#00ff88]/90 text-surface-950 text-[10px] font-mono font-bold uppercase tracking-wider rounded">
                        {featuredPost.categories?.[0]?.title || 'OSINT'}
                      </span>
                    </div>
                  </div>

                  {/* Text Grid Column */}
                  <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                    <div>
                      <span className="block font-mono text-[9px] text-[#00ff88] uppercase tracking-[3px] mb-3">// PRIMARY BRIEFING</span>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-4 group-hover:text-[#00ff88] transition-colors leading-tight">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 font-sans">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5 text-[9px] font-mono text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#1a2332] flex items-center justify-center text-[#00ff88] text-[8px] font-bold">
                          {getInitials(featuredPost.author?.name)}
                        </div>
                        <span className="text-gray-300 font-sans font-bold">{featuredPost.author?.name || 'Surendra Reddy'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {calculateReadTime(featuredPost)} MIN</span>
                        <span>{formatDate(featuredPost.publishedAt || featuredPost._createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= 3. THREAT INTELLIGENCE HIGHLIGHTS ================= */}
        <section className="bg-[#05080f] py-12 border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <DynamicTopActiveThreats />
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-6 pt-12">
          <DynamicNativeBanner />
        </div>

        {/* ================= 4. LATEST CYBERSECURITY ARTICLES ================= */}
        <section className="py-24 bg-[#05080f] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">// RECENT DISCLOSURES</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-2 uppercase">Latest Intelligence Briefings</h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#00ff88] hover:text-white uppercase tracking-widest transition-colors">
                View All Articles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {secondaryArticles.map((post) => (
                <Link href={`/blog/${post.slug?.current || post.slug}`} key={post._id} className="group flex flex-col bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
                  <div className="relative aspect-video w-full bg-surface-950 overflow-hidden border-b border-white/5">
                    {post.mainImage ? (
                      <ResponsiveImage
                        image={post.mainImage}
                        alt={post.title}
                        width={360}
                        height={202}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 360px"
                        className="group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-surface-950 to-surface-900 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-[#00ff88]/10" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-[#00ff88] mb-3">
                      {post.categories?.[0]?.title || 'INTELLIGENCE'}
                    </span>
                    <h3 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-[#00ff88] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[9px] text-gray-400 uppercase">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {calculateReadTime(post)} MIN READ</span>
                      <span>{formatDate(post.publishedAt || post._createdAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5. RESEARCH CATEGORIES ================= */}
        <section className="py-24 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="font-mono text-xs text-[#00ff88] font-bold uppercase tracking-widest">// CATEGORY SILOS</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-2 uppercase">Topical Intelligence Hubs</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Threat Intelligence", icon: Target, slug: "threat-intelligence", color: "text-red-400" },
                { name: "OSINT & Analysis", icon: Search, slug: "osint", color: "text-[#00ff88]" },
                { name: "Web Security", icon: Shield, slug: "web-security", color: "text-blue-400" },
                { name: "Email Security", icon: Mail, slug: "email-security", color: "text-purple-400" },
                { name: "Network Security", icon: Network, slug: "network-security", color: "text-cyan-400" },
                { name: "Cloud Security", icon: Cpu, slug: "cloud-security", color: "text-orange-400" }
              ].map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <Link href={`/category/${cat.slug}`} key={idx} className="p-5 rounded-2xl bg-surface-900 border border-white/5 hover:border-[#00ff88]/30 transition-all duration-300 group flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-surface-950 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-white/5">
                      <Icon className={`w-5 h-5 ${cat.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-white group-hover:text-[#00ff88] transition-colors leading-tight">{cat.name.toUpperCase()}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= SEO INTERNAL LINK INDEX ================= */}
        <section className="py-20 bg-[#070b12] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold">// PLATFORM RESOURCE INDEX</h2>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Column 1: Popular Threat Intelligence */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Popular Threat Intelligence
                </h3>
                <ul className="space-y-2 text-xs font-mono">
                  <li><Link href="/ip/8.8.8.8" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>IP: 8.8.8.8</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/ip/1.1.1.1" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>IP: 1.1.1.1</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/ip/8.8.4.4" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>IP: 8.8.4.4</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/ip/1.0.0.1" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>IP: 1.0.0.1</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/ip/208.67.222.222" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>IP: 208.67.222.222</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/asn/AS15169" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>AS15169 (Google)</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/asn/AS13335" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>AS13335 (Cloudflare)</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/asn/AS714" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>AS714 (Apple)</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                </ul>
              </div>

              {/* Column 2: Security Header Research */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Security Header Research
                </h3>
                <ul className="space-y-2 text-xs font-mono">
                  <li><Link href="/headers/server" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>Server Response</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/headers/content-security-policy" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>Content Security Policy</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/headers/x-frame-options" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>X-Frame-Options</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/headers/strict-transport-security" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>HSTS Policy</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/headers/x-content-type-options" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>X-Content-Type-Options</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                </ul>
              </div>

              {/* Column 3: DNS Intelligence Resources */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> DNS Intelligence Resources
                </h3>
                <ul className="space-y-2 text-xs font-mono">
                  <li><Link href="/dns-records/google.com" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>google.com DNS</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/dns-records/reconshield.in" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>reconshield.in DNS</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/dns-records/github.com" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>github.com DNS</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/dns-records/cloudflare.com" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>cloudflare.com DNS</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/dns-records/microsoft.com" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>microsoft.com DNS</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/dns-records/yahoo.com" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>yahoo.com DNS</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/dns-records/apple.com" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>apple.com DNS</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                </ul>
              </div>

              {/* Column 4: Featured Cybersecurity Analysis */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" /> Featured Cybersecurity Analysis
                </h3>
                <ul className="space-y-2 text-xs font-mono">
                  <li><Link href="/ssl/google.com" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>google.com SSL</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/ssl/reconshield.in" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>reconshield.in SSL</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/ssl/github.com" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>github.com SSL</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/ssl/cloudflare.com" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>cloudflare.com SSL</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/ssl/microsoft.com" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>microsoft.com SSL</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/ssl/yahoo.com" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>yahoo.com SSL</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/ssl/apple.com" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>apple.com SSL</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                </ul>
              </div>

              {/* Column 5: Latest Research */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" /> Latest Research
                </h3>
                <ul className="space-y-2 text-xs font-mono">
                  <li><Link href="/blog/anatomy-of-passive-osint" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>Passive OSINT mapping</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/blog/securing-bgp-route-leaks" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>BGP Route Leaks Analysis</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/blog/spf-dkim-dmarc-blueprint" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>SPF/DKIM Blueprint</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/blog/owasp-http-headers-hardening" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>HTTP Headers Hardening</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/blog/ssl-tls-regulatory-compliance" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>SSL Compliance</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                  <li><Link href="/blog/shadow-it-exposed-ports" className="text-[#8a9bb0] hover:text-[#00ff88] transition-colors flex items-center justify-between"><span>Shadow IT Port Discovery</span> <ChevronRight className="w-3.5 h-3.5" /></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 6. COMPACT SCANNER CTA BANNER ================= */}
        <section className="py-20 bg-[#05080f] relative border-b border-white/5 overflow-hidden">
          {/* Accent glow lights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyber-500/[0.02] blur-[100px] rounded-full pointer-events-none -z-10" />
          <div className="absolute top-0 right-10 w-[200px] h-[200px] bg-[#00ff88]/[0.01] blur-[80px] rounded-full pointer-events-none -z-10" />

          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: CTA Title and Details */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-500/10 text-cyber-400 text-[10px] font-mono uppercase tracking-widest rounded">
                  <Terminal className="w-3.5 h-3.5" /> Passive Auditing Suite
                </div>
                
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight leading-tight">
                  Launch Passive Diagnostics Suite
                </h2>
                
                <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                  Run non-intrusive scans on target domains. Verify email security profiles, audit SSL/TLS cipher suites, and inspect response headers safely without direct packets targeting the server.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link 
                    href="/scanner" 
                    className="px-6 py-3.5 bg-[#00ff88] hover:bg-[#00e077] text-surface-950 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,136,0.15)] flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Launch Scanner</span>
                    <ArrowRight className="w-4 h-4 text-surface-950" />
                  </Link>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0" />
                    <span>Authorized Research Policy Compliant</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Subtle Scanner Console Preview */}
              <div className="lg:col-span-5 relative">
                <div className="w-full rounded-2xl border border-white/10 bg-surface-900/50 backdrop-blur-xl p-5 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-[0.1] pointer-events-none" />
                  
                  {/* Mock Window Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/30" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/30" />
                      <span className="w-2 h-2 rounded-full bg-green-500/30" />
                    </div>
                    <span className="font-mono text-[8px] text-gray-400 uppercase tracking-widest">passive_preview.sh</span>
                  </div>

                  {/* Mock Input Bar */}
                  <div className="bg-surface-950 border border-white/5 rounded-xl px-4 py-2.5 mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-400">target: <span className="text-[#00ff88]">example.com</span></span>
                    <span className="font-mono text-[9px] text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded tracking-widest animate-pulse uppercase">active</span>
                  </div>

                  {/* Mock Output Rows */}
                  <div className="space-y-2.5 font-mono text-[10px] text-gray-400">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88]" /> Email Auth (SPF/DMARC)</span>
                      <span className="text-[#00ff88]">[VALID]</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88]" /> SSL/TLS Cipher Suites</span>
                      <span className="text-cyber-400">[SECURE]</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88]" /> HTTP Security Headers</span>
                      <span className="text-purple-400">[AUDITED]</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= 7. ANALYST/AUTHOR SECTION ================= */}
        <section className="py-24 bg-[#0a0d14] border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              
              {/* Author Highlight Card */}
              <div className="bg-surface-900 border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 text-[#00ff88] text-[10px] font-mono uppercase tracking-widest rounded mb-6">
                    <Award className="w-3.5 h-3.5" /> Lead Researcher & Founder
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white mb-4">Surendra Reddy</h2>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 font-mono">
                    Surendra Reddy is a cybersecurity engineer, OSINT developer, and lead publisher of ReconShield. Specializing in defensive threat analysis and internet-facing assets mapping, Surendra oversees editorial validation, fact-checking technical guides, and securing programmatic resources.
                  </p>
                  <div className="space-y-2 mb-8">
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> Certified Threat Intelligence Analyst (CTIA)
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-[#00ff88]" /> Passive Reconnaissance and Threat Hunting Specialist
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6">
                  <div className="flex gap-4">
                    <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-1">LinkedIn <ChevronRight className="w-3 h-3" /></a>
                    <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-1">GitHub <ChevronRight className="w-3 h-3" /></a>
                  </div>
                  <Link href="/author/surendra-reddy" className="text-xs font-mono text-[#00ff88] hover:underline uppercase tracking-widest">
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
                  <h2 className="text-2xl font-display font-bold text-white mb-4">Editorial Integrity & Ethics</h2>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                    ReconShield is dedicated to lawful and authorized cybersecurity auditing. We believe that public threat intelligence must serve as defensive assets, not offensive instruction. Our editorial staff enforces strict constraints:
                  </p>
                  <ul className="space-y-4 text-xs text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-[#00ff88] font-mono font-bold shrink-0">1.</span>
                      <span><strong>Technical Validation:</strong> Vulnerabilities are tested in lab parameters and cross-referenced with vendor security disclosures.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00ff88] font-mono font-bold shrink-0">2.</span>
                      <span><strong>Zero Abuse Payload:</strong> We never distribute active exploit scripts. Our focus is configuration mitigation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00ff88] font-mono font-bold shrink-0">3.</span>
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

        {/* ================= 8. NEWSLETTER SECTION ================= */}
        <section className="py-24 bg-[#05080f] relative overflow-hidden">
          <div className="absolute inset-0 bg-[#00ff88]/5 -z-10 pointer-events-none" />
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Mail className="w-12 h-12 text-[#00ff88] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 uppercase tracking-wider">Stay Ahead of Emerging Threat Vectors</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Join thousands of cybersecurity analysts, developers, and compliance auditors who receive our weekly threat briefings, zero-day CVE alerts, and defensive tutorials.
            </p>
            
            <DynamicNewsletterForm 
              accentColor="bg-[#00ff88] hover:bg-[#00e077]"
              buttonTextColor="text-surface-950"
              inputClass="px-6 py-4 w-full sm:w-96 text-sm"
              buttonClass="px-8 py-4 text-xs font-mono tracking-widest font-bold"
            />
            <p className="text-[10px] text-gray-400 mt-4 font-mono uppercase tracking-wider">Fact checked intelligence. 100% spam-free. Unsubscribe anytime.</p>
          </div>
        </section>
      </div>
    </>
  );
}
