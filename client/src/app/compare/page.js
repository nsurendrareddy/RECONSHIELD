import React from 'react';
import Link from 'next/link';
import { Network, Lock, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { COMPARISONS_DATA } from '@/utils/comparisonsData';

export const revalidate = 86400;

export const metadata = {
  title: 'Cryptographic Protocol & Tool Comparisons | ReconShield',
  description: 'In-depth, peer-reviewed technical comparisons between legacy and modern networking protocols, mail security standards, and security scanners.',
  alternates: {
    canonical: 'https://reconshield.in/compare',
  }
};

export default function CompareIndexPage() {
  const comparisons = Object.values(COMPARISONS_DATA);

  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Comparisons', href: '/compare' }
        ]} />

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
            <Network className="w-3 h-3" />
            <span>Technical Protocol Mapping Directory</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Security Protocol Comparisons
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Examine in-depth, cryptographic differences, RFC standards alignment, and threat models for legacy vs. modern internet technologies.
          </p>
        </div>

        {/* Comparisons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {comparisons.map((item, i) => (
            <Link 
              key={i} 
              href={`/compare/${item.slug}`}
              className="group p-6 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[9px] font-mono text-cyan-400 uppercase tracking-wider">
                    {item.slug.replace('-vs-', ' vs ')}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">TECHNICAL ARTICLE</span>
                </div>
                
                <h2 className="text-lg font-bold font-display text-white group-hover:text-cyan-400 transition-colors mb-3 leading-snug">
                  {item.title}
                </h2>
                
                <p className="text-xs text-gray-400 leading-relaxed font-sans mb-6">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-cyan-400 group-hover:underline">
                <span>View Full Comparison</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
