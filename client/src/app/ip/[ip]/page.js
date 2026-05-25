import React from 'react';
import Link from 'next/link';
import { Shield, Globe, Server, Activity, ChevronRight, Lock } from 'lucide-react';
import { notFound } from 'next/navigation';

// Validate IP address format
const isValidIP = (ip) => {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const ip = resolvedParams?.ip;

  if (!ip || !isValidIP(ip)) {
    return { title: 'Invalid IP Address' };
  }

  return {
    title: `IP Address ${ip} Details - Geolocation, ASN & Threat Reputation`,
    description: `Complete security analysis for IP ${ip}. Discover the geolocation, ISP, Autonomous System Number (ASN), and check if ${ip} is blacklisted or associated with malicious activity.`,
    keywords: [`${ip}`, `ip ${ip}`, `${ip} geolocation`, `who owns ${ip}`, `${ip} blacklist check`, `${ip} asn`, `ip lookup ${ip}`],
    alternates: {
      canonical: `https://reconshield.in/ip/${ip}`,
    },
    openGraph: {
      url: `https://reconshield.in/ip/${ip}`,
      title: `${ip} | IP Intelligence & Geolocation | ReconShield`,
      description: `Comprehensive threat intelligence and geolocation data for IP address ${ip}.`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `IP Analysis: ${ip}`,
      description: `Analyze the security reputation and physical location of IP ${ip}.`,
    }
  };
}

export default async function IpIntelligencePage({ params }) {
  const resolvedParams = await params;
  const ip = resolvedParams?.ip;

  if (!ip || !isValidIP(ip)) {
    notFound();
  }

  // Schema Generation
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/ip/${ip}/#article`,
        headline: `IP Address ${ip} Security Analysis & Geolocation`,
        description: `Detailed threat intelligence report and geographical data for IP address ${ip}.`,
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Security'
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
          { '@type': 'ListItem', position: 2, name: 'IP Intelligence', item: 'https://reconshield.in/tools/ip-lookup' },
          { '@type': 'ListItem', position: 3, name: ip, item: `https://reconshield.in/ip/${ip}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the location of IP ${ip}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The geographical location of ${ip} depends on its routing allocation by the Internet Service Provider. Our scanner can pinpoint the city, region, and country associated with this IPv4/IPv6 address.` }
          },
          {
            '@type': 'Question',
            name: `Is IP ${ip} safe?`,
            acceptedAnswer: { '@type': 'Answer', text: `Safety is determined by checking ${ip} against global threat intelligence blacklists. If it is involved in spam, malware distribution, or botnets, it will be flagged as unsafe.` }
          },
          {
            '@type': 'Question',
            name: `Who owns ${ip}?`,
            acceptedAnswer: { '@type': 'Answer', text: `IP addresses are owned by organizations known as Autonomous Systems. By analyzing the ASN for ${ip}, we can identify the ISP or hosting provider that controls it.` }
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
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/tools/ip-lookup" className="hover:text-[#00ff88] transition-colors">IP Intelligence</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{ip}</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
              <Globe className="w-3 h-3" />
              <span>Network Intelligence Report</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              IP Address <span className="text-[#00ff88]">{ip}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Real-time geographical tracking, ASN mapping, and threat reputation analysis for the network host at {ip}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Content & SEO text */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Dynamic Analysis Card */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#00ff88]" />
                  Live Analysis
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Initiate a real-time, passive scan on <strong>{ip}</strong> to uncover its physical location, ISP details, and potential vulnerabilities.
                </p>
                <Link href={`/ip-scanner?target=${ip}`} className="inline-flex items-center justify-center gap-2 bg-[#00ff88] hover:bg-[#00cc6a] text-black px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(0,255,136,0.2)] hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]">
                  <Shield className="w-4 h-4" />
                  Run Full Scan on {ip}
                </Link>
              </div>

              {/* RAG-Optimized Content Block for LLMs */}
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  What is IP {ip}?
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  The IP address <strong>{ip}</strong> is a unique numerical identifier assigned to a device connected to a computer network. 
                  Every time this IP interacts with a web server, email gateway, or firewall, it leaves a digital footprint. Security researchers and network administrators investigate IPs like {ip} to determine its physical origin (geolocation) and the organization responsible for routing its traffic (ASN).
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Threat Intelligence & Reputation</h3>
                <p className="text-gray-400 leading-relaxed">
                  Monitoring the reputation of {ip} is critical for network defense. If this address is compromised, it may be utilized in Distributed Denial of Service (DDoS) attacks, brute-force credential stuffing, or as a spam relay. Cross-referencing {ip} against Real-time Blackhole Lists (RBLs) and DNS-based threat feeds reveals whether it poses an active risk to your infrastructure.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Investigation Workflows</h3>
                <ul className="text-gray-400 leading-relaxed list-disc pl-5 space-y-2">
                  <li><strong>Port Scanning:</strong> Checking {ip} for open ports (e.g., SSH, RDP, HTTP) to map exposed services.</li>
                  <li><strong>Reverse DNS (PTR):</strong> Resolving {ip} to discover associated domain names and virtual hosts.</li>
                  <li><strong>WHOIS Query:</strong> Identifying the regional internet registry (RIR) responsible for allocating {ip}.</li>
                </ul>
              </div>

              {/* Dynamic FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `How accurate is the location for ${ip}?`, a: `Geolocation for ${ip} is typically accurate to the city or zip code level, sourced from databases provided by the presiding ISP.` },
                    { q: `Can ${ip} be a VPN or proxy?`, a: `Yes. Running a detailed scan on ${ip} will analyze MTU signatures and known proxy databases to determine if the connection is anonymized.` },
                    { q: `What ports should I check on ${ip}?`, a: `Standard reconnaissance involves scanning ${ip} for common attack vectors including port 22 (SSH), 80 (HTTP), 443 (HTTPS), and 3389 (RDP).` }
                  ].map((faq, i) => (
                    <div key={i} className="p-5 rounded-xl bg-[#0d1117] border border-white/[0.06]">
                      <h3 className="text-white font-semibold mb-2 text-sm">{faq.q}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Internal Linking Context */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24">
                <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Further Analysis</h3>
                
                <div className="space-y-3">
                  <Link href={`/tools/port-scanner?target=${ip}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500/20">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Scan Ports</div>
                      <div className="text-xs text-gray-500">Find open services on {ip}</div>
                    </div>
                  </Link>

                  <Link href={`/tools/ssl-checker?target=${ip}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/20">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Check SSL</div>
                      <div className="text-xs text-gray-500">Audit certificates on {ip}</div>
                    </div>
                  </Link>

                  <Link href={`/tools/whois-checker?target=${ip}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">WHOIS Record</div>
                      <div className="text-xs text-gray-500">Find allocation data for {ip}</div>
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
