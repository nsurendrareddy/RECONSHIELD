import React from 'react';
import Link from 'next/link';
import { GLOSSARY_TERMS } from '@/utils/glossaryData';
import { Search, Book, ShieldAlert } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Cybersecurity Glossary | ReconShield',
  description: 'A comprehensive, SEO-focused cybersecurity glossary covering fundamental terms like WHOIS, DNS, SPF, DKIM, OSINT, and TLS.',
  alternates: {
    canonical: 'https://reconshield.in/glossary',
  },
  openGraph: {
    title: 'Cybersecurity Glossary | ReconShield',
    description: 'A comprehensive, SEO-focused cybersecurity glossary covering fundamental terms like WHOIS, DNS, SPF, DKIM, OSINT, and TLS.',
    url: 'https://reconshield.in/glossary',
    siteName: 'ReconShield',
    type: 'website',
  }
};

export default function GlossaryIndexPage() {
  const terms = Object.keys(GLOSSARY_TERMS).map(key => ({
    slug: key,
    ...GLOSSARY_TERMS[key]
  })).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <div className="max-w-6xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Cybersecurity Glossary', href: '/glossary' }
        ]} />

        <div className="mt-8 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-4 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Book className="w-3 h-3" />
            Security Dictionary
          </div>
          <h1 className="text-4xl font-display font-bold text-white tracking-wider mb-4">
            Cybersecurity Glossary
          </h1>
          <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
            Explore our comprehensive repository of cybersecurity terminology. From OSINT fundamentals to cryptographic protocols, master the vocabulary of modern threat intelligence and network defense.
          </p>
        </div>

        {/* Search Bar Placeholder */}
        <div className="relative max-w-xl mb-12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-surface-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 focus:border-cyan-400/50 sm:text-sm font-mono transition-all"
            placeholder="Search glossary terms (e.g., DNS, SPF, OSINT)..."
          />
        </div>

        {/* Term Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {terms.map((item) => (
            <Link 
              key={item.slug} 
              href={`/glossary/${item.slug}`}
              className="block group"
            >
              <div className="h-full p-6 rounded-2xl bg-surface-800/50 border border-white/5 hover:border-cyan-400/30 hover:bg-surface-800 transition-all flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold font-display text-white group-hover:text-cyan-400 transition-colors">
                    {item.term}
                  </h2>
                  <div className="w-8 h-8 rounded-full bg-cyan-400/10 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed flex-grow">
                  {item.description}
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-xs font-mono text-cyan-400 group-hover:underline">
                  Read definition →
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
