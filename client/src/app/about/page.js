import { Shield, Target, Activity, Users, Globe, Lock, Cpu, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: "About Surendra Reddy — Founder of ReconShield",
  description: "Meet Surendra Reddy, founder of ReconShield. Learn about his mission to provide researchers with AI-driven cybersecurity tools and advanced threat intelligence.",
  alternates: {
    canonical: 'https://reconshield.in/about',
  },
  openGraph: {
    title: "About Surendra Reddy — Founder of ReconShield",
    description: "Learn about the mission of ReconShield: providing advanced, AI-driven visibility into global attack surfaces for security researchers.",
    url: 'https://reconshield.in/about',
    type: 'profile',
  }
};

export default function About() {
  const features = [
    { icon: Globe, title: 'Global Intelligence', desc: 'Real-time monitoring of infrastructure and network reputation across 200+ countries.' },
    { icon: Lock, title: 'Security Auditing', desc: 'security configuration analysis of SSL/TLS and security headers to ensure data encryption standards.' },
    { icon: Cpu, title: 'AI-Powered Analysis', desc: 'Using advanced language models to interpret complex technical scans into human-readable risk reports.' },
    { icon: Target, title: 'Precision Recon', desc: 'High-fidelity mapping of DNS records and subdomain structures for comprehensive visibility.' },
  ]

  const methodology = [
    'Passive only (no traffic to target)',
    'Public data sources only',
    'No storage of scan targets'
  ]

  return (
    <div className="animate-fade-in max-w-5xl mx-auto py-10">
      {/* Person + ProfilePage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ProfilePage",
                "@id": "https://reconshield.in/about",
                "url": "https://reconshield.in/about",
                "name": "About Surendra Reddy — Founder of ReconShield",
                "mainEntity": {
                  "@type": "Person",
                  "@id": "https://reconshield.in/about#person",
                  "name": "Surendra Reddy",
                  "url": "https://reconshield.in/about",
                  "jobTitle": "Cybersecurity Researcher & Founder",
                  "description": "Cybersecurity researcher specializing in OSINT, exposure intelligence, and AI-driven threat analysis. Founder of ReconShield.",
                  "sameAs": [
                    "https://linkedin.com/in/surendrareddy3",
                    "https://github.com/nsurendrareddy"
                  ],
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
                  { "@type": "ListItem", "position": 2, "name": "About", "item": "https://reconshield.in/about" }
                ]
              }
            ]
          })
        }}
      />
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-matrix-400/10 border border-matrix-400/20 mb-6">
          <Shield className="w-10 h-10 text-matrix-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-widest uppercase mb-6">
          About <span className="text-matrix-400">Surendra Reddy</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-mono">
          Empowering the next generation of security researchers with AI-driven visibility into the digital attack surface.
        </p>
      </div>

      {/* Founder Card */}
      <div className="bg-[#0d1117] border border-[#1a2332] rounded-[6px] p-4 mb-20 flex items-center gap-4">
        <div className="w-[44px] h-[44px] rounded-full bg-[#00ff8811] border border-[#00ff8833] flex items-center justify-center text-[#00ff88] font-mono text-[16px] font-bold shrink-0">
          SR
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-white mb-0.5">Surendra Reddy</h2>
          <p className="font-mono text-[12px] text-[#94a3b8] uppercase tracking-[1px] mb-2">Founder & Security Researcher</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/nsurendrareddy" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00ff88] transition-colors">
              <Globe className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00ff88] transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {features.map((f, i) => (
          <div key={i} className="glass-card p-8 group hover:border-matrix-400/40 transition-all duration-500">
            <f.icon className="w-12 h-12 text-matrix-400/30 mb-6 group-hover:text-matrix-400 group-hover:scale-110 transition-all" />
            <h3 className="text-xl font-display font-bold text-white mb-3 tracking-wide uppercase">{f.title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm font-mono">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Author Bio */}
      <section className="mb-24">
        <h2 className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold mb-8">// ABOUT THE AUTHOR & FOUNDER</h2>
        <div className="space-y-6 text-[14px] text-gray-400 leading-[1.8] font-mono max-w-3xl">
          <div className="mb-6">[PHOTO]</div>
          <p>
            Surendra Reddy is a cybersecurity researcher, OSINT analyst, and founder of ReconShield, a free passive reconnaissance and cybersecurity intelligence platform focused on defensive security research and infrastructure visibility.
          </p>
          <p>
            With a strong interest in network intelligence, attack surface analysis, and open-source intelligence (OSINT), Surendra built ReconShield to make enterprise-style security tools more accessible to researchers, IT teams, students, and organizations seeking better visibility into their own digital infrastructure. His work focuses on ethical and authorized cybersecurity practices that help organizations identify exposure, strengthen configurations, and improve operational security.
          </p>
          <p>
            ReconShield was created to simplify security research workflows through lightweight, privacy-focused tools for DNS analysis, SSL inspection, WHOIS intelligence, IP visibility, and passive reconnaissance. The platform is designed around responsible use principles and does not support offensive or unauthorized activities.
          </p>
          <div className="mt-6 mb-2">Surendra’s research interests include:</div>
          <ul className="list-disc pl-6 space-y-2 mb-6 text-[#94a3b8]">
            <li>Threat intelligence</li>
            <li>Passive OSINT methodologies</li>
            <li>Network reconnaissance</li>
            <li>Internet infrastructure analysis</li>
            <li>Security automation</li>
            <li>Defensive cybersecurity operations</li>
          </ul>
          <p>
            He actively studies evolving attack surface trends and publishes educational cybersecurity content intended to support awareness, compliance, and responsible security auditing. Surendra believes cybersecurity knowledge should be accessible, transparent, and ethically applied. Through ReconShield, he continues working toward democratizing security visibility tools while promoting lawful and authorized research practices.
          </p>
          <p className="text-[#00ff88] mt-8">
            Connect with Surendra on LinkedIn: <a href="https://linkedin.com/in/surendrareddy3" target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors">linkedin.com/in/surendrareddy3</a><br/>
            GitHub: <a href="https://github.com/nsurendrareddy" target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors">github.com/nsurendrareddy</a>
          </p>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="mb-24">
        <h2 className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold mb-8">// HOW WE COLLECT DATA</h2>
        <div className="space-y-4">
          {[
            "Passive only — no packets sent directly to the target",
            "Public data sources only — WHOIS, DNS, certificate logs, threat feeds",
            "No storage of scan targets — queries are not logged or retained"
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-3 text-[12px] text-[#64748b] font-mono uppercase">
              <span className="text-[#00ff8866]">▸</span>
              <span>{m}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="glass-card p-12 border-matrix-400/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Activity className="w-64 h-64 text-matrix-400" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-display font-bold text-white mb-6 tracking-wide">ETHICAL INTELLECTUALISM</h2>
          <p className="text-gray-400 leading-relaxed mb-6 font-mono">
            ReconShield was built on the principle that visibility is the first step toward defense. We believe that by democratizing high-level reconnaissance tools, we can help build a more resilient internet.
          </p>
          <div className="flex items-center gap-4 py-6 border-t border-white/5">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full bg-surface-800 border-2 border-surface-950 flex items-center justify-center">
                   <Users className="w-4 h-4 text-gray-600" />
                 </div>
               ))}
             </div>
             <p className="text-xs font-mono text-gray-500 tracking-tighter">TRUSTED BY SECURITY RESEARCHERS GLOBALLY</p>
          </div>
        </div>
      </div>
    </div>
  )
}
