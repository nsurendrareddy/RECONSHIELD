import React from 'react';
import Link from 'next/link';
import { Server, Network, Lock, Shield, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Network Port Intelligence Hub - ReconShield',
  description: 'Explore our comprehensive directory of network ports. Learn about common services, protocols, and configuration risks associated with different TCP/UDP ports.',
  alternates: { canonical: 'https://reconshield.in/ports' }
};

export default function PortsHubPage() {
  const commonPorts = [21, 22, 23, 25, 53, 80, 110, 143, 443, 3306, 3389, 5432, 6379, 8080, 27017];
  
  return (
    <div className="min-h-screen pb-24 font-sans bg-[#06090e]">
      <div className="max-w-[1200px] mx-auto px-6 pt-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-[#00ff88]">Ports Hub</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-[#1a2332] pb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Network Ports Intelligence Hub</h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Network ports act as communication endpoints for different services and protocols. Understand the security risks, default assignments, and defensive configurations for all major TCP and UDP ports.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Network className="w-5 h-5 text-[#00ff88]" /> Most Scanned Ports
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {commonPorts.map(port => (
                  <Link key={port} href={`/ports/${port}`} className="bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/30 p-4 rounded-xl transition-all group">
                    <div className="text-lg font-bold text-white group-hover:text-[#00ff88]">Port {port}</div>
                    <div className="text-xs text-gray-500 font-mono mt-1">View Analysis →</div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">Educational Security Context</h2>
              <p>
                In TCP/IP and UDP networking, a port is an endpoint to a logical connection and the way a client program specifies a specific server program on a computer in a network. Port numbers range from 0 to 65535.
              </p>
              <ul>
                <li><strong>Well-Known Ports (0-1023):</strong> Reserved for system processes (e.g., HTTP on 80, HTTPS on 443).</li>
                <li><strong>Registered Ports (1024-49151):</strong> Assigned by IANA for specific services (e.g., MySQL on 3306).</li>
                <li><strong>Dynamic/Private Ports (49152-65535):</strong> Used for ephemeral client connections.</li>
              </ul>
              <p>
                Exposing unnecessary ports to the public internet drastically increases a network's attack surface. We recommend adopting a default-deny firewall posture and implementing Zero Trust architecture for administrative services.
              </p>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#0d1117] border border-white/5 rounded-xl p-6 sticky top-24">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Related Hubs</h3>
              <ul className="space-y-3">
                <li><Link href="/ip-intelligence" className="text-[#00ff88] hover:underline flex items-center gap-2"><Server className="w-4 h-4"/> IP Intelligence</Link></li>
                <li><Link href="/asn" className="text-[#00ff88] hover:underline flex items-center gap-2"><Network className="w-4 h-4"/> ASN Database</Link></li>
                <li><Link href="/ssl" className="text-[#00ff88] hover:underline flex items-center gap-2"><Lock className="w-4 h-4"/> SSL Analysis</Link></li>
                <li><Link href="/dns-analysis" className="text-[#00ff88] hover:underline flex items-center gap-2"><Shield className="w-4 h-4"/> DNS Records</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
