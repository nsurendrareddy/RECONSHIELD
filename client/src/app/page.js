import DashboardClient from '@/components/DashboardClient';

export const metadata = {
  title: "ReconShield - AI Cybersecurity & Threat Intelligence Platform",
  description: "ReconShield — AI-powered cybersecurity platform for threat intelligence, OSINT, vulnerability scanning, and IP analysis. Professional-grade security tools, free.",
  keywords: ["cybersecurity", "threat intelligence", "vulnerability scanner", "IP intelligence", "AI security", "ReconShield"],
};

export default function Page() {
  return (
    <>
      {/* 
          SERVER-RENDERED HERO CONTENT
          Ensures the core value proposition is indexable by crawlers immediately.
      */}
      <div className="sr-only">
        <h1>ReconShield AI Cybersecurity Platform</h1>
        <p>
          Advanced reconnaissance and threat intelligence at your fingertips. 
          Scan websites, analyze IP threats, detect vulnerabilities, and monitor cyber risks in real time.
        </p>
        <ul>
          <li>Vulnerability Scanning</li>
          <li>DNS & Infrastructure Analysis</li>
          <li>SSL/TLS Security Auditing</li>
          <li>IP Reputation & Threat Intel</li>
          <li>AI-Powered Risk Assessment</li>
        </ul>
      </div>

      <DashboardClient />
    </>
  );
}
