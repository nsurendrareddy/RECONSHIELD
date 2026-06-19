import React from 'react';
import Link from 'next/link';
import { Lock, Shield, Server, Activity, ChevronRight, Globe } from 'lucide-react';
import { notFound } from 'next/navigation';
import { generateDatasetSchema } from '@/utils/metadata';
import { SSL_TOPICS_DATA } from '@/utils/programmaticTopicsData';
import { renderMarkdown } from '@/utils/markdownRenderer';
import { KNOWN_DOMAINS } from '@/lib/entityRegistry';

const SSL_TOPICS = Object.keys(SSL_TOPICS_DATA);

// Basic domain validation
const isValidDomain = (domain) => {
  const normalized = domain.toLowerCase();
  if (SSL_TOPICS.includes(normalized)) return true;
  if (!KNOWN_DOMAINS.includes(normalized)) return false;
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain);
};

export async function generateStaticParams() {
  return SSL_TOPICS.map(domain => ({ domain }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    return { title: 'Invalid Domain' };
  }

  // Check if it's a programmatic authority page
  if (SSL_TOPICS_DATA[domain]) {
    const topic = SSL_TOPICS_DATA[domain];
    return {
      title: topic.title,
      description: topic.description,
      alternates: {
        canonical: `https://reconshield.in/ssl/${domain}`,
      },
      robots: { index: true, follow: true },
      openGraph: {
        url: `https://reconshield.in/ssl/${domain}`,
        title: topic.title,
        description: topic.description,
        type: 'article',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: topic.title,
        description: topic.description,
        images: ['/og-image.png']
      }
    };
  }

  return {
    title: `${domain} SSL/TLS Certificate Analysis & Security Profile`,
    description: `Complete TLS security and certificate analysis for ${domain}. View cipher suites, protocol support, exposure assessments, and SSL expiry information.`,
    alternates: {
      canonical: `https://reconshield.in/ssl/${domain}`,
    },
    robots: { index: false, follow: true },
    openGraph: {
      url: `https://reconshield.in/ssl/${domain}`,
      title: `${domain} SSL Profile`,
      description: `Cryptographic security and TLS protocol analysis for ${domain}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} TLS Intelligence`,
      description: `Review the SSL/TLS certificate security for ${domain}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function SslIntelligencePage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    notFound();
  }

  // Check if rendering a programmatic topic page
  if (SSL_TOPICS_DATA[domain]) {
    const topic = SSL_TOPICS_DATA[domain];

    const schemaJson = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TechArticle',
          '@id': `https://reconshield.in/ssl/${domain}/#article`,
          headline: topic.h1,
          description: topic.description,
          publisher: {
            '@type': 'Organization',
            name: 'ReconShield Security'
          },
          url: `https://reconshield.in/ssl/${domain}`
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
            { '@type': 'ListItem', position: 2, name: topic.parentToolName, item: `https://reconshield.in${topic.parentToolPath}` },
            { '@type': 'ListItem', position: 3, name: topic.h1, item: `https://reconshield.in/ssl/${domain}` },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: topic.faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a }
          }))
        },
        ...(topic.howto ? [{
          '@type': 'HowTo',
          name: topic.howto.name,
          description: topic.howto.description,
          step: topic.howto.steps.map((step, idx) => ({
            '@type': 'HowToStep',
            position: idx + 1,
            name: step.name,
            text: step.text,
            url: `https://reconshield.in/ssl/${domain}#step-${idx + 1}`
          }))
        }] : [])
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
                <li><Link href="/tools/ssl-checker" className="hover:text-[#00ff88] transition-colors">SSL Analysis</Link></li>
                <li><ChevronRight className="w-3 h-3" /></li>
                <li className="text-[#00ff88]">{topic.title}</li>
              </ol>
            </nav>

            <div className="border-b border-white/10 pb-8 mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-mono text-green-400 mb-4 uppercase tracking-widest">
                <Lock className="w-3 h-3" />
                <span>SSL/TLS Authority Guide</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {topic.h1}
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                {topic.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-10">
                
                {/* Deep-dive Content */}
                <article className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                  {renderMarkdown(topic.content)}
                </article>

                {/* Conversion CTA Card (Phase 5) */}
                <div className="mt-12 p-8 rounded-2xl border border-[#00ff88]/20 bg-gradient-to-br from-[#00ff88]/5 to-transparent relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/10 blur-[100px] rounded-full pointer-events-none" />
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">
                    Validate Your Own TLS Configuration
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-2xl leading-relaxed">
                    Instantly identify cryptographic configuration risks, missing intermediate chains, and vulnerable protocol selections on your server.
                  </p>
                  <Link href="/tools/ssl-checker">
                    <span className="inline-flex items-center justify-center bg-[#00ff88] hover:bg-[#00ff88]/90 text-black px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] cursor-pointer">
                      Run Live SSL/TLS Scan
                    </span>
                  </Link>
                </div>

                {/* FAQs Section */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {topic.faqs.map((faq, i) => (
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
                  <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Related Security Guides</h3>
                  
                  <div className="space-y-3">
                    {topic.related.map((rel, idx) => (
                      <Link key={idx} href={rel.path} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <div className="w-8 h-8 rounded-md bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88] group-hover:bg-[#00ff88]/20">
                          <Lock className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-[#00ff88] transition-colors">{rel.name}</div>
                          <div className="text-xs text-gray-500">Security intelligence guide</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }

  // Schema Generation for Domain pages
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/ssl/${domain}/#article`,
        headline: `${domain} SSL/TLS Cryptographic Security Report`,
        description: `Detailed analysis of the transport layer security (TLS) configuration and public key infrastructure for ${domain}.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/ssl/${domain}`
      },
      generateDatasetSchema({
        name: `${domain} SSL/TLS Cryptographic Security Data`,
        description: `Cryptographic security and TLS protocol details dataset for ${domain}. Features certificate chain audits, expiration validation, cipher suite evaluation, and secure configuration assessment.`,
        url: `https://reconshield.in/ssl/${domain}`,
        dateModified: new Date().toISOString()
      }),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'SSL Intelligence', item: 'https://reconshield.in/tools/ssl-checker' },
          { '@type': 'ListItem', position: 3, name: domain, item: `https://reconshield.in/ssl/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the SSL certificate for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `An SSL/TLS certificate binds a cryptographic key to ${domain}, establishing a secure, encrypted connection between the web server and the browser. Our analysis evaluates the strength of this certificate.` }
          },
          {
            '@type': 'Question',
            name: `Does ${domain} support TLS 1.3?`,
            acceptedAnswer: { '@type': 'Answer', text: `Modern security standards dictate that domains should support TLS 1.2 or TLS 1.3. You can initiate a live scan against ${domain} to determine its exact protocol support matrix.` }
          },
          {
            '@type': 'Question',
            name: `Are there configuration risks on ${domain}'s SSL?`,
            acceptedAnswer: { '@type': 'Answer', text: `If ${domain} supports obsolete protocols (like SSLv3 or TLS 1.0) or weak cipher suites (like RC4), it is susceptible to downgrade attacks and data decryption by malicious actors.` }
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
              <li><Link href="/tools/ssl-checker" className="hover:text-[#00ff88] transition-colors">SSL Analysis</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-mono text-green-400 mb-4 uppercase tracking-widest">
              <Lock className="w-3 h-3" />
              <span>TLS Security Profile</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="text-green-400">{domain}</span> TLS Configuration
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Cryptographic analysis, cipher suite evaluation, and certificate validity tracking for {domain}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  Live Certificate Audit
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Target Domain</dt>
                    <dd className="text-white font-bold break-all">{domain}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Assessment Type</dt>
                    <dd className="text-white font-bold">Transport Layer Security (TLS)</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Recommended Protocol</dt>
                    <dd className="text-white font-bold">TLS 1.2 / TLS 1.3</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Status</dt>
                    <dd className="text-gray-300 font-mono text-sm">Awaiting Handshake...</dd>
                  </div>
                </dl>

                <p className="text-sm text-gray-400 mb-6">
                  Initiate a real-time TLS handshake with <strong>{domain}</strong> to extract the certificate chain, verify the issuing CA, and grade the active cipher suites.
                </p>
                
                <Link href={`/tools/ssl-checker?target=${domain}`} className="inline-flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Shield className="w-4 h-4" />
                  Audit Security for {domain}
                </Link>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Analyzing {domain}'s Cryptography
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  When a client connects to <strong>{domain}</strong> via HTTPS, a complex cryptographic handshake occurs. The server presents a digital certificate proving its identity, and negotiates a cipher suite—a combination of algorithms for authentication, encryption, and message authentication—to secure the connection.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Configuration Exposure</h3>
                <p className="text-gray-400 leading-relaxed">
                  Misconfigurations on {domain}'s web server can lead to severe security breaches. If {domain} supports outdated protocols like SSLv3 or TLS 1.0, it may be vulnerable to attacks like POODLE or BEAST. Furthermore, if {domain} utilizes weak cipher suites (e.g., those using RC4 or 3DES), state-sponsored actors or sophisticated unauthorized actors positioned on the network could potentially decrypt the captured traffic.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Investigation Vectors for {domain}</h3>
                <ul className="text-gray-400 leading-relaxed list-disc pl-5 space-y-2">
                  <li><strong>Certificate Transparency (CT) Logs:</strong> Extracting historical certificates issued to {domain} to uncover hidden subdomains.</li>
                  <li><strong>Expiry Monitoring:</strong> Determining the exact expiration date to prevent disastrous service outages caused by expired certificates.</li>
                  <li><strong>Chain of Trust:</strong> Verifying that the certificate was issued by a trusted, non-compromised Certificate Authority (CA).</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `What happens if the certificate for ${domain} expires?`, a: `If the SSL certificate expires, modern browsers (Chrome, Firefox, Safari) will display a full-page security warning (ERR_CERT_DATE_INVALID), effectively blocking user access and crippling traffic to the site.` },
                    { q: `How do I enforce HTTPS on ${domain}?`, a: `To ensure all connections are encrypted, the server for ${domain} should implement the HTTP Strict Transport Security (HSTS) header and enforce 301 redirects from HTTP to HTTPS.` },
                    { q: `Can unauthorized actors fake a certificate for ${domain}?`, a: `unauthorized actors cannot fake a valid, trusted certificate without compromising a Root CA or successfully executing a complex BGP hijacking attack to intercept domain validation emails/DNS checks.` }
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

                  <Link href={`/tools/http-headers`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-500/20">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">HTTP Headers</div>
                      <div className="text-xs text-gray-500">Check HSTS and CSP</div>
                    </div>
                  </Link>

                  <Link href={`/tools/whois`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">WHOIS Record</div>
                      <div className="text-xs text-gray-500">Find domain owner</div>
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
