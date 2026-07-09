import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, Info, List, BarChart, Award, FileText, ArrowRight, Activity, Cpu } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { COMPARISONS_DATA } from '@/utils/comparisonsData';
import { renderMarkdown } from '@/utils/markdownRenderer';

export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(COMPARISONS_DATA).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const data = COMPARISONS_DATA[slug];
  
  if (!data) {
    return { title: 'Comparison Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://reconshield.in/compare/${slug}`,
    },
    robots: { index: true, follow: true }
  };
}

// Flowchart Renderers for each Comparison
const FlowchartDiagram = ({ slug }) => {
  if (slug === 'whois-vs-rdap') {
    return (
      <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 my-8">
        <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// PROTOCOL FLOW COMPARISON</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
            <div className="text-xs font-mono text-red-400 mb-2 font-bold uppercase tracking-wider">Legacy WHOIS Flow (Port 43)</div>
            <div className="space-y-3 font-mono text-[11px] text-gray-400">
              <div className="flex items-center justify-between p-2 bg-black/40 rounded">
                <span>1. Open Socket</span>
                <span className="text-gray-600">TCP Port 43</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-black/40 rounded">
                <span>2. Send Plaintext Domain</span>
                <span className="text-gray-600">google.com\\r\\n</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-black/40 rounded">
                <span>3. Read Unstructured Text</span>
                <span className="text-red-400">Regex scraping required</span>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <div className="text-xs font-mono text-emerald-400 mb-2 font-bold uppercase tracking-wider">Modern RDAP Flow (Port 443)</div>
            <div className="space-y-3 font-mono text-[11px] text-gray-400">
              <div className="flex items-center justify-between p-2 bg-black/40 rounded">
                <span>1. RESTful HTTP GET</span>
                <span className="text-emerald-400">HTTPS (TLS 1.3)</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-black/40 rounded">
                <span>2. Pass Optional Credentials</span>
                <span className="text-emerald-400">OAuth / API Key</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-black/40 rounded">
                <span>3. Receive Standard JSON</span>
                <span className="text-emerald-400">Reliable Object Contract</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'ssl-vs-tls') {
    return (
      <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 my-8">
        <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// HANDSHAKE ROUND-TRIP TIME (RTT)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
            <div className="text-xs font-mono text-red-400 mb-2 font-bold uppercase tracking-wider">Legacy SSL/TLS 1.2 Handshake</div>
            <div className="space-y-2 font-mono text-[11px] text-gray-400">
              <div className="p-1.5 bg-black/40 rounded text-center">Client Hello ➔</div>
              <div className="p-1.5 bg-black/40 rounded text-center">⇠ Server Hello + Certificate</div>
              <div className="p-1.5 bg-black/40 rounded text-center">Key Exchange (Static RSA/DH) ➔</div>
              <div className="p-1.5 bg-black/40 rounded text-center">⇠ Finished (2-RTT)</div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <div className="text-xs font-mono text-emerald-400 mb-2 font-bold uppercase tracking-wider">Modern TLS 1.3 Handshake</div>
            <div className="space-y-2 font-mono text-[11px] text-gray-400">
              <div className="p-1.5 bg-black/40 rounded text-center">Client Hello + Key Share ➔</div>
              <div className="p-1.5 bg-black/40 rounded text-center">⇠ Server Hello + Key Share + Finished</div>
              <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-center text-emerald-400">Encrypted Application Data Flow (1-RTT)</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'dns-vs-whois') {
    return (
      <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 my-8">
        <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// DIRECTORY VS RESOLUTION</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
            <div className="text-xs font-mono text-blue-400 mb-2 font-bold uppercase tracking-wider">DNS Routing Resolution (Port 53)</div>
            <p className="text-xs text-gray-400 mb-3">Resolves hostnames to numeric networking destinations:</p>
            <div className="p-3 bg-black/40 rounded text-center font-mono text-[11px] text-gray-300">
              example.com ➔ [Recursive resolver] ➔ [Authoritative DNS] ➔ 192.0.2.1
            </div>
          </div>
          <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
            <div className="text-xs font-mono text-purple-400 mb-2 font-bold uppercase tracking-wider">WHOIS Ownership Directory (Port 43)</div>
            <p className="text-xs text-gray-400 mb-3">Retrieves administrative and ownership metadata:</p>
            <div className="p-3 bg-black/40 rounded text-center font-mono text-[11px] text-gray-300">
              example.com ➔ [Registry Database] ➔ Registrar, Owner Contact, Expiration
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'spf-vs-dkim-vs-dmarc') {
    return (
      <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 my-8">
        <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// EMAIL AUTHENTICATION CHAIN</h3>
        <div className="space-y-4 font-mono text-[11px] text-gray-400">
          <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
            <div>
              <span className="text-blue-400 font-bold">1. SPF Checks</span>
              <p className="text-[10px] text-gray-500 mt-1">Verifies if sending server IP address is in the domain's authorized list.</p>
            </div>
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-[9px]">IP MATCH</span>
          </div>
          <div className="p-3 rounded-lg bg-pink-500/5 border border-pink-500/10 flex items-center justify-between">
            <div>
              <span className="text-pink-400 font-bold">2. DKIM Signature</span>
              <p className="text-[10px] text-gray-500 mt-1">Cryptographically verifies that the email headers and body were not modified.</p>
            </div>
            <span className="px-2 py-0.5 bg-pink-500/20 text-pink-300 rounded text-[9px]">CRYPTO SIGNATURE</span>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
            <div>
              <span className="text-emerald-400 font-bold">3. DMARC Controller</span>
              <p className="text-[10px] text-gray-500 mt-1">Requires alignment with From header. Executes policy: none, quarantine, or reject.</p>
            </div>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[9px]">ALIGNMENT & POLICY</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'port-scanner-vs-vulnerability-scanner') {
    return (
      <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 my-8">
        <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">// SCANNING DEPTH LEVEL</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 text-cyan-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-mono text-white font-bold">Port Scanner Depth (Surface Level)</div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Queries port connections (SYN, ACK, Connect) to map which endpoints are open. Tells you *what* is listening.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-mono text-white font-bold">Vulnerability Scanner Depth (Service Level)</div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Queries service software configurations, parses banners, matches version strings against NVD/CVE lists, and checks for weak authentication and security policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default async function ComparisonPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const data = COMPARISONS_DATA[slug];

  if (!data) {
    notFound();
  }

  const graph = [
    {
      '@type': 'TechArticle',
      '@id': `https://reconshield.in/compare/${slug}/#article`,
      headline: data.title,
      description: data.description,
      publisher: {
        '@type': 'Organization',
        name: 'ReconShield Security',
        url: 'https://reconshield.in'
      },
      author: {
        '@type': 'Organization',
        name: 'ReconShield Threat Research'
      }
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
        { '@type': 'ListItem', position: 2, name: 'Comparisons', item: 'https://reconshield.in/compare' },
        { '@type': 'ListItem', position: 3, name: data.title, item: `https://reconshield.in/compare/${slug}` }
      ]
    }
  ];

  if (data.faqs && data.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: data.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      }))
    });
  }

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': graph
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <div className="min-h-screen pb-24 bg-[#05080f] text-white">
        <div className="max-w-5xl mx-auto px-4 pt-8">
          
          <Breadcrumbs crumbs={[
            { label: 'Comparisons', href: '/compare' },
            { label: data.slug.toUpperCase().replace(/-/g, ' '), href: `/compare/${slug}` }
          ]} />

          {/* Page Header */}
          <div className="border-b border-white/10 pb-8 mb-10 mt-6">
            <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
              {data.title}
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* AI Citation Blocks */}
          <section className="mb-12 space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-matrix-400/5 to-transparent border border-matrix-400/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#00ff88]/30 uppercase tracking-widest select-none">
                AI Citation Block
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Column 1: Quick Answer & Definition */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-xs font-mono font-bold text-[#00ff88] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> Quick Answer (Featured Snippet)
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed font-sans font-medium">
                      {data.aiCitation.quickAnswer}
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                    <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-1">Standard Definition</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">
                      {data.aiCitation.definition}
                    </p>
                  </div>
                </div>

                {/* Column 2: Stats & Expert Summary */}
                <div className="lg:col-span-1 space-y-6 lg:border-l lg:border-white/5 lg:pl-6">
                  <div>
                    <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <BarChart className="w-4 h-4" /> Industry Statistic
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-mono">
                      {data.aiCitation.statistics}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4" /> Expert Summary
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">
                      {data.aiCitation.expertSummary}
                    </p>
                  </div>
                </div>

              </div>

              {/* Key Takeaways Row */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <List className="w-4 h-4" /> Key Takeaways
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-400 font-sans pl-5 list-disc">
                  {data.aiCitation.keyTakeaways.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-12">
            <h2 className="text-xl font-bold font-display text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Feature Comparison Table
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#0d1117]">
              <table className="w-full text-left text-xs md:text-sm text-gray-400 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white font-mono uppercase text-xs">
                    {data.comparisonTable.headers.map((header, i) => (
                      <th key={i} className="p-4">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  {data.comparisonTable.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="p-4">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Flowchart Diagram */}
          <FlowchartDiagram slug={slug} />

          {/* Deep-dive Content */}
          <section className="prose prose-invert max-w-none text-gray-400 leading-relaxed mt-10">
            {renderMarkdown(data.content)}
          </section>

          {/* FAQs Section */}
          {data.faqs && data.faqs.length > 0 && (
            <section className="mb-12 border-t border-white/5 pt-12">
              <h2 className="text-xl font-bold font-display text-white mb-6 uppercase tracking-wider">
                Frequently Asked Questions (FAQ)
              </h2>
              <div className="space-y-4">
                {data.faqs.map((faq, i) => (
                  <div key={i} className="p-5 rounded-xl bg-[#0d1117] border border-white/[0.05]">
                    <h3 className="text-white font-semibold mb-2 text-sm font-mono">{faq.q}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-sans">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Backlink Authority Footer */}
          <section className="mt-16 pt-8 border-t border-white/5 bg-gradient-to-r from-matrix-400/5 to-transparent p-6 rounded-2xl border border-matrix-400/10">
            <h3 className="text-sm font-mono font-bold text-white mb-2 uppercase tracking-wider">Citing This Research</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              ReconShield research is publicly licensed under CC BY 4.0. If you are citing these statistics, comparisons, or diagrams, please attribute back to this URL.
            </p>
            <div className="bg-[#0d1117] p-3 rounded-lg border border-white/5 text-[10px] font-mono text-gray-400 break-all">
              https://reconshield.in/compare/{slug}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
