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
            IP intelligence is the critical first step in any modern security investigation. By gathering actionable data about an IP address, security researchers can understand a target's origin, hosting provider reputation, and associated cyber risks. Our free, advanced IP scanner combines exact geolocation data, Autonomous System Number (ASN) intelligence, and cross-referenced threat reputation databases to provide a 360-degree view of any network endpoint on the internet.
          </p>
          <p className="font-mono text-sm leading-relaxed mb-8">
            Whether you are analyzing suspicious traffic in your server logs, verifying the authenticity of an email sender, or mapping out a bug bounty target, ReconShield's passive footprinting ensures you get maximum visibility without alerting the target infrastructure.
          </p>
        </div>

        {/* Intelligence Breakdown */}
        <div className="mt-12">
          <h2 className="font-mono text-[12px] tracking-[3px] uppercase text-[#94a3b8] mb-6">// DATA POINTS WE COLLECT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[#0d1117] border border-[#1a2332] rounded-xl">
              <h3 className="text-[#00ff88] font-mono text-sm uppercase mb-2">Infrastructure Data</h3>
              <ul className="text-sm text-gray-400 space-y-2 font-mono list-disc pl-4">
                <li>ISP & Hosting Provider detection</li>
                <li>ASN (Autonomous System Number)</li>
                <li>Reverse DNS (PTR records)</li>
                <li>Datacenter & Cloud hosting flags</li>
              </ul>
            </div>
            <div className="p-5 bg-[#0d1117] border border-[#1a2332] rounded-xl">
              <h3 className="text-[#00ff88] font-mono text-sm uppercase mb-2">Threat Reputation</h3>
              <ul className="text-sm text-gray-400 space-y-2 font-mono list-disc pl-4">
                <li>Abuse Confidence Scores</li>
                <li>Global Blocklist Presence (Spamhaus, AbuseIPDB, etc.)</li>
                <li>Proxy, VPN, & Tor Node detection</li>
                <li>Malware & Botnet tag association</li>
              </ul>
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
