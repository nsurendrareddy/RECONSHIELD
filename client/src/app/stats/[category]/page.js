import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, Info, Calendar, Quote, Download, Code, Globe, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { STATS_CATEGORIES } from '@/utils/statsData';

export const revalidate = 604800; // 7-day cache revalidation

export async function generateStaticParams() {
  return [
    { category: 'tls-adoption' },
    { category: 'security-headers' },
    { category: 'email-security' },
    { category: 'open-port-exposure' },
    { category: 'subdomain-security' }
  ];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = resolvedParams?.category;
  const data = STATS_CATEGORIES[category];

  if (!data) {
    return { title: 'Not Found' };
  }

  return {
    title: `${data.title} (2026 Telemetry) | ReconShield`,
    description: data.desc,
    alternates: {
      canonical: `https://reconshield.in/stats/${category}`,
    }
  };
}

export default async function StatsCategoryPage({ params }) {
  const resolvedParams = await params;
  const category = resolvedParams?.category;
  const data = STATS_CATEGORIES[category];

  if (!data) {
    notFound();
  }

  // TechArticle Schema
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: data.title,
    description: data.desc,
    datePublished: '2026-06-01T00:00:00Z',
    dateModified: '2026-06-05T00:00:00Z',
    publisher: {
      '@type': 'Organization',
      name: 'ReconShield Threat Research',
      url: 'https://reconshield.in'
    },
    author: {
      '@type': 'Organization',
      name: 'ReconShield Threat Research'
    }
  };

  const iframeCode = `<iframe src="https://reconshield.in/embed/stats/${category}" width="100%" height="320" style="border:1px solid #1f2937; border-radius:12px;"></iframe>\n<p>Telemetry courtesy of <a href="https://reconshield.in/stats/${category}">ReconShield stats</a></p>`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <div className="bg-[#05080f] min-h-screen text-white pb-24">
        <div className="max-w-5xl mx-auto px-4 pt-8">
          
          <Breadcrumbs crumbs={[
            { label: 'Stats Hub', href: '/stats' },
            { label: data.title, href: `/stats/${category}` }
          ]} />

          {/* Page Header */}
          <div className="border-b border-white/10 pb-8 mb-12 mt-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Telemetry Data</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
              {data.title}
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl leading-relaxed font-sans">
              {data.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              {/* Telemetry Visualizer Section */}
              <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest">// SURVEYED METRICS</h2>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Updated: June 5, 2026</span>
                  </div>
                </div>

                <div className="space-y-5">
                  {data.metrics.map((metric, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-baseline text-xs font-mono">
                        <span className="text-gray-400">{metric.name}</span>
                        <div className="space-x-2">
                          <span className="text-gray-500">({metric.count})</span>
                          <span className="text-[#00ff88] font-bold">{metric.value}</span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-[#00ff88]" style={{ width: metric.value }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* CSV Download Placeholder */}
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-gray-500">Format: CSV (Structured Schema)</span>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer">
                    <Download className="w-3.5 h-3.5 text-[#00ff88]" /> Download Dataset Placeholder
                  </button>
                </div>
              </section>

              {/* Methodology & APA Citation Block */}
              <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 space-y-6">
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest">// DATASET METADATA</h2>
                
                <div className="flex gap-4 items-start">
                  <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs leading-relaxed text-gray-400 font-sans">
                    <strong className="text-white">Dataset Methodology</strong>
                    <p>{data.methodology}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex gap-4 items-start">
                  <Quote className="w-5 h-5 text-[#00ff88] shrink-0 mt-0.5" />
                  <div className="space-y-2 text-xs leading-relaxed text-gray-400 font-sans w-full">
                    <strong className="text-white">Academic Citation Format (APA)</strong>
                    <div className="p-3 bg-black rounded border border-white/5 text-[10px] font-mono text-cyan-300 select-all break-all leading-relaxed">
                      {data.apa}
                    </div>
                  </div>
                </div>
              </section>

              {/* Embeddable Iframe Chart Code */}
              <section className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
                <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#00ff88]" />
                  // EMBED CHART ON YOUR WEBSITE
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Copy and paste the HTML iframe below to display this telemetry directly on your platform.
                </p>
                <div className="relative group">
                  <pre className="p-3 bg-black rounded-lg text-[10px] font-mono text-cyan-400 border border-white/5 overflow-x-auto whitespace-pre select-all">
                    {iframeCode}
                  </pre>
                </div>
              </section>

            </div>

            {/* Sidebar: Snapshot Archives */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
                <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">// MONTHLY SNAPSHOTS</h3>
                <div className="space-y-2 text-xs font-mono">
                  <Link href={`/stats/${category}/2026-06`} className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-400/20 transition-all text-gray-300 hover:text-white">
                    <span>June 2026 (Active)</span>
                    <span className="text-[#00ff88]">Live</span>
                  </Link>
                  <Link href={`/stats/${category}/2026-05`} className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-400/20 transition-all text-gray-300 hover:text-white">
                    <span>May 2026 (Archive)</span>
                    <span className="text-gray-500">Archived</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
