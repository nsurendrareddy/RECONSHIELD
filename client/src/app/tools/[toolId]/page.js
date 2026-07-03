import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import fs from 'fs';
import path from 'path';
import { ChevronRight, Share2, AlertTriangle, ShieldCheck, BarChart3, HelpCircle } from 'lucide-react';
import { TOOLS, TOOL_SEO_CONTENT } from '@/utils/toolsData';
import { TOOL_DOMINATION_DATA } from '@/utils/toolDominationData';
import { SemanticToolLinks } from '@/components/SemanticLinks';
import { renderMarkdown } from '@/utils/markdownRenderer';

const ToolScannerClient = dynamic(() => import('@/components/ToolScannerClient'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-surface-900/50 rounded-3xl max-w-5xl mx-auto my-12" />
});

const AuthorizedUseBanner = dynamic(() => import('@/components/AuthorizedUseBanner'));

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const toolId = resolvedParams?.toolId || 'dns-lookup';
  
  const tool = TOOLS.find(t => t.id === toolId) || TOOLS.find(t => t.id === 'dns-lookup');
  
  if (toolId === 'tech-detector') {
    return {
      title: "Website Technology Checker – Detect CMS, Frameworks & Tech Stack",
      description: "Free online website technology checker. Detect content management systems (CMS), javascript frameworks, CDNs, hosting providers, WAFs, and web infrastructure instantly.",
      alternates: {
        canonical: "https://reconshield.in/tools/tech-detector",
      },
      openGraph: {
        url: "https://reconshield.in/tools/tech-detector",
        title: "Website Technology Checker – Detect CMS & Web Frameworks",
        description: "Analyze and identify any website's tech stack. Free CMS detector, framework lookup, and technology database fingerprinting tool.",
        type: 'website',
        siteName: 'ReconShield',
        locale: 'en_US',
        images: [
          {
            url: '/og-image.png',
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: "Website Technology Checker | Tech Stack Detector",
        description: "Find out what technologies, hosting, and CMS any website is built with. Passive infrastructure visibility & profiling tool.",
        images: ['/og-image.png']
      }
    };
  }

  return {
    title: `${tool.name} Tool – Audit & Verify Security Configurations | ReconShield`,
    description: `Free enterprise-grade ${tool.name} tool. ${tool.desc} Analyze records, identify exposure gaps, and secure configurations instantly.`,
    alternates: {
      canonical: `https://reconshield.in/tools/${toolId}`,
    },
    openGraph: {
      url: `https://reconshield.in/tools/${toolId}`,
      title: `${tool.name} - Free Online Security Analyzer | ReconShield`,
      description: tool.desc,
      type: 'website',
      siteName: 'ReconShield',
      locale: 'en_US',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} | Free Cybersecurity Auditing Tool`,
      description: tool.desc,
      images: ['/og-image.png']
    }
  };
}

const ShareButtons = ({ toolId, toolName }) => {
  const url = `https://reconshield.in/tools/${toolId}`;
  const text = `Check out this free ${toolName} tool on ReconShield:`;

  return (
    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/5">
      <span className="text-sm font-mono text-gray-500 flex items-center gap-2">
        <Share2 className="w-4 h-4" /> Share:
      </span>
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer" className="px-3 py-1 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-blue-500/10 hover:text-blue-400 transition-colors text-xs font-bold font-mono">
        X
      </a>
      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(toolName)}`} target="_blank" rel="noreferrer" className="px-3 py-1 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-blue-600/10 hover:text-blue-500 transition-colors text-xs font-bold font-mono">
        IN
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" className="px-3 py-1 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-blue-600/10 hover:text-blue-500 transition-colors text-xs font-bold font-mono">
        FB
      </a>
    </div>
  );
};

export function ToolPageContent({ toolId }) {
  const tool = TOOLS.find(t => t.id === toolId) || TOOLS.find(t => t.id === 'dns-lookup');
  const seoConfig = TOOL_SEO_CONTENT[toolId] || TOOL_SEO_CONTENT['dns-lookup'];
  const dominationInfo = TOOL_DOMINATION_DATA[toolId];
  const activeFaqs = dominationInfo?.faqs || seoConfig.faqs || [];
  
  // Load educational guide from content/tools directory if available
  let parsedMdxContent = null;
  try {
    const filePath = path.join(process.cwd(), 'content', 'tools', `${toolId}.mdx`);
    if (fs.existsSync(filePath)) {
      const mdxRaw = fs.readFileSync(filePath, 'utf8');
      parsedMdxContent = renderMarkdown(mdxRaw, toolId);
    }
  } catch (err) {
    console.warn(`Error reading MDX file for ${toolId}:`, err);
  }

  const comparisonLinks = {
    'whois': { label: 'WHOIS vs RDAP', href: '/compare/whois-vs-rdap' },
    'ssl-checker': { label: 'SSL vs TLS Comparison', href: '/compare/ssl-vs-tls' },
    'dns-lookup': { label: 'DNS Lookup vs WHOIS', href: '/compare/dns-vs-whois' },
    'email-security': { label: 'SPF vs DKIM vs DMARC', href: '/compare/spf-vs-dkim-vs-dmarc' },
    'port-scanner': { label: 'Port Scanner vs Vulnerability Scanner', href: '/compare/port-scanner-vs-vulnerability-scanner' },
  };
  const activeComparison = comparisonLinks[toolId];

  // Get related tools mapping (Phase 2 Internal Linking Engine)
  let relatedTools = [];
  if (toolId === 'ssl-checker') {
    relatedTools = TOOLS.filter(t => ['http-headers', 'vulnerability-scanner', 'whois', 'dns-lookup'].includes(t.id));
  } else if (toolId === 'subdomain-finder') {
    relatedTools = TOOLS.filter(t => ['dns-lookup', 'vulnerability-scanner', 'ssl-checker', 'port-scanner'].includes(t.id));
  } else if (toolId === 'port-scanner') {
    relatedTools = TOOLS.filter(t => ['vulnerability-scanner', 'ip-lookup', 'whois', 'subdomain-finder'].includes(t.id));
  } else {
    relatedTools = TOOLS.filter(t => t.category === tool.category && t.id !== toolId).slice(0, 3);
    if (relatedTools.length < 3) {
      const extraTools = TOOLS.filter(t => t.category !== tool.category && t.id !== toolId).slice(0, 3 - relatedTools.length);
      relatedTools.push(...extraTools);
    }
  }

  const baseGraph = [
    {
      '@type': 'WebApplication',
      '@id': `https://reconshield.in/tools/${toolId}/#webapp`,
      name: `${tool.name} - Free Online Security Tool by ReconShield`,
      description: tool.desc,
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      url: `https://reconshield.in/tools/${toolId}`,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      author: {
        '@type': 'Organization',
        name: 'ReconShield Security'
      },
      editor: {
        '@type': 'Person',
        name: 'ReconShield Threat Research Team',
        url: 'https://reconshield.in/authors/reconshield-research'
      },
      publisher: {
        '@type': 'Organization',
        name: 'ReconShield Security',
        url: 'https://reconshield.in'
      }
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `https://reconshield.in/tools/${toolId}/#software`,
      name: tool.name,
      description: tool.desc,
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      publisher: {
        '@type': 'Organization',
        name: 'ReconShield Security'
      }
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://reconshield.in/tools' },
        { '@type': 'ListItem', position: 3, name: tool.name, item: `https://reconshield.in/tools/${toolId}` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: activeFaqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'HowTo',
      '@id': `https://reconshield.in/tools/${toolId}#howto`,
      name: `How to use the ReconShield ${tool.name} Tool`,
      description: `Learn how to perform a security query and analyze results with the ${tool.name} tool.`,
      step: [
        {
          '@type': 'HowToStep',
          url: `https://reconshield.in/tools/${toolId}#step-1`,
          name: 'Enter Target Hostname',
          text: 'Input the domain name or IP address you want to scan into the search bar.'
        },
        {
          '@type': 'HowToStep',
          url: `https://reconshield.in/tools/${toolId}#step-2`,
          name: 'Start Security Assessment',
          text: 'Click the Analyze or Scan button to trigger the passive security check.'
        },
        {
          '@type': 'HowToStep',
          url: `https://reconshield.in/tools/${toolId}#step-3`,
          name: 'Review Exposure Findings',
          text: 'Review the detailed, formatted output highlighting any security exposures, expiry warnings, or configuration gaps.'
        }
      ]
    }
  ];

  if (toolId === 'tech-detector') {
    // Override and expand graph for tech-detector to include WebApplication, SoftwareApplication, Organization, BreadcrumbList, FAQPage, HowTo
    baseGraph[0] = {
      '@type': 'WebApplication',
      '@id': 'https://reconshield.in/tools/tech-detector/#webapp',
      name: 'Website Technology Checker - ReconShield',
      description: 'Analyze and identify Content Management Systems (CMS), web frameworks, analytics engines, JavaScript libraries, hosting platforms, and WAF/CDNs using passive fingerprinting.',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      url: 'https://reconshield.in/tools/tech-detector',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      author: {
        '@type': 'Organization',
        '@id': 'https://reconshield.in/#organization'
      }
    };
    
    // Add SoftwareApplication
    baseGraph.push({
      '@type': 'SoftwareApplication',
      '@id': 'https://reconshield.in/tools/tech-detector/#software',
      name: 'Website Technology Checker',
      description: 'Passive website technology checker, CMS detector, and framework analysis utility.',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://reconshield.in/#organization'
      }
    });

    // Add Organization
    baseGraph.push({
      '@type': 'Organization',
      '@id': 'https://reconshield.in/#organization',
      name: 'ReconShield',
      url: 'https://reconshield.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://reconshield.in/icon.png'
      },
      sameAs: [
        'https://twitter.com/reconshield',
        'https://linkedin.com/company/reconshield'
      ]
    });
  }

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': baseGraph
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <AuthorizedUseBanner />
      
      <div className="sr-only">
        <h2>{tool.name}</h2>
        <p>{tool.desc}</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-4">
        {/* Breadcrumb Navigation and Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/tools" className="hover:text-[#00ff88] transition-colors">Tools</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{tool.name}</li>
            </ol>
          </nav>
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            <span>Last Updated: June 2026</span>
            <span className="text-gray-700">|</span>
            <span>Reviewed By: <Link href="/authors/reconshield-research" className="text-cyan-400 hover:underline">ReconShield Research</Link></span>
            <span className="text-gray-700">|</span>
            <span>Ruleset: <Link href="/methodology" className="text-cyan-400 hover:underline">v1.4</Link></span>
          </div>
        </div>

        {/* Trending Scans & Engagement Widget */}
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-400 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>TRENDING SCAN TARGETS:</span>
          </div>
          <div className="flex flex-wrap gap-3 text-gray-400">
            {['reconshield.in', 'github.com', 'cloudflare.com', 'google.com'].map(dom => {
              let reportPath = `/reports/ssl/${dom}`;
              if (toolId === 'subdomain-finder') reportPath = `/reports/subdomains/${dom}`;
              if (toolId === 'port-scanner') reportPath = `/reports/ports/${dom}`;
              return (
                <Link key={dom} href={reportPath} rel="nofollow" className="hover:text-white underline decoration-white/10">
                  {dom}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Prominent Legal Disclaimer Badge */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 text-[10px] sm:text-xs font-mono text-amber-500 mb-8 shadow-sm">
          <div className="flex items-center gap-1.5 shrink-0 uppercase font-bold tracking-wider">
            <span className="text-[14px]">⚠️</span> LEGAL DISCLAIMER:
          </div>
          <p className="flex-1 leading-relaxed font-sans text-gray-400">
            ReconShield is intended for authorized security research and educational purposes only. Unauthorized scanning is illegal.
            <a href="/disclaimer" className="text-amber-500 underline ml-1.5 hover:text-amber-400 font-mono text-[10px]">View Policy</a>
          </p>
        </div>
      </div>

      {/* Main Scanner Client Component */}
      <ToolScannerClient 
        toolId={toolId} 
        title={tool.name} 
        desc={tool.desc} 
      />

      {/* SEO Content & Information */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-white/5 pt-12">
          
          {/* Left Column: Rich Content */}
          <div className="lg:col-span-2 space-y-12">
            
            <div className="prose prose-invert max-w-none">
              {parsedMdxContent || seoConfig.content}
            </div>

            {toolId === 'http-headers' && (
              <div className="mt-12 border-t border-white/5 pt-12">
                <h2 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#00ff88]" /> Security Headers Database
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { slug: 'content-security-policy', name: 'Content-Security-Policy (CSP)', desc: 'Prevents Cross-Site Scripting (XSS) and code injection attacks.' },
                    { slug: 'strict-transport-security', name: 'Strict-Transport-Security (HSTS)', desc: 'Forces secure HTTPS connections to prevent MitM and stripping attacks.' },
                    { slug: 'x-frame-options', name: 'X-Frame-Options', desc: 'Protects visitors against clickjacking and UI redressing exploits.' },
                    { slug: 'x-content-type-options', name: 'X-Content-Type-Options', desc: 'Prevents browsers from sniffing MIME types away from declarations.' },
                    { slug: 'referrer-policy', name: 'Referrer-Policy', desc: 'Controls referrer information passed along in outgoing HTTP headers.' },
                    { slug: 'permissions-policy', name: 'Permissions-Policy', desc: 'Enables or restricts browser API accesses and hardware features.' },
                    { slug: 'server', name: 'Server Header Obfuscation', desc: 'Limits information disclosure about underlying web server signatures.' }
                  ].map(head => (
                    <Link key={head.slug} href={`/headers/${head.slug}`} className="bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/30 p-5 rounded-xl transition-all group">
                      <h3 className="text-sm font-bold text-[#00ff88] group-hover:text-white transition-colors mb-1 font-mono">{head.name}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">{head.desc}</p>
                      <div className="text-xs text-[#00ff88] font-mono mt-3 flex items-center gap-1 opacity-80">
                        View Header Guide <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Domination Enriched Sections */}
            {dominationInfo && (
              <div className="mt-12 space-y-12">
                {/* Statistics Grid */}
                {dominationInfo.statistics && (
                  <div className="border-t border-white/5 pt-12">
                    <h2 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#00ff88]" />
                      Industry Security Statistics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {dominationInfo.statistics.map((stat, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.05] text-center">
                          <div className="text-3xl font-extrabold text-[#00ff88] font-mono mb-2">{stat.value}</div>
                          <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comparison Section */}
                {dominationInfo.comparison && (
                  <div className="border-t border-white/5 pt-12">
                    <h2 className="text-xl font-display font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-cyan-400" />
                      {dominationInfo.comparison.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed font-sans">{dominationInfo.comparison.desc}</p>
                    <div className="overflow-x-auto rounded-xl border border-white/[0.05] bg-[#0d1117]">
                      <table className="w-full text-left text-sm text-gray-400 border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                            {dominationInfo.comparison.headers.map((h, i) => (
                              <th key={i} className="p-4">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono text-xs">
                          {dominationInfo.comparison.rows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                              {row.map((cell, cidx) => (
                                <td key={cidx} className="p-4">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Case Study Section */}
                {dominationInfo.caseStudy && (
                  <div className="border-t border-white/5 pt-12">
                    <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] rounded-full pointer-events-none" />
                      <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-display uppercase tracking-wider">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Case Study: {dominationInfo.caseStudy.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed font-sans">{dominationInfo.caseStudy.desc}</p>
                    </div>
                  </div>
                )}

                {/* Expert Insights Section */}
                {dominationInfo.expertInsights && (
                  <div className="border-t border-white/5 pt-12">
                    <h2 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-purple-400" />
                      Expert Mitigation Recommendations
                    </h2>
                    <ul className="space-y-4 font-sans text-sm text-gray-400">
                      {dominationInfo.expertInsights.map((insight, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-white/[0.01] border border-white/[0.05] p-4 rounded-xl">
                          <span className="text-[#00ff88] font-bold text-sm select-none">▸</span>
                          <span className="leading-relaxed">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {activeFaqs && activeFaqs.length > 0 && (
              <div className="mt-12 border-t border-white/5 pt-12">
                <h2 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#00ff88]" />
                  Frequently Asked Questions (FAQ)
                </h2>
                <div className="space-y-4">
                  {activeFaqs.map((faq, i) => (
                    <div key={i} className="p-5 rounded-xl bg-[#0d1117] border border-white/[0.05]">
                      <h3 className="text-white font-semibold mb-2 text-sm font-mono">{faq.q}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed font-sans">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <SemanticToolLinks currentTool={toolId} />
            <ShareButtons toolId={toolId} toolName={tool.name} />
          </div>

          {/* Right Column: Sidebar (Related Tools) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">

              <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Related Tools</h3>
              <div className="space-y-4">
                {relatedTools.map(t => {
                  const Icon = t.icon;
                  return (
                    <Link key={t.id} href={`/tools/${t.id}`} className="group flex items-start gap-4 p-4 rounded-xl bg-[#0d1117] border border-white/[0.06] hover:border-cyan-500/30 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">{t.name}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2">{t.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              
              {activeComparison && (
                <div className="mt-6 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                  <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">Protocol Comparison</h4>
                  <p className="text-xs text-gray-400 mb-3 font-sans leading-relaxed">
                    Examine how the underlying telemetry of this tool maps against other protocols.
                  </p>
                  <Link href={activeComparison.href} className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-cyan-400 transition-colors font-mono">
                    View {activeComparison.label} →
                  </Link>
                </div>
              )}

              <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-matrix-400/10 to-transparent border border-matrix-400/20">
                <h4 className="text-sm font-bold text-white mb-2">Automate Your Scans</h4>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  Get full internet-facing assets visibility and continuous monitoring with our enterprise API.
                </p>
                <Link href="/contact" className="text-xs font-mono font-bold text-matrix-400 hover:underline">
                  Contact Sales →
                </Link>
              </div>

              <div className="mt-6 p-6 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
                <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Methodology & Trust</h4>
                <div className="flex flex-col gap-2 text-xs font-mono text-cyan-400">
                  <Link href="/methodology" className="hover:underline">▸ Audit Methodology</Link>
                  <Link href="/data-sources" className="hover:underline">▸ Data Sources</Link>
                  <Link href="/update-policy" className="hover:underline">▸ Update Frequency</Link>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const toolId = resolvedParams?.toolId || 'dns-lookup';
  
  return <ToolPageContent toolId={toolId} />;
}
