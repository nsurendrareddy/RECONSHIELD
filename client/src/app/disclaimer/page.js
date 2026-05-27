import Link from 'next/link';
import { AlertTriangle, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Legal Disclaimer & Educational Purpose',
  description: 'Legal disclaimer for ReconShield. Information provided is for educational and defensive cybersecurity purposes only.',
  alternates: {
    canonical: 'https://reconshield.in/disclaimer',
  }
};

export default function DisclaimerPage() {
  const lastUpdated = "May 27, 2026";

  return (
    <div className="bg-[#05080f] min-h-screen pb-24">
      {/* Header */}
      <section className="relative pt-24 pb-16 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-red-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">Legal Disclaimer</h1>
              <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Last Updated: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1000px] mx-auto px-6 pt-16">
        <div className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:font-display prose-h2:text-white prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-400 prose-p:leading-relaxed prose-a:text-red-400 prose-li:text-gray-400">
          
          <h2>Purpose</h2>
          <p>
            ReconShield is a passive OSINT and cybersecurity intelligence platform created exclusively for lawful, ethical, and authorized security research purposes. The platform provides defensive security tools intended to help organizations, administrators, researchers, and IT professionals better understand publicly accessible infrastructure, improve visibility, and strengthen security posture.
          </p>
          <p>
            ReconShield is designed for educational use, infrastructure self-assessment, compliance validation, and defensive cybersecurity operations only.
          </p>
          <p>
            Users may only utilize ReconShield tools and services on systems, networks, domains, or infrastructure they own or for which they have explicit written authorization to assess.
          </p>

          <h2>Prohibited Uses</h2>
          <p>Users are strictly prohibited from using ReconShield for:</p>
          <ul>
            <li>Unauthorized network scanning</li>
            <li>Illegal reconnaissance activities</li>
            <li>Attempting unauthorized access to systems or services</li>
            <li>Circumventing security controls</li>
            <li>Harassment, disruption, or abuse of third-party infrastructure</li>
            <li>Violating organizational security policies</li>
            <li>Activities that violate applicable local, national, or international laws</li>
          </ul>
          <p>
            ReconShield does not support offensive cyber operations, malicious activity, exploit deployment, credential attacks, or unauthorized penetration attempts.
          </p>
          <p>Any misuse of the platform is solely the responsibility of the individual user.</p>

          <h2>User Responsibility</h2>
          <p>
            By accessing or using ReconShield, users acknowledge and agree that they are fully responsible for ensuring their activities comply with all applicable laws, regulations, and organizational policies.
          </p>
          <p>
            Users must obtain proper authorization before conducting any security assessments, audits, or testing activities involving third-party systems or infrastructure.
          </p>
          <p>
            ReconShield and its operators assume no liability for misuse of the platform, unauthorized activity performed by users, or any damages resulting from improper use of the services provided.
          </p>

          <h2>Legal References</h2>
          <p>Unauthorized access attempts, scanning, or interference with systems may violate laws including but not limited to:</p>
          <ul>
            <li>The Computer Fraud and Abuse Act (CFAA) in the United States</li>
            <li>The Computer Misuse Act in the United Kingdom</li>
            <li>The Information Technology Act, 2000 in India</li>
            <li>Other applicable cybersecurity and privacy regulations worldwide</li>
          </ul>
          <p>Users are responsible for understanding and complying with all laws applicable in their jurisdiction.</p>

          <h2>Data Collection</h2>
          <p>
            ReconShield prioritizes privacy-focused and passive security research methodologies. The platform does not intentionally collect sensitive scan data from users and does not conduct intrusive exploitation activity against target infrastructure.
          </p>
          <p>
            ReconShield tools are designed to support visibility, analysis, and defensive research workflows while minimizing unnecessary interaction with third-party systems.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions regarding this Disclaimer or believe ReconShield services are being misused, please contact: <br/>
            nsurendrareddy3@gmail.com
          </p>
          <p>
            By continuing to use ReconShield, you acknowledge that you have read, understood, and agreed to this Disclaimer and all applicable terms governing authorized platform usage.
          </p>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex gap-4">
          <Link href="/privacy" className="text-sm font-mono text-gray-500 hover:text-white transition-colors flex items-center gap-2">
             Privacy Policy <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/terms" className="text-sm font-mono text-gray-500 hover:text-white transition-colors flex items-center gap-2">
             Terms of Service <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
