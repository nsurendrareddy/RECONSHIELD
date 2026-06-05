import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Lock, AlertTriangle, ArrowLeft, ShieldAlert, CheckCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SSL_ERRORS_DATA } from '@/utils/sslErrorsData';
import { renderMarkdown } from '@/utils/markdownRenderer';

export const revalidate = 86400;

export async function generateStaticParams() {
  return Object.keys(SSL_ERRORS_DATA).map(errorCode => ({ errorCode }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const errorCode = resolvedParams?.errorCode;
  const data = SSL_ERRORS_DATA[errorCode];
  
  if (!data) {
    notFound();
  }

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://reconshield.in/ssl/errors/${errorCode}`,
    },
    robots: { index: true, follow: true }
  };
}

export default async function SslErrorPage({ params }) {
  const resolvedParams = await params;
  const errorCode = resolvedParams?.errorCode;
  const data = SSL_ERRORS_DATA[errorCode];

  if (!data) {
    notFound();
  }

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/ssl/errors/${errorCode}/#article`,
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
          { '@type': 'ListItem', position: 2, name: 'SSL Database', item: 'https://reconshield.in/ssl' },
          { '@type': 'ListItem', position: 3, name: data.name, item: `https://reconshield.in/ssl/errors/${errorCode}` }
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
            { label: 'SSL Errors', href: '/tools/ssl-checker' },
            { label: data.name, href: `/ssl/errors/${errorCode}` }
          ]} />

          {/* Back Navigation */}
          <Link href="/tools/ssl-checker" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[#00ff88] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to SSL Checker Tool</span>
          </Link>

          {/* Header */}
          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] font-mono text-red-400 mb-4 uppercase tracking-widest">
              <Lock className="w-3 h-3" />
              <span>Cryptographic Protocol Error Analysis</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-mono">
              Browser Warning: <span className="text-red-400">{data.name}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Diagnostic report, underlying certificate root causes, mitigation guides, and browser TLS resolution steps.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Main Content */}
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2 font-mono uppercase tracking-wider">
                  <ShieldAlert className="w-5 h-5 text-red-400" />
                  Security Impact Rating: High
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Bypassing SSL protocol errors manually in a browser overrides standard encryption checks, exposing session cookies and authentication payloads to local Wi-Fi sniffers.
                </p>
                <Link href={`/tools/ssl-checker`} className="inline-flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-6 py-3 rounded-xl font-bold transition-all text-xs font-mono">
                  Audit Target SSL Certificate
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
                        <Lock className="w-4 h-4" />
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
                    <li><Link href="/ssl/errors/err_cert_date_invalid" className="hover:text-red-400 transition-colors">Date Invalid Error</Link></li>
                    <li><Link href="/ssl/errors/err_ssl_protocol_error" className="hover:text-red-400 transition-colors">SSL Protocol Error</Link></li>
                    <li><Link href="/ssl/errors/err_cert_authority_invalid" className="hover:text-red-400 transition-colors">Authority Invalid Error</Link></li>
                    <li><Link href="/ssl/errors/net_err_cert_common_name_invalid" className="hover:text-red-400 transition-colors">Common Name Invalid Error</Link></li>
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
