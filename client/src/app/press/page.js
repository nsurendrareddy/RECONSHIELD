import React from 'react';
import Link from 'next/link';
import { Newspaper, Download, Mail, BookOpen, Quote, ShieldCheck, ChevronRight, Award, Globe, Heart } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Press Center, Media Kit & Brand Assets | ReconShield',
  description: 'Access the official ReconShield press center for company overview, mission statements, brand assets, founder information, and media inquiry support.',
  alternates: {
    canonical: 'https://reconshield.in/press',
  },
  openGraph: {
    title: 'Press Center, Media Kit & Brand Assets | ReconShield',
    description: 'Access the official ReconShield press center for company overview, mission statements, brand assets, founder information, and media inquiry support.',
    url: 'https://reconshield.in/press',
    siteName: 'ReconShield',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press Center, Media Kit & Brand Assets | ReconShield',
    description: 'Access the official ReconShield press center for company overview, mission statements, brand assets, founder information, and media inquiry support.',
  }
};

const LOGO_ASSETS = [
  { name: 'ReconShield Logo - Vector SVG (Dark Background)', size: '24 KB', format: 'SVG' },
  { name: 'ReconShield Logo - Raster PNG (Transparent)', size: '120 KB', format: 'PNG' },
  { name: 'ReconShield Brand Style & Colors Guide', size: '1.2 MB', format: 'PDF' }
];

export default function PressCenterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://reconshield.in/press/#webpage",
        "url": "https://reconshield.in/press",
        "name": "Press Center, Media Kit & Brand Assets | ReconShield",
        "description": "Access the official ReconShield press center for company overview, mission statements, brand assets, founder information, and media inquiry support.",
        "breadcrumb": {
          "@id": "https://reconshield.in/press/#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/press/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://reconshield.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Press",
            "item": "https://reconshield.in/press"
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Press Center', href: '/press' }
        ]} />

        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-mono text-purple-400 mb-4 uppercase tracking-widest">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Media Relations & Press Portal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            Press & Media Resource Center
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl leading-relaxed font-sans">
            Official brand resources, research citations, and media contact channels for journalists, publishers, and security analysts reporting on global network vulnerabilities.
          </p>
        </div>

        {/* Grid of Brand Assets & Citations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Logo Downloads */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">// BRAND & LOGO ASSETS</h3>
            <div className="space-y-3">
              {LOGO_ASSETS.map((logo, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-mono">
                  <div>
                    <span className="text-gray-300 font-bold block">{logo.name}</span>
                    <span className="text-gray-500 text-[10px]">{logo.size} • {logo.format}</span>
                  </div>
                  <span className="p-2 rounded bg-white/5 text-gray-400 text-[10px] font-mono select-none">
                    Asset Coming Soon
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Citation Standards */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">// CITATION STANDARDS</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                When utilizing ReconShield global telemetry statistics, network scans, or comparison guides in publications, please provide attribution to the platform:
              </p>
              <div className="p-3 bg-black rounded border border-white/5 text-[10px] font-mono text-cyan-300 mt-3 select-all leading-relaxed break-all">
                Source: ReconShield Threat Research (reconshield.in)
              </div>
            </div>
            <Link href="/stats" className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1">
              Explore Available Datasets <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Corporate Profile & Mission */}
        <div className="space-y-10 mb-16">
          
          {/* Company Overview */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-display">
              <Award className="w-4.5 h-4.5 text-cyan-400" /> Company Overview
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              ReconShield is an independent cybersecurity intelligence platform specializing in passive infrastructure mapping, external attack surface evaluation, and DNS/email security alignment verification. We construct developer-friendly tools and maintain a comprehensive knowledge repository mapping technical internet standards (including RFC standards for DNS, SSL/TLS, and email authentication).
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Founded as a technical project, ReconShield has grown into a key reference library for network administrators, penetration testers, and risk compliance officers seeking to audit their perimeter perimeters.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-display">
              <Heart className="w-4.5 h-4.5 text-cyan-400" /> Mission Statement & Values
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              At ReconShield, our mission is to democratize cybersecurity intelligence. We believe that identifying vulnerable configurations and evaluating infrastructure risks should be simple, open, and accessible to organizations of all sizes. 
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              We are committed to ethical disclosure guidelines, data privacy compliance, and editorial independence. All of our code guides are peer-reviewed and reference authoritative engineering bodies (such as the IETF, NIST, and OWASP) to provide verified, actionable guidance.
            </p>
          </div>

          {/* Founder Information */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-display">
              <Globe className="w-4.5 h-4.5 text-cyan-400" /> Founder & Researcher Profile
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              ReconShield was founded by <strong>Surendra Reddy</strong>, a cybersecurity engineer and OSINT researcher. Surendra\'s background covers cloud infrastructure automation, DNS zone security auditing, and mail relay hardening. 
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Surendra leads the platform\'s research initiatives, coordinating the development of our open-source datasets and overseeing the weekly sweeps of our global statistics engine.
            </p>
          </div>
        </div>

        {/* Media Contacts */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-matrix-400/5 to-transparent border border-matrix-400/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold font-display text-white">Press & Media Contact</h3>
            <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
              For custom telemetry queries, interview requests, or platform comments, please send a message to our media relations team.
            </p>
          </div>
          <a href="mailto:press@reconshield.in" className="inline-flex items-center gap-2 px-5 py-3 bg-[#00ff88] text-[#05080f] font-mono font-bold text-xs rounded-xl hover:opacity-90 transition-all shrink-0 cursor-pointer">
            <Mail className="w-4 h-4" /> Contact Media Relations
          </a>
        </div>

      </div>
    </div>
  );
}
