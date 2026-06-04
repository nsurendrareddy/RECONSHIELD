import React from 'react';
import Link from 'next/link';
import { FileDown, Database, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Downloadable Security Compliance Reports | ReconShield',
  description: 'Download print-ready PDF audit templates, email security alignment planners, and security headers implementation checklists.',
  alternates: {
    canonical: 'https://reconshield.in/reports',
  }
};

const REPORT_TEMPLATES = [
  {
    id: 'dmarc-alignment',
    title: 'Enterprise DMARC Alignment Planner',
    desc: 'A step-by-step roadmap to move your domain from p=none to p=reject safely without disrupting critical outbound mail flow.',
    fileSize: '1.4 MB',
    format: 'PDF / Interactive Checklist',
    revised: 'June 2026'
  },
  {
    id: 'security-headers',
    title: 'OWASP HTTP Security Headers Hardening Guide',
    desc: 'Technical policy declarations and server blocks configurations (Nginx, Apache, IIS) for CSP, HSTS, Referrer-Policy, and XFO.',
    fileSize: '840 KB',
    format: 'Markdown / PDF Checklist',
    revised: 'May 2026'
  },
  {
    id: 'exposed-ports',
    title: 'Internet Exposure Open Port Risk Matrix',
    desc: 'An enterprise threat mapping checklist to audit open network ports, analyze running banners, and verify firewall whitelist compliance.',
    fileSize: '2.1 MB',
    format: 'PDF Spreadsheet / Checklist',
    revised: 'April 2026'
  }
];

export default function ReportsIndexPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Research Center', href: '/research' },
          { label: 'Reports', href: '/reports' }
        ]} />

        {/* Back Link */}
        <Link href="/research" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[#00ff88] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Research Hub</span>
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-mono text-emerald-400 mb-4 uppercase tracking-widest">
            <FileDown className="w-3 h-3" />
            <span>Enterprise Compliance Templates</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Security Report Templates
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Download print-ready checklists and planners designed by our Lead Architects to aid network audits and security hardening tasks.
          </p>
        </div>

        {/* Reports Grid */}
        <div className="space-y-6">
          {REPORT_TEMPLATES.map((report) => (
            <div 
              key={report.id}
              className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-bold font-display text-white">
                    {report.title}
                  </h2>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-gray-400">
                    {report.format}
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4 max-w-3xl">
                  {report.desc}
                </p>
                <div className="flex flex-wrap gap-4 text-[10px] font-mono text-gray-500 uppercase">
                  <span>FILE SIZE: {report.fileSize}</span>
                  <span>•</span>
                  <span>LAST REVISED: {report.revised}</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center">
                <Link 
                  href={`/contact?inquiry=download&report=${report.id}`}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 px-6 py-3 rounded-xl font-bold transition-all text-xs font-mono"
                >
                  <FileDown className="w-4 h-4" /> Download PDF
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Citing standards */}
        <div className="mt-16 p-6 bg-[#0d1117]/50 rounded-2xl border border-white/5">
          <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Citing and Redistribution</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            All ReconShield report templates are available for open commercial and educational use. If you include our guides or checklists inside corporate security policies, please reference the attribution footer.
          </p>
        </div>

      </div>
    </div>
  );
}
