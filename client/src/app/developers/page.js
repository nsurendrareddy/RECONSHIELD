import React from 'react';
import Link from 'next/link';
import { Terminal, Shield, Cpu, Code2, ArrowRight, Zap, RefreshCw, Key } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Security API Developer Portal | ReconShield',
  description: 'Integrate passive security telemetry, SSL validation, port scans, and HTTP security header analysis directly into your developer workflows.',
  alternates: {
    canonical: 'https://reconshield.in/developers',
  }
};

export default function DevelopersHubPage() {
  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Developers', href: '/developers' }
        ]} />

        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer Platform</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Security Intelligence APIs
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Automate asset monitoring, cryptographic audits, and port exposure reports with our secure, low-latency JSON REST APIs.
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-[#0d1117]/80 border border-white/5 rounded-2xl flex items-start gap-4">
            <Zap className="w-8 h-8 text-[#00ff88]" />
            <div>
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">Sub-100ms Responses</h3>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">Cached endpoints yield high performance for continuous monitoring applications.</p>
            </div>
          </div>
          <div className="p-6 bg-[#0d1117]/80 border border-white/5 rounded-2xl flex items-start gap-4">
            <RefreshCw className="w-8 h-8 text-cyan-400" />
            <div>
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">7-Day Data Coherency</h3>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">Consistent scan reporting backed by scheduled passive background sweeps.</p>
            </div>
          </div>
          <div className="p-6 bg-[#0d1117]/80 border border-white/5 rounded-2xl flex items-start gap-4">
            <Key className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">Bearer Authentication</h3>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">Simple API token validation header integration across all request structures.</p>
            </div>
          </div>
        </div>

        {/* API Services Grid */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-bold font-display text-white">Available API Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/20 transition-all space-y-4">
              <div className="text-lg font-bold font-display text-[#00ff88]">SSL Checker API</div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Retrieve TLS configuration grades, certificate expiration boundaries, cipher lists, and trust chains for public URLs.
              </p>
              <div className="text-[10px] font-mono text-gray-500">GET /api/v1/ssl?domain={'{domain}'}</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/20 transition-all space-y-4">
              <div className="text-lg font-bold font-display text-cyan-400">Subdomain Finder API</div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Enumerate active subdomains and associated passive IP intelligence mappings compiled across CT logs.
              </p>
              <div className="text-[10px] font-mono text-gray-500">GET /api/v1/subdomains?domain={'{domain}'}</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/20 transition-all space-y-4">
              <div className="text-lg font-bold font-display text-amber-500">Port Scanner API</div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Audit public-facing TCP ports, identifying exposed endpoints and running service categories.
              </p>
              <div className="text-[10px] font-mono text-gray-500">GET /api/v1/ports?host={'{host}'}</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/20 transition-all space-y-4">
              <div className="text-lg font-bold font-display text-purple-400">Headers Grader API</div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Audit response headers, grading configurations for security headers like CSP, HSTS, and XFO.
              </p>
              <div className="text-[10px] font-mono text-gray-500">GET /api/v1/headers?domain={'{domain}'}</div>
            </div>

          </div>
        </div>

        {/* Call to Action to Docs */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-matrix-400/5 to-transparent border border-matrix-400/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-lg font-bold font-display text-white mb-2">Explore the Reference Documentation</h3>
            <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
              Read our full endpoint definitions, code snippets in Python, JavaScript, and curl, and browse the complete OpenAPI schema.
            </p>
          </div>
          <Link href="/api-docs" className="inline-flex items-center gap-2 px-5 py-3 bg-[#00ff88] text-[#05080f] font-mono font-bold text-xs rounded-xl hover:opacity-90 transition-all shrink-0">
            View API Docs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
