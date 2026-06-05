import React from 'react';
import Link from 'next/link';
import { BookOpen, GraduationCap, FileText, Database, ShieldAlert, Cpu, Terminal, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Academic Cybersecurity Resources & Lab Guides | ReconShield',
  description: 'Free cybersecurity lab templates, student learning guides, and DNS/SSL research references for computer science departments and university security clubs.',
  alternates: {
    canonical: 'https://reconshield.in/academic',
  }
};

const LAB_RESOURCES = [
  {
    title: 'Lab 1: Cryptographic Compliance & SSL Auditing',
    desc: 'Instructions for auditing transport layer cipher configurations, verifying trusted roots, and analyzing SSL handshake parameters.',
    level: 'Undergraduate',
    topics: ['TLS 1.3', 'RSA vs ECDSA', 'CA Trust Chain']
  },
  {
    title: 'Lab 2: Active & Passive Port Scanning Techniques',
    desc: 'An exploration of TCP scanning states, banner parsing, firewall interactions, and exposed network service risk assessments.',
    level: 'Undergraduate',
    topics: ['TCP Handshakes', 'UFW/iptables Rules', 'Service Exposure']
  },
  {
    title: 'Lab 3: Subdomain Takeover & DNS Configuration Audits',
    desc: 'Hands-on guide to discovering dangling CNAME records and resolving orphan cloud endpoints to mitigate hijack threats.',
    level: 'Advanced',
    topics: ['DNS Records', 'Orphan SaaS Takeovers', 'CT Log Scrapes']
  }
];

export default function AcademicOutreachPage() {
  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Academic Resources', href: '/academic' }
        ]} />

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Outreach Portal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Security Lab Guides & Classroom Resources
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed font-sans">
            Free, citation-ready learning modules and cybersecurity lab instructions. Perfect for computer science courses, university security clubs, and security engineering courses.
          </p>
        </div>

        {/* Learning Materials Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded bg-[#00ff88]/10 text-[#00ff88] flex items-center justify-center font-bold">1</div>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Student Study Guides</h3>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              Step-by-step descriptions of public network infrastructure elements, including DNS configurations, certificates, and header formats.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded bg-cyan-400/10 text-cyan-400 flex items-center justify-center font-bold">2</div>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Methodology Handouts</h3>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              Printable PDF guidelines outlining standard risk grading scores, cryptographic key size rules, and exposure thresholds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded bg-purple-400/10 text-purple-400 flex items-center justify-center font-bold">3</div>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">API Free Access Sandbox</h3>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              Student research grants to access high-volume API requests for thesis preparation or data engineering lab projects.
            </p>
          </div>

        </div>

        {/* Labs Grid */}
        <div className="space-y-6 mb-16">
          <h2 className="text-xl font-bold font-display text-white">Classroom Lab Instructions</h2>
          <div className="space-y-4">
            {LAB_RESOURCES.map((lab, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0d1117]/80 border border-white/5 flex flex-col md:flex-row justify-between gap-6 hover:border-[#00ff88]/20 transition-all">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded text-[9px] font-mono font-bold uppercase">{lab.level}</span>
                    <h3 className="text-base font-bold text-white">{lab.title}</h3>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">{lab.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {lab.topics.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 bg-white/5 text-gray-500 rounded text-[10px] font-mono">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  <a 
                    href={`/docs/labs/lab-${idx+1}.pdf`}
                    download 
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono rounded-xl text-gray-300 hover:text-white transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#00ff88]" /> Download PDF Manual
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* University Citation Reference */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-matrix-400/5 to-transparent border border-matrix-400/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-lg font-bold font-display text-white mb-2">Are you a Researcher or Professor?</h3>
            <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
              Cite ReconShield threat research in your publications or apply for free student API sandbox access tokens. Contact our academic relations division.
            </p>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 bg-[#00ff88] text-[#05080f] font-mono font-bold text-xs rounded-xl hover:opacity-90 transition-all shrink-0">
            Request Grants <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
