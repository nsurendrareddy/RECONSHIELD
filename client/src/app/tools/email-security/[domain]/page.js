import React from 'react';
import Link from 'next/link';
import { 
  Server, Search, Globe, ChevronRight, Clock, AlertTriangle, 
  Shield, Database, Lock, Terminal, Activity, Info, CheckCircle2, Check, Key, Network
} from 'lucide-react';
import { notFound } from 'next/navigation';
import SimulatedDataNotice from '@/components/SimulatedDataNotice';

const isValidDomain = (domain) => {
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain);
};

// Deterministic seed generator
function getSeededValue(str, seed) {
  let hash = 0;
  const combined = str + seed;
  for (let i = 0; i < combined.length; i++) {
    hash = combined.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    return { title: 'Invalid Domain Target' };
  }

  return {
    title: `${domain} Email Security Audit | SPF, DKIM & DMARC Check`,
    description: `Analyze email authentication settings for ${domain}. Verify SPF records lookup, check DKIM signature configurations, and inspect DMARC policy alignments.`,
    alternates: {
      canonical: `https://reconshield.in/tools/email-security/${domain}`,
    },
    robots: { index: false, follow: true },
    openGraph: {
      url: `https://reconshield.in/tools/email-security/${domain}`,
      title: `${domain} Email Security Analysis`,
      description: `Active SPF, DKIM, and DMARC policy validation parameters and deliverability check scores for ${domain}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${domain} Domain Email Security`,
      description: `Audit email authentication status and brand protection alignment for ${domain}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function EmailSecurityIntelligencePage({ params }) {
  const resolvedParams = await params;
  const domain = resolvedParams?.domain?.toLowerCase();

  if (!domain || !isValidDomain(domain)) {
    notFound();
  }

  // Generate deterministic report parameters based on target domain name
  const seedRisk = getSeededValue(domain, "risk") % 45 + 10; // Risk score 10-55
  const seedScore = 100 - seedRisk;
  const lookupCount = (getSeededValue(domain, "lookups") % 8) + 2; // 2 to 10 lookups
  
  const dmarcPolicies = ["reject", "quarantine", "none"];
  const dmarcPolicy = dmarcPolicies[getSeededValue(domain, "dmarc") % dmarcPolicies.length];
  
  const spfs = [
    `v=spf1 include:_spf.google.com include:sendgrid.net ~all`,
    `v=spf1 include:spf.protection.outlook.com include:mcsv.net -all`,
    `v=spf1 ip4:192.168.1.0/24 include:mailgun.org ~all`,
    `v=spf1 include:mail.zendesk.com ?all`
  ];
  const spfRecord = spfs[getSeededValue(domain, "spf_idx") % spfs.length];

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/tools/email-security/${domain}/#article`,
        headline: `Sample Email Authentication Audit (Illustrative) for ${domain}`,
        description: `Demonstration analysis documenting SPF records, DKIM configurations, and DMARC alignments for ${domain} using simulated data.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Security Research'
        },
        url: `https://reconshield.in/tools/email-security/${domain}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Email Security Checker', item: 'https://reconshield.in/tools/email-security' },
          { '@type': 'ListItem', position: 3, name: domain, item: `https://reconshield.in/tools/email-security/${domain}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `How do I check email security on ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Use the ReconShield Email Security Checker input field above to parse active DNS zones and verify SPF, DKIM, and DMARC parameters for ${domain}.` }
          },
          {
            '@type': 'Question',
            name: `What is the DMARC policy for ${domain}?`,
            acceptedAnswer: { '@type': 'Answer', text: `DMARC configurations define how failed authentication items are processed (monitoring p=none, redirecting to spam p=quarantine, or blocking p=reject).` }
          },
          {
            '@type': 'Question',
            name: `Does the SPF record for ${domain} exceed lookup limits?`,
            acceptedAnswer: { '@type': 'Answer', text: `Standard guidelines limit nested SPF redirects to 10. Exceeding this causes validation checks to fail, impacting mail deliverability.` }
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
              <li><Link href="/tools/email-security" className="hover:text-[#00ff88] transition-colors">Email Security Checker</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{domain}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
              <Lock className="w-3 h-3" />
              <span>Email Authentication Audit</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Email Security Audit for <span className="text-cyan-400 font-mono">{domain}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Verify SPF records, check active DKIM keys, inspect DMARC alignments, and review delivery protection parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <SimulatedDataNotice />

              {/* Dynamic Telemetry Audit Card */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-cyan-400" />
                  Sample Email Authentication Audit (Illustrative)
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5 font-sans">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Target Domain</dt>
                    <dd className="text-white font-bold break-all">{domain}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Authentication Health Score</dt>
                    <dd className={`font-mono text-2xl font-bold ${
                      seedScore > 75 ? 'text-emerald-400' :
                      seedScore > 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {seedScore}/100
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">DMARC Enforcement Policy</dt>
                    <dd className={`font-mono text-sm font-bold ${
                      dmarcPolicy === 'reject' ? 'text-emerald-400' :
                      dmarcPolicy === 'quarantine' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      p={dmarcPolicy}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Nested SPF Lookups</dt>
                    <dd className={`font-mono text-sm font-bold ${lookupCount > 9 ? 'text-red-400' : 'text-[#00ff88]'}`}>
                      {lookupCount}/10 DNS queries
                    </dd>
                  </div>
                </dl>

                {/* Parsed Record Details */}
                <h3 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider mb-3">// Example Parsed DNS Authentication Records (Demo Data)</h3>
                <div className="bg-[#05080f] border border-white/5 rounded-xl p-4 font-mono text-xs text-gray-400 space-y-4 mb-6">
                  <div>
                    <div className="text-gray-500 text-[10px] mb-1">SPF RECORD (TXT)</div>
                    <div className="text-white break-all bg-black/30 p-2 rounded border border-white/5">{spfRecord}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-[10px] mb-1">DMARC POLICY RECORD (TXT)</div>
                    <div className="text-white break-all bg-black/30 p-2 rounded border border-white/5">
                      v=DMARC1; p={dmarcPolicy}; pct=100; rua=mailto:dmarc-reports@{domain}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-[10px] mb-1">DKIM SIGNATURE INDEX</div>
                    <div className="text-gray-400">Selector key active: <span className="text-cyan-400">google</span> or <span className="text-cyan-400">default</span></div>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-6 font-sans">
                  Initiate a real-time email authentication check to verify SPF records, inspect DKIM key setups, and analyze DMARC rules for <strong>{domain}</strong>.
                </p>
                
                <Link href={`/tools/email-security?target=${domain}`} className="inline-flex items-center justify-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Search className="w-4 h-4" />
                  Perform Security Check on {domain}
                </Link>
              </div>

              {/* Technical Analysis Section */}
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Technical Analysis: Email Authenticity and Spool Protections for {domain}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Protecting the sending reputation of <strong>{domain}</strong> is a vital element of business perimeter management. SPF, DKIM, and DMARC operate as three complementary layers that prove to global inbox providers (such as Google and Yahoo) that emails arriving from {domain} are genuine and authorized.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Understanding SPF Validation Scope</h3>
                <p className="text-gray-400 leading-relaxed">
                  The SPF record listed for {domain} tells incoming email servers which mail hosts are allowed to connect and relay messages. Ensuring that third-party sending platforms (such as newsletter lists or CRM databases) are included in this record prevents delivery drops and SPF validation failures.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Enforcing DMARC Alignments</h3>
                <p className="text-gray-400 leading-relaxed">
                  While SPF and DKIM verify specific technical details, DMARC ensures that the visible 'From' domain matches those authenticated fields. By transitioning the DMARC policy from `p=none` to `p=reject`, {domain} guarantees that spoofed phishing messages are dropped by receiving servers.
                </p>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `Does this scanner verify DKIM selector keys on ${domain}?`, a: `DKIM verification requires knowing the specific selector string used in the message headers. Our tool queries common standard selectors (like 'google' or 'default') to locate active public keys.` },
                    { q: `What happens if ${domain} lacks a DMARC record?`, a: `Without DMARC, receiving servers cannot enforce policy alignment. Even if SPF and DKIM pass, malicious senders can spoof the visible 'From' header, exposing your domain name to spoofing attacks.` },
                    { q: `How do SPF nested lookups affect delivery for ${domain}?`, a: `Standard rules allow up to 10 nested DNS lookups. If your SPF contains too many 'include' statements that exceed this limit, validations fail, and receiving servers may reject your emails.` }
                  ].map((faq, i) => (
                    <div key={i} className="p-5 rounded-xl bg-[#0d1117] border border-white/[0.06]">
                      <h3 className="text-white font-semibold mb-2 text-sm">{faq.q}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar with Entity Relations */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24 font-sans">
                <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Entity Graph Relations</h3>
                
                <div className="space-y-3">
                  <Link href={`/tools/whois`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">WHOIS Lookup</div>
                      <div className="text-xs text-gray-500">Query domain registration</div>
                    </div>
                  </Link>

                  <Link href={`/tools/ssl-checker`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">SSL Analyzer</div>
                      <div className="text-xs text-gray-500">Verify certificate validity</div>
                    </div>
                  </Link>
                  
                  <Link href={`/tools/dns-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">DNS Lookup</div>
                      <div className="text-xs text-gray-500">Resolve A/MX/TXT records</div>
                    </div>
                  </Link>

                  <Link href={`/tools/ip-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20">
                      <Network className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">IP Lookup</div>
                      <div className="text-xs text-gray-500">Analyze host reputation</div>
                    </div>
                  </Link>

                  <Link href={`/tools/http-headers`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Security Headers</div>
                      <div className="text-xs text-gray-500">Audit response headers</div>
                    </div>
                  </Link>

                  <Link href={`/tools/subdomain-finder`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Subdomain Finder</div>
                      <div className="text-xs text-gray-500">Enumerate host namespaces</div>
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
