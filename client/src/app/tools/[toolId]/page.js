import React from 'react';
import ToolScannerClient from '@/components/ToolScannerClient';
import { Globe, Lock, Layers, Shield, Activity } from 'lucide-react';

// Specialized sections
import DnsSection from '@/sections/DnsSection';
import SslSection from '@/sections/SslSection';
import HeadersSection from '@/sections/HeadersSection';
import VulnSimSection from '@/sections/VulnSimSection';
import IpSection from '@/sections/IpSection';

export const TOOL_CONFIG = {
  'dns-lookup': {
    title: 'Free DNS Lookup Tool',
    desc: 'Check A, MX, CNAME records instantly. Identify nameserver history, SPF/DMARC status, and potential DNS vulnerabilities.',
    icon: <Globe />,
    section: DnsSection,
    dataKey: 'dns',
    seoContent: (
       <div className="mt-16 prose prose-invert max-w-none border-t border-white/5 pt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">About DNS Infrastructure Analysis</h2>
        <p className="text-gray-400 leading-relaxed mb-6 font-mono text-sm">
          Domain Name System (DNS) is the phonebook of the internet. Analyzing DNS records is a critical first step in any security reconnaissance. 
          By examining MX, SPF, and DMARC records, you can identify potential email spoofing risks and infrastructure weaknesses. 
          Our free DNS lookup tool provides comprehensive visibility into any domain's infrastructure.
        </p>
      </div>
    )
  },
  'ssl-checker': {
    title: 'SSL/TLS Security Auditor',
    desc: 'Analyze certificate chains, cipher suites, and vulnerabilities.',
    icon: <Lock />,
    section: SslSection,
    dataKey: 'ssl',
    seoContent: (
      <div className="mt-16 prose prose-invert max-w-none border-t border-white/5 pt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">SSL/TLS Security Standards</h2>
        <p className="text-gray-400 leading-relaxed mb-6 font-mono text-sm">
          Encryption is the backbone of web security. An outdated SSL certificate or weak TLS cipher suites can leave your users' data vulnerable to interception. 
        </p>
      </div>
    )
  },
  'security-headers': {
    title: 'HTTP Header Security',
    desc: 'Evaluate CSP, HSTS, X-Frame-Options and other security headers.',
    icon: <Layers />,
    section: HeadersSection,
    dataKey: 'headers',
    seoContent: (
      <div className="mt-16 prose prose-invert max-w-none border-t border-white/5 pt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Understanding Security Headers</h2>
        <p className="text-gray-400 leading-relaxed mb-6 font-mono text-sm">
          HTTP security headers are a powerful way to harden your website with minimal performance impact. 
        </p>
      </div>
    )
  },
  'vulnerability-scanner': {
    title: 'Vulnerability Simulation',
    desc: 'Simulated attack vectors to identify potential weaknesses.',
    icon: <Shield />,
    section: VulnSimSection,
    dataKey: 'vuln_sim',
    seoContent: (
      <div className="mt-16 prose prose-invert max-w-none border-t border-white/5 pt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Passive Vulnerability Assessment</h2>
        <p className="text-gray-400 leading-relaxed mb-6 font-mono text-sm">
          Proactive security requires understanding your weaknesses before an attacker does. 
        </p>
      </div>
    )
  },
  'threat-intelligence': {
    title: 'Threat Intel & Reputation',
    desc: 'IP reputation, blacklist status, and ASN intelligence.',
    icon: <Activity />,
    section: IpSection,
    dataKey: 'ip',
    seoContent: (
      <div className="mt-16 prose prose-invert max-w-none border-t border-white/5 pt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Global Threat Intelligence</h2>
        <p className="text-gray-400 leading-relaxed mb-6 font-mono text-sm">
          Knowing who you are interacting with is vital for proactive defense.
        </p>
      </div>
    )
  }
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const toolId = resolvedParams?.toolId || 'dns-lookup';
  const config = TOOL_CONFIG[toolId] || TOOL_CONFIG['dns-lookup'];
  
  return {
    title: toolId === 'dns-lookup' ? config.title + ' | ReconShield' : `${config.title} | ReconShield Security Tools`,
    description: config.desc,
  };
}

/**
 * Shared content component used by both dynamic and static routes.
 */
export function ToolPageContent({ toolId }) {
  const config = TOOL_CONFIG[toolId] || TOOL_CONFIG['dns-lookup'];
  
  return (
    <>
      {/* 
          SERVER-RENDERED SEO CONTENT
          This block is rendered directly into the HTML stream.
      */}
      <div className="sr-only">
        <h1>{config.title}</h1>
        <p>{config.desc}</p>
      </div>

      <ToolScannerClient toolId={toolId} config={config} />

      {/* SEO Educational Content - Also rendered on server */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        {config.seoContent}
      </div>
    </>
  );
}

export default async function Page({ params }) {
  // If params is provided (dynamic route /tools/[toolId])
  const resolvedParams = await params;
  const toolId = resolvedParams?.toolId || 'dns-lookup';
  
  return <ToolPageContent toolId={toolId} />;
}
