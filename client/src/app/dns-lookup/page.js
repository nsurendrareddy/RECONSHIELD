import { ToolPageContent } from "../tools/[toolId]/page";

export const metadata = {
  title: "Free DNS Lookup Tool",
  description: "Check A, MX, CNAME records instantly. Identify nameserver history, SPF/DMARC status, and potential DNS vulnerabilities in seconds with ReconShield.",
  keywords: ["dns lookup", "mx records checker", "spf record check", "dmarc lookup", "dns vulnerability scanner"],
  alternates: {
    canonical: 'https://reconshield.in/dns-lookup',
  },
  openGraph: {
    url: 'https://reconshield.in/dns-lookup',
    type: 'website',
  }
};

export default function Page() {
  return <ToolPageContent toolId="dns-lookup" />;
}
