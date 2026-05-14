import { ToolPageContent } from "../tools/[toolId]/page";

export const metadata = {
  title: "IP Threat Intelligence & Reputation Lookup",
  description: "Identify malicious IPs, blacklist status, ASN intelligence, and threat reputation globally using ReconShield's intelligence engine.",
  keywords: ["threat intelligence", "ip reputation lookup", "blacklist checker", "malicious ip detection", "asn intelligence"],
  alternates: {
    canonical: 'https://reconshield.in/threat-intelligence',
  },
  openGraph: {
    url: 'https://reconshield.in/threat-intelligence',
    type: 'website',
  }
};

export default function Page() {
  return <ToolPageContent toolId="threat-intelligence" />;
}
