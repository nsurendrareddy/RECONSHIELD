import DashboardClient from '@/components/DashboardClient';
import DynamicHomeSections from '@/components/DynamicHomeSections';
import { client, homepageBlogQuery } from '@/utils/sanity';

export const metadata = {
  title: "AI Cybersecurity & Threat Intelligence Platform",
  description: "Advanced AI-powered cybersecurity platform for threat intelligence, OSINT, and vulnerability scanning. Professional-grade security tools for researchers.",
  keywords: ["cybersecurity", "threat intelligence", "vulnerability scanner", "IP intelligence", "AI security", "ReconShield"],
  alternates: {
    canonical: 'https://reconshield.in',
  },
  openGraph: {
    title: "ReconShield | AI Cybersecurity Platform",
    siteName: "ReconShield",
    url: 'https://reconshield.in',
    type: 'website',
  }

};

export default async function Page() {
  const posts = await client.fetch(homepageBlogQuery);

  return (
    <>
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
      <DynamicHomeSections posts={posts || []} />
    </>
  );
}
