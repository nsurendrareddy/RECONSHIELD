import React from 'react';
import { BarChart3, Shield, Star, Globe, MessageSquare, BookOpen, Heart, Activity } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Brand Authority & Link Acquisition Dashboard | ReconShield Admin',
  description: 'Track referring domains, backlink velocities, academic citations, and developer community metrics for the ReconShield platform.',
  robots: { index: false, follow: false } // Admin only, hide from Search Engine indexing
};

const METRICS = [
  { label: 'Referring Domains', value: '1,420', change: '+18.4%', desc: 'Unique root domains linking to ReconShield.' },
  { label: 'Branded Searches', value: '45,800', change: '+32.1%', desc: 'Monthly search impressions containing "ReconShield".' },
  { label: 'Total Backlinks', value: '12,500', change: '+15.2%', desc: 'Total tracked hyperlinks targeting the platform.' },
  { label: 'Academic Citations', value: '48', change: '+20.0%', desc: 'Publications citing studies or glossary definitions.' },
  { label: 'GitHub Stars', value: '820', change: '+45.5%', desc: 'Cumulative stars across all open-source knowledge bases.' },
  { label: 'Product Hunt Votes', value: '1,120', change: '+100%', desc: 'Total upvotes accrued across all listed scanners.' }
];

export default function AdminAuthorityDashboard() {
  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Admin', href: '/admin/authority' },
          { label: 'Authority Dashboard', href: '/admin/authority' }
        ]} />

        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-mono text-purple-400 mb-4 uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5" />
            <span>Platform Administration</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Authority & Link Acquisition Dashboard
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed font-sans">
            Real-time telemetry tracking brand footprint, referral metrics, and community engagement. Use these signals to measure search authority growth.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {METRICS.map((m, idx) => (
            <div key={idx} className="p-6 bg-[#0d1117] border border-white/5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">{m.label}</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-bold font-mono text-white">{m.value}</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{m.change}</span>
                </div>
                <p className="text-[11px] text-gray-400 font-sans mt-2 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action / Outreach Insights */}
        <div className="p-6 rounded-2xl bg-[#0d1117]/80 border border-white/5 space-y-4">
          <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#00ff88]" />
            Monthly Growth Directives
          </h3>
          <ul className="list-disc pl-5 text-xs text-gray-400 space-y-2 font-sans">
            <li>Monitor referrals from <strong className="text-white">GitHub repositories</strong> to identify which guides gain developer engagement.</li>
            <li>Audit incoming links targeting our <strong className="text-white">/stats</strong> endpoint to check for academic or journalistic citations.</li>
            <li>Optimize Product Hunt follow-up guides to capture post-launch referral traffic.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
