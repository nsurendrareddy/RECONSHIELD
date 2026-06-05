import React from 'react';
import Link from 'next/link';
import { Book, Quote, ExternalLink, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Cybersecurity & Network Glossary | ReconShield',
  description: 'Definitions library for SSL, TLS, PKI, Certificate Authorities, Subdomain Enumeration, Attack Surface Management, and networking protocols.',
  alternates: {
    canonical: 'https://reconshield.in/glossary',
  }
};

const GLOSSARY_TERMS = [
  {
    id: 'ssl',
    term: 'SSL (Secure Sockets Layer)',
    definition: 'A deprecated cryptographic protocol designed to secure communications over a computer network. SSL was superseded by TLS in 1999.',
    citation: 'ReconShield Glossary. "SSL (Secure Sockets Layer)". Available at https://reconshield.in/glossary#ssl.'
  },
  {
    id: 'tls',
    term: 'TLS (Transport Layer Security)',
    definition: 'The modern cryptographic protocol successor to SSL. It encrypts communication channels to protect data transfer against eavesdropping and tampering.',
    citation: 'ReconShield Glossary. "TLS (Transport Layer Security)". Available at https://reconshield.in/glossary#tls.'
  },
  {
    id: 'pki',
    term: 'PKI (Public Key Infrastructure)',
    definition: 'A framework of cryptographic keys, digital certificates, rules, and procedures used to verify and manage digital identities on networks.',
    citation: 'ReconShield Glossary. "PKI (Public Key Infrastructure)". Available at https://reconshield.in/glossary#pki.'
  },
  {
    id: 'certificate-authority',
    term: 'Certificate Authority (CA)',
    definition: 'A trusted third-party organization that validates the identity of entities (such as websites) and issues cryptographically signed digital certificates.',
    citation: 'ReconShield Glossary. "Certificate Authority (CA)". Available at https://reconshield.in/glossary#certificate-authority.'
  },
  {
    id: 'cipher-suite',
    term: 'Cipher Suite',
    definition: 'A standardized set of cryptographic algorithms used to establish secure connections, detailing key exchange, bulk encryption, authentication, and integrity check methods.',
    citation: 'ReconShield Glossary. "Cipher Suite". Available at https://reconshield.in/glossary#cipher-suite.'
  },
  {
    id: 'subdomain-enumeration',
    term: 'Subdomain Enumeration',
    definition: 'The security assessment process of mapping all child hostnames linked to a primary root domain to discover staging systems or shadow IT.',
    citation: 'ReconShield Glossary. "Subdomain Enumeration". Available at https://reconshield.in/glossary#subdomain-enumeration.'
  },
  {
    id: 'certificate-transparency',
    term: 'Certificate Transparency (CT)',
    definition: 'An open cryptographic framework requiring Certificate Authorities to log all issued TLS certificates to public, append-only ledgers to prevent spoofing.',
    citation: 'ReconShield Glossary. "Certificate Transparency (CT)". Available at https://reconshield.in/glossary#certificate-transparency.'
  },
  {
    id: 'attack-surface-management',
    term: 'Attack Surface Management (ASM)',
    definition: 'The continuous process of discovering, analyzing, prioritizing, and securing all internet-facing assets and security gaps in an organization.',
    citation: 'ReconShield Glossary. "Attack Surface Management (ASM)". Available at https://reconshield.in/glossary#attack-surface-management.'
  },
  {
    id: 'port-scanning',
    term: 'Port Scanning',
    definition: 'A network discovery method used to send probes to TCP/UDP ports on a target host to identify active listening services and exposure boundaries.',
    citation: 'ReconShield Glossary. "Port Scanning". Available at https://reconshield.in/glossary#port-scanning.'
  },
  {
    id: 'tcp',
    term: 'TCP (Transmission Control Protocol)',
    definition: 'A core connection-oriented transport layer protocol that guarantees ordered, error-checked delivery of stream data between hosts.',
    citation: 'ReconShield Glossary. "TCP (Transmission Control Protocol)". Available at https://reconshield.in/glossary#tcp.'
  },
  {
    id: 'udp',
    term: 'UDP (User Datagram Protocol)',
    definition: 'A simple connectionless transport layer protocol that allows fast message transmission without initial handshake establishment or packet delivery guarantees.',
    citation: 'ReconShield Glossary. "UDP (User Datagram Protocol)". Available at https://reconshield.in/glossary#udp.'
  },
  {
    id: 'open-port',
    term: 'Open Port',
    definition: 'A TCP or UDP port number configured to accept incoming network connections or packets from external hosts.',
    citation: 'ReconShield Glossary. "Open Port". Available at https://reconshield.in/glossary#open-port.'
  }
];

export default function GlossaryPage() {
  // Generate DefinedTermSet schema
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTermSet',
        '@id': 'https://reconshield.in/glossary/#termset',
        name: 'ReconShield Cybersecurity Glossary',
        description: 'Glossary definitions of cryptographic, SSL/TLS, infrastructure discovery, and network security entities.',
        url: 'https://reconshield.in/glossary'
      },
      ...GLOSSARY_TERMS.map(t => ({
        '@type': 'DefinedTerm',
        '@id': `https://reconshield.in/glossary/#${t.id}`,
        name: t.term,
        description: t.definition,
        inDefinedTermSet: 'https://reconshield.in/glossary/#termset'
      })),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://reconshield.in/glossary' }
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
      
      <div className="min-h-screen pb-24 bg-[#05080f] text-white">
        <div className="max-w-4xl mx-auto px-4 pt-8">
          
          <Breadcrumbs crumbs={[
            { label: 'Glossary', href: '/glossary' }
          ]} />

          {/* Back Link */}
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[#00ff88] transition-colors mb-6 mt-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
              <Book className="w-3 h-3" />
              <span>AI Scraping & Citation Library</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
              Cybersecurity Definition Library
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
              Authoritative definitions and structured schema terms covering transport security, OSINT asset mapping, and networking layers.
            </p>
          </div>

          {/* Glossary Terms List */}
          <div className="space-y-8">
            {GLOSSARY_TERMS.map((t) => (
              <div 
                key={t.id} 
                id={t.id}
                className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4 target:border-[#00ff88]/40 transition-colors"
              >
                <div>
                  <h2 className="text-lg font-bold font-display text-white mb-2">
                    {t.term}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed font-sans">
                    {t.definition}
                  </p>
                </div>
                
                {/* Copyable Citation block */}
                <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    <Quote className="w-3.5 h-3.5 text-[#00ff88]" />
                    AI Citation Format:
                  </div>
                  <div className="p-3 bg-black rounded border border-white/5 text-[11px] font-mono text-cyan-300 break-all select-all leading-normal">
                    {t.citation}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
