import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Server, Globe, ChevronRight, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';

const ALLOWED_HEADERS = {
  'server': { name: 'Server', desc: 'Reveals the underlying web server software and version.' },
  'content-security-policy': { name: 'Content-Security-Policy', desc: 'Prevents Cross-Site Scripting (XSS) and data injection attacks.' },
  'x-frame-options': { name: 'X-Frame-Options', desc: 'Protects visitors against clickjacking attacks.' },
  'x-content-type-options': { name: 'X-Content-Type-Options', desc: 'Prevents Google Chrome and Internet Explorer from MIME-sniffing a response.' },
  'strict-transport-security': { name: 'Strict-Transport-Security', desc: 'Enforces secure (HTTP over SSL/TLS) connections to the server.' }
};

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const headerSlug = resolvedParams?.header?.toLowerCase();

    if (!headerSlug || !ALLOWED_HEADERS[headerSlug]) {
      return { title: 'Invalid Security Header' };
    }

    const header = ALLOWED_HEADERS[headerSlug];

    return {
      title: `${header.name} | HTTP Security Header Analysis`,
      description: `Learn how the ${header.name} HTTP header works. ${header.desc}`,
      alternates: {
        canonical: `https://reconshield.in/headers/${headerSlug}`,
      },
      robots: { index: true, follow: true },
      openGraph: {
        url: `https://reconshield.in/headers/${headerSlug}`,
        title: `${header.name} Analysis`,
        description: header.desc,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${header.name} Security Header`,
        description: header.desc,
      }
    };
  } catch (error) {
    return { title: 'Error' };
  }
}

export default async function HeaderIntelligencePage({ params }) {
  try {
    const resolvedParams = await params;
    const headerSlug = resolvedParams?.header?.toLowerCase();

    if (!headerSlug || !ALLOWED_HEADERS[headerSlug]) {
      notFound();
    }

    const header = ALLOWED_HEADERS[headerSlug];

    const schemaJson = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TechArticle',
          '@id': `https://reconshield.in/headers/${headerSlug}/#article`,
          headline: `${header.name} Security Header Analysis`,
          description: header.desc,
          publisher: {
            '@type': 'Organization',
            name: 'ReconShield Threat Research'
          },
          url: `https://reconshield.in/headers/${headerSlug}`
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
            { '@type': 'ListItem', position: 2, name: 'Security Headers', item: 'https://reconshield.in/tools/security-headers' },
            { '@type': 'ListItem', position: 3, name: header.name, item: `https://reconshield.in/headers/${headerSlug}` },
          ],
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
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
                <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
                <li><ChevronRight className="w-3 h-3" /></li>
                <li><Link href="/tools/security-headers" className="hover:text-[#00ff88] transition-colors">Web Security</Link></li>
                <li><ChevronRight className="w-3 h-3" /></li>
                <li className="text-[#00ff88]">{header.name}</li>
              </ol>
            </nav>

            <div className="border-b border-white/10 pb-8 mb-10">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                <span className="text-yellow-400">{header.name}</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                {header.desc}
              </p>
            </div>

            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">What is {header.name}?</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                The {header.name} is an HTTP response header that provides instructions to the web browser on how to handle the page's content, significantly enhancing application security against common vulnerabilities.
              </p>

              <Link href={`/tools/security-headers`} className="inline-flex items-center justify-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 px-6 py-3 rounded-xl font-bold transition-all mt-4">
                <Shield className="w-4 h-4" />
                Scan a domain for {header.name}
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error rendering header page:', error);
    notFound();
  }
}
