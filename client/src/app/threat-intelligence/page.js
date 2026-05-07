import ToolScanner from "../tools/[toolId]/page";

export const metadata = {
  title: "IP Threat Intelligence & Reputation Lookup | ReconShield",
  description: "Identify malicious IPs, blacklist status, ASN intelligence, and threat reputation globally using ReconShield's intelligence engine.",
  keywords: ["threat intelligence", "ip reputation lookup", "blacklist checker", "malicious ip detection", "asn intelligence"],
};

export default function Page() {
  return <ToolScanner toolId="threat-intelligence" />;
}
