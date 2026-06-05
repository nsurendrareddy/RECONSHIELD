import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Network, ShieldAlert, ArrowLeft, ShieldCheck, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { DNS_TYPES_DATA } from '@/utils/dnsTypesData';
import { renderMarkdown } from '@/utils/markdownRenderer';

export const revalidate = 86400;

export async function generateStaticParams() {
  return Object.keys(DNS_TYPES_DATA).map(recordType => ({ recordType }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const recordType = resolvedParams?.recordType;
  const data = DNS_TYPES_DATA[recordType];
  
  if (!data) {
    notFound();
  }

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://reconshield.in/dns-records/types/${recordType}`,
    },
    robots: { index: true, follow: true }
  };
}

export default async function DnsRecordTypePage({ params }) {
  const resolvedParams = await params;
  const recordType = resolvedParams?.recordType;
  const data = DNS_TYPES_DATA[recordType];

  if (!data) {
    notFound();
  }

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/dns-records/types/${recordType}/#article`,
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
          { '@type': 'ListItem', position: 2, name: 'DNS Records Database', item: 'https://reconshield.in/dns-records' },
          { '@type': 'ListItem', position: 3, name: data.name, item: `https://reconshield.in/dns-records/types/${recordType}` }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      
      <div className="min-h-screen pb-20">
        <div className="max-w-5xl mx-auto px-4 pt-8">
          
          <Breadcrumbs crumbs={[
            { label: 'DNS Records', href: '/tools/dns-lookup' },
            { label: data.name, href: `/dns-records/types/${recordType}` }
          ]} />

          {/* Back Navigation */}
          <Link href="/tools/dns-lookup" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[#00ff88] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to DNS Lookup Tool</span>
          </Link>

          {/* Header */}
          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-mono text-blue-400 mb-4 uppercase tracking-widest">
              <Network className="w-3 h-3" />
              <span>DNS Protocol & Record Security Analysis</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              DNS <span className="text-blue-400">{data.name}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Detailed technical specification, security configuration analysis, threat modeling, and defensive whitelists.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Main Content */}
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-blue-400" />
                  Asset Risk Analysis Context
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  DNS records govern critical mapping parameters. Stale or misconfigured records are swept continuously by external threat monitors and passive asset enumerators.
                </p>
                <Link href={`/tools/dns-lookup`} className="inline-flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 px-6 py-3 rounded-xl font-bold transition-all text-xs font-mono">
                  Scan Your DNS Zone Now
                </Link>
              </div>

              {/* MDX / Formatted Content */}
              <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed space-y-6">
                {renderMarkdown(data.content)}
              </div>

              {/* FAQs */}
              <div className="border-t border-white/5 pt-12">
                <h2 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {data.faqs.map((faq, i) => (
                    <div key={i} className="p-5 rounded-xl bg-[#0d1117] border border-white/[0.05]">
                      <h3 className="text-white font-semibold mb-2 text-sm font-mono">{faq.q}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar Context links */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24">
                <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Related Tools</h3>
                <div className="space-y-3">
                  {data.relatedTools.map((toolId, i) => (
                    <Link key={i} href={`/tools/${toolId}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                      <div className="w-8 h-8 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20">
                        <Network className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white uppercase font-mono">{toolId.replace('-', ' ')}</div>
                        <div className="text-[10px] text-gray-500">Run diagnostic check</div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-8 p-4 rounded-xl bg-white/[0.01] border border-white/[0.05]">
                  <h4 className="text-xs font-mono font-bold text-white mb-2 uppercase tracking-wider">Topical Cluster</h4>
                  <ul className="space-y-2 text-xs font-mono text-gray-500">
                    <li><Link href="/dns-records/types/a-record" className="hover:text-blue-400 transition-colors">A Record Security</Link></li>
                    <li><Link href="/dns-records/types/aaaa-record" className="hover:text-blue-400 transition-colors">AAAA Record Security</Link></li>
                    <li><Link href="/dns-records/types/mx-record" className="hover:text-blue-400 transition-colors">MX Record Security</Link></li>
                    <li><Link href="/dns-records/types/txt-record" className="hover:text-blue-400 transition-colors">TXT Record Security</Link></li>
                    <li><Link href="/dns-records/types/ns-record" className="hover:text-blue-400 transition-colors">NS Record Security</Link></li>
                    <li><Link href="/dns-records/types/soa-record" className="hover:text-blue-400 transition-colors">SOA Record Security</Link></li>
                    <li><Link href="/dns-records/types/ptr-record" className="hover:text-blue-400 transition-colors">PTR Record Security</Link></li>
                    <li><Link href="/dns-records/types/cname-record" className="hover:text-blue-400 transition-colors">CNAME Record Security</Link></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
