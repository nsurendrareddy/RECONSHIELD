import React from 'react';
import ToolScannerClient from '@/components/ToolScannerClient';

export const TOOL_CONFIG = {
  'dns-lookup': {
    title: 'Free DNS Lookup Tool',
    desc: 'Check A, MX, CNAME records instantly. Identify nameserver history, SPF/DMARC status, and potential DNS vulnerabilities.',
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
    title: toolId === 'dns-lookup' ? config.title : `${config.title} | Security Tools`,
    description: config.desc,
    alternates: {
      canonical: `https://reconshield.in/tools/${toolId}`,
    },
    openGraph: {
      url: `https://reconshield.in/tools/${toolId}`,
      type: 'website',
    }
  };
}

export function ToolPageContent({ toolId }) {
  const config = TOOL_CONFIG[toolId] || TOOL_CONFIG['dns-lookup'];
  
  return (
    <>
      <div className="sr-only">
        <h1>{config.title}</h1>
        <p>{config.desc}</p>
      </div>

      {/* Prominent Legal Disclaimer Badge */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 text-[10px] sm:text-xs font-mono text-amber-500 mb-8 shadow-sm">
          <div className="flex items-center gap-1.5 shrink-0 uppercase font-bold tracking-wider">
            <span className="text-[14px]">⚠️</span> LEGAL DISCLAIMER:
          </div>
          <p className="flex-1 leading-relaxed font-sans text-gray-400">
            ReconShield is intended for authorized security research and educational purposes only. Unauthorized scanning is illegal.
            <a href="/disclaimer" className="text-amber-500 underline ml-1.5 hover:text-amber-400 font-mono text-[10px]">View Policy</a>
          </p>
        </div>
      </div>

      <ToolScannerClient 
        toolId={toolId} 
        title={config.title} 
        desc={config.desc} 
      />

      <div className="max-w-5xl mx-auto px-4 pb-20">
        {config.seoContent}
      </div>
    </>
  );
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const toolId = resolvedParams?.toolId || 'dns-lookup';
  
  return <ToolPageContent toolId={toolId} />;
}
