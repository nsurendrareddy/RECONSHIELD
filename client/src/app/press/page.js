import React from 'react';
import Link from 'next/link';
import { Newspaper, Download, Mail, BookOpen, Quote, ShieldCheck, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Journalist Press Center & Media Kit | ReconShield',
  description: 'Access official corporate logos, telemetry citation guidelines, research contact methods, and press kit resources for media representatives.',
  alternates: {
    canonical: 'https://reconshield.in/press',
  }
};

const LOGO_ASSETS = [
  { name: 'ReconShield Logo - Vector SVG (Dark Background)', size: '24 KB', format: 'SVG' },
  { name: 'ReconShield Logo - Raster PNG (Transparent)', size: '120 KB', format: 'PNG' },
  { name: 'ReconShield Brand Style & Colors Guide', size: '1.2 MB', format: 'PDF' }
];

export default function PressCenterPage() {
  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Press Center', href: '/press' }
        ]} />

        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-mono text-purple-400 mb-4 uppercase tracking-widest">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Media Relations Portal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Press & Media Resource Center
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed font-sans">
            Official assets, citation guidelines, and press materials for news reporters, tech writers, and security researchers covering internet-wide vulnerabilities.
          </p>
        </div>

        {/* Grid of Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Logo Downloads */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">// BRAND & LOGO ASSETS</h3>
            <div className="space-y-3">
              {LOGO_ASSETS.map((logo, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-mono">
                  <div>
                    <span className="text-gray-300 font-bold block">{logo.name}</span>
                    <span className="text-gray-500 text-[10px]">{logo.size} • {logo.format}</span>
                  </div>
                  <button className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer">
                    <Download className="w-3.5 h-3.5 text-[#00ff88]" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Citation Standards */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">// CITATION STANDARDS</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                When using ReconShield telemetry, charts, or research studies in news articles or papers, please cite the platform as the source:
              </p>
              <div className="p-3 bg-black rounded border border-white/5 text-[10px] font-mono text-cyan-300 mt-3 select-all leading-relaxed break-all">
                Source: ReconShield Threat Research (reconshield.in)
              </div>
            </div>
            <Link href="/stats" className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1">
              Explore Available Datasets <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Media Contacts */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-matrix-400/5 to-transparent border border-matrix-400/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold font-display text-white">Press & Inquiries Contact</h3>
            <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
              If you require a custom data sweep or wish to interview a security analyst from our team, please submit a request to our media relations mailbox.
            </p>
          </div>
          <a href="mailto:press@reconshield.in" className="inline-flex items-center gap-2 px-5 py-3 bg-[#00ff88] text-[#05080f] font-mono font-bold text-xs rounded-xl hover:opacity-90 transition-all shrink-0 cursor-pointer">
            <Mail className="w-4 h-4" /> Contact Press Relations
          </a>
        </div>

      </div>
    </div>
  );
}
