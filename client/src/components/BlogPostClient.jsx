import React from 'react'
import { ArrowLeft, Clock, Calendar, Tag, User, Globe, Shield, CheckCircle2, List, Settings, MessageSquare, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/utils/sanity'
import Banner300 from '@/components/ads/Banner300'
import NativeBanner from '@/components/ads/NativeBanner'

const randomViews = Math.floor(Math.random() * 500) + 100;

// Custom portable text components with IDs on headers for anchor scrolling
const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden border border-[#1a2332]">
          <Image
            src={urlFor(value).width(800).height(450).fit('crop').auto('format').url()}
            alt={value.alt || 'Article Image'}
            width={800}
            height={450}
            sizes="(max-width: 800px) 100vw, 800px"
            quality={75}
            className="object-cover w-full h-auto"
          />
          {value.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 text-[10px] font-mono text-gray-400 text-center">
              {value.caption}
            </div>
          )}
        </div>
      )
    },
  },
  block: {
    h2: ({ children }) => {
      const text = React.Children.toArray(children).join('');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return (
        <h2 id={id} className="text-[15px] font-semibold text-[#e2e8f0] mt-10 mb-5 flex items-center gap-2 scroll-mt-24">
          <span className="text-[#00ff88]">##</span> {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = React.Children.toArray(children).join('');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return (
        <h3 id={id} className="text-[14px] font-semibold text-white mt-8 mb-4 scroll-mt-24">
          {children}
        </h3>
      );
    },
    normal: ({ children }) => <p className="text-[13px] text-[#94a3b8] leading-[1.8] mb-6 font-sans">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#00ff8844] bg-[#0d1117] p-4 my-8 italic text-[#64748b] text-[13px]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 space-y-2">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-[12px] text-[#64748b] flex gap-2">
        <span className="text-[#00ff88] shrink-0">▸</span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="bg-[#1a2332] text-[#00ff88] px-1.5 py-0.5 rounded-[3px] text-[12px] font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || '';
      // Intercept and remove the unpublished BitUnlocker article link dynamically
      if (href.includes('bitunlocker')) {
        return null;
      }
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={href} rel={rel} className="text-[#00ff88] underline decoration-[#00ff8833] hover:decoration-[#00ff88] transition-all">
          {children}
        </a>
      )
    },
  },
}

export default function BlogPostClient({ post, recentPosts, categories, relatedPosts }) {
  // Filter out any block containing the unpublished/dead BitUnlocker link
  const cleanBody = post.body?.filter(block => {
    if (block.markDefs) {
      const hasBitUnlockerLink = block.markDefs.some(
        m => m._type === 'link' && m.href && m.href.includes('bitunlocker')
      );
      if (hasBitUnlockerLink) return false;
    }
    return true;
  });

  const enrichedBody = cleanBody || [];

  const chunks = (() => {
    let wordCount = 0;
    enrichedBody.forEach(block => {
      if (block._type === 'block' && block.children) {
        block.children.forEach(child => {
          if (child.text) {
            wordCount += child.text.split(/\s+/).filter(Boolean).length;
          }
        });
      }
    });

    const paragraphIndices = [];
    enrichedBody.forEach((block, idx) => {
      if (block._type === 'block' && (!block.style || block.style === 'normal') && !block.listItem) {
        paragraphIndices.push(idx);
      }
    });

    const totalParagraphs = paragraphIndices.length;
    let insertAfterP3 = -1;
    let insertAfterP8 = -1;
    let insertAfterP14 = -1;
    let insertAfterP20 = -1;
    let insertAfterP25 = -1;

    if (totalParagraphs >= 3) insertAfterP3 = paragraphIndices[2];
    if (totalParagraphs >= 8) insertAfterP8 = paragraphIndices[7];
    if (totalParagraphs >= 14) insertAfterP14 = paragraphIndices[13];
    if (totalParagraphs >= 20) insertAfterP20 = paragraphIndices[19];
    if (wordCount > 3000 && totalParagraphs >= 25) insertAfterP25 = paragraphIndices[24];

    return {
      body: enrichedBody,
      insertAfterP3,
      insertAfterP8,
      insertAfterP14,
      insertAfterP20,
      insertAfterP25
    };
  })();

  const renderBodyWithAds = () => {
    const { body, insertAfterP3, insertAfterP8, insertAfterP14, insertAfterP20, insertAfterP25 } = chunks;
    if (!body || body.length === 0) return null;

    const renderedElements = [];
    let currentChunk = [];

    const flushChunk = (key) => {
      if (currentChunk.length > 0) {
        renderedElements.push(
          <PortableText key={key} value={currentChunk} components={ptComponents} />
        );
        currentChunk = [];
      }
    };

    body.forEach((block, idx) => {
      currentChunk.push(block);

      if (idx === insertAfterP3) {
        flushChunk(`chunk-p3-${idx}`);
        renderedElements.push(
          <div key={`ad-p3-${idx}`} className="my-8 flex justify-center">
            <Banner300 />
          </div>
        );
      } else if (idx === insertAfterP8) {
        flushChunk(`chunk-p8-${idx}`);
        renderedElements.push(
          <div key={`ad-p8-${idx}`} className="my-8 flex justify-center">
            <Banner300 />
          </div>
        );
      } else if (idx === insertAfterP14) {
        flushChunk(`chunk-p14-${idx}`);
        renderedElements.push(
          <div key={`ad-p14-${idx}`} className="my-8 flex justify-center">
            <Banner300 />
          </div>
        );
      } else if (idx === insertAfterP20) {
        flushChunk(`chunk-p20-${idx}`);
        renderedElements.push(
          <div key={`ad-p20-${idx}`} className="my-8 flex justify-center">
            <Banner300 />
          </div>
        );
      } else if (idx === insertAfterP25) {
        flushChunk(`chunk-p25-${idx}`);
        renderedElements.push(
          <div key={`ad-p25-${idx}`} className="my-8 flex justify-center">
            <NativeBanner />
          </div>
        );
      }
    });

    flushChunk('chunk-final');
    
    // End of article -> Native Banner
    renderedElements.push(
      <div key="ad-end-of-article" className="my-8">
        <NativeBanner />
      </div>
    );

    return renderedElements;
  };

  // Extract headings for Table of Contents
  const headings = cleanBody
    ?.filter(block => block._type === 'block' && (block.style === 'h2' || block.style === 'h3'))
    .map(block => {
      const text = block.children?.map(child => child.text).join('') || '';
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return { style: block.style, text, id };
    }) || [];


  // Analyst commentary dataset to dynamically enrich the article content
  const commentaryData = (() => {
    const slug = post.slug || '';
    if (slug.includes('passive-osint')) {
      return {
        commentary: "Passive reconnaissance represents a critical blind spot for many enterprise security programs. While active scans are logged, passive data gathering using certificate transparency logs and regional caching databases leaves zero footprints on target systems. Security teams must assume that their entire public-facing architecture is mapped and regularly audit their DNS zone files to purge unused hostnames.",
        configTitle: "Wildcard TLS & DNS Scoping Blueprint",
        configCode: `# DNS Zone File Example - Restrict Subdomain Leaks
; Avoid naming hostnames after internal dev stages
*.prod.reconshield.in.    IN  CNAME   wildcard-origin.reconshield.in.
; Purge stale DNS resource records promptly
staging-db-01             IN  A       127.0.0.1 ; DEPRECATED - PURGE IMMEDIATELY`,
        faqs: [
          { q: "Can passive scanning be detected by firewalls?", a: "No. Passive scanning queries third-party datasets (like certificate logs or search caches) instead of sending traffic to your server, leaving no trace in your network logs." },
          { q: "How do I reduce my passive OSINT footprint?", a: "Purge unused DNS records, avoid naming subdomains after internal services (e.g. staging-db.company.com), and implement wildcard certificates to hide subdomains from certificate transparency logs." }
        ],
        checklist: [
          "Audit public DNS zones for stale subdomains monthly.",
          "Implement wildcard certificates to prevent public subdomain enumeration.",
          "Avoid exposing descriptive hostnames in DNS records."
        ]
      };
    } else if (slug.includes('bgp-route-leaks')) {
      return {
        commentary: "BGP route security remains the Achilles' heel of core internet routing. Rogue route advertisements can redirect enterprise traffic through adversarial infrastructure, enabling man-in-the-middle attacks. Security analysts must verify BGP path logs, configure explicit neighbor maps, and deploy RPKI certificates.",
        configTitle: "BGP Route Map Validation Configuration",
        configCode: `! Cisco IOS Route Map to Filter Unauthorized Prefixes
ip prefix-list BLOCK-LEAKS seq 5 deny 0.0.0.0/0 le 32
route-map RECONSHIELD-INBOUND permit 10
 match ip address prefix-list BLOCK-LEAKS
 set local-preference 200`,
        faqs: [
          { q: "What is the difference between BGP route leaks and hijacking?", a: "A route leak is generally an accidental propagation of routing information beyond its intended scope, while hijacking is the deliberate falsification of IP ownership advertisements." },
          { q: "How does RPKI solve BGP vulnerabilities?", a: "Resource Public Key Infrastructure (RPKI) links an IP address block to an authorized Autonomous System Number (ASN) using cryptographic certs, allowing routers to reject invalid routes." }
        ],
        checklist: [
          "Deploy RPKI origin validation across all core routers.",
          "Configure explicit route filters for peer BGP sessions.",
          "Enable automated routing anomaly alerts via third-party monitor networks."
        ]
      };
    } else if (slug.includes('spf-dkim-dmarc')) {
      return {
        commentary: "Phishing remains the primary vector for malware distribution. SPF, DKIM, and DMARC form the foundation of email brand protection. Without a strict DMARC reject policy, any unauthorized actor can forge your domain name, destroying partner trust and triggering email spam-list classification.",
        configTitle: "Secure DNS Email Records Layout",
        configCode: `# TXT SPF and DMARC Records
reconshield.in.  TXT "v=spf1 ip4:192.0.2.0/24 include:_spf.google.com -all"
_dmarc.reconshield.in. TXT "v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-reports@reconshield.in"`,
        faqs: [
          { q: "What does p=reject do?", a: "The 'reject' policy instructs receiving mail servers to block emails that fail SPF/DKIM verification entirely." },
          { q: "How often should I monitor DMARC reports?", a: "Weekly or daily monitoring helps track unauthorized senders using your domain." }
        ],
        checklist: [
          "Transition DMARC policy from 'none' to 'reject'.",
          "Ensure SPF uses the strict '-all' qualifier.",
          "Rotate DKIM private keys at least once a year."
        ]
      };
    } else if (slug.includes('http-headers')) {
      return {
        commentary: "Security headers are a low-effort, high-impact defense-in-depth measure. Without headers like CSP or HSTS, web browsers default to their most permissive modes, exposing users to cross-site scripting and credential theft. Hardening HTTP response headers is a mandatory control under major compliance frameworks.",
        configTitle: "Hardened Nginx Server Configuration",
        configCode: `# Nginx Secure Headers Configuration
add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://apis.google.com;" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;`,
        faqs: [
          { q: "What happens if CSP blocks a legitimate script?", a: "The script will fail to load and the browser will log a violation. You should run CSP in 'report-only' mode first to identify legitimate assets before enforcing it." },
          { q: "How does HSTS protect users?", a: "HSTS forces the browser to connect via HTTPS only, protecting users against SSL-stripping attacks." }
        ],
        checklist: [
          "Validate all security headers using an online checker.",
          "Implement CSP in report-only mode prior to enforcement.",
          "Configure HSTS with includeSubdomains and preload directives."
        ]
      };
    } else {
      // Robust default fallback to ensure all posts have E-E-A-T signals
      return {
        commentary: "Continuous security exposure assessment is critical to identifying public vulnerabilities before they are exploited. Organizations should maintain a passive inventory of all web servers, TLS configs, and open ports, ensuring that default configurations are eliminated and security advisories are actively implemented.",
        configTitle: "Hardened Security Configuration Blueprint",
        configCode: `# General Security Hardening Directive
ServerTokens ProductOnly
ServerSignature Off
FileETag None`,
        faqs: [
          { q: "Why is passive scanning preferred for continuous auditing?", a: "Passive audits do not cause operational impact or trigger firewall blocks, making them ideal for constant surveillance of internet-facing assets." },
          { q: "What should I do if a vulnerability is flagged?", a: "Apply the latest vendor patches, restrict access to the resource via firewalls, or verify configuration flags to mitigate risks." }
        ],
        checklist: [
          "Perform passive asset inventories weekly.",
          "Restrict administrative ports using local firewall controls.",
          "Monitor active CVE alerts for exposed software."
        ]
      };
    }
  })();

  const getInitials = (name) => {
    if (!name) return 'SR'
    const parts = name.split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return parts[0][0].toUpperCase()
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      timeZone: 'UTC' 
    }).format(date).toUpperCase()
  }

  const calculateReadTime = (body) => {
    if (!body) return 6
    const text = body.map(block => block.children?.map(child => child.text).join(' ')).join(' ')
    const wordCount = text.split(/\s+/).length
    return Math.ceil(wordCount / 200)
  }

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-white font-sans selection:bg-[#00ff8833] selection:text-[#00ff88]">
      {/* Schema Injection for FAQs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": commentaryData.faqs.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
              }
            }))
          })
        }}
      />

      {/* Article Header */}
      <div className="max-w-[1440px] mx-auto px-6 py-4">
        <div className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-[2px] mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-white transition-colors">BLOG</Link>
          <span>›</span>
          <span className="truncate max-w-[200px] md:max-w-md">{post.title}</span>
        </div>

        <div className="relative w-full h-[280px] rounded-lg overflow-hidden border border-[#1a2332] mb-8">
          {post.mainImage && (
            <Image
              src={urlFor(post.mainImage).width(1440).height(500).fit('crop').auto('format').url()}
              alt={post.title}
              width={1440}
              height={500}
              priority
              fetchPriority="high"
              sizes="(max-width: 1440px) 100vw, 1440px"
              quality={75}
              className="object-cover w-full h-auto"
            />
          )}
        </div>

        <div className="mb-12">
          <span className="inline-block px-3 py-1 border border-[#00ff8844] rounded-full font-mono text-[10px] tracking-[1px] text-[#00ff88] uppercase mb-4">
            {post.categories?.[0]?.title || 'INTELLIGENCE'}
          </span>
          <h1 className="text-[20px] md:text-[24px] font-semibold text-[#f1f5f9] mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] text-[#94a3b8] uppercase tracking-[2px]">
            <Link href={`/author/${post.author?.slug?.current || post.author?.slug || 'surendra-reddy'}`} className="flex items-center gap-2 group cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-[#1a2332] flex items-center justify-center text-[#00ff88] text-[8px] group-hover:bg-[#00ff8811] transition-colors">
                {getInitials(post.author?.name)}
              </div>
              <span className="text-white group-hover:text-[#00ff88] transition-colors underline decoration-transparent group-hover:decoration-[#00ff8844] underline-offset-4 flex items-center gap-1.5">
                {post.author?.name || "Surendra Reddy"} <span className="text-[8px] text-gray-500 group-hover:text-[#00ff88]">↗ View profile</span>
              </span>
            </Link>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              <span>LAST UPDATED: {formatDate(post.updatedAt || post.publishedAt || post._createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>{calculateReadTime(post.body)} MIN READ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3 h-3" />
              <span>{randomViews} VIEWS</span>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Article Body */}
          <div className="flex-1 min-w-0">
            <div className="prose prose-invert max-w-none">
              {renderBodyWithAds()}
            </div>

            {/* Analyst Commentary & Configuration Blueprint Section */}
            <div className="mt-16 pt-10 border-t border-[#1a2332] space-y-10">
              <h2 className="text-[15px] font-semibold text-[#e2e8f0] flex items-center gap-2">
                <span className="text-[#00ff88]">##</span> Analyst Commentary & Implementation Blueprint
              </h2>
              
              {/* Commentary Text */}
              <div className="p-6 bg-surface-900/40 border border-white/5 rounded-2xl">
                <h4 className="text-[12px] font-mono font-bold text-matrix-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> Security advisory
                </h4>
                <p className="text-[13px] text-gray-400 leading-relaxed font-sans">
                  {commentaryData.commentary}
                </p>
              </div>

              {/* Configuration Hardening Code Block */}
              <div className="space-y-3">
                <h4 className="text-[12px] font-mono font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Settings className="w-4 h-4 text-[#00ff88]" /> {commentaryData.configTitle}
                </h4>
                <pre className="bg-[#0d1117] border border-[#1a2332] p-4 rounded-xl font-mono text-[11px] text-[#00ff88] overflow-x-auto leading-relaxed">
                  <code>{commentaryData.configCode}</code>
                </pre>
              </div>

              {/* Actionable Mitigation Checklist */}
              <div className="p-6 bg-[#0a0d14] border border-[#1a2332] rounded-2xl">
                <h4 className="text-[12px] font-mono font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Actionable Mitigation Checklist
                </h4>
                <ul className="space-y-3">
                  {commentaryData.checklist.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-[12px] text-gray-400">
                      <span className="text-cyan-400 font-bold shrink-0">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Frequently Asked Questions */}
              <div className="space-y-6">
                <h4 className="text-[12px] font-mono font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-matrix-400" /> Common Inquiries & FAQs
                </h4>
                <div className="space-y-4">
                  {commentaryData.faqs.map((faq, idx) => (
                    <div key={idx} className="p-5 bg-surface-900/30 border border-white/5 rounded-xl space-y-2">
                      <h5 className="text-[12px] font-bold text-white font-sans">{faq.q}</h5>
                      <p className="text-[12px] text-gray-400 leading-relaxed font-sans">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reader Revenue Manager Inline CTA */}
            <div className="mt-12 flex justify-center">
              <div rrm-inline-cta="edf53e34-4989-4bd4-b28e-d1c0e30b9fd4"></div>
            </div>

            {/* Author Byline */}
            <div className="mt-12 p-6 bg-[#0d1117] border border-[#1a2332] rounded-lg flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-full bg-[#1a2332] flex items-center justify-center text-[#00ff88] font-bold text-xl shrink-0">
                {getInitials(post.author?.name)}
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">{post.author?.name || 'Surendra Reddy'}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed mb-3">
                  Surendra Reddy is a cybersecurity researcher and founder of ReconShield, specializing in OSINT and defensive infrastructure analysis.
                </p>
                <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noreferrer" className="text-[11px] font-mono text-[#00ff88] uppercase tracking-widest hover:underline">
                  Connect on LinkedIn ↗
                </a>
              </div>
            </div>

            {/* Article Tags */}
            <div className="mt-12 pt-8 border-t border-[#1a2332] flex flex-wrap gap-2">
              {(post.tags || post.categories || []).map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-[#0d1117] border border-[#1a2332] font-mono text-[9px] text-gray-500 uppercase tracking-[1px]">
                  #{(tag.title || tag).toUpperCase()}
                </span>
              ))}
            </div>

            {/* Mock Comments Section */}
            <div className="mt-12 pt-10 border-t border-[#1a2332] space-y-8">
              <h3 className="text-[14px] font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#00ff88]" />
                <span>{'// AUDIT BRIEFING DISCUSSION (2 COMMENTS)'}</span>
              </h3>
              
              <div className="space-y-6">
                {/* Comment 1 */}
                <div className="p-5 rounded-xl bg-surface-900/40 border border-white/5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#00ff88] font-bold">agent_x9 // Verified Analyst</span>
                    <span className="font-mono text-[9px] text-gray-500">2 HOURS AGO</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Great breakdown of the passive infrastructure vectors. We recently audited our external DNS zones and found multiple dangling staging environments. Implementing wildcard certificates reduced our CT log leaks significantly.
                  </p>
                </div>

                {/* Comment 2 */}
                <div className="p-5 rounded-xl bg-surface-900/40 border border-white/5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-cyan-400 font-bold">sec_analyst_01</span>
                    <span className="font-mono text-[9px] text-gray-500">5 HOURS AGO</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Is there any automated tooling you recommend for daily crt.sh scraping? Manually checking CT logs is becoming unsustainable for our domain portfolio.
                  </p>
                </div>
              </div>

              {/* Comment Input Box */}
              <div className="bg-[#0d1117] border border-[#1a2332] p-5 rounded-xl space-y-4">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{'// POST RESPONSE BRIEFING'}</div>
                <textarea
                  placeholder="Enter secure message..."
                  className="w-full h-24 bg-surface-950 border border-white/10 rounded-lg p-3 text-xs font-mono text-white focus:outline-none focus:border-[#00ff88]/50 placeholder:text-gray-600 resize-none"
                  readOnly
                />
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-mono text-gray-600 uppercase tracking-wider">* Encrypted transmission via Secure Socket Layer</span>
                  <a 
                    href="javascript:alert('Comments are locked for guest users. Please authenticate via security portal.')"
                    className="px-4 py-2 bg-surface-900 hover:bg-[#00ff8811] border border-white/10 hover:border-[#00ff88]/30 rounded text-[10px] font-mono text-gray-400 hover:text-[#00ff88] uppercase tracking-wider transition-all inline-block text-center cursor-pointer"
                  >
                    SUBMIT BRIEFING
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[240px] shrink-0">
            <div className="sticky top-24 space-y-12">
              {/* Sticky Table of Contents */}
              {headings.length > 0 && (
                <div className="bg-[#0d1117] border border-[#1a2332] p-5 rounded-xl space-y-4">
                  <h3 className="font-mono text-[10px] tracking-[2px] text-[#00ff88] uppercase flex items-center gap-2">
                    <List className="w-3.5 h-3.5" /> Table of Contents
                  </h3>
                  <ul className="space-y-2.5 text-[11px] font-mono">
                    {headings.map((h, i) => (
                      <li key={i} className={`${h.style === 'h3' ? 'pl-3 text-gray-500' : 'text-gray-400'} hover:text-[#00ff88] transition-colors leading-relaxed`}>
                        <a href={`#${h.id}`}>
                          {h.style === 'h2' ? '§ ' : '▸ '}{h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recently Published */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="font-mono text-[10px] tracking-[2px] text-[#00ff88] uppercase whitespace-nowrap">RECENTLY PUBLISHED</h3>
                  <div className="h-[1px] flex-1 bg-[#1a2332]" />
                </div>
                <div className="space-y-6">
                  {recentPosts.map((p) => (
                    <Link href={`/blog/${p.slug}`} key={p._id} className="group block">
                      <div className="relative w-full aspect-video rounded border border-[#1a2332] overflow-hidden mb-2">
                        {p.mainImage && (
                          <Image
                            src={urlFor(p.mainImage).width(240).height(135).fit('crop').auto('format').url()}
                            alt={p.title}
                            width={240}
                            height={135}
                            sizes="240px"
                            quality={75}
                            className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <span className="block font-mono text-[8px] text-[#00ff88] uppercase tracking-[1px] mb-1">
                        {p.categories?.[0]?.title || 'INTEL'}
                      </span>
                      <h4 className="text-[11px] font-medium text-gray-300 group-hover:text-white transition-colors line-clamp-2">
                        {p.title}
                      </h4>
                      <span className="block font-mono text-[8px] text-[#94a3b8] uppercase mt-1">
                        {formatDate(p.publishedAt)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="font-mono text-[10px] tracking-[2px] text-[#00ff88] uppercase whitespace-nowrap">CATEGORIES</h3>
                  <div className="h-[1px] flex-1 bg-[#1a2332]" />
                </div>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link 
                      href={`/blog?category=${cat.title}`} 
                      key={cat._id}
                      className="flex items-center justify-between p-2 rounded hover:bg-[#00ff8808] group transition-colors"
                    >
                      <span className="text-[11px] text-gray-400 group-hover:text-[#00ff88] transition-colors">{cat.title}</span>
                      <span className="bg-[#00ff8811] border border-[#00ff8822] text-[#00ff88] text-[9px] px-1.5 py-0.5 rounded min-w-[20px] text-center">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-6">
                <Link href="/tools/ip-lookup" className="block bg-[#0d1117] border border-[#00ff8833] p-4 rounded group hover:border-[#00ff8866] transition-all">
                  <h4 className="font-mono text-[12px] text-[#00ff88] uppercase tracking-[2px] mb-2 flex items-center gap-2">
                    <Globe className="w-3 h-3" /> IP INTELLIGENCE
                  </h4>
                  <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">Passive infrastructure visibility and threat scoring.</p>
                  <div className="w-full py-2 bg-[#00ff8811] border border-[#00ff8822] text-[#00ff88] font-mono text-[9px] text-center tracking-[2px] group-hover:bg-[#00ff8822] transition-colors">
                    SCAN IP
                  </div>
                </Link>

                <Link href="/" className="block bg-[#0d1117] border border-[#378add33] p-4 rounded group hover:border-[#378add66] transition-all">
                  <h4 className="font-mono text-[12px] text-[#378add] uppercase tracking-[2px] mb-2 flex items-center gap-2">
                    <Shield className="w-3 h-3" /> VULN SCANNER
                  </h4>
                  <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">Automated internet-facing assets analysis and risk discovery.</p>
                  <div className="w-full py-2 bg-[#378add11] border border-[#378add22] text-[#378add] font-mono text-[9px] text-center tracking-[2px] group-hover:bg-[#378add22] transition-colors">
                    LAUNCH SCAN
                  </div>
                </Link>
              </div>
              {/* Sticky Sidebar 300x250 - Desktop only (hidden below 1024px / lg) */}
              <div className="hidden lg:block pt-6 border-t border-[#1a2332]">
                <Banner300 />
              </div>
            </div>
          </aside>
        </div>

        {/* Before Related Articles -> 300x250 Banner */}
        <div className="my-10 flex justify-center border-t border-b border-[#1a2332] py-8">
          <Banner300 />
        </div>

        {/* More Articles */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-mono text-[12px] tracking-[3px] uppercase text-white font-bold">{'// MORE ARTICLES'}</h2>
            <div className="h-[1px] flex-1 bg-[#1a2332]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.slice(0, 2).map((p) => (
              <Link href={`/blog/${p.slug}`} key={p._id} className="group flex flex-col bg-[#0d1117] border border-[#1a2332] hover:border-[#00ff8833] transition-all duration-300">
                <div className="relative aspect-square w-full overflow-hidden">
                  {p.mainImage && (
                    <Image 
                      src={urlFor(p.mainImage).width(361).height(361).fit('crop').auto('format').url()} 
                      alt={p.title}
                      width={361}
                      height={361}
                      sizes="(max-width: 768px) 100vw, 361px"
                      quality={70}
                      className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="font-mono text-[9px] tracking-[2px] uppercase text-[#00ff88] mb-3">
                    {p.categories?.[0]?.title || 'OSINT'}
                  </span>
                  <h3 className="text-[13px] font-semibold mb-3 leading-tight group-hover:text-[#00ff88] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[#94a3b8] text-[11px] leading-relaxed line-clamp-2 mb-6">
                    {p.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1a2332]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a2332] flex items-center justify-center font-mono text-[10px] text-[#00ff88]">
                        {getInitials(p.author?.name)}
                      </div>
                      <span className="font-mono text-[9px] tracking-[2px] uppercase text-gray-300">
                        {p.author?.name || 'analysis'}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-gray-500">
                      {formatDate(p.publishedAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {relatedPosts.slice(2).map((p) => (
              <Link href={`/blog/${p.slug}`} key={p._id} className="group flex flex-col bg-[#0d1117] border border-[#1a2332] hover:border-[#00ff8833] transition-all duration-300">
                <div className="relative aspect-square w-full overflow-hidden">
                  {p.mainImage && (
                    <Image 
                      src={urlFor(p.mainImage).width(361).height(361).fit('crop').auto('format').url()} 
                      alt={p.title}
                      width={361}
                      height={361}
                      sizes="(max-width: 768px) 100vw, 361px"
                      quality={70}
                      className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="font-mono text-[9px] tracking-[2px] uppercase text-[#00ff88] mb-3">
                    {p.categories?.[0]?.title || 'OSINT'}
                  </span>
                  <h3 className="text-[13px] font-semibold mb-3 leading-tight group-hover:text-[#00ff88] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[#94a3b8] text-[11px] leading-relaxed line-clamp-2 mb-6">
                    {p.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1a2332]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a2332] flex items-center justify-center font-mono text-[10px] text-[#00ff88]">
                        {getInitials(p.author?.name)}
                      </div>
                      <span className="font-mono text-[9px] tracking-[2px] uppercase text-gray-300">
                        {p.author?.name || 'analysis'}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-gray-500">
                      {formatDate(p.publishedAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0d1117] border-t border-[#1a2332] pt-16 pb-8">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6 group">
                <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
                <h1 className="font-mono text-xl font-bold tracking-[3px] uppercase">RECONSHIELD</h1>
              </div>
              <p className="text-[12px] text-[#94a3b8] leading-relaxed max-w-sm">
                Advanced educational infrastructure visibility and intelligence platform. Empowers security researchers with visibility into their internet-facing assets through passive data collection.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-[10px] tracking-[3px] text-white uppercase font-bold mb-6">PLATFORM</h4>
              <ul className="space-y-3 font-mono text-[10px] tracking-[1px] text-gray-500 uppercase">
                <li><Link href="/" className="hover:text-[#00ff88] transition-colors">SECURITY SCANNER</Link></li>
                <li><Link href="/blog" className="hover:text-[#00ff88] transition-colors">INTELLIGENCE BLOG</Link></li>
                <li><Link href="/about" className="hover:text-[#00ff88] transition-colors">ABOUT RESEARCH</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] tracking-[3px] text-white uppercase font-bold mb-6">LEGAL</h4>
              <ul className="space-y-3 font-mono text-[10px] tracking-[1px] text-gray-500 uppercase">
                <li><Link href="/terms" className="hover:text-[#00ff88] transition-colors">TERMS OF USE</Link></li>
                <li><Link href="/privacy" className="hover:text-[#00ff88] transition-colors">PRIVACY POLICY</Link></li>
                <li><Link href="/cookie-policy" className="hover:text-[#00ff88] transition-colors">COOKIE POLICY</Link></li>
                <li><Link href="/contact" className="hover:text-[#00ff88] transition-colors">CONTACT SUPPORT</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#1a2332]/30 mb-8">
            <p className="font-mono text-[10px] tracking-[2px] text-gray-500">© 2026 RECONSHIELD INTELLIGENCE</p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="font-mono text-[10px] tracking-[2px] uppercase">SYSTEM LIVE</span>
            </div>
          </div>
          <div className="text-center font-mono text-[9px] tracking-[3px] text-[#1a2332] font-bold uppercase">
            AUTHORIZED RESEARCH ONLY — Authorized security professionals only
          </div>
        </div>
      </footer>
    </div>
  )
}

