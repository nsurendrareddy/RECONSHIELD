import dynamic from 'next/dynamic';
const IpScannerClient = dynamic(() => import('@/components/ip-scanner/IpScannerClient'), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-surface-900/50 rounded-3xl" />
});

export const metadata = {
  title: "Free IP Address Lookup & Reputation Checker — ReconShield",
  description: "Check any IP address for geolocation, ISP, abuse score, VPN/proxy detection, and blocklist presence. Free IP reputation checker — no login needed.",
  keywords: ["ip scanner", "ip intelligence", "threat reputation", "asn lookup", "ip geolocation", "network reconnaissance"],
  alternates: {
    canonical: 'https://reconshield.in/ip-scanner',
  },
  openGraph: {
    title: "Free IP Address Lookup & Reputation Checker — ReconShield",
    description: "Check any IP address for geolocation, ISP, abuse score, VPN/proxy detection, and blocklist presence. Free IP reputation checker — no login needed.",
    url: 'https://reconshield.in/ip-scanner',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "@id": "https://reconshield.in/ip-scanner#software",
                "name": "ReconShield IP Intelligence Scanner",
                "url": "https://reconshield.in/ip-scanner",
                "description": "Check any IP address for geolocation, ISP, abuse score, VPN/proxy detection, and blocklist presence.",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://reconshield.in/ip-scanner#breadcrumb",
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
                    "name": "IP Scanner",
                    "item": "https://reconshield.in/ip-scanner"
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://reconshield.in/ip-scanner#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Is this IP Scanner completely passive?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. ReconShield operates strictly through passive reconnaissance. We query our own threat intelligence aggregators, public registries, and DNS records without alerting the target IP."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How accurate is the IP Geolocation data?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our geolocation engine aggregates data from multiple top-tier providers to ensure city-level accuracy for most public IP addresses."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What does an Abuse Confidence Score mean?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The Abuse Confidence Score is an aggregated metric out of 100 that indicates how likely an IP address is engaging in malicious activity."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I check if an IP is on a blacklist?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. ReconShield checks your IP against 50+ global blocklists including Spamhaus, AbuseIPDB, and others in real-time."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I check if an IP is a VPN or proxy?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. Our scanner detects VPN providers, proxy servers, and Tor exit nodes automatically."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      <div className="sr-only">
        <h1>Free IP Address Lookup — Check Reputation, Geolocation & Threats</h1>
        <p>
          ReconShield's free IP checker lets you instantly look up any IP address or domain. Get real-time data on ISP, country, city, abuse confidence score, VPN/proxy detection, Tor exit node status, and presence on 50+ global threat blocklists.
        </p>
        <h2>Features of our IP Scanner</h2>
        <ul>
          <li>Real-time ASN and ISP lookups</li>
          <li>Geolocation mapping and timezone analysis</li>
          <li>Global threat reputation scoring against 50+ blocklists</li>
          <li>Proxy, VPN, and Tor exit node detection</li>
          <li>Reverse DNS footprinting</li>
        </ul>
      </div>

      {/* Prominent Legal Disclaimer Badge */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 text-[10px] sm:text-xs font-mono text-amber-500 mb-8 shadow-sm">
          <div className="flex items-center gap-1.5 shrink-0 uppercase font-bold tracking-wider">
            <span className="text-[14px]">⚠️</span> LEGAL DISCLAIMER:
          </div>
          <p className="flex-1 leading-relaxed font-sans text-gray-400">
            ReconShield is intended for authorized security research and educational purposes only. Unauthorized scanning is illegal.
            <a href="/disclaimer" className="text-amber-500 underline ml-1.5 hover:text-amber-400 font-mono text-[10px]">View Policy</a>
          </p>
        </div>
      </div>

      <IpScannerClient />
      
      <div className="text-center mt-4 mb-8">
        <a href="/" className="text-[#00ff88] hover:underline text-sm font-medium">
          Also scan full websites for vulnerabilities →
        </a>
      </div>
      
      {/* Comprehensive SEO content for better indexing & preventing canonical duplicate issues */}
      <div className="max-w-4xl mx-auto px-4 pb-20 prose prose-invert prose-p:text-gray-400 prose-a:text-[#00ff88]">
        <div className="mt-16 border-t border-white/5 pt-12">
          <h2 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">
            About IP Intelligence Reconnaissance
          </h2>
          <p className="font-mono text-sm leading-relaxed mb-6">
            IP intelligence is the critical first step in any modern security investigation. By gathering actionable data about an IP address, security researchers can understand a target's origin, hosting provider reputation, and associated cyber risks. Our free, advanced IP scanner combines exact <strong>geolocation intelligence</strong>, Autonomous System Number (<strong>ASN lookup</strong>) intelligence, and cross-referenced <strong>IP reputation checker</strong> databases to provide a 360-degree view of any network endpoint on the internet.
          </p>
          <p className="font-mono text-sm leading-relaxed mb-8">
            Whether you are analyzing suspicious traffic in your server logs, verifying the authenticity of an email sender, or mapping out a bug bounty target, ReconShield's passive footprinting ensures you get maximum visibility without alerting the target infrastructure. Use our tool as a reliable <strong>IP scanner</strong> and <strong>IP intelligence tool</strong>.
          </p>
        </div>

        {/* Educational Breakdown */}
        <div className="mt-12">
          <h2 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider">Understanding IP Intelligence Data</h2>
          
          <h3 className="text-white font-bold mb-2">What is an ASN Lookup?</h3>
          <p className="mb-6 text-sm">An Autonomous System Number (ASN) identifies the network provider routing the IP address. Knowing the ASN helps you determine if an IP belongs to a residential ISP (like Comcast), a cloud provider (like AWS or DigitalOcean), or a known bulletproof hosting provider used by cybercriminals.</p>

          <h3 className="text-white font-bold mb-2">What is an IP Reputation Checker?</h3>
          <p className="mb-6 text-sm">IP reputation relies on historical behavior. We cross-reference the target against 50+ global threat blocklists (such as Spamhaus and AbuseIPDB). If an IP has recently engaged in phishing, spamming, or brute-force attacks, our scanner flags it with a high Abuse Confidence Score.</p>

          <h3 className="text-white font-bold mb-2">What is a Reverse DNS Lookup (PTR)?</h3>
          <p className="mb-6 text-sm">A reverse DNS lookup translates an IP address back into its associated hostname. This is critical for verifying mail server authenticity (e.g., confirming that an IP actually belongs to Google or Microsoft) and identifying the core infrastructure of a target.</p>

          <h3 className="text-white font-bold mb-2">Why is VPN/Proxy Detection Important?</h3>
          <p className="mb-6 text-sm">Attackers rarely use their real IP addresses. Our scanner performs deep <strong>VPN/proxy detection</strong> to identify if the traffic originates from a commercial VPN, an open proxy, or the Tor anonymity network. This context is vital for fraud prevention and incident response.</p>
        </div>

        {/* Example Scan Report */}
        <div className="bg-[#0d1117] border border-[#1a2332] p-6 rounded-lg my-12 shadow-lg">
          <h3 className="text-[#00ff88] mb-4 mt-0 font-mono text-sm uppercase tracking-wider">Example IP Scan Report</h3>
          <div className="text-sm font-mono space-y-3">
            <div className="flex justify-between border-b border-[#1a2332] pb-2">
              <span className="text-gray-500">Target IP</span>
              <span className="text-white">198.51.100.42</span>
            </div>
            <div className="flex justify-between border-b border-[#1a2332] pb-2">
              <span className="text-gray-500">ISP / ASN</span>
              <span className="text-white">AS15169 (Google LLC)</span>
            </div>
            <div className="flex justify-between border-b border-[#1a2332] pb-2">
              <span className="text-gray-500">Geolocation</span>
              <span className="text-white">Mountain View, US 🇺🇸</span>
            </div>
            <div className="flex justify-between border-b border-[#1a2332] pb-2">
              <span className="text-gray-500">Reverse DNS</span>
              <span className="text-white">dns.google</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-gray-500">Threat Flags</span>
              <span className="text-[#00ff88]">Clean (0/54 Blocklists)</span>
            </div>
          </div>
        </div>

        {/* FAQ Section for better organic indexing and featured snippets */}
        <div className="mt-16 border-t border-white/5 pt-12">
          <h2 className="text-xl font-display font-bold text-white mb-8 uppercase tracking-wider">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-200 mb-2">Is this IP Scanner completely passive?</h3>
              <p className="text-sm font-sans">
                Yes. ReconShield operates strictly through passive reconnaissance. We query our own threat intelligence aggregators, public registries, and DNS records. No direct packets or active payloads are ever sent to the target IP address, ensuring your research remains 100% stealthy and compliant with ethical boundaries.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-200 mb-2">How accurate is the IP Geolocation data?</h3>
              <p className="text-sm font-sans">
                Our geolocation engine aggregates data from multiple top-tier providers (such as MaxMind and IP2Location) to ensure city-level accuracy for most public IP addresses. However, keep in mind that VPNs, Proxies, and Anycast routing can spoof or alter the physical location data.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-200 mb-2">What does an "Abuse Confidence Score" mean?</h3>
              <p className="text-sm font-sans">
                The Abuse Confidence Score is an aggregated metric out of 100 that indicates how likely an IP address is engaging in malicious activity. A score above 50 typically indicates recent reports of spamming, brute-force attempts, or malware distribution originating from that host.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-200 mb-2">Can I check if an IP is on a blacklist?</h3>
              <p className="text-sm font-sans">
                Yes. ReconShield checks your IP against 50+ global blocklists including Spamhaus, AbuseIPDB, and others in real-time.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-200 mb-2">Can I check if an IP is a VPN or proxy?</h3>
              <p className="text-sm font-sans">
                Yes. Our scanner detects VPN providers, proxy servers, and Tor exit nodes automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
