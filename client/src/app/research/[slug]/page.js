import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FileText, Calendar, User, BookOpen, Database, Quote, ChevronRight, ArrowLeft, Download, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { RESEARCH_REPORTS } from '@/utils/researchReportsData';
import { renderMarkdown } from '@/utils/markdownRenderer';

export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = Object.keys(RESEARCH_REPORTS);
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug || !RESEARCH_REPORTS[slug]) {
    return { title: 'Report Not Found' };
  }

  const report = RESEARCH_REPORTS[slug];

  return {
    title: `${report.title} | ReconShield Threat Research`,
    description: report.description,
    alternates: {
      canonical: `https://reconshield.in/research/${slug}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      url: `https://reconshield.in/research/${slug}`,
      title: report.title,
      description: report.description,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: report.title,
      description: report.description,
      images: ['/og-image.png']
    }
  };
}

// Inline Visual Chart Renderer
function TelemetryChart({ chartData }) {
  if (!chartData) return null;

  return (
    <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4 my-8 print:border-black/10 print:bg-white print:text-black">
      <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest print:text-black">
        // {chartData.title}
      </h3>
      
      {chartData.type === 'pie' ? (
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* SVG Doughnut Chart */}
          <div className="w-32 h-32 shrink-0 relative">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1f2937" strokeWidth="4" />
              {(() => {
                let accumulatedPercent = 0;
                return chartData.values.map((val, idx) => {
                  const strokeDasharray = `${val} ${100 - val}`;
                  const strokeDashoffset = 100 - accumulatedPercent;
                  accumulatedPercent += val;
                  return (
                    <circle
                      key={idx}
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke={chartData.colors[idx]}
                      strokeWidth="4"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-500"
                    />
                  );
                });
              })()}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-gray-400 uppercase tracking-wider print:text-black">
              Data Metrics
            </div>
          </div>
          
          {/* Legends */}
          <div className="flex-1 space-y-2 w-full">
            {chartData.labels.map((label, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded" style={{ backgroundColor: chartData.colors[idx] }} />
                  <span className="text-gray-300 print:text-black">{label}</span>
                </div>
                <span className="font-bold text-[#00ff88] print:text-black">{chartData.values[idx]}%</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* CSS Bar Chart */
        <div className="space-y-4">
          {chartData.labels.map((label, idx) => (
            <div key={idx} className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-gray-300 print:text-black">{label}</span>
                <span className="font-bold text-cyan-400 print:text-black">{chartData.values[idx]}%</span>
              </div>
              <div className="h-3 w-full bg-white/[0.02] rounded-full overflow-hidden border border-white/5 print:bg-gray-100 print:border-black/5">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${chartData.values[idx]}%`,
                    backgroundColor: chartData.colors[idx]
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Client Side Print Trigger wrapper
import PrintButton from './PrintButton';

export default async function ResearchReportPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug || !RESEARCH_REPORTS[slug]) {
    notFound();
  }

  const report = RESEARCH_REPORTS[slug];

  // TechArticle schema json-ld
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `https://reconshield.in/research/${slug}/#article`,
        headline: report.headline,
        description: report.description,
        datePublished: report.publishedDate,
        dateModified: report.lastUpdated,
        author: {
          '@type': 'Person',
          '@id': 'https://reconshield.in/authors/reconshield-research#person',
          name: report.author,
          url: 'https://reconshield.in/authors/reconshield-research'
        },
        publisher: {
          '@type': 'Organization',
          name: 'ReconShield Threat Research',
          url: 'https://reconshield.in'
        },
        url: `https://reconshield.in/research/${slug}`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Research Hub', item: 'https://reconshield.in/research' },
          { '@type': 'ListItem', position: 3, name: report.title, item: `https://reconshield.in/research/${slug}` },
        ],
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      
      <div className="min-h-screen pb-24 bg-[#05080f] text-white print:bg-white print:text-black print:pb-0">
        <div className="max-w-4xl mx-auto px-4 pt-8">
          
          <nav aria-label="Breadcrumb" className="mb-6 print:hidden">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/research" className="hover:text-[#00ff88] transition-colors">Research Hub</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88] truncate">{report.title}</li>
            </ol>
          </nav>

          <div className="flex items-center justify-between mb-8 print:hidden">
            <Link href="/research" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[#00ff88] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Research Hub
            </Link>
            
            <PrintButton />
          </div>

          {/* Title Banner */}
          <div className="border-b border-white/10 pb-8 mb-10 print:border-black/20 print:pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest print:hidden">
              <FileText className="w-3 h-3" />
              <span>Security Threat Study</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-6 text-white print:text-black print:text-3xl">
              {report.headline}
            </h1>
            
            {/* Meta attributes */}
            <div className="flex flex-wrap gap-6 text-xs text-gray-500 font-mono print:text-black">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-400 print:text-black" />
                <Link href="/authors/reconshield-research" className="hover:text-[#00ff88] transition-colors hover:underline">
                  {report.author}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400 print:text-black" />
                <span>Published: {report.publishedDate} (Updated: {report.lastUpdated})</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-12">
            
            {/* Executive Summary */}
            <section className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3 print:border-black/10 print:bg-gray-50">
              <h2 className="text-sm font-mono font-bold text-[#00ff88] uppercase tracking-widest flex items-center gap-2 print:text-black">
                <CheckCircle2 className="w-4 h-4 text-[#00ff88] print:text-black" />
                Executive Summary
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans print:text-black">
                {report.executiveSummary}
              </p>
            </section>

            {/* Key Findings Grid */}
            <section className="space-y-4">
              <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 print:text-black">
                <ShieldAlert className="w-4 h-4 text-cyan-400 print:text-black" />
                Key Telemetry Findings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {report.keyFindings.map((finding, idx) => (
                  <div key={idx} className="p-6 rounded-xl bg-[#0d1117] border border-white/5 space-y-2 print:border-black/10 print:bg-white print:text-black">
                    <div className="text-2xl font-extrabold text-[#00ff88] font-mono print:text-black">{finding.value}</div>
                    <div className="text-xs font-mono font-bold text-white print:text-black">{finding.label}</div>
                    <p className="text-[11px] text-gray-400 leading-relaxed print:text-black">{finding.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Charts Placeholder/Visualization */}
            <TelemetryChart chartData={report.chartData} />

            {/* Main Article Body */}
            <article className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-sm print:text-black print:prose-neutral">
              {renderMarkdown(report.content)}
            </article>

            {/* Methodology Section */}
            <section className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-3 print:border-black/10 print:bg-gray-50">
              <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 print:text-black">
                <BookOpen className="w-4 h-4 text-cyan-400 print:text-black" />
                Study Methodology
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans print:text-black">
                {report.methodology}
              </p>
            </section>

            {/* Data Source Section */}
            <section className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-3 print:border-black/10 print:bg-gray-50">
              <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 print:text-black">
                <Database className="w-4 h-4 text-[#00ff88] print:text-black" />
                Data Sources & Telemetry Scope
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans print:text-black">
                {report.dataSource}
              </p>
            </section>

            {/* Citation Section */}
            <section className="p-6 rounded-2xl bg-black border border-white/5 space-y-3 print:border-black/10 print:bg-white print:text-black">
              <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 print:text-black">
                <Quote className="w-4 h-4 text-[#00ff88] print:text-black" />
                How to Cite this Study
              </h3>
              <div className="p-3 bg-white/5 rounded border border-white/5 text-xs font-mono text-cyan-300 select-all break-all leading-relaxed print:bg-gray-50 print:text-black print:border-black/5">
                {report.citation}
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
