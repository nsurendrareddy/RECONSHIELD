import React from 'react';
import Link from 'next/link';
import { GitBranch, Shield, Terminal, Globe, Lock, Cpu, Code2, Heart, Award } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Open Source Security Knowledge Bases | ReconShield',
  description: 'Access public security standards, MIT-licensed automation rules, and contributor guidelines for SSL/TLS, Network Ports, and HTTP security headers.',
  alternates: {
    canonical: 'https://reconshield.in/opensource',
  }
};

const REPOS = [
  {
    name: 'Security Headers Knowledge Base',
    desc: 'Community-driven configuration templates, validation rules, and parser specifications for security headers (CSP, HSTS, XFO).',
    link: 'https://github.com/reconshield/security-headers-kb',
    tool: '/tools/http-headers',
    toolLabel: 'HTTP Header Grader'
  },
  {
    name: 'SSL/TLS Knowledge Base',
    desc: 'Handshake profiling scripts, cipher suite risk classifications, and CA trust root verification databases.',
    link: 'https://github.com/reconshield/ssl-tls-kb',
    tool: '/tools/ssl-checker',
    toolLabel: 'SSL Checker'
  },
  {
    name: 'Port Security Knowledge Base',
    desc: 'Standard service banner signatures, risk metrics, and firewall configuration syntax definitions (UFW/iptables).',
    link: 'https://github.com/reconshield/port-security-kb',
    tool: '/tools/port-scanner',
    toolLabel: 'Port Scanner'
  },
  {
    name: 'Subdomain Intelligence Knowledge Base',
    desc: 'Passive enumeration heuristics, Certificate Transparency log parsers, and dangling DNS takeover templates.',
    link: 'https://github.com/reconshield/subdomain-intelligence-kb',
    tool: '/tools/subdomain-finder',
    toolLabel: 'Subdomain Finder'
  }
];

export default function OpenSourcePage() {
  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Open Source', href: '/opensource' }
        ]} />

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-mono text-emerald-400 mb-4 uppercase tracking-widest">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Open Source Projects</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            ReconShield Open Source Repositories
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed font-sans">
            Collaborating with the security community to build open, auditable, and reliable tools. Access MIT-licensed databases and contribute code templates.
          </p>
        </div>

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {REPOS.map((repo, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4 hover:border-[#00ff88]/20 transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold font-display text-white">{repo.name}</h3>
                <p className="text-xs text-gray-500 font-sans leading-relaxed mt-2">{repo.desc}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex gap-4 text-[10px] font-mono text-gray-400">
                  <span>License: <strong>MIT</strong></span>
                  <span>Branch: <strong>main</strong></span>
                </div>
                <div className="flex justify-between items-center">
                  <a 
                    href={repo.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00ff88] hover:underline"
                  >
                    <Code2 className="w-3.5 h-3.5" /> View Repository
                  </a>
                  <Link 
                    href={repo.tool} 
                    className="text-xs font-mono text-cyan-400 hover:underline"
                  >
                    Analyze Site with {repo.toolLabel} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guidelines / E-E-A-T Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Contributor Covenant Guidelines
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              We welcome code reviews, issue alerts, and database updates. Please read our official contributor guidelines within the respective repository. Keep pull requests focused on adding vulnerability indicators, fixing documentation discrepancies, or extending Nginx/Apache configuration snippets.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              MIT Licensing & Standard Permissions
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              All databases are free to copy, modify, distribute, and include in commercial applications. We believe that open access to cybersecurity signatures and standards is essential to secure modern digital ecosystems.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
