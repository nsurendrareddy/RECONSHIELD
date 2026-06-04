import { Shield, Mail, Terminal, Clock, Heart, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "Coordinated Vulnerability Disclosure Policy | ReconShield",
  description: "Report security vulnerabilities in ReconShield. Learn about our security disclosure guidelines, safe harbor, and response SLAs.",
  path: '/security-disclosure'
});

export default function SecurityDisclosure() {
  const steps = [
    {
      icon: Mail,
      title: "1. Reporting",
      desc: "Send details of the vulnerability to security@reconshield.in. To encrypt your report, please request our PGP public key."
    },
    {
      icon: Clock,
      title: "2. Triage",
      desc: "Our security response team will acknowledge receipt of your report within 24-48 hours and provide a status tracking ID."
    },
    {
      icon: Terminal,
      title: "3. Remediation",
      desc: "We aim to investigate and patch confirmed vulnerabilities within 14 business days, coordinating the release of patches."
    }
  ];

  return (
    <div className="animate-fade-in max-w-5xl mx-auto py-10 px-6">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://reconshield.in/security-disclosure",
                "url": "https://reconshield.in/security-disclosure",
                "name": "Coordinated Vulnerability Disclosure | ReconShield",
                "description": "Information on reporting security issues, PGP keys, triage SLAs, and safe harbor protections.",
                "publisher": {
                  "@type": "Organization",
                  "name": "ReconShield",
                  "url": "https://reconshield.in"
                }
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
                  { "@type": "ListItem", "position": 2, "name": "Security Disclosure", "item": "https://reconshield.in/security-disclosure" }
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
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-widest uppercase mb-6">
          Security <span className="text-matrix-400">Disclosure</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-mono">
          Our commitment to cooperating with the security research community to harden our digital systems.
        </p>
      </div>

      {/* Reporting Phases */}
      <section className="mb-20">
        <h2 className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold mb-8">// COORDINATED REPORTING PROCESS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <div key={idx} className="glass-card p-8 group hover:border-matrix-400/30 transition-all duration-550">
              <div className="w-12 h-12 rounded-xl bg-surface-900 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform text-[#00ff88]">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-3">{s.title}</h3>
              <p className="text-gray-400 leading-relaxed text-xs font-mono">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Policy Details */}
      <section className="mb-20 space-y-8 text-gray-400 leading-[1.8] font-mono text-sm max-w-3xl">
        <h2 className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold mb-8">// SAFE HARBOR & DISCLOSURE POLICY</h2>
        
        <p>
          We believe that responsible security research is vital to keeping the internet safe. If you believe you have discovered a vulnerability, security flaw, or misconfiguration in any ReconShield service or interface, we encourage you to let us know immediately. We promise to collaborate with you to resolve the issue promptly.
        </p>
        
        <h3 className="text-white font-bold text-base mt-8">// SAFE HARBOR POLICY</h3>
        <p>
          We will not take legal action against you or request law enforcement to investigate you if you act in good faith and comply with this policy:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-[#94a3b8]">
          <li>Provide us with detailed steps to reproduce the vulnerability.</li>
          <li>Avoid accessing, copying, deleting, or modifying user data.</li>
          <li>Avoid launching Denial of Service (DoS) attacks or brute-force tests.</li>
          <li>Give us a reasonable timeframe to remediate before public disclosure.</li>
        </ul>

        <h3 className="text-white font-bold text-base mt-8">// NOT IN SCOPE</h3>
        <p>
          The following classes of issues are currently outside the scope of our security disclosure policy:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-[#94a3b8]">
          <li>Spam, phishing, or social engineering of ReconShield users/staff.</li>
          <li>Missing best-practice HTTP headers that do not result in direct exploitability.</li>
          <li>Rate limiting issues on public search and diagnostic interfaces.</li>
        </ul>

        <h3 className="text-white font-bold text-base mt-8">// DISCLOSURE REPORT ENVELOPE</h3>
        <p>
          When submitting a report, please include:
          - A clear description of the potential vulnerability.
          - Exact URLs, HTTP headers, or parameters involved.
          - Proof of concept (PoC) code or screenshots.
          - Your name or handle if you wish to be credited.
        </p>

        <div className="mt-8 border-t border-white/5 pt-8 flex items-center gap-3 text-xs text-[#00ff88]">
          <Heart className="w-4 h-4 fill-[#00ff88]/20 animate-pulse" />
          <span>Thank you for helping keep ReconShield and its users secure!</span>
        </div>
      </section>
    </div>
  )
}
