import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Compass, AlertCircle, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Detection & Audit Methodology | ReconShield',
  description: 'Learn about ReconShield\'s non-intrusive passive OSINT mapping, cryptographic scoring, and network port exposure auditing methodologies.',
  alternates: {
    canonical: 'https://reconshield.in/methodology',
  }
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Methodology', href: '/methodology' }
        ]} />

        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[#00ff88] transition-colors mb-6 mt-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[10px] font-mono text-[#00ff88] mb-4 uppercase tracking-widest">
            <BookOpen className="w-3 h-3" />
            <span>Operational Integrity & Standards</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Security & Detection Methodology
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            A comprehensive overview of the auditing algorithms, telemetry feeds, and scanning methodologies used across the ReconShield platform.
          </p>
        </div>

        {/* Methodology Content */}
        <div className="space-y-10">
          
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00ff88]" />
              1. Non-Intrusive Auditing (OSINT)
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              All tools hosted on ReconShield—including the Subdomain Finder, SSL Checker, and Port Scanner—operate strictly within passive and non-intrusive scanning frameworks. 
              We utilize Open-Source Intelligence (OSINT), query public Certificate Transparency (CT) logs, and leverage historical DNS resolution records to compile host maps. 
              <strong>No exploitation payloads or intrusive brute-forcing techniques are ever deployed against target domains.</strong>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              2. SSL/TLS Cryptographic Scoring
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our SSL scoring algorithm evaluates transport security configurations according to modern industry standards (RFC 8446). Scores are computed using five key variables:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-400 leading-relaxed">
              <li><strong>TLS Protocol Version:</strong> Mandates TLS 1.2 or TLS 1.3. Falling back to TLS 1.0 or TLS 1.1 triggers immediate grade limits.</li>
              <li><strong>Cipher Strength:</strong> Prefers Authenticated Encryption with Associated Data (AEAD) ciphers (e.g. AES-GCM, ChaCha20-Poly1305).</li>
              <li><strong>Chain Completeness:</strong> Verifies that web servers transmit all required intermediate CA certificates to establish browser trust.</li>
              <li><strong>HSTS Implementation:</strong> Assesses Strict-Transport-Security configurations, requiring a minimum max-age of 1 year.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              3. Port Exposure Assessments
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our Port Scanner analyzes TCP socket responses to identify listening services. We classify exposure risks based on service type. For example:
            </p>
            <table className="min-w-full text-xs font-mono border-collapse border border-white/5 my-4">
              <thead>
                <tr className="bg-white/5 text-gray-300">
                  <th className="border border-white/5 p-2 text-left">Port Range</th>
                  <th className="border border-white/5 p-2 text-left">Default Service</th>
                  <th className="border border-white/5 p-2 text-left">Risk Assessment</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr>
                  <td className="border border-white/5 p-2">80, 443</td>
                  <td className="border border-white/5 p-2">HTTP, HTTPS</td>
                  <td className="border border-white/5 p-2 text-emerald-400">Low Risk (Standard Public Services)</td>
                </tr>
                <tr>
                  <td className="border border-white/5 p-2">22</td>
                  <td className="border border-white/5 p-2">SSH</td>
                  <td className="border border-white/5 p-2 text-yellow-500">Medium Risk (Requires MFA/VPN restriction)</td>
                </tr>
                <tr>
                  <td className="border border-white/5 p-2">3306, 5432</td>
                  <td className="border border-white/5 p-2">MySQL, PostgreSQL</td>
                  <td className="border border-white/5 p-2 text-red-400">High Risk (Database ports must be hidden)</td>
                </tr>
                <tr>
                  <td className="border border-white/5 p-2">21, 23</td>
                  <td className="border border-white/5 p-2">FTP, Telnet</td>
                  <td className="border border-white/5 p-2 text-red-500">Critical Risk (Unencrypted legacy protocols)</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              4. Tool Limitations
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Because our scanners do not actively engage target servers with invasive exploits, certain access layers (such as internal firewalls, split-horizon DNS, and backend microservice routers) may hide listening ports or active subdomains from our discovery pipeline. 
              Administrators should always run internal configuration audits alongside public ReconShield assessments.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
