import React from 'react';
import Link from 'next/link';
import { Server, Search, Globe, ChevronRight, Clock, AlertTriangle } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

const isValidDomain = (domain) => {
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain);
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    return { title: 'Invalid Domain' };
  }

  return {
    title: `${domain} WHOIS Record | Registrar & Expiry Intelligence`,
    description: `Lookup the WHOIS registration data for ${domain}. Discover the domain registrar, creation date, expiry date, status codes, and name servers.`,
    alternates: {
      canonical: `https://reconshield.in/tools/whois/${domain}`,
    },
    robots: { index: false, follow: true },
    openGraph: {
      url: `https://reconshield.in/tools/whois/${domain}`,
      title: `${domain} WHOIS Profile`,
      description: `Analyze domain ownership and registration history for ${domain}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} Registry Intelligence`,
      description: `Domain registration history and WHOIS data analysis for ${domain}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function WhoisIntelligencePage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    notFound();
  }

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/tools/whois/${domain}/#article`,
        headline: `${domain} WHOIS Registration & Ownership Report`,
        description: `Detailed analysis of the internet registry ownership data, registrar lifecycle, and EPP status codes for ${domain}.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/tools/whois/${domain}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'WHOIS Intelligence', item: 'https://reconshield.in/tools/whois-checker' },
          { '@type': 'ListItem', position: 3, name: domain, item: `https://reconshield.in/tools/whois/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Who owns ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The ownership details of ${domain} are stored in the WHOIS database. However, due to privacy protection services, the exact owner's name and contact information may be redacted by the registrar.` }
          },
          {
            '@type': 'Question',
            name: `When does ${domain} expire?`,
            acceptedAnswer: { '@type': 'Answer', text: `The expiration date is publicly recorded in the WHOIS registry. Failure to renew the domain before this date allows the domain to be dropped and potentially registered by a third party.` }
          },
          {
            '@type': 'Question',
            name: `What is the registrar for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The registrar is the company that sold the domain name and currently manages its DNS delegation. This information is always visible in the WHOIS lookup.` }
          }
        ],
      },
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
              <li><Link href="/tools/whois" className="hover:text-[#00ff88] transition-colors">WHOIS Analysis</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-mono text-purple-400 mb-4 uppercase tracking-widest">
              <Search className="w-3 h-3" />
              <span>Registry Profile</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="text-purple-400">{domain}</span> Registration Data
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Analyze registrar associations, domain lifecycle dates, and administrative contacts for {domain}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-purple-500" />
                  Live WHOIS Query
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Target Domain</dt>
                    <dd className="text-white font-bold break-all">{domain}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Registry</dt>
                    <dd className="text-gray-300 font-mono text-sm">Querying Authoritative TLD...</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Expiration Status</dt>
                    <dd className="text-gray-300 font-mono text-sm">Awaiting Lookup...</dd>
                  </div>
                </dl>

                <p className="text-sm text-gray-400 mb-6">
                  Initiate an active TCP connection (port 43) to the relevant WHOIS server to extract the full unredacted registration text block for <strong>{domain}</strong>.
                </p>
                
                <Link href={`/tools/whois-checker?target=${domain}`} className="inline-flex items-center justify-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Search className="w-4 h-4" />
                  Extract WHOIS for {domain}
                </Link>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Understanding WHOIS for {domain}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  WHOIS is a query protocol heavily utilized by security researchers and system administrators to determine the assignee of internet resources. The record for <strong>{domain}</strong> provides critical oversight regarding which registrar manages the domain, when it was initially registered, and when it is scheduled to expire.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Threat Vectors & Expiry</h3>
                <p className="text-gray-400 leading-relaxed">
                  Failure to monitor the expiration of {domain} can lead to catastrophic security breaches. unauthorized actors constantly monitor dropping domains to execute a <strong>Domain Takeover</strong>. Once re-registered by a malicious actor, they gain control over the domain's email MX routing (enabling password resets) and its web traffic.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Investigation Workflows</h3>
                <ul className="text-gray-400 leading-relaxed list-disc pl-5 space-y-2">
                  <li><strong>Attribution:</strong> Attempting to uncover the entity behind malicious activity originating from {domain} by examining historical (pre-privacy) WHOIS records.</li>
                  <li><strong>Status Verification:</strong> Checking Extensible Provisioning Protocol (EPP) status codes like <code>clientTransferProhibited</code> to ensure the domain is locked against unauthorized hijacking.</li>
                  <li><strong>Nameserver Audits:</strong> Validating that the delegated nameservers align with the expected hosting infrastructure.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `Why is the owner information hidden for ${domain}?`, a: `Following GDPR and modern privacy standards, registrars universally redact personally identifiable information (PII) from public WHOIS databases, displaying a proxy service instead.` },
                    { q: `What does 'clientTransferProhibited' mean?`, a: `This status code indicates that the registrar will reject any requests to transfer the domain to another registrar, protecting it against theft.` },
                    { q: `Is WHOIS historical?`, a: `A standard WHOIS query only returns the live, current data. To see previous owners of ${domain}, specialized historical WHOIS databases must be consulted.` }
                  ].map((faq, i) => (
                    <div key={i} className="p-5 rounded-xl bg-[#0d1117] border border-white/[0.06]">
                      <h3 className="text-white font-semibold mb-2 text-sm">{faq.q}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24">
                <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Entity Graph Relations</h3>
                
                <div className="space-y-3">
                  <Link href={`/tools/dns-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">DNS Lookup</div>
                      <div className="text-xs text-gray-500">View A/AAAA records</div>
                    </div>
                  </Link>

                  <Link href={`/tools/tech-detector`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Tech Detector</div>
                      <div className="text-xs text-gray-500">Fingerprint CMS & WAF</div>
                    </div>
                  </Link>
                  
                  <Link href={`/tools/subdomain-finder`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Subdomain Finder</div>
                      <div className="text-xs text-gray-500">Map the internet-facing assets</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
