import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GLOSSARY_TERMS } from '@/utils/glossaryData';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BookOpen, Shield, HelpCircle, ArrowRight, Clock, List, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const termData = GLOSSARY_TERMS[resolvedParams.term];
  if (!termData) return {};

  return {
    title: `${termData.title} | ReconShield Glossary`,
    description: termData.description,
    alternates: {
      canonical: `https://reconshield.in/glossary/${resolvedParams.term}`,
    },
    openGraph: {
      title: `${termData.title} | ReconShield Glossary`,
      description: termData.description,
      url: `https://reconshield.in/glossary/${resolvedParams.term}`,
      siteName: 'ReconShield',
      type: 'article',
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(GLOSSARY_TERMS).map((term) => ({
    term: term,
  }));
}

// Helper to calculate reading time based on total text length
function calculateReadingTime(termData) {
  let totalWords = 0;
  
  // Count words in content and structured sections
  const textBlocks = [
    termData.description,
    termData.history?.origin,
    termData.history?.evolution,
    termData.history?.adoption,
    termData.deepDive?.protocol,
    termData.deepDive?.architecture,
    termData.deepDive?.standards,
    termData.security?.attacks,
    termData.security?.threatModel,
    termData.security?.detection,
    termData.realWorld?.enterprise,
    termData.realWorld?.incidents,
    termData.realWorld?.misconfigurations,
    termData.usage?.steps,
    termData.usage?.bestPractices,
    termData.mistakes?.errors,
    termData.mistakes?.weaknesses,
    termData.mistakes?.troubleshooting
  ];

  textBlocks.forEach(text => {
    if (text) {
      totalWords += text.split(/\s+/).length;
    }
  });

  termData.faqs.forEach(faq => {
    totalWords += faq.q.split(/\s+/).length + faq.a.split(/\s+/).length;
  });

  return Math.ceil(totalWords / 200); // 200 words per minute average
}

export default async function GlossaryTermPage({ params }) {
  const resolvedParams = await params;
  const termData = GLOSSARY_TERMS[resolvedParams.term];
  
  if (!termData) {
    notFound();
  }

  const readingTime = calculateReadingTime(termData);

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": termData.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  // Generate Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": termData.title,
    "description": termData.description,
    "author": {
      "@type": "Organization",
      "name": "ReconShield Security Team",
      "url": "https://reconshield.in/research-team"
    }
  };

  const sections = [
    { id: 'key-takeaways', label: 'Key Takeaways' },
    { id: 'history', label: '1. Historical Background' },
    { id: 'deep-dive', label: '2. Technical Deep Dive' },
    { id: 'security', label: '3. Security Implications' },
    { id: 'real-world', label: '4. Real-World Examples' },
    { id: 'usage', label: '5. Step-by-Step Usage' },
    { id: 'mistakes', label: '6. Common Mistakes' },
    { id: 'comparison', label: '7. Comparison Table' },
    { id: 'faqs', label: '8. Advanced FAQ' },
    { id: 'references', label: '9. References' }
  ];

  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-6xl mx-auto px-4 pt-8">
        <Breadcrumbs crumbs={[
          { label: 'Glossary', href: '/glossary' },
          { label: termData.term, href: `/glossary/${resolvedParams.term}` }
        ]} />

        {/* Header */}
        <div className="mt-12 mb-12 border-b border-white/10 pb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              Security Definition
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
              <Clock className="w-4 h-4 text-cyan-400/50" />
              <span>{readingTime} min read</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-wider mb-6 leading-tight">
            {termData.title}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-4xl">
            {termData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Navigation & TOC Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-8 space-y-6">
              <div className="p-6 rounded-2xl bg-surface-800/40 border border-white/5">
                <h3 className="text-xs font-bold font-mono text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <List className="w-4 h-4 text-cyan-400" />
                  Table of Contents
                </h3>
                <nav className="space-y-2.5">
                  {sections.map(sec => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block text-xs font-mono text-gray-500 hover:text-cyan-400 transition-colors"
                    >
                      {sec.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Dynamic CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0a1128] to-[#05080f] border border-cyan-400/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Shield className="w-24 h-24 text-cyan-400" />
                </div>
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-400/20 text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-4">
                    Interactive Tool
                  </span>
                  <h4 className="text-sm font-bold text-white mb-2">{termData.cta.title}</h4>
                  <p className="text-[11px] text-gray-400 mb-6 leading-relaxed">
                    {termData.cta.desc}
                  </p>
                  <Link href={termData.cta.url} className="inline-flex items-center justify-center w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-mono text-xs rounded-xl transition-all">
                    Launch {termData.cta.tool} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Key Takeaways */}
            <section id="key-takeaways" className="p-8 rounded-2xl bg-cyan-400/5 border border-cyan-400/10">
              <h2 className="text-lg font-bold font-display text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {termData.keyTakeaways?.map((takeaway, idx) => (
                  <li key={idx} className="text-sm text-gray-300 leading-relaxed flex items-start gap-2">
                    <span className="text-cyan-400 mt-1.5">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* History Section */}
            <section id="history" className="space-y-6">
              <h2 className="text-2xl font-bold font-display text-cyan-400 border-b border-white/10 pb-2">1. Historical Background</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Origin</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.history?.origin}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Evolution</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.history?.evolution}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Industry Adoption</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.history?.adoption}</p>
                </div>
              </div>
            </section>

            {/* Technical Deep Dive */}
            <section id="deep-dive" className="space-y-6">
              <h2 className="text-2xl font-bold font-display text-cyan-400 border-b border-white/10 pb-2">2. Technical Deep Dive</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Protocol Details</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.deepDive?.protocol}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Architecture</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.deepDive?.architecture}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Standards & RFCs</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.deepDive?.standards}</p>
                </div>
              </div>
            </section>

            {/* Security Implications */}
            <section id="security" className="space-y-6">
              <h2 className="text-2xl font-bold font-display text-cyan-400 border-b border-white/10 pb-2">3. Security Implications</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> Common Attacks
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.security?.attacks}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Threat Models</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.security?.threatModel}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Detection & Mitigation Methods</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.security?.detection}</p>
                </div>
              </div>
            </section>

            {/* Real World Examples */}
            <section id="real-world" className="space-y-6">
              <h2 className="text-2xl font-bold font-display text-cyan-400 border-b border-white/10 pb-2">4. Real-World Examples</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Enterprise Use-Cases</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.realWorld?.enterprise}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Security Incidents</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.realWorld?.incidents}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Common Misconfiguration Examples</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.realWorld?.misconfigurations}</p>
                </div>
              </div>
            </section>

            {/* Step-by-Step Usage */}
            <section id="usage" className="space-y-6">
              <h2 className="text-2xl font-bold font-display text-cyan-400 border-b border-white/10 pb-2">5. Step-by-Step Usage</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">How Practitioners Use the Technology</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.usage?.steps}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Operational Best Practices</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.usage?.bestPractices}</p>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section id="mistakes" className="space-y-6">
              <h2 className="text-2xl font-bold font-display text-cyan-400 border-b border-white/10 pb-2">6. Common Mistakes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Configuration Errors</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.mistakes?.errors}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Security Weaknesses</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.mistakes?.weaknesses}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Troubleshooting Tips</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{termData.mistakes?.troubleshooting}</p>
                </div>
              </div>
            </section>

            {/* Comparison Table */}
            {termData.comparisonTable && (
              <section id="comparison" className="space-y-6">
                <h2 className="text-2xl font-bold font-display text-cyan-400 border-b border-white/10 pb-2">7. Comparison: {termData.comparisonTable.title}</h2>
                <div className="overflow-x-auto border border-white/10 rounded-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-800/80 border-b border-white/10">
                        {termData.comparisonTable.headers.map((h, i) => (
                          <th key={i} className="p-4 text-xs font-mono font-bold text-white uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-surface-900/20">
                      {termData.comparisonTable.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          {row.map((cell, cidx) => (
                            <td key={cidx} className="p-4 text-sm text-gray-300 leading-relaxed">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Advanced FAQs */}
            <section id="faqs" className="space-y-6">
              <h2 className="text-2xl font-bold font-display text-cyan-400 border-b border-white/10 pb-2">8. Advanced FAQ</h2>
              <div className="space-y-6">
                {termData.faqs.map((faq, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-surface-800/40 border border-white/5">
                    <h3 className="text-base font-bold text-white mb-3 flex items-start gap-2">
                      <HelpCircle className="w-5 h-5 text-cyan-400/70 mt-0.5 shrink-0" />
                      <span>{faq.q}</span>
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed pl-7">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* References */}
            <section id="references" className="space-y-6">
              <h2 className="text-2xl font-bold font-display text-cyan-400 border-b border-white/10 pb-2">9. References</h2>
              <ul className="space-y-2.5">
                {termData.references?.map((ref, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <ExternalLink className="w-4 h-4 text-cyan-400/50" />
                    {ref.url ? (
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                        {ref.title}
                      </a>
                    ) : (
                      <span className="text-gray-400">{ref.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {/* Related Terms */}
            {termData.relatedTerms && termData.relatedTerms.length > 0 && (
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-sm font-bold font-mono text-gray-500 uppercase tracking-widest mb-4">
                  Related Glossary Terms
                </h3>
                <div className="flex flex-wrap gap-3">
                  {termData.relatedTerms.map((termKey) => {
                    const related = GLOSSARY_TERMS[termKey];
                    if (!related) return null;
                    return (
                      <Link
                        key={termKey}
                        href={`/glossary/${termKey}`}
                        className="px-4 py-2 rounded-xl bg-surface-800/40 border border-white/5 hover:border-cyan-400/30 hover:bg-surface-800 text-xs font-mono text-cyan-400 transition-all"
                      >
                        {related.term}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
