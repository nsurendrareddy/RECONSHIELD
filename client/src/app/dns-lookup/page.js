import ToolScanner from "../tools/[toolId]/page";

export const metadata = {
  title: "Free DNS Lookup & MX/SPF Records Checker | ReconShield",
  description: "Identify nameserver history, MX records, SPF/DMARC status, and potential DNS vulnerabilities in seconds with ReconShield.",
  keywords: ["dns lookup", "mx records checker", "spf record check", "dmarc lookup", "dns vulnerability scanner"],
};

export default function Page() {
  return <ToolScanner toolId="dns-lookup" />;
}
