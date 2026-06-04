import React from 'react';
import Link from 'next/link';
import { FileDown, ShieldAlert, BarChart3, Database, FileText, ArrowRight, Eye, LineChart } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Threat Intelligence Research Hub | ReconShield',
  description: 'Access proprietary security exposure studies, download enterprise compliance templates, and examine real-time global internet scanning metrics.',
  alternates: {
    canonical: 'https://reconshield.in/research',
  }
};

export default function ResearchHubPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Research Center', href: '/research' }
        ]} />

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
            <Database className="w-3 h-3" />
            <span>Open Access Intelligence & telemetry</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            ReconShield Threat Research Center
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Access downloadable audit templates, in-depth protocol studies, and explore interactive security dashboards driven by global scanning data.
          </p>
        </div>

        {/* Security Trend Dashboard */}
        <section className="mb-12">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-matrix-400/5 to-transparent border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#00ff88]/20 uppercase tracking-widest">
              Live Telemetry Index
            </div>

            <h2 className="text-xl font-bold font-display text-white mb-2 uppercase tracking-wider flex items-center gap-2">
              <LineChart className="w-5 h-5 text-[#00ff88]" />
              Global Internet Security Trend Dashboard (2026)
            </h2>
            <p className="text-xs text-gray-500 mb-8 font-mono">
              Aggregated passive scan telemetry from 10,000+ audited corporate domains.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Chart 1: TLS Versions */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-4">
                    TLS Encryption Adoption
                  </h3>
                  <div className="space-y-3 font-mono text-[10px] text-gray-400">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>TLS 1.3</span>
                        <span>85.2%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-cyan-500 h-full rounded-full" style={{ width: '85.2%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>TLS 1.2</span>
                        <span>14.7%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-cyan-600/50 h-full rounded-full" style={{ width: '14.7%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-red-400">
                        <span>SSLv3/TLS 1.0 (Insecure)</span>
                        <span>0.1%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: '1%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-4 font-mono">
                  Source: ReconShield SSL Scanners
                </div>
              </div>

              {/* Chart 2: Security Headers */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-mono font-bold text-[#00ff88] uppercase tracking-wider mb-4">
                    OWASP Security Headers Adoption
                  </h3>
                  <div className="space-y-3 font-mono text-[10px] text-gray-400">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Strict-Transport-Security (HSTS)</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#00ff88] h-full rounded-full" style={{ width: '45%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Content-Security-Policy (CSP)</span>
                        <span>28%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#00ff88]/70 h-full rounded-full" style={{ width: '28%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>X-Frame-Options</span>
                        <span>68%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#00ff88]/90 h-full rounded-full" style={{ width: '68%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-4 font-mono">
                  Source: ReconShield HTTP Headers Audits
                </div>
              </div>

              {/* Chart 3: Email Authentication */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-4">
                    Email Security Compliance
                  </h3>
                  <div className="space-y-3 font-mono text-[10px] text-gray-400">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>SPF Setup</span>
                        <span>78%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>DKIM Signature</span>
                        <span>61%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-purple-500/80 h-full rounded-full" style={{ width: '61%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-amber-500">
                        <span>DMARC Enforcement (p=reject)</span>
                        <span>12%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '12%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-4 font-mono">
                  Source: DNS Record Inspections
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Center Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Section A: Reports */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] mb-4">
                <FileDown className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">Downloadable Security Reports</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Get free, print-ready PDF checklists, templates, and audits designed to help engineering teams verify security compliance policies.
              </p>
            </div>
            <Link href="/reports" className="inline-flex items-center gap-2 text-xs font-mono text-[#00ff88] hover:underline">
              Browse Report Downloads <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Section B: Studies */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">Original Security Studies</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Read deep-dive analysis of threat vectors, configuration exploits, and regional exposure studies compiled by our threat intelligence research team.
              </p>
            </div>
            <Link href="/studies" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline">
              Read Security Studies <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* E-E-A-T Footnote */}
        <div className="p-6 bg-[#0d1117]/50 rounded-2xl border border-white/5 text-center">
          <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Research Editorial Integrity</h3>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
            All telemetry and trend metrics published in the Research Center are audited by the ReconShield editorial and threat research boards. For questions or corrections, please view our <Link href="/editorial-policy" className="text-[#00ff88] underline">Editorial Standards</Link>.
          </p>
        </div>

      </div>
    </div>
  );
}
