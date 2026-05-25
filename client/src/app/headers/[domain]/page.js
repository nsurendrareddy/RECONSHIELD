import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Server, Globe, ChevronRight, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';

export const runtime = 'edge'; // Edge runtime for fast TTFB

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
    title: `${domain} HTTP Security Headers Analysis | Web Security`,
    description: `Evaluate the HTTP security headers for ${domain}. Check Content-Security-Policy (CSP), HSTS, X-Frame-Options, and defend against XSS & Clickjacking.`,
    keywords: [`${domain} security headers`, `${domain} csp`, `hsts ${domain}`, `x-frame-options ${domain}`, `check headers ${domain}`, `${domain} xss protection`],
    alternates: {
      canonical: `https://reconshield.in/headers/${domain}`,
    },
    openGraph: {
      url: `https://reconshield.in/headers/${domain}`,
      title: `${domain} Security Headers Profile | ReconShield`,
      description: `Analyze the application-layer security posture of ${domain}.`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} Web Security Analysis`,
      description: `HTTP security headers and web vulnerability analysis for ${domain}.`,
    }
  };
}

export default async function HeadersIntelligencePage({ params }) {
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
        '@id': `https://reconshield.in/headers/${domain}/#article`,
        headline: `${domain} Application Security Headers Report`,
        description: `Detailed analysis of the HTTP security directives (CSP, HSTS) protecting the web application at ${domain}.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/headers/${domain}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Security Headers', item: 'https://reconshield.in/tools/security-headers' },
          { '@type': 'ListItem', position: 3, name: domain, item: `https://reconshield.in/headers/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Does ${domain} have a Content Security Policy (CSP)?`,
            acceptedAnswer: { '@type': 'Answer', text: `A CSP is the primary defense against Cross-Site Scripting (XSS). Initiating an active scan on ${domain} will reveal if it enforces a strict CSP.` }
          },
          {
            '@type': 'Question',
            name: `Is ${domain} protected from Clickjacking?`,
            acceptedAnswer: { '@type': 'Answer', text: `Protection from Clickjacking is achieved by the X-Frame-Options header (or CSP frame-ancestors). If missing, attackers can load ${domain} inside an invisible iframe to trick users into performing unauthorized actions.` }
          },
          {
            '@type': 'Question',
            name: `Does ${domain} force HTTPS?`,
            acceptedAnswer: { '@type': 'Answer', text: `The Strict-Transport-Security (HSTS) header ensures browsers only communicate with ${domain} over an encrypted connection, preventing downgrade attacks on public Wi-Fi.` }
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
              <li><Link href="/tools/security-headers" className="hover:text-[#00ff88] transition-colors">Web Security</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-[10px] font-mono text-yellow-400 mb-4 uppercase tracking-widest">
              <Shield className="w-3 h-3" />
              <span>Application Layer Profile</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="text-yellow-400">{domain}</span> Security Headers
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Evaluate browser-side security directives to defend {domain} against XSS, MIME-sniffing, and clickjacking.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                  Live Header Audit
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Target Origin</dt>
                    <dd className="text-white font-bold break-all">https://{domain}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Runtime Layer</dt>
                    <dd className="text-white font-bold">Layer 7 (HTTP/HTTPS)</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Protection Scope</dt>
                    <dd className="text-white font-bold">Client-Side (Browser)</dd>
                  </div>
                </dl>

                <p className="text-sm text-gray-400 mb-6">
                  Initiate an HTTP GET request to <strong>{domain}</strong> to grade its active security headers against OWASP best practices.
                </p>
                
                <Link href={`/tools/security-headers?target=${domain}`} className="inline-flex items-center justify-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Shield className="w-4 h-4" />
                  Audit Headers for {domain}
                </Link>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Web Application Security for {domain}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  While SSL secures the pipe between the user and the server, HTTP Security Headers secure the application itself inside the user's browser. By properly configuring headers, the administrators of <strong>{domain}</strong> can neutralize entire classes of web vulnerabilities without changing a single line of frontend code.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Critical Protections</h3>
                <p className="text-gray-400 leading-relaxed">
                  The most vital headers are <strong>Content-Security-Policy (CSP)</strong> and <strong>Strict-Transport-Security (HSTS)</strong>. A missing CSP implies that {domain} inherently trusts any script that manages to execute on its pages, leaving it highly vulnerable to Cross-Site Scripting (XSS). Without HSTS, a user typing "http://{domain}" on a public Wi-Fi network could be intercepted before the server has a chance to redirect them to HTTPS.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Analysis Vectors</h3>
                <ul className="text-gray-400 leading-relaxed list-disc pl-5 space-y-2">
                  <li><strong>MIME Sniffing:</strong> Checking for <code>X-Content-Type-Options: nosniff</code> to ensure malicious uploads aren't executed as scripts.</li>
                  <li><strong>Referrer Leakage:</strong> Validating that the <code>Referrer-Policy</code> prevents sensitive URLs (e.g., password reset tokens) from leaking to third-party analytics integrations.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `What grade should ${domain} aim for?`, a: `Organizations should aim for an 'A' or 'A+' grade, meaning all modern headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options) are present and strictly configured.` },
                    { q: `Does ${domain} use Cloudflare or a WAF?`, a: `HTTP headers often leak the underlying technology stack. Signatures like 'cf-ray' or 'x-powered-by' can reveal if ${domain} is routed through a Web Application Firewall.` },
                    { q: `How do I fix missing headers on ${domain}?`, a: `Headers must be added to the server configuration (e.g., Nginx, Apache) or injected at the edge via Cloudflare Workers or Next.js next.config.js.` }
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
                  <Link href={`/tools/tech-detector`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Tech Stack</div>
                      <div className="text-xs text-gray-500">Fingerprint CMS & CDN</div>
                    </div>
                  </Link>

                  <Link href={`/tools/ssl-checker`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/20">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">SSL/TLS Security</div>
                      <div className="text-xs text-gray-500">Analyze cryptography</div>
                    </div>
                  </Link>

                  <Link href={`/tools/vulnerability-scanner`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500/20">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Vulnerability Scan</div>
                      <div className="text-xs text-gray-500">Identify misconfigurations</div>
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
