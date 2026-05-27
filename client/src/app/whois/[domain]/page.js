import React from 'react';
import Link from 'next/link';
import { Globe, Shield, Server, Activity, ChevronRight, AlertTriangle } from 'lucide-react';
import { notFound } from 'next/navigation';

const isValidDomain = (domain) => {
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain);
};

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const domain = resolvedParams?.domain?.toLowerCase();

    if (!domain || !isValidDomain(domain)) {
      return { title: 'Invalid Domain' };
    }

    return {
      title: `${domain} WHOIS & Domain Ownership Intelligence`,
      description: `Complete WHOIS domain ownership analysis for ${domain}. View registrar, registration dates, authoritative nameservers, and uncover domain infrastructure details.`,
      alternates: {
        canonical: `https://reconshield.in/tools/whois/${domain}`,
      },
      robots: { index: true, follow: true },
      openGraph: {
        url: `https://reconshield.in/tools/whois/${domain}`,
        title: `${domain} WHOIS Profile`,
        description: `Analyze the WHOIS records and domain ownership for ${domain}.`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${domain} WHOIS Intelligence`,
        description: `Domain registration and ownership data analysis for ${domain}.`,
      }
    };
  } catch (error) {
    return { title: 'Error' };
  }
}

export default async function WhoisIntelligencePage({ params }) {
  try {
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
        headline: `${domain} WHOIS Registration Security Report`,
        description: `Detailed analysis of the domain registration configuration and authoritative registrar for ${domain}.`,
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
          { '@type': 'ListItem', position: 2, name: 'WHOIS Intelligence', item: 'https://reconshield.in/tools/whois' },
          { '@type': 'ListItem', position: 3, name: domain, item: `https://reconshield.in/tools/whois/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Who owns ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The ownership details for ${domain} are often masked by domain privacy services, but the WHOIS record reveals the registrar and dates of registration.` }
          },
          {
            '@type': 'Question',
            name: `When was ${domain} registered?`,
            acceptedAnswer: { '@type': 'Answer', text: `Registration, expiration, and last updated dates for ${domain} are available in its WHOIS data, which helps identify newly registered malicious domains.` }
          },
          {
            '@type': 'Question',
            name: `What registrar is ${domain} using?`,
            acceptedAnswer: { '@type': 'Answer', text: `The WHOIS database indicates which domain registrar (e.g., GoDaddy, Namecheap, Cloudflare) currently manages ${domain}.` }
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
              <Globe className="w-3 h-3" />
              <span>Domain Registration Profile</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="text-purple-400">{domain}</span> WHOIS Intelligence
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Analyze registrar data, registration dates, and domain ownership details for {domain}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-500" />
                  Live WHOIS Lookup
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Target Domain</dt>
                    <dd className="text-white font-bold break-all">{domain}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Query Scope</dt>
                    <dd className="text-white font-bold">Registration Dates, Registrar, NS</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Domain Privacy</dt>
                    <dd className="text-gray-300 font-mono text-sm">Awaiting Lookup...</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Age Score</dt>
                    <dd className="text-gray-300 font-mono text-sm">Awaiting Dates...</dd>
                  </div>
                </dl>

                <p className="text-sm text-gray-400 mb-6">
                  Perform an active resolution against authoritative registrars to extract the full public WHOIS record for <strong>{domain}</strong>.
                </p>
                
                <Link href={`/tools/whois?target=${domain}`} className="inline-flex items-center justify-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Globe className="w-4 h-4" />
                  Query WHOIS Records for {domain}
                </Link>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Understanding WHOIS for {domain}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  WHOIS is a query and response protocol that is widely used for querying databases that store the registered users or assignees of an Internet resource, such as a domain name like <strong>{domain}</strong>. It provides crucial visibility into domain ownership, registration dates, and the managing registrar.
                </p>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24">
                <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Entity Graph Relations</h3>
                
                <div className="space-y-3">
                  <Link href={`/dns-records/${domain}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">DNS Intelligence</div>
                      <div className="text-xs text-gray-500">Query domain records</div>
                    </div>
                  </Link>

                  <Link href={`/subdomains/${domain}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Subdomains</div>
                      <div className="text-xs text-gray-500">Discover hidden assets</div>
                    </div>
                  </Link>
                  
                  <Link href={`/ssl/${domain}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:bg-pink-500/20">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">SSL Certificates</div>
                      <div className="text-xs text-gray-500">Validate Crypto Trust</div>
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
  } catch (error) {
    console.error("WHOIS Page Error:", error);
    notFound();
  }
}
