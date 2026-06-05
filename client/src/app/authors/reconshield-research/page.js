import React from 'react';
import Link from 'next/link';
import { Shield, BookOpen, Award, CheckCircle2, FileText, ArrowLeft, Mail, Globe, Cpu } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'ReconShield Threat Research Team | Author Profile',
  description: 'Learn about the background, methodologies, publications, and research guidelines of the ReconShield threat intelligence and passive analysis group.',
  alternates: {
    canonical: 'https://reconshield.in/authors/reconshield-research',
  }
};

const RESEARCH_PUBLICATIONS = [
  { slug: 'tls-security-report', title: 'Global TLS Security Configuration Report' },
  { slug: 'open-port-exposure-report', title: 'Public Open Port & Listening Service Exposure Report' },
  { slug: 'shadow-it-benchmark', title: 'Enterprise Shadow IT & Cloud Asset Discovery Benchmark' },
  { slug: 'certificate-expiry-study', title: 'Global SSL/TLS Certificate Expiration & Revocation Study' },
  { slug: 'subdomain-takeover-report', title: 'Subdomain Takeover & CNAME Hijacking Threat Report' }
];

export default function ReconShieldResearchAuthorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://reconshield.in/authors/reconshield-research",
        "url": "https://reconshield.in/authors/reconshield-research",
        "name": "ReconShield Threat Research Team Profile",
        "mainEntity": {
          "@type": "Person",
          "@id": "https://reconshield.in/authors/reconshield-research#person",
          "name": "ReconShield Threat Research Team",
          "url": "https://reconshield.in/authors/reconshield-research",
          "jobTitle": "Principal Security Research Group",
          "description": "Accredited cybersecurity analysis team specializing in passive internet-wide scanning, cryptographic protocol telemetry, and DNS vulnerability analysis.",
          "image": "https://reconshield.in/og-image.png",
          "worksFor": {
            "@type": "Organization",
            "name": "ReconShield",
            "url": "https://reconshield.in"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
          { "@type": "ListItem", "position": 2, "name": "Authors Directory", "item": "https://reconshield.in/authors" },
          { "@type": "ListItem", "position": 3, "name": "ReconShield Threat Research", "item": "https://reconshield.in/authors/reconshield-research" }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#05080f] min-h-screen text-white pb-24">
        <div className="max-w-4xl mx-auto px-4 pt-8">
          
          <Breadcrumbs crumbs={[
            { label: 'Authors', href: '/authors' },
            { label: 'ReconShield Research', href: '/authors/reconshield-research' }
          ]} />

          {/* Back Link */}
          <Link href="/authors" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[#00ff88] transition-colors mb-8 mt-6">
            <ArrowLeft className="w-4 h-4" /> Back to Authors Directory
          </Link>

          {/* Profile Card */}
          <div className="bg-[#0d1117] border border-white/5 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Shield className="w-64 h-64 text-[#00ff88]" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div className="w-24 h-24 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] shrink-0 font-mono text-3xl font-bold">
                RSR
              </div>

              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-[10px] font-mono uppercase tracking-widest mb-4">
                  <Shield className="w-3.5 h-3.5" /> Verified Research Entity
                </div>
                
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 leading-none">
                  ReconShield Threat Research Team
                </h1>
                
                <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-6">
                  Cybersecurity Research & Editorial Authority
                </p>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-sans">
                  The ReconShield Threat Research Team is a centralized group of cybersecurity engineers, system administrators, and cryptographic analysts. We focus on internet-wide passive discovery, DNS security routing audits, and mapping public exposure boundaries.
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-mono">
                  <a href="mailto:contact@reconshield.in" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black border border-white/5 hover:border-[#00ff88]/30 hover:text-[#00ff88] transition-all">
                    <Mail className="w-4 h-4" /> Editorial Contact
                  </a>
                  <Link href="/methodology" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black border border-white/5 hover:border-[#00ff88]/30 hover:text-[#00ff88] transition-all">
                    <Globe className="w-4 h-4" /> Our Methodology
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Research Experience & Methodology Ownership */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#0d1117]/50 border border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                Research Experience & Standards
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Our analysis relies on continuous telemetry gathering. Over the last 5 years, we have parsed millions of Certificate Transparency (CT) events, DNS zone configurations, and public route listings. 
                Our research operates under strict ethical disclosure rules and responsible scanning practices.
              </p>
            </div>

            <div className="bg-[#0d1117]/50 border border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00ff88]" />
                Methodology Ownership
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                The ReconShield Research Team designs, hosts, and monitors the scoring engines used across the platform:
              </p>
              <ul className="list-disc pl-5 text-xs text-gray-400 space-y-1 font-sans">
                <li><strong>SSL Grading:</strong> Determinate rating (A+ through F) based on ciphers and protocol configurations.</li>
                <li><strong>Attack Surface Risk:</strong> Subdomain profiling using developer indicators.</li>
                <li><strong>Port Exposure Risk:</strong> TCP service classification by risk.</li>
              </ul>
            </div>
          </div>

          {/* Publications & Research Reports */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#00ff88]" /> Primary Publications & Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESEARCH_PUBLICATIONS.map((pub) => (
                <Link 
                  key={pub.slug} 
                  href={`/research/${pub.slug}`} 
                  className="group p-5 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-[#00ff88]/30 transition-all flex items-start gap-4"
                >
                  <FileText className="w-8 h-8 text-cyan-400 group-hover:text-[#00ff88] transition-colors shrink-0" />
                  <div>
                    <h3 className="text-xs font-mono font-bold text-white mb-1 group-hover:text-[#00ff88] transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-mono">View threat intelligence report →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
