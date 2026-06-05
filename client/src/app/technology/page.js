import React from 'react';
import Link from 'next/link';
import { Cpu, ChevronRight, Server, Shield, Lock, Network, Code, Terminal, Activity, Globe } from 'lucide-react';

export const metadata = {
  title: 'Website Technology Detection Hub - ReconShield',
  description: 'Analyze framework architectures, web server platforms, CMS engines, and reverse proxy protections. Audits versions and client-side security profiles.',
  alternates: { canonical: 'https://reconshield.in/technology' }
};

export default function TechnologyHubPage() {
  const technologies = [
    {
      slug: 'react',
      name: 'React',
      category: 'Frontend Library',
      desc: 'Fingerprint web apps using React framework hooks, global variables, and DOM roots.',
      icon: Code,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'hover:border-cyan-500/30'
    },
    {
      slug: 'nextjs',
      name: 'Next.js',
      category: 'React Framework',
      desc: 'Verify server-side routing, build manifests, and SSR deployment configurations.',
      icon: Cpu,
      color: 'text-white',
      bg: 'bg-white/10',
      border: 'hover:border-white/30'
    },
    {
      slug: 'wordpress',
      name: 'WordPress',
      category: 'Content Management System (CMS)',
      desc: 'Analyze CMS core versions, active plugins directories, and login page vulnerabilities.',
      icon: Globe,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'hover:border-blue-500/30'
    },
    {
      slug: 'shopify',
      name: 'Shopify',
      category: 'E-Commerce CMS',
      desc: 'Audit store CDN configurations, global variables, and transaction security metrics.',
      icon: Activity,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'hover:border-emerald-500/30'
    },
    {
      slug: 'cloudflare',
      name: 'Cloudflare',
      category: 'CDN / WAF',
      desc: 'Identify proxy routing headers, DDoS protections, and origin bypass vulnerabilities.',
      icon: Lock,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'hover:border-orange-500/30'
    },
    {
      slug: 'nginx',
      name: 'Nginx',
      category: 'Web Server',
      desc: 'Verify running versions, proxy setups, and token hiding security directives.',
      icon: Server,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'hover:border-green-500/30'
    },
    {
      slug: 'apache',
      name: 'Apache',
      category: 'Web Server',
      desc: 'Map directory index permissions, active modules, and signature configurations.',
      icon: Terminal,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'hover:border-red-500/30'
    }
  ];

  return (
    <div className="min-h-screen pb-24 font-sans bg-[#06090e]">
      <div className="max-w-[1200px] mx-auto px-6 pt-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-[#00ff88]">Technology Detection Hub</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-[#1a2332] pb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Website Technology Detection Hub</h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Understand how target assets are fingerprinted. Analyze CMS configurations, server setups, CDN protections, and development libraries to detect exposures and map your technical stack.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#00ff88]" /> Supported Technologies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {technologies.map(tech => {
                  const Icon = tech.icon;
                  return (
                    <Link 
                      key={tech.slug} 
                      href={`/technology/${tech.slug}`} 
                      className={`bg-[#0d1117] border border-white/5 ${tech.border} p-6 rounded-xl transition-all group relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full pointer-events-none" />
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2.5 rounded-lg ${tech.bg} ${tech.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white group-hover:text-[#00ff88] transition-colors">{tech.name}</div>
                          <div className="text-xs text-gray-500 font-mono">{tech.category}</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">{tech.desc}</p>
                      <div className="text-xs text-[#00ff88] font-mono mt-4 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        View Analysis Profile <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">Technology Profiling & Attack Surface Mapping</h2>
              <p>
                Passive fingerprinting identifies components by analyzing HTTP response headers (e.g. <code>Server</code>, <code>X-Powered-By</code>), DOM elements, cookie attributes, and script bundle naming conventions.
              </p>
              <p>
                Exposing system versions enables targeted CVE exploit matching by adversaries. Securing these components involves hiding verbose banners, disabling directories lists, and applying strict HTTP policies.
              </p>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#0d1117] border border-white/5 rounded-xl p-6 sticky top-24">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Related Hubs</h3>
              <ul className="space-y-3">
                <li><Link href="/ssl" className="text-[#00ff88] hover:underline flex items-center gap-2"><Lock className="w-4 h-4"/> SSL Analysis</Link></li>
                <li><Link href="/dns-analysis" className="text-[#00ff88] hover:underline flex items-center gap-2"><Shield className="w-4 h-4"/> DNS Analysis</Link></li>
                <li><Link href="/ports" className="text-[#00ff88] hover:underline flex items-center gap-2"><Server className="w-4 h-4"/> Ports Hub</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
