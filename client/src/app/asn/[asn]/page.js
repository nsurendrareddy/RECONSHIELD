import React from 'react';
import Link from 'next/link';
import { Network, Shield, AlertTriangle, ChevronRight, Globe, Server } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedASNs from '@/components/RelatedASNs';
import { generateDatasetSchema } from '@/utils/metadata';
import { KNOWN_ASNS } from '@/lib/entityRegistry';


// ASN Validation (e.g. AS15169 or 15169)
const isValidASN = (asn) => {
  const match = asn?.match(/^(?:AS)?(\d+)$/i);
  if (!match) return false;
  const num = parseInt(match[1], 10);
  return num > 0 && num <= 4294967295; // Max 32-bit ASN
};

const extractAsnNumber = (asn) => {
  const match = asn?.match(/^(?:AS)?(\d+)$/i);
  return match ? match[1] : null;
};



export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const rawAsn = resolvedParams?.asn;

  if (!rawAsn || !isValidASN(rawAsn)) {
    return { title: 'Invalid ASN' };
  }

  const asnNum = extractAsnNumber(rawAsn);
  const formattedAsn = `AS${asnNum}`;

  if (!KNOWN_ASNS.includes(formattedAsn)) {
    return { title: 'ASN Not Found' };
  }

  return {
    title: `${formattedAsn} Routing Details & IP Blocks`,
    description: `Complete BGP routing and threat intelligence profile for Autonomous System ${formattedAsn}. View associated IP prefixes, peering relationships, and abuse reports.`,
    alternates: {
      canonical: `https://reconshield.in/asn/${formattedAsn}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      url: `https://reconshield.in/asn/${formattedAsn}`,
      title: `${formattedAsn} Network Profile`,
      description: `Analyze the routing infrastructure and security reputation of ${formattedAsn}.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${formattedAsn} Intelligence`,
      description: `BGP routing and threat data for Autonomous System ${formattedAsn}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function AsnIntelligencePage({ params }) {
  const resolvedParams = await params;
  const rawAsn = resolvedParams?.asn;

  if (!rawAsn || !isValidASN(rawAsn)) {
    notFound();
  }

  const asnNum = extractAsnNumber(rawAsn);
  const formattedAsn = `AS${asnNum}`;

  if (!KNOWN_ASNS.includes(formattedAsn)) {
    notFound();
  }

  if (rawAsn !== formattedAsn) {
    redirect(`/asn/${formattedAsn}`);
  }

  // Schema Generation: Dataset & FAQPage
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      generateDatasetSchema({
        name: `${formattedAsn} IPv4/IPv6 Routing Allocation Data`,
        description: `Autonomous System routing allocation dataset for ${formattedAsn}. Contains BGP routing table metrics, prefix advertisements, network peering relationships, and organizational threat reputation details.`,
        url: `https://reconshield.in/asn/${formattedAsn}`,
        dateModified: new Date().toISOString()
      })
,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'ASN Hub', item: 'https://reconshield.in/asn' },
          { '@type': 'ListItem', position: 3, name: formattedAsn, item: `https://reconshield.in/asn/${formattedAsn}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is ${formattedAsn}?`,
            acceptedAnswer: { '@type': 'Answer', text: `${formattedAsn} is an Autonomous System Number (ASN) assigned by a Regional Internet Registry (RIR) to identify a specific network organization on the global internet, allowing it to exchange routing information via BGP.` }
          },
          {
            '@type': 'Question',
            name: `How many IPs are in ${formattedAsn}?`,
            acceptedAnswer: { '@type': 'Answer', text: `The total number of IP addresses managed by ${formattedAsn} depends on the CIDR blocks allocated to it by the internet registry. Our tools can map these specific IP prefixes.` }
          },
          {
            '@type': 'Question',
            name: `Is traffic from ${formattedAsn} safe?`,
            acceptedAnswer: { '@type': 'Answer', text: `Safety depends on the organization controlling the ASN. Bulletproof hosting providers or compromised ISPs often have ASNs with highly negative reputation scores due to prevalent malware or spam origins.` }
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
          
          <Breadcrumbs crumbs={[
            { label: 'ASN Hub', href: '/asn' },
            { label: formattedAsn, href: `/asn/${formattedAsn}` }
          ]} />

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-mono text-purple-400 mb-4 uppercase tracking-widest">
              <Network className="w-3 h-3" />
              <span>Autonomous System Profile</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Autonomous System <span className="text-purple-400">{formattedAsn}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Analyze BGP routing advertisements, IP prefix allocations, and organizational threat reputation for {formattedAsn}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-500" />
                  ASN Intelligence Snapshot
                </h2>
                
                {/* RAG optimized Description List for AI Retrieval */}
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Entity ID</dt>
                    <dd className="text-white font-bold">{formattedAsn}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Routing Protocol</dt>
                    <dd className="text-white font-bold">BGP (Border Gateway Protocol)</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Infrastructure Type</dt>
                    <dd className="text-white font-bold">Network Operator / ISP</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Threat Assessment</dt>
                    <dd className="text-gray-300 font-mono text-sm">Awaiting Live Scan...</dd>
                  </div>
                </dl>

                <p className="text-sm text-gray-400 mb-6">
                  Initiate a real-time OSINT gathering process to map all announced IP blocks and calculate an Abuse Confidence Score for {formattedAsn}.
                </p>
                
                <Link href={`/tools/ip-lookup`} className="inline-flex items-center justify-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Shield className="w-4 h-4" />
                  Query Routing Data for {formattedAsn}
                </Link>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  What is an Autonomous System?
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  The internet is a network of networks. An Autonomous System (AS) like <strong>{formattedAsn}</strong> is a large network or group of networks that has a unified routing policy. Every AS is assigned a globally unique number by the Internet Assigned Numbers Authority (IANA), which it uses to announce its IP address blocks (prefixes) to the rest of the internet via the Border Gateway Protocol (BGP).
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Threat Hunting by ASN</h3>
                <p className="text-gray-400 leading-relaxed">
                  Cybersecurity analysts track ASNs to identify patterns of malicious behavior. Some ASNs, often referred to as "bulletproof hosters," turn a blind eye to abuse and predominantly host malware command-and-control (C2) servers or phishing sites. By mapping an attack back to <strong>{formattedAsn}</strong>, security teams can dynamically block entire CIDR ranges associated with uncooperative network operators.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Common Investigations Involving {formattedAsn}</h3>
                <ul className="text-gray-400 leading-relaxed list-disc pl-5 space-y-2">
                  <li><strong>BGP Hijacking:</strong> Ensuring that {formattedAsn} is legitimately authorized to announce its specific IP prefixes.</li>
                  <li><strong>DDoS Mitigation:</strong> Dropping upstream traffic originating from {formattedAsn} if it is identified as part of a botnet swarm.</li>
                  <li><strong>Cloud Exposure:</strong> Identifying shadow IT assets if {formattedAsn} belongs to a major cloud provider (e.g., AWS, Azure).</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `How do I find the IP ranges for ${formattedAsn}?`, a: `You can query a BGP looking glass or use our IP intelligence tools to extract all CIDR prefixes currently advertised by ${formattedAsn}.` },
                    { q: `What happens if ${formattedAsn} is blacklisted?`, a: `If an ASN is placed on global threat lists, firewalls and spam filters will aggressively block or drop traffic originating from any IP address within its network.` },
                    { q: `Who manages ${formattedAsn}?`, a: `The registry details, including the technical and administrative contacts for ${formattedAsn}, can be uncovered via a WHOIS lookup against the presiding Regional Internet Registry (e.g., ARIN, RIPE, APNIC).` }
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
                  <Link href={`/tools/whois-checker`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">WHOIS Lookup</div>
                      <div className="text-xs text-gray-500">Query registry details</div>
                    </div>
                  </Link>

                  <Link href={`/tools/ip-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                      <Network className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">IP Geolocation</div>
                      <div className="text-xs text-gray-500">Locate individual hosts</div>
                    </div>
                  </Link>

                  <Link href={`/tools/port-scanner`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500/20">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Port Intelligence</div>
                      <div className="text-xs text-gray-500">Scan associated blocks</div>
                    </div>
                  </Link>
                </div>
                <RelatedASNs currentAsn={formattedAsn} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
