import { Shield, Target, Activity, Search, Database, RefreshCw, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { generateBaseMetadata } from '@/utils/metadata';

export const metadata = generateBaseMetadata({
  title: "Passive Research Methodology & Data Integrity | ReconShield",
  description: "Learn about ReconShield's passive security intelligence research methodology. We ensure zero disruption to targets by collecting open-source datasets.",
  path: '/research-methodology'
});

export default function ResearchMethodology() {
  const steps = [
    {
      icon: Search,
      title: "1. Passive Discovery",
      desc: "Queries are routed entirely to third-party databases, certificate logs, and cached lookup databases. We never transmit packets directly to the targeted server, ensuring zero target server overhead or log noise."
    },
    {
      icon: Database,
      title: "2. Open Source Aggregation",
      desc: "We consolidate records from public databases, including WHOIS registries, DNS root resolvers, Certificate Transparency logs, and global reputation networks, providing a unified threat view."
    },
    {
      icon: RefreshCw,
      title: "3. Dynamic Verification",
      desc: "Our real-time engine validates configuration records (such as SSL certificates and email SPF/DKIM/DMARC policies) against standard IETF RFCs to pinpoint security gaps."
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
                "@id": "https://reconshield.in/research-methodology",
                "url": "https://reconshield.in/research-methodology",
                "name": "Research Methodology | ReconShield",
                "description": "Educational resource explaining passive OSINT data aggregation, zero-disruption querying, and compliance standards.",
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
                  { "@type": "ListItem", "position": 2, "name": "Research Methodology", "item": "https://reconshield.in/research-methodology" }
                ]
              }
            ]
          })
        }}
      />

      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-matrix-400/10 border border-matrix-400/20 mb-6">
          <Activity className="w-10 h-10 text-matrix-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-widest uppercase mb-6">
          Research <span className="text-matrix-400">Methodology</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-mono">
          A commitment to passive, zero-disruption, and fully compliant cybersecurity data aggregation.
        </p>
      </div>

      {/* Core Principles */}
      <section className="mb-20">
        <h2 className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold mb-8">// CORE RESEARCH DIRECTIVES</h2>
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

      {/* Detailed Process */}
      <section className="mb-20 space-y-8 text-gray-400 leading-[1.8] font-mono text-sm max-w-3xl">
        <h2 className="font-mono text-xs tracking-[4px] uppercase text-[#00ff88] font-bold mb-8">// PASSIVE OSINT WORKFLOW</h2>
        
        <p>
          At ReconShield, we operate on the fundamental belief that defensive security should not create noise, trigger false-positive alerts, or disrupt business operations. Active vulnerability scans send thousands of payloads directly to a target web server. In contrast, our passive analysis framework aggregates pre-computed, public records.
        </p>
        
        <h3 className="text-white font-bold text-base mt-8">// WHY PASSIVE RECONNAISSANCE?</h3>
        <p>
          Active scanning introduces operational risk, including potential denial-of-service states on legacy devices, and generates heavy log footprints that distract security operations centers (SOCs). By utilizing passive reconnaissance, organizations can map their attack surfaces, identify misconfigured services, and discover shadow IT entirely from the outside.
        </p>

        <h3 className="text-white font-bold text-base mt-8">// DATA INTEGRITY AND SECURITY</h3>
        <p>
          We query authoritative data sources in real-time, caching responses strictly for the durations set by standard TTL values to ensure accuracy. Because we respect the privacy of researchers and organizations, queries run through ReconShield are ephemeral; we do not store targets, query parameters, or raw search histories.
        </p>

        <div className="mt-8 border-t border-white/5 pt-8">
          <p className="text-xs text-gray-500">
            For questions about our data collection, APIs, or to request a redaction of specific cached domains under corporate guidelines, contact us via the <Link href="/contact" className="text-matrix-400 hover:underline">Contact Portal</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
