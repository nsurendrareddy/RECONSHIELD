import { ToolPageContent } from "../tools/[toolId]/page";

export const metadata = {
  title: "HTTP Security Headers Analysis & CSP Auditor",
  description: "Check for missing security headers like Content-Security-Policy (CSP), HSTS, and X-Frame-Options to protect your site from XSS and clickjacking.",
  keywords: ["security headers", "csp auditor", "hsts check", "x-frame-options test", "http security audit"],
  alternates: {
    canonical: 'https://reconshield.in/security-headers',
  },
  openGraph: {
    url: 'https://reconshield.in/security-headers',
    type: 'website',
  }
};

export default function Page() {
  return <ToolPageContent toolId="security-headers" />;
}
