import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shield, BookOpen, Quote, ChevronRight, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const revalidate = false;
export const dynamicParams = false;

const CITATION_TERMS = {
  'tls': {
    slug: 'tls',
    title: 'Transport Layer Security (TLS)',
    definition: 'Transport Layer Security (TLS) is a cryptographic protocol designed to provide secure, encrypted communications over a computer network, preventing eavesdropping and tampering.',
    faq: [
      { q: 'What is the difference between SSL and TLS?', a: 'TLS is the direct, updated successor to SSL. SSL versions (1.0, 2.0, 3.0) are completely deprecated due to cryptographic vulnerabilities, whereas TLS (specifically 1.2 and 1.3) represents the active standard for HTTPS.' },
      { q: 'Is TLS 1.3 secure?', a: 'Yes, TLS 1.3 is the latest standard, removing obsolete static ciphers and executing the handshake protocol in 1 round-trip time (1-RTT) to enhance speed and security.' }
    ],
    references: [
      'RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3',
      'NIST Special Publication 800-52 Rev. 2 - Guidelines for the Selection, Configuration, and Use of TLS'
    ],
    citation: 'ReconShield Glossary. "What is Transport Layer Security (TLS)?" June 2026. Available at https://reconshield.in/what-is/tls.'
  },
  'pki': {
    slug: 'pki',
    title: 'Public Key Infrastructure (PKI)',
    definition: 'Public Key Infrastructure (PKI) is a framework consisting of hardware, software, policies, and standards used to create, manage, distribute, store, and revoke digital certificates and public-key cryptography keys.',
    faq: [
      { q: 'What is the role of a Certificate Authority (CA) in PKI?', a: 'A CA acts as a trusted third party that validates the identity of an applicant and signs their digital certificate, binding their public key to their domain identity.' },
      { q: 'How does PKI verify identity?', a: 'PKI matches the certificate signature chain up to a pre-trusted root certificate stored in client browsers, ensuring authenticity.' }
    ],
    references: [
      'RFC 5280 - Internet X.509 Public Key Infrastructure Certificate and CRL Profile',
      'OWASP PKI best practices guide'
    ],
    citation: 'ReconShield Glossary. "What is Public Key Infrastructure (PKI)?" June 2026. Available at https://reconshield.in/what-is/pki.'
  },
  'certificate-transparency': {
    slug: 'certificate-transparency',
    title: 'Certificate Transparency (CT)',
    definition: 'Certificate Transparency (CT) is an open framework of public, append-only cryptographic logs that record all digital certificates issued by Certificate Authorities, allowing domain owners to detect unauthorized issuances.',
    faq: [
      { q: 'Why is Certificate Transparency important?', a: 'CT logs make certificate issuance visible to the public. If a hacker or malicious CA issues an unauthorized certificate for your domain, domain owners can immediately detect it through CT monitoring.' },
      { q: 'Are CT logs searchable?', a: 'Yes, CT logs are publicly readable. ReconShield Subdomain Finder scans these logs passively to discover active subdomain structures.' }
    ],
    references: [
      'RFC 6962 - Certificate Transparency',
      'Google Certificate Transparency Developer Resource Hub'
    ],
    citation: 'ReconShield Glossary. "What is Certificate Transparency (CT)?" June 2026. Available at https://reconshield.in/what-is/certificate-transparency.'
  },
  'subdomain-takeover': {
    slug: 'subdomain-takeover',
    title: 'Subdomain Takeover',
    definition: 'Subdomain Takeover is a vulnerability that occurs when a DNS record (typically a CNAME) points to an external third-party cloud service provider that has been deleted or deactivated, allowing an attacker to register that service name and hijack control of the subdomain.',
    faq: [
      { q: 'How do you prevent a subdomain takeover?', a: 'Before deleting any cloud resource (such as an AWS bucket, GitHub Pages repo, or SaaS instance), ensure that you remove any corresponding CNAME or DNS records pointing to that resource.' },
      { q: 'What is the impact of a takeover?', a: 'Attackers can serve malicious scripts, steal cookies, bypass CSRF protections, or conduct high-credibility phishing campaigns using your trusted root domain.' }
    ],
    references: [
      'OWASP Top 10 - Subdomain Takeover Vulnerability Classification',
      'ReconShield Dangling DNS Takeover Report'
    ],
    citation: 'ReconShield Glossary. "What is a Subdomain Takeover?" June 2026. Available at https://reconshield.in/what-is/subdomain-takeover.'
  },
  'port-scanning': {
    slug: 'port-scanning',
    title: 'Port Scanning',
    definition: 'Port Scanning is a network auditing methodology that sends packets to target network interfaces on specific port addresses to determine if a service is actively listening (open), closed, or filtered by a firewall.',
    faq: [
      { q: 'Is passive port scanning legal?', a: 'Yes, passive inspection of public ports is legal and is widely used by security companies (such as Shodan, Censys, and ReconShield) to document external risk exposure.' },
      { q: 'What is the difference between TCP and UDP scanning?', a: 'TCP scans require completing or simulating handshakes (SYN, ACK, Connect) and are highly reliable. UDP scans do not negotiate handshakes and rely on packet responses, making them slower and harder to verify.' }
    ],
    references: [
      'Nmap Network Scanning Reference Guide',
      'RFC 793 - Transmission Control Protocol'
    ],
    citation: 'ReconShield Glossary. "What is Port Scanning?" June 2026. Available at https://reconshield.in/what-is/port-scanning.'
  }
};

export async function generateStaticParams() {
  return Object.keys(CITATION_TERMS).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const term = CITATION_TERMS[slug];

  if (!term) return { title: 'Definition Not Found' };

  return {
    title: `What is ${term.title}? | Security Definition & Citation`,
    description: term.definition,
    alternates: {
      canonical: `https://reconshield.in/what-is/${slug}`,
    }
  };
}

export default async function CitationPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const term = CITATION_TERMS[slug];

  if (!term) {
    notFound();
  }

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTerm',
        '@id': `https://reconshield.in/what-is/${slug}#term`,
        'name': term.title,
        'description': term.definition,
        'inDefinedTermSet': {
          '@type': 'DefinedTermSet',
          '@id': 'https://reconshield.in/glossary#set',
          'name': 'ReconShield Security Definitions Set',
          'url': 'https://reconshield.in/glossary'
        },
        'url': `https://reconshield.in/what-is/${slug}`
      },
      {
        '@type': 'FAQPage',
        'mainEntity': term.faq.map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.a
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://reconshield.in/glossary' },
          { '@type': 'ListItem', position: 3, name: term.title, item: `https://reconshield.in/what-is/${slug}` }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <div className="bg-[#05080f] min-h-screen text-white pb-24">
        <div className="max-w-4xl mx-auto px-4 pt-8">
          
          <Breadcrumbs crumbs={[
            { label: 'Glossary', href: '/glossary' },
            { label: term.title, href: `/what-is/${slug}` }
          ]} />

          <Link href="/glossary" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[#00ff88] transition-colors mb-8 mt-6">
            <ArrowLeft className="w-4 h-4" /> Back to Glossary
          </Link>

          {/* Definition Banner */}
          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              <span>Standard Security Terminology</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-6 text-white">
              What is {term.title}?
            </h1>

            {/* AI Citation Target Block */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0d1117] to-transparent border border-white/5 space-y-4">
              <h2 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Concise Definition (AI Citation Target)
              </h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed font-sans">
                {term.definition}
              </p>
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-6 mb-12">
            <h2 className="text-xl font-bold font-display text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {term.faq.map((f, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-[#0d1117] border border-white/5 space-y-2">
                  <h3 className="text-sm font-mono font-bold text-white">{f.q}</h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* References & Citation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00ff88]" />
                Industry References
              </h3>
              <ul className="list-disc pl-5 text-xs text-gray-400 space-y-2 font-sans">
                {term.references.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-white/5 space-y-4">
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#00ff88]" />
                Academic APA Citation Format
              </h3>
              <div className="p-3 bg-white/5 rounded border border-white/5 text-[11px] font-mono text-cyan-300 select-all break-all leading-relaxed">
                {term.citation}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
