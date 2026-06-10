import React from 'react';
import Link from 'next/link';
import { Server, Search, Globe, ChevronRight, Clock, AlertTriangle, Shield, Database, Network } from 'lucide-react';
import { notFound } from 'next/navigation';

const isValidIp = (ip) => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const ip = resolvedParams?.ip;

  if (!ip || !isValidIp(ip)) {
    return { title: 'Invalid IP Address' };
  }

  return {
    title: `IP Reputation & Abuse Report for ${ip} | ReconShield`,
    description: `Lookup the threat intelligence, ASN routing, blacklist status, and abuse confidence score details for host IP ${ip}.`,
    alternates: {
      canonical: `https://reconshield.in/tools/ip-lookup/${ip}`,
    },
    openGraph: {
      url: `https://reconshield.in/tools/ip-lookup/${ip}`,
      title: `${ip} IP Reputation Check`,
      description: `Verify blacklist status and threat intelligence indicators for ${ip}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${ip} Threat Intelligence Report`,
      description: `IP reputation audit and blacklist status check for ${ip}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function IpIntelligencePage({ params }) {
  const resolvedParams = await params;
  const ip = resolvedParams?.ip;

  if (!ip || !isValidIp(ip)) {
    notFound();
  }

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/tools/ip-lookup/${ip}/#article`,
        headline: `${ip} IP Reputation & Threat Intelligence Report`,
        description: `Detailed analysis of the blacklist status, ASN registration, geographic location, and abuse history for IP address ${ip}.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research'
        },
        url: `https://reconshield.in/tools/ip-lookup/${ip}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'IP Reputation Checker', item: 'https://reconshield.in/tools/ip-lookup' },
          { '@type': 'ListItem', position: 3, name: ip, item: `https://reconshield.in/tools/ip-lookup/${ip}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Is the IP address ${ip} blacklisted?`,
            acceptedAnswer: { '@type': 'Answer', text: `To determine if ${ip} is blacklisted, we cross-reference it against 50+ DNSBL/RBL spam and threat directories. Run the active scan above to inspect current flags.` }
          },
          {
            '@type': 'Question',
            name: `What is the risk level of IP ${ip}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The risk score of ${ip} is calculated dynamically based on its ISP type (residential vs web hosting), proxy/VPN tunnels, and any recent reports of spam, hacking, or scanning.` }
          },
          {
            '@type': 'Question',
            name: `How do I request delisting for IP ${ip}?`,
            acceptedAnswer: { '@type': 'Answer', text: `If the IP is blacklisted, verify that the host is secured (no malware or spamming scripts), then contact the specific listing blocklist directory to request delisting.` }
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
              <li><Link href="/tools/ip-lookup" className="hover:text-[#00ff88] transition-colors">IP Reputation</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{ip}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
              <Search className="w-3 h-3" />
              <span>IP Intelligence Report</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              IP Reputation for <span className="text-[#00ff88] font-mono">{ip}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Verify blacklist indicators, geolocation coordinates, Autonomous System routing, and threat classifications for host IP {ip}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-[#00ff88]" />
                  Threat Intelligence Scan
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Target IP</dt>
                    <dd className="text-white font-mono break-all">{ip}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Blacklist Status</dt>
                    <dd className="text-gray-300 font-mono text-sm">Querying DNSBL/RBL Feeds...</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Abuse Score</dt>
                    <dd className="text-gray-300 font-mono text-sm">Awaiting Dynamic Scan...</dd>
                  </div>
                </dl>

                <p className="text-sm text-gray-400 mb-6">
                  Initiate a real-time reputation analysis for <strong>{ip}</strong> to check its status across global security blocklists, proxy databases, and BGP routing directories.
                </p>
                
                <Link href={`/tools/ip-lookup?target=${ip}`} className="inline-flex items-center justify-center gap-2 bg-[#00ff88]/20 hover:bg-[#00ff88]/30 text-[#00ff88] border border-[#00ff88]/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Search className="w-4 h-4" />
                  Perform Dynamic Scan on {ip}
                </Link>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Security Context: IP {ip}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Every connection established on the internet leaves a trail at the IP layer. For IP address <strong>{ip}</strong>, conducting threat intelligence analysis allows security teams to determine the host's background. If the IP is owned by a cloud VPS hosting provider (such as DigitalOcean or AWS), it carries different security risks compared to a domestic ISP line.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Threat Vectors & Blacklisting</h3>
                <p className="text-gray-400 leading-relaxed">
                  Compromised hosts are often compiled into zombie networks (botnets). If malware resides on a machine using the IP address {ip}, it may automatically distribute email spam, initiate brute-force login attempts against remote portals, or scan the internet for open SSH ports. This behavior causes blocklist operators like Spamhaus to flag the host.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Remediation Guidelines</h3>
                <p className="text-gray-400 leading-relaxed">
                  If you own this IP and it is currently blacklisted, review your router or server security configuration. Locate any open SMTP relays, secure vulnerable software versions, and ensure no devices on the network are actively communicating with known malware command-and-control servers. Once the malicious traffic ceases, request removal from blocklist operators.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `What is the Autonomous System (AS) for IP ${ip}?`, a: `The Autonomous System (AS) designates the specific network operator routing traffic for ${ip}. By resolving the ASN, we identify the governing ISP or datacenter hosting provider.` },
                    { q: `Does this lookup reveal the physical address of the owner of ${ip}?`, a: `No. Geolocation only resolves regional coordinates (such as city, state, or country) registered by the regional internet registry. Precise street addresses are not public metadata.` },
                    { q: `Why does my IP reputation change over time?`, a: `IP addresses are frequently rotated by ISPs. A dynamic residential IP might inherit a poor reputation if a previous user engaged in spamming, which naturally gets cleared once malicious activity stops.` }
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
                  <Link href={`/tools/whois`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">WHOIS Lookup</div>
                      <div className="text-xs text-gray-500">Query domain registration</div>
                    </div>
                  </Link>

                  <Link href={`/tools/dns-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">DNS Records</div>
                      <div className="text-xs text-gray-500">Verify zones & records</div>
                    </div>
                  </Link>
                  
                  <Link href={`/tools/ssl-checker`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">SSL Checker</div>
                      <div className="text-xs text-gray-500">Verify TLS certificate</div>
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
