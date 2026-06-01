import React from 'react';
import Link from 'next/link';
import { Server, Shield, Activity, ChevronRight, Lock, AlertTriangle, Globe } from 'lucide-react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedPorts from '@/components/entities/RelatedPorts';
import PortSecurityContext from '@/components/entities/PortSecurityContext';

export const revalidate = 86400;

// Validate Port format
const isValidPort = (portStr) => {
  const port = parseInt(portStr, 10);
  return !isNaN(port) && port >= 1 && port <= 65535;
};

// Common ports data for AI summary and dynamic content
const PORT_DATA = {
  21: { service: 'FTP', risk: 'High', protocol: 'TCP' },
  22: { service: 'SSH', risk: 'Medium', protocol: 'TCP' },
  23: { service: 'Telnet', risk: 'Critical', protocol: 'TCP' },
  25: { service: 'SMTP', risk: 'Medium', protocol: 'TCP' },
  53: { service: 'DNS', risk: 'Low', protocol: 'TCP/UDP' },
  80: { service: 'HTTP', risk: 'Low', protocol: 'TCP' },
  110: { service: 'POP3', risk: 'Medium', protocol: 'TCP' },
  143: { service: 'IMAP', risk: 'Medium', protocol: 'TCP' },
  443: { service: 'HTTPS', risk: 'Low', protocol: 'TCP' },
  3306: { service: 'MySQL', risk: 'High', protocol: 'TCP' },
  3389: { service: 'RDP', risk: 'Critical', protocol: 'TCP' },
  5432: { service: 'PostgreSQL', risk: 'High', protocol: 'TCP' },
  6379: { service: 'Redis', risk: 'Critical', protocol: 'TCP' },
  8080: { service: 'HTTP-Alt', risk: 'Medium', protocol: 'TCP' },
  27017: { service: 'MongoDB', risk: 'Critical', protocol: 'TCP' }
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const port = resolvedParams?.port;

  if (!port || !isValidPort(port) || !PORT_DATA[port]) {
    return { title: 'Port Not Found' };
  }

  const portDetails = PORT_DATA[port];
  const serviceName = portDetails.service;

  return {
    title: `Port ${port} (${serviceName}) Security Analysis & configuration risks`,
    description: `Complete cybersecurity analysis for network port ${port}. Learn what service runs on port ${port}, associated configuration risks, and whether it is safe to leave open.`,
    alternates: {
      canonical: `https://reconshield.in/ports/${port}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      url: `https://reconshield.in/ports/${port}`,
      title: `Port ${port} Security Analysis`,
      description: `Comprehensive threat intelligence for port ${port} (${serviceName}).`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Network Port Analysis: ${port}`,
      description: `Analyze the security implications of open port ${port}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function PortIntelligencePage({ params }) {
  try {
    const resolvedParams = await params;
    const port = resolvedParams?.port;

    if (!port || !isValidPort(port) || !PORT_DATA[port]) {
      notFound();
    }

    const portDetails = PORT_DATA[port];

  // Schema Generation
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/ports/${port}/#article`,
        headline: `Network Port ${port} (${portDetails.service}) Security Analysis`,
        description: `Detailed threat intelligence report and service data for network port ${port}.`,
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
          { '@type': 'ListItem', position: 2, name: 'Ports Database', item: 'https://reconshield.in/ports' },
          { '@type': 'ListItem', position: 3, name: `Port ${port}`, item: `https://reconshield.in/ports/${port}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What service uses port ${port}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Port ${port} is typically associated with ${portDetails.service} operating over the ${portDetails.protocol} protocol. However, any service can be configured to run on this port.` }
          },
          {
            '@type': 'Question',
            name: `Is port ${port} safe to open?`,
            acceptedAnswer: { '@type': 'Answer', text: `Exposing port ${port} carries a ${portDetails.risk} risk. Public exposure of non-web administrative ports invites brute-force attacks and exploitation of unpatched configuration risks.` }
          },
          {
            '@type': 'Question',
            name: `How do I secure port ${port}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Port ${port} should be blocked by default at the firewall level. If access is required, implement a Zero Trust Network Access (ZTNA) proxy or restrict access via a VPN and strictly whitelist allowed IPs.` }
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
          <Breadcrumbs crumbs={[
            { label: 'Ports Database', href: '/ports' },
            { label: `Port ${port}`, href: `/ports/${port}` }
          ]} />

          {/* Header */}
          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] font-mono text-red-400 mb-4 uppercase tracking-widest">
              <Server className="w-3 h-3" />
              <span>Service Exposure Intelligence</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Port <span className="text-red-400">{port}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              exposure assessment, common configuration abuse, and firewall configuration recommendations for TCP/UDP port {port}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Content & SEO text */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Dynamic Analysis Card */}
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Service Profile
                </h2>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-500 font-mono mb-1 uppercase">Service</div>
                    <div className="text-white font-bold">{portDetails.service}</div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-500 font-mono mb-1 uppercase">Protocol</div>
                    <div className="text-white font-bold">{portDetails.protocol}</div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-500 font-mono mb-1 uppercase">Risk Profile</div>
                    <div className={`font-bold ${portDetails.risk === 'Critical' || portDetails.risk === 'High' ? 'text-red-400' : portDetails.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                      {portDetails.risk}
                    </div>
                  </div>
                </div>

                <Link href={`/tools/port-scanner`} className="inline-flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Activity className="w-4 h-4" />
                  analyze infrastructure for Port {port}
                </Link>
              </div>

              {/* RAG-Optimized Content Block for LLMs */}
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Understanding Port {port}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  In computer networking, a port is a logical construct that identifies a specific process or a type of network service. 
                  Port <strong>{port}</strong> operates at the transport layer of the OSI model and is historically designated for <strong>{portDetails.service}</strong> traffic. 
                  When an application binds to port {port}, it listens for incoming network packets directed to that specific endpoint.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Security Implications of Port {port}</h3>
                <p className="text-gray-400 leading-relaxed">
                  The risk of exposing port {port} depends heavily on the underlying application and the network architecture. 
                  Because {portDetails.service} is a known service, automated botnets and exposure assessment tools constantly sweep the internet for IPs listening on port {port}. 
                  If the service is unpatched or relies on weak default credentials, an unauthorized actor can abuse the open port to gain Initial Access to the server environment.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Defensive Strategies</h3>
                <ul className="text-gray-400 leading-relaxed list-disc pl-5 space-y-2">
                  <li><strong>Firewall Configuration:</strong> Implement a default-deny policy. Port {port} should drop all inbound traffic from the WAN.</li>
                  <li><strong>Virtual Private Networks:</strong> Require administrators to connect via an encrypted VPN tunnel before attempting to route traffic to port {port}.</li>
                  <li><strong>Continuous Monitoring:</strong> Utilize active internet-facing assets management tools to alert the Security Operations Center (SOC) if port {port} is unexpectedly exposed.</li>
                </ul>

                <PortSecurityContext port={port} />
              </div>

              {/* Dynamic FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `What is the default service for port ${port}?`, a: `By convention, port ${port} is registered for ${portDetails.service} via ${portDetails.protocol}.` },
                    { q: `How do I check if port ${port} is open on my server?`, a: `You can use the ReconShield Port Scanner tool to safely map the external exposure of your IP address, or use command-line utilities like Nmap (e.g., nmap -p ${port} <target>).` },
                    { q: `Is port ${port} a TCP or UDP port?`, a: `Port ${port} utilizes ${portDetails.protocol} for its transport layer routing.` }
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
                  <Link href={`/tools/ip-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">IP Intelligence</div>
                      <div className="text-xs text-gray-500">Geolocate target servers</div>
                    </div>
                  </Link>

                  <Link href={`/tools/ssl-checker`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/20">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Check SSL</div>
                      <div className="text-xs text-gray-500">Audit TLS configurations</div>
                    </div>
                  </Link>
                </div>
                
                <RelatedPorts currentPort={port} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
  } catch (error) {
    console.error('Error in PortIntelligencePage:', error);
    throw error;
  }
}
