import AdsterraNative from "@/components/ads/AdsterraNative";
import AdsterraBanner from "@/components/ads/AdsterraBanner";
import React from 'react';
import { client, urlFor } from '@/utils/sanity';
import { Shield, Target, Search, Network, Cpu, Lock, CheckCircle2, Globe, Clock, ChevronRight, AlertTriangle, BookOpen } from 'lucide-react';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import { notFound } from 'next/navigation';

import { generateBaseMetadata, getCategoryFallbackImage } from '@/utils/metadata';

// ISR disabled, relying on Sanity webhook

// Static categorization mapping containing premium educational value and metadata
const CATEGORY_DATA = {
  'web-security': {
    title: 'Web Security',
    description: 'Deep dives into Content Security Policy (CSP), secure response headers, HTTPS encryption standards, cookie attributes, and security audits to protect modern applications.',
    longIntro: 'Web applications represent the largest external attack surface for modern enterprises. Securing them requires more than simple edge firewall configuration. It requires deep hardening of transport protocols, server responses, session flags, and access controls. Explore our peer-reviewed writeups and guides on mitigating OWASP top-security vulnerabilities.',
    icon: Shield,
    color: 'text-blue-400',
    bgColor: 'from-blue-500/10 to-transparent',
    faq: [
      {
        q: "What are HTTP security headers and why do they matter?",
        a: "HTTP security headers are response parameters sent by web servers to instruct browsers on security restrictions. Headers like Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), and X-Frame-Options prevent Cross-Site Scripting (XSS), session hijacking, and clickjacking."
      },
      {
        q: "How does SSL/TLS verification assist web security?",
        a: "SSL/TLS validation checks ensure cryptographic certificate transparency, verify the expiration parameters of root trust chains, and confirm that only secure cipher suites (such as TLS 1.3) are utilized."
      }
    ],
    tools: [
      { name: "HTTP Headers Scanner", path: "/tools/http-headers", desc: "Audit CSP, HSTS, and XSS defense flags." },
      { name: "SSL/TLS Certificate Checker", path: "/tools/ssl-checker", desc: "Verify cryptographic integrity and cipher health." },
      { name: "Cookie Security Audit", path: "/tools/http-headers", desc: "Analyze secure cookie flags and session policies." }
    ],
    fallbackIds: ['mock-3', 'mock-4', 'mock-5']
  },
  'network-security': {
    title: 'Network Security',
    description: 'Passive asset inventory, exposed host port auditing, routing security (BGP & RPKI), and threat telemetry validation.',
    longIntro: 'Defending corporate infrastructure requires continuous inventory of public-facing ports and active listening services. Unauthorized or forgotten ports (like RDP, SSH, or SQL endpoints) serve as primary entry paths for threat actors. Our guides explain how to leverage regional telemetry caches to monitor exposure boundaries passively.',
    icon: Network,
    color: 'text-cyan-400',
    bgColor: 'from-cyan-500/10 to-transparent',
    faq: [
      {
        q: "What is passive open port scanning?",
        a: "Passive port scanning involves querying cached global data repositories rather than sending packets directly to the destination server. This allows researchers to audit asset exposure without generating network noise or triggering intrusion alerts."
      },
      {
        q: "How does BGP hijacking affect organization routing?",
        a: "BGP hijacking occurs when a malicious Autonomous System (ASN) advertises false routing ranges, redirecting network traffic through unauthorized servers. Implementing RPKI and route filtering is critical to routing safety."
      }
    ],
    tools: [
      { name: "Open Port Scanner", path: "/tools/port-scanner", desc: "Scan passive threat logs for exposed system ports." },
      { name: "ASN IP Intelligence", path: "/tools/ip-lookup", desc: "Identify host registries and autonomous IP ranges." }
    ],
    fallbackIds: ['mock-2', 'mock-6']
  },
  'threat-intelligence': {
    title: 'Threat Intelligence',
    description: 'Indicators of compromise (IoC) analysis, malware attribution, CVE scoring audits, and active threat vector mapping.',
    longIntro: 'Modern defense relies on actionable indicators of compromise and vulnerability probabilities. Security teams must track active CVE releases, prioritize patches based on exploit likelihood datasets (EPSS), and fingerprint web application firewalls (WAF) to stay ahead of automated exploitation cycles.',
    icon: Target,
    color: 'text-red-400',
    bgColor: 'from-red-500/10 to-transparent',
    faq: [
      {
        q: "What is CVE and CVSS?",
        a: "Common Vulnerabilities and Exposures (CVE) is a database of public security flaws. The Common Vulnerability Scoring System (CVSS) scores the severity of these flaws from 0 to 10 based on exploit difficulty and impact."
      },
      {
        q: "What does Web Application Firewall (WAF) fingerprinting reveal?",
        a: "WAF fingerprinting matches server response patterns to identify active shield overlays (like Cloudflare or AWS WAF), verifying that web assets are protected against automated payloads."
      }
    ],
    tools: [
      { name: "Threat Intelligence Lookup", path: "/tools/vulnerability-scanner", desc: "Retrieve CVSS severity and exploit probabilities." },
      { name: "WAF & Tech Stack Detector", path: "/tools/tech-detector", desc: "Fingerprint active firewalls and origin frameworks." }
    ],
    fallbackIds: ['mock-2', 'mock-5']
  },
  'email-security': {
    title: 'Email Security',
    description: 'Implementing Sender Policy Framework (SPF), DKIM message signatures, and DMARC spoofing block parameters.',
    longIntro: 'Phishing campaigns and business email compromise remain the leading vectors of corporate exploitation. Implementing strict protocol records prevents spoofing, blocks domain hijacking attempts, and guarantees the cryptographic validation of outbound emails.',
    icon: Lock,
    color: 'text-purple-400',
    bgColor: 'from-purple-500/10 to-transparent',
    faq: [
      {
        q: "Why are SPF, DKIM, and DMARC essential?",
        a: "They form a three-tier defense: SPF lists authorized senders, DKIM verifies that emails are signed cryptographically, and DMARC tells receiving mail servers how to handle failures (e.g., rejecting them)."
      },
      {
        q: "What is an MX record lookup?",
        a: "MX (Mail Exchange) record lookup retrieves the authoritative servers configured to handle emails for a domain, ensuring mail flow configuration conforms to security guidelines."
      }
    ],
    tools: [
      { name: "Email Authentication Audit", path: "/tools/email-security", desc: "Verify DMARC, DKIM, and SPF parameters." },
      { name: "DNS Mail Record Lookup", path: "/tools/dns-lookup", desc: "Audit mail server routing paths." }
    ],
    fallbackIds: ['mock-3']
  },
  'osint': {
    title: 'OSINT & Analysis',
    description: 'Passive domain enumeration, WHOIS registry diagnostics, subdomain mapping, and global DNS propagation tracking.',
    longIntro: 'Open Source Intelligence (OSINT) is the cornerstone of passive threat mapping. By mining public certificate records, public WHOIS databases, and recursive DNS propagation metrics, security researchers can map target architectures entirely out-of-band without touching client servers.',
    icon: Search,
    color: 'text-matrix-400',
    bgColor: 'from-matrix-500/10 to-transparent',
    faq: [
      {
        q: "What is passive subdomain enumeration?",
        a: "Passive enumeration aggregates subdomain lists using public certificate logs, cached DNS caches, and passive search data, keeping target assets completely untouched."
      },
      {
        q: "Why audit domain WHOIS registries?",
        a: "WHOIS lookups reveal domain registrar locks, registration history, expiration indicators, and authoritative nameserver delegations to prevent domain takeover attempts."
      }
    ],
    tools: [
      { name: "WHOIS Domain Lookup", path: "/tools/whois", desc: "Analyze nameservers, registrar records, and expiry statuses." },
      { name: "Subdomain Finder", path: "/tools/subdomain-finder", desc: "Enumerate domain mappings from certificate records." },
      { name: "DNS Records Lookup", path: "/tools/dns-lookup", desc: "Retrieve A/MX/TXT records and check DNSSEC status." }
    ],
    fallbackIds: ['mock-1', 'mock-6']
  },
  'cloud-security': {
    title: 'Cloud Security',
    description: 'Auditing Content Delivery Networks (CDNs), verifying cloud-facing assets, and configuring cryptographic certificates.',
    longIntro: 'Migrating assets to cloud vendors introduces complex shared responsibility matrices. Organizations must continuously monitor exposed Cloud databases, verify origin CDN routing rules, check for serverless endpoint exposure, and audit TLS trust configurations.',
    icon: Cpu,
    color: 'text-orange-400',
    bgColor: 'from-orange-500/10 to-transparent',
    faq: [
      {
        q: "What does the shared responsibility model require in cloud security?",
        a: "Cloud providers secure physical hosts and virtualization networks, while client organizations are responsible for protecting virtual instances, data structures, and IAM permissions."
      },
      {
        q: "How do CDNs mitigate web exposures?",
        a: "CDNs shield origin servers by caching content, distributing traffic, and applying inline firewalls, reducing DDoS vulnerability and protecting IP addresses from direct scans."
      }
    ],
    tools: [
      { name: "Tech Stack Detector", path: "/tools/tech-detector", desc: "Identify cloud infrastructure and CDN providers." },
      { name: "SSL Cryptography Auditor", path: "/tools/ssl-checker", desc: "Audit TLS configurations on cloud load balancers." }
    ],
    fallbackIds: ['mock-2', 'mock-5']
  }
};

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
    categories: [{ title: "Email Security" }],
    author: { name: "Email Security" },
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
    categories: [{ title: "Web Security" }],
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

export async function generateStaticParams() {
  return Object.keys(CATEGORY_DATA).map(slug => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = CATEGORY_DATA[slug];
  if (!data) return { title: 'Category Not Found' };

  const image = getCategoryFallbackImage(data.title);

  return generateBaseMetadata({
    title: `${data.title} Cybersecurity Research & Guides`,
    description: data.description,
    path: `/category/${slug}`,
    image: image
  });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const data = CATEGORY_DATA[slug];

  if (!data) {
    notFound();
  }

  const IconComponent = data.icon;
  let posts = [];

  try {
    const groq = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**")) && count(categories[]->title[lower(@) == lower($catTitle)]) > 0] | order(coalesce(publishedAt, _createdAt) desc) {
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
    posts = await client.fetch(groq, { catTitle: data.title }, { next: { tags: [`category-${slug}`] } });
  } catch (error) {
    console.error('Error fetching category posts:', error);
  }

  // Resilient fallback logic for offline/blank Sanity configurations to avoid empty/thin page penalties
  if (!posts || posts.length === 0) {
    posts = MOCK_POSTS.filter(p => data.fallbackIds.includes(p._id));
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://reconshield.in/category/${slug}`,
        "url": `https://reconshield.in/category/${slug}`,
        "name": `${data.title} Cybersecurity Intelligence Guides`,
        "description": data.description,
        "image": `https://reconshield.in${getCategoryFallbackImage(data.title)}`,
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
          { "@type": "ListItem", "position": 2, "name": "Categories", "item": `https://reconshield.in/category/${slug}` },
          { "@type": "ListItem", "position": 3, "name": data.title, "item": `https://reconshield.in/category/${slug}` }
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

      <div className="bg-[#05080f] min-h-screen text-white pb-24">
        {/* Navigation Breadcrumb */}
        <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-6">
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-[2px] mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>›</span>
            <span className="text-gray-400">CATEGORIES</span>
            <span>›</span>
            <span className={`text-[#00ff88]`}>{data.title.toUpperCase()}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="max-w-[1200px] mx-auto px-6 mb-16">
          <div className={`bg-gradient-to-br ${data.bgColor} border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl`}>
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <IconComponent className="w-48 h-48" />
            </div>

            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 border border-white/10 text-gray-400 text-[10px] font-mono uppercase tracking-widest mb-6">
                <IconComponent className={`w-3.5 h-3.5 ${data.color}`} />
                <span>Cybersecurity Directive</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 uppercase">{data.title}</h1>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 font-light">{data.longIntro}</p>
              <div className="h-px bg-white/10 my-6" />
              <p className="text-gray-400 text-xs font-mono">// Objective: Map vectors, prevent exploitation, verify configurations.</p>
            </div>
          </div>
        </section>

        {/* Layout Grid */}
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Articles Grid (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-3">
              <BookOpen className="w-4 h-4 text-matrix-400" />
              <h2 className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest">Category Research briefings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post, idx) => {
                const cardIndex = idx + 1;
                const showNative = cardIndex % 6 === 0 && cardIndex % 12 !== 0;
                const showBanner300 = cardIndex % 12 === 0;

                return (
                  <React.Fragment key={post._id}>
                    <BlogCard post={post} defaultCategory={data.title} />

                    {showNative && (
                      <div className="col-span-1 md:col-span-2 my-6">
                        <AdsterraNative />
                      </div>
                    )}

                    {showBanner300 && (
                      <div className="col-span-1 md:col-span-2 my-6 flex justify-center">
                        <AdsterraBanner type="300x250" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

          </div>

          {/* Right Column: Sidebar - Tools & FAQs (1/3 width) */}
          <div className="space-y-12">
            
            {/* Related Auditing Tools */}
            <div className="bg-surface-900 border border-white/5 rounded-2xl p-6">
              <h3 className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1 h-3.5 bg-matrix-400 rounded" /> Related Scanners
              </h3>
              <div className="space-y-4">
                {data.tools.map((tool, idx) => (
                  <Link href={tool.path} key={idx} className="block p-4 bg-surface-950 border border-white/5 hover:border-matrix-400/30 rounded-xl group transition-all">
                    <h4 className="text-white text-xs font-bold mb-1 group-hover:text-matrix-400 transition-colors">{tool.name}</h4>
                    <p className="text-[11px] text-gray-500 leading-normal">{tool.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Category FAQ */}
            <div className="bg-surface-900 border border-white/5 rounded-2xl p-6">
              <h3 className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1 h-3.5 bg-matrix-400 rounded" /> Category FAQs
              </h3>
              <div className="space-y-6">
                {data.faq.map((item, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <h4 className="text-white text-xs font-bold mb-2">{item.q}</h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Sidebar 300x250 - Desktop only (hidden below 1024px / lg) */}
            <div className="hidden lg:block sticky top-[120px] pt-6 self-start">
              <AdsterraBanner type="300x250" />
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
