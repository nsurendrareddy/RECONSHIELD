import IpScannerClient from '@/components/ip-scanner/IpScannerClient';

export const metadata = {
  title: "Advanced IP Intelligence & Reputation Scanner | ReconShield",
  description: "Perform deep-packet inspection and passive footprinting on any IP address. Analyze ISP data, ASN reputation, geolocation, and security threats in real-time.",
  keywords: ["ip scanner", "ip intelligence", "threat reputation", "asn lookup", "ip geolocation", "network reconnaissance"],
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
      </div>
    </>
  );
}
