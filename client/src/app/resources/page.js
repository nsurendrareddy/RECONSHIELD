import React from 'react';
import Link from 'next/link';
import { FileText, ArrowRight, ShieldCheck, Lock, Terminal, Mail, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Downloadable Security Checklists & Hardening Guides | ReconShield',
  description: 'Access print-friendly PDF hardening manuals for SSL/TLS setups, public listening port filters, and email security protocols (SPF/DKIM/DMARC).',
  alternates: {
    canonical: 'https://reconshield.in/resources',
  }
};

const RESOURCES = [
  {
    title: 'Enterprise SSL/TLS Configuration Checklist',
    desc: 'An interactive, step-by-step PDF to audit TLS protocol settings, key lengths, cipher suites, HSTS headers, and chain verification parameters.',
    type: 'Hardening Checklist',
    icon: Lock,
    iconColor: 'text-emerald-400',
    bgIcon: 'bg-emerald-500/10',
    link: '/docs/resources/ssl-hardening-checklist.pdf'
  },
  {
    title: 'Linux Firewall & Port Exposure Remediation Guide',
    desc: 'Copy-pasteable configuration syntax for iptables, UFW, and security groups to isolate exposed administrative services and database ports.',
    type: 'Configuration Manual',
    icon: Terminal,
    iconColor: 'text-cyan-400',
    bgIcon: 'bg-cyan-500/10',
    link: '/docs/resources/port-exposure-guide.pdf'
  },
  {
    title: 'Email Security Authentication Configuration Pack',
    desc: 'Comprehensive implementation guide for setting up SPF tags, DKIM keys, and DMARC enforcement policies to prevent domain spoofing.',
    type: 'Policy Checklist',
    icon: Mail,
    iconColor: 'text-purple-400',
    bgIcon: 'bg-purple-500/10',
    link: '/docs/resources/email-auth-guide.pdf'
  }
];

export default function ResourcesPage() {
  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Resources', href: '/resources' }
        ]} />

        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Linkable Assets</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Security Hardening Checklists
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed font-sans">
            Free, download-ready cybersecurity hardening checklists, configuration sheets, and deployment manuals. Built for developers, sysadmins, and security engineers.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="space-y-6 mb-16">
          {RESOURCES.map((res, idx) => {
            const IconComponent = res.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-[#00ff88]/20 transition-all">
                <div className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${res.bgIcon} ${res.iconColor}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">{res.type}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{res.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans mt-1 max-w-2xl">{res.desc}</p>
                  </div>
                </div>

                <span 
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border border-white/5 text-xs font-mono rounded-xl text-gray-500 select-none shrink-0 self-stretch md:self-auto justify-center"
                >
                  <FileText className="w-3.5 h-3.5 text-gray-600" /> PDF Coming Soon
                </span>
              </div>
            );
          })}
        </div>

        {/* E-E-A-T trust signals */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-matrix-400/5 to-transparent border border-matrix-400/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-lg font-bold font-display text-white mb-2">Verified Configurations</h3>
            <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
              All hardening rules are aligned with NIST SP 800 series guidelines, OWASP standards, and internet RFC benchmarks, ensuring compliant infrastructure deployments.
            </p>
          </div>
          <Link href="/methodology" className="inline-flex items-center gap-2 px-5 py-3 bg-[#00ff88] text-[#05080f] font-mono font-bold text-xs rounded-xl hover:opacity-90 transition-all shrink-0">
            Read Audit Rules <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
