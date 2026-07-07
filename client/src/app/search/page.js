import React from 'react';
import Link from 'next/link';
import { Search, Globe, ArrowRight, Shield, Activity, Lock, Database } from 'lucide-react';
import { TOOLS, COLOR_MAP } from '@/utils/toolsData';
import { STATS_CATEGORIES } from '@/utils/statsData';
import Breadcrumbs from '@/components/Breadcrumbs';
import Banner300 from '@/components/ads/Banner300';
import NativeBanner from '@/components/ads/NativeBanner';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q || '';
  return {
    title: query ? `Search Results for "${query}" | ReconShield` : 'Search Assets & Tools | ReconShield',
    description: 'Query ReconShield databases, active scanners, and telemetry reports.',
    robots: {
      index: false,
      follow: true
    }
  };
}

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const query = (resolvedSearchParams?.q || '').trim();
  const queryLower = query.toLowerCase();

  let matchingTools = [];
  let matchingStats = [];

  if (query) {
    matchingTools = TOOLS.filter(tool => 
      tool.name.toLowerCase().includes(queryLower) || 
      tool.desc.toLowerCase().includes(queryLower) ||
      tool.tags.some(tag => tag.toLowerCase().includes(queryLower)) ||
      tool.category.toLowerCase().includes(queryLower)
    );

    matchingStats = Object.entries(STATS_CATEGORIES).filter(([key, cat]) =>
      cat.title.toLowerCase().includes(queryLower) ||
      cat.desc.toLowerCase().includes(queryLower)
    ).map(([key, cat]) => ({
      id: key,
      title: cat.title,
      desc: cat.desc,
      href: `/stats/${key}`
    }));
  }

  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Search', href: '/search' }
        ]} />

        {/* Header Section */}
        <div className="border-b border-white/10 pb-8 mb-10 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
            <Search className="w-3.5 h-3.5" />
            <span>Search Control Center</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-mono tracking-tight text-white mb-4">
            Security Intelligence <span className="text-cyan-400">Search</span>
          </h1>
          <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
            Query our network scanners, domain checkers, and live security telemetry database.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="mb-12">
          <form action="/search" method="GET" className="relative max-w-2xl flex gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search tools, ports, domains, headers..."
                className="w-full pl-12 pr-4 py-4 bg-[#0d1117] border border-white/10 rounded-xl focus:border-cyan-400 focus:outline-none text-white font-mono text-sm transition-all focus:ring-1 focus:ring-cyan-400/20 placeholder:text-gray-600"
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-4 rounded-xl font-bold font-mono text-sm transition-all shadow-lg shadow-cyan-500/10 cursor-pointer"
            >
              QUERY
            </button>
          </form>
        </div>

        {/* After search box -> 300x250 Banner */}
        <div className="my-6 flex justify-center">
          <Banner300 />
        </div>

        {/* Results Section */}
        {query ? (
          <div className="space-y-12">
            <div>
              <h2 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mb-6">
                // QUERY SUMMARY: &quot;{query}&quot; ({matchingTools.length + matchingStats.length} RESULTS)
              </h2>

              {matchingTools.length === 0 && matchingStats.length === 0 ? (
                <div className="p-8 rounded-xl bg-red-500/5 border border-red-500/10 text-center space-y-4 max-w-2xl">
                  <div className="text-red-400 font-mono text-sm font-semibold">NO DIRECT ENTITY MATCHES FOUND</div>
                  <p className="text-gray-400 text-xs leading-relaxed font-mono">
                    Your query did not return matching tools or telemetry indices. Try searching for: <span className="text-cyan-400 font-bold">IP Lookup</span>, <span className="text-cyan-400 font-bold">DNS</span>, <span className="text-cyan-400 font-bold">SSL</span>, or <span className="text-cyan-400 font-bold">Port Scanner</span>.
                  </p>
                </div>
              ) : null}
            </div>

            {/* Tools Matches */}
            {matchingTools.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Tools &amp; Scanners ({matchingTools.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchingTools.map((tool, idx) => {
                    const mappedColor = COLOR_MAP[tool.color] || COLOR_MAP.cyan;
                    return (
                      <React.Fragment key={tool.id}>
                        <Link
                          href={`/tools/${tool.id}`}
                          className={`p-6 rounded-2xl bg-[#0d1117]/60 border border-white/5 hover:border-cyan-500/20 transition-all group flex flex-col justify-between`}
                        >
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <div className={`p-3 rounded-xl ${mappedColor.bg} ${mappedColor.text}`}>
                                <tool.icon className="w-6 h-6" />
                              </div>
                              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded-md">
                                {tool.category}
                              </span>
                            </div>
                            <h4 className="text-lg font-bold font-mono text-white mb-2 group-hover:text-cyan-400 transition-colors">
                              {tool.name}
                            </h4>
                            <p className="text-gray-400 text-xs leading-relaxed mb-4">
                              {tool.desc}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 mt-2">
                            <span>Launch Tool</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>

                        {/* Render Native Banner after the 5th result (if it falls in the Tools matches) */}
                        {idx === 4 && (
                          <div className="col-span-1 md:col-span-2 my-6">
                            <NativeBanner />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stats Telemetry Matches */}
            {matchingStats.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-sm font-mono font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-2">
                  <Database className="w-4 h-4" /> Telemetry Datasets ({matchingStats.length})
                </h3>
                <div className="space-y-3">
                  {matchingStats.map((stat, idx) => (
                    <React.Fragment key={stat.id}>
                      <Link
                        href={stat.href}
                        className="block p-5 rounded-xl bg-[#0d1117] border border-white/5 hover:border-yellow-500/20 transition-all group"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-bold font-mono text-white group-hover:text-yellow-400 transition-colors">
                              {stat.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">
                              {stat.desc}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>

                      {/* Render Native Banner after the 5th result (if it falls in the Stats matches) */}
                      {idx === 4 - matchingTools.length && (
                        <div className="my-6">
                          <NativeBanner />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Recommended Searches / Empty State */
          <div className="max-w-xl space-y-8">
            <div className="p-6 rounded-xl bg-white/[0.01] border border-white/5 space-y-4">
              <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" /> Suggested Audits
              </h3>
              <div className="flex flex-wrap gap-2">
                {['IP Lookup', 'DNS Lookup', 'SSL Checker', 'Subdomain Finder', 'Port Scanner', 'HTTP Headers', 'Email Security'].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="px-3 py-1.5 bg-[#0d1117] hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/20 rounded-lg text-xs font-mono text-gray-400 hover:text-cyan-400 transition-all"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
