import IpScannerClient from '@/components/ip-scanner/IpScannerClient';

export const metadata = {
  title: "Advanced IP Intelligence & Reputation Scanner | ReconShield",
  description: "Perform deep-packet inspection and passive footprinting on any IP address. Analyze ISP data, ASN reputation, geolocation, and security threats in real-time.",
  keywords: ["ip scanner", "ip intelligence", "threat reputation", "asn lookup", "ip geolocation", "network reconnaissance"],
  alternates: {
    canonical: 'https://reconshield.vercel.app/ip-scanner',
  },
  openGraph: {
    title: "Advanced IP Intelligence & Reputation Scanner | ReconShield",
    description: "Perform deep-packet inspection and passive footprinting on any IP address. Analyze ISP data, ASN reputation, geolocation, and security threats in real-time.",
    url: 'https://reconshield.vercel.app/ip-scanner',
    type: 'website',
  }
};

export default function Page() {
  return (
    <>
      {/* 
          SERVER-RENDERED SEO CONTENT
          Visible to Google even before JavaScript executes.
      */}
      <div className="sr-only">
        <h1>Advanced IP Intelligence Scanner</h1>
        <p>
          ReconShield's IP Intelligence Scanner provides comprehensive deep-packet inspection and passive footprinting 
          for any IP address or domain. Analyze infrastructure, security headers, and threat reputation in real-time.
        </p>
      </div>

      <IpScannerClient />
      
      {/* Additional SEO content for better indexing */}
      <div className="max-w-4xl mx-auto px-4 pb-20 prose prose-invert">
        <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider border-t border-white/5 pt-12">
          About IP Intelligence Reconnaissance
        </h2>
        <p className="text-gray-400 leading-relaxed mb-6 font-mono text-sm">
          IP intelligence is the process of gathering actionable data about an IP address to understand its origin, 
          reputation, and associated risks. Our tool combines geolocation data, ASN intelligence, and threat 
          reputation databases to provide a 360-degree view of any network endpoint.
        </p>

        {/* What You Get Section */}
        <div className="mt-12">
          <h2 className="font-mono text-[10px] tracking-[3px] uppercase text-[#94a3b8] mb-4">// INTELLIGENCE COLLECTED</h2>
          <div className="flex flex-wrap gap-2">
            {[
              'ISP / Hosting Provider', 'ASN Number', 'Country & City', 
              'Abuse Confidence Score', 'Blocklist Presence', 'Reverse DNS', 
              'Proxy / VPN Detection', 'Threat Tags'
            ].map((p, i) => (
              <div key={i} className="px-3 py-1.5 bg-[#0d1117] border border-[#1a2332] rounded-full flex items-center gap-2">
                <span className="text-[#00ff8866] text-[10px]">▸</span>
                <span className="font-mono text-[11px] text-[#64748b]">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
