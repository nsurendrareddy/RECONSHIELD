import Link from 'next/link';
import { Shield, FileText, AlertOctagon, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service & Acceptable Use Policy',
  description: 'Terms of Service and Acceptable Use Policy for ReconShield. Understand the rules for using our passive cybersecurity and threat intelligence tools.',
  alternates: {
    canonical: 'https://reconshield.in/terms',
  }
};

export default function TermsOfServicePage() {
  const lastUpdated = "May 27, 2026";

  return (
    <div className="bg-[#05080f] min-h-screen pb-24">
      {/* Header */}
      <section className="relative pt-24 pb-16 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">Terms of Service</h1>
              <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Last Updated: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1000px] mx-auto px-6 pt-16">
        <div className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:font-display prose-h2:text-white prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-400 prose-p:leading-relaxed prose-a:text-cyan-400 prose-li:text-gray-400">
          
          <div className="p-6 bg-surface-900 border border-red-500/20 rounded-2xl mb-12">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2"><AlertOctagon className="w-5 h-5 text-red-500" /> Acceptable Use & Authorization</h3>
            <p className="text-sm text-gray-400 m-0">
              ReconShield provides passive infrastructure visibility tools for educational, research, and defensive cybersecurity purposes. By using this platform, you agree that you are authorized to scan the target domains or IPs, or that you are collecting intelligence from public, open-source records (OSINT).
            </p>
          </div>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using ReconShield (https://reconshield.in), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.
          </p>

          <h2>2. Permitted Use</h2>
          <p>
            ReconShield provides tools including, but not limited to, IP Scanners, DNS Lookups, Port Scanners, and Exposure Analyzers. You agree to use these tools strictly for:
          </p>
          <ul>
            <li>Securing infrastructure you own or have explicit authorization to test.</li>
            <li>Conducting legitimate, lawful cybersecurity research.</li>
            <li>Gathering Open Source Intelligence (OSINT) from public registries.</li>
          </ul>

          <h2>3. Prohibited Activities</h2>
          <p>You strictly agree NOT to use the ReconShield platform to:</p>
          <ul>
            <li>Conduct unauthorized active scanning, exploitation, or compliance auditing against third-party networks.</li>
            <li>Engage in malicious activities, including infrastructure visibility for immediate criminal abuse.</li>
            <li>Automate requests via bots, scrapers, or scripts that bypass our rate limits and degrade the service for other users.</li>
            <li>Attempt to reverse engineer, bypass, or abuse the ReconShield infrastructure itself.</li>
          </ul>
          <p>Violation of these rules will result in an immediate and permanent IP ban from the platform, and potential reporting to relevant authorities.</p>

          <h2>4. Intellectual Property</h2>
          <p>
            The platform and its original content, features, and functionality are owned by ReconShield and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>

          <h2>5. Third-Party Links & Data</h2>
          <p>
            Our tools aggregate data from third-party APIs, threat intelligence feeds, and public registries. ReconShield does not assume responsibility for the accuracy or reliability of third-party data. Our site may contain links to third-party websites or services that are not owned or controlled by ReconShield.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall ReconShield, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@reconshield.in.
          </p>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex gap-4">
          <Link href="/privacy" className="text-sm font-mono text-gray-500 hover:text-white transition-colors flex items-center gap-2">
             Privacy Policy <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/disclaimer" className="text-sm font-mono text-gray-500 hover:text-white transition-colors flex items-center gap-2">
             Legal Disclaimer <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
