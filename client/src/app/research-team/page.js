import React from 'react';
import Link from 'next/link';
import { Shield, Award, Mail, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Cybersecurity Threat Research Team | ReconShield',
  description: 'Meet the threat researchers, protocol engineers, and cybersecurity analysts who power ReconShield\'s exposure intelligence scanners.',
  alternates: {
    canonical: 'https://reconshield.in/research-team',
  }
};

const TEAM_MEMBERS = [
  {
    name: 'Surendra Reddy',
    role: 'Lead Threat Researcher & Founder',
    specialty: 'Passive Asset OSINT & DNS Security Mapping',
    credentials: 'CS Engineer, Security Analyst'
  }
];

export default function ResearchTeamPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Research Team', href: '/research-team' }
        ]} />

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
            <Shield className="w-3 h-3" />
            <span>Infrastructure Intelligence Division</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Research Team
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            The security analysts, protocol architects, and system administrators compiling ReconShield intelligence indices.
          </p>
        </div>

        {/* Profiles */}
        <div className="space-y-6">
          {TEAM_MEMBERS.map((member, i) => (
            <div 
              key={i}
              className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="w-16 h-16 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 font-mono text-xl font-bold">
                SR
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold font-display text-white mb-1">{member.name}</h2>
                <div className="text-xs font-mono text-cyan-400 uppercase mb-3">{member.role}</div>
                <ul className="space-y-2 text-xs text-gray-400 font-sans">
                  <li><strong>Specialty:</strong> {member.specialty}</li>
                  <li><strong>Credentials:</strong> {member.credentials}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Contact panel */}
        <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-matrix-400/5 to-transparent border border-matrix-400/10 text-center">
          <h3 className="text-xs font-mono font-bold text-white mb-2 uppercase tracking-wider">Submit Disclosures or Telemetry</h3>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            Spotted an active zero-day or want to coordinate a threat disclosure? Reach out directly to our threat desk.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-1.5 text-[#00ff88] hover:underline text-xs font-mono">
            Contact Threat Desk <Mail className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
