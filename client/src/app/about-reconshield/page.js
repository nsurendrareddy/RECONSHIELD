import React from 'react';
import Link from 'next/link';
import { Shield, Eye, Target, Users, BookOpen, Clock, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'About ReconShield | Cybersecurity Research Mission & Roadmap',
  description: 'Learn about ReconShield\'s mission, active security research team, network testing methodologies, and our platform engineering roadmap.',
  alternates: {
    canonical: 'https://reconshield.in/about-reconshield',
  }
};

const ROADMAP_ITEMS = [
  { phase: 'Phase 1', title: 'Open Source Knowledge Bases', status: 'Completed', desc: 'Released public GitHub repositories for SSL, port exposures, and security headers.' },
  { phase: 'Phase 2', title: 'Telemetry Statistics Portal', status: 'Completed', desc: 'Launched the public /stats hub detailing live cipher usage and DMARC rates.' },
  { phase: 'Phase 3', title: 'Academic Research Sandbox', status: 'In Progress', desc: 'Developing student data grants and structured lab manual materials.' }
];

export default function AboutReconShieldPage() {
  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'About', href: '/about-reconshield' }
        ]} />

        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-mono text-emerald-400 mb-4 uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            <span>Platform Overview</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Our Mission & Platform Architecture
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed font-sans">
            ReconShield is committed to enhancing internet transparency. We map public boundaries and expose configuration risks to help secure digital landscapes.
          </p>
        </div>

        {/* Core Values / Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-3">
            <Eye className="w-8 h-8 text-[#00ff88]" />
            <h3 className="text-base font-bold text-white">Passive Boundary Visibility</h3>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              We aggregate and assess public security indicators passively. By avoiding intrusive exploit sweeps, we respect operational environments while delivering accurate security assessments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-3">
            <Target className="w-8 h-8 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Democratizing Cybersecurity Metrics</h3>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              We provide free, instant scanner tools to standard developers and system engineers, bypassing expensive corporate paywalls for fundamental security configurations.
            </p>
          </div>
        </div>

        {/* Team & Methodology links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
            <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Users className="w-4 h-4 text-[#00ff88]" />
              Threat Research Team
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Our research department comprises internet security experts, data analysts, and compliance specialists. The group regularly monitors Certificate Transparency streams and network exposures.
            </p>
            <Link href="/authors/reconshield-research" className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00ff88] hover:underline">
              View Research Group Profile <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
            <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Auditing Heuristics & Rules
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              ReconShield grades SSL configurations, listening ports, and header implementations according to documented, community-vetted specifications.
            </p>
            <div className="flex gap-4">
              <Link href="/methodology" className="text-xs font-mono text-cyan-400 hover:underline">
                Methodology Rules
              </Link>
              <Link href="/update-policy" className="text-xs font-mono text-cyan-400 hover:underline">
                Data Updates Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-display text-white">Platform Evolution Roadmap</h2>
          <div className="space-y-4">
            {ROADMAP_ITEMS.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#0d1117]/80 border border-white/5 flex justify-between items-center gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-gray-500">{item.phase}</span>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 font-sans mt-1 leading-relaxed">{item.desc}</p>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase shrink-0 ${
                  item.status === 'Completed' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' :
                  'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
