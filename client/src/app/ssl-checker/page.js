import { ToolPageContent } from "../tools/[toolId]/page";

export const metadata = {
  title: "SSL Certificate Audit & TLS Security Checker | ReconShield",
  description: "Verify SSL certificate validity, expiry dates, trust chains, and TLS protocol security to ensure your website's encryption is up to standard.",
  keywords: ["ssl checker", "tls security audit", "certificate expiry check", "website encryption test"],
};

export default function Page() {
  return <ToolPageContent toolId="ssl-checker" />;
}
