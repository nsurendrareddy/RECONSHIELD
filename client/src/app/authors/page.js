import React from 'react';
import Link from 'next/link';
import { User, Shield, ArrowRight, Award, Mail } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Editorial Team & Security Authors | ReconShield',
  description: 'Meet our editorial team of security researchers, system auditors, and threat intelligence analysts responsible for ReconShield publications.',
  alternates: {
    canonical: 'https://reconshield.in/authors',
  }
};

const AUTHORS = [
  {
    name: 'Surendra Reddy',
    slug: 'surendra-reddy',
    title: 'Founder & Lead Cybersecurity Researcher',
    bio: 'Surendra is a cybersecurity engineer and OSINT analyst specializing in passive infrastructure mapping, email security protocol enforcement, and cloud risk mitigation.',
    role: 'Editor-in-Chief',
    verified: true
  }
];

export default function AuthorsIndexPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Authors', href: '/authors' }
        ]} />

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
            <Award className="w-3 h-3" />
            <span>Verified E-E-A-T Editorial Roster</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Editorial Team & Security Authors
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            ReconShield research reports, guides, and technical tools are authored by accredited security researchers committed to educational and defensive standards.
          </p>
        </div>

        {/* Authors Directory */}
        <div className="space-y-8">
          {AUTHORS.map((author, i) => (
            <div 
              key={i}
              className="p-8 rounded-3xl bg-[#0d1117] border border-white/5 flex flex-col md:flex-row gap-8 items-start hover:border-[#00ff88]/30 transition-all"
            >
              {/* Avatar Placeholder */}
              <div className="w-24 h-24 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] shrink-0 font-mono text-3xl font-bold">
                SR
              </div>

              {/* Bio Details */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold font-display text-white">{author.name}</h2>
                  {author.verified && (
                    <span className="px-2 py-0.5 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[9px] font-mono text-[#00ff88] uppercase tracking-wider flex items-center gap-1">
                      <Shield className="w-2.5 h-2.5" /> Verified Scholar
                    </span>
                  )}
                </div>
                
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
                  {author.title}
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-6 font-sans">
                  {author.bio}
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-mono">
                  <Link 
                    href={`/author/${author.slug}`} 
                    className="inline-flex items-center gap-1.5 text-[#00ff88] hover:underline"
                  >
                    View Research Profile <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Standards Card */}
        <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-matrix-400/5 to-transparent border border-matrix-400/10">
          <h3 className="text-sm font-mono font-bold text-white mb-2 uppercase tracking-wider">Editorial Integrity Compliance</h3>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            ReconShield does not use automated AI-generation for core security advice. All articles undergo thorough fact-checking reviews. Learn more about our validation criteria.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <Link href="/editorial-standards" className="text-cyan-400 hover:underline">Editorial Standards →</Link>
            <Link href="/fact-checking-policy" className="text-cyan-400 hover:underline">Fact Checking Policy →</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
