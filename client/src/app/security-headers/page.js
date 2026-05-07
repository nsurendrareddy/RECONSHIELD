import ToolScanner from "../tools/[toolId]/page";

export const metadata = {
  title: "HTTP Security Headers Analysis & CSP Auditor | ReconShield",
  description: "Check for missing security headers like Content-Security-Policy (CSP), HSTS, and X-Frame-Options to protect your site from XSS and clickjacking.",
  keywords: ["security headers", "csp auditor", "hsts check", "x-frame-options test", "http security audit"],
};

export default function Page() {
  return <ToolScanner toolId="security-headers" />;
}
