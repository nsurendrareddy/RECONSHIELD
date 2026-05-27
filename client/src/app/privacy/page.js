import Link from 'next/link';
import { Shield, Lock, FileText, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy & Data Protection',
  description: 'Privacy Policy for ReconShield. Learn how we handle your data, comply with GDPR/CCPA, and partner with ad networks like Google AdSense.',
  alternates: {
    canonical: 'https://reconshield.in/privacy',
  }
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 27, 2026";

  return (
    <div className="bg-[#05080f] min-h-screen pb-24">
      {/* Header */}
      <section className="relative pt-24 pb-16 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0d14] -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">Privacy Policy</h1>
              <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Last Updated: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1000px] mx-auto px-6 pt-16">
        <div className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:font-display prose-h2:text-white prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-400 prose-p:leading-relaxed prose-a:text-blue-400 prose-li:text-gray-400">
          
          <div className="p-6 bg-surface-900 border border-white/10 rounded-2xl mb-12">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2"><Shield className="w-5 h-5 text-blue-400" /> Security-First Commitment</h3>
            <p className="text-sm text-gray-400 m-0">
              As a cybersecurity platform, ReconShield prioritizes your privacy. Our infrastructure visibility tools are designed to operate passively. We do not require account registration, and we do not store the targets you scan in any personally identifiable manner.
            </p>
          </div>

          <h2>1. Information We Collect</h2>
          <p>
            When you visit ReconShield, we may collect the following types of information:
          </p>
          <ul>
            <li><strong>Log Data:</strong> Like most websites, our servers automatically record information that your browser sends. This may include your IP address, browser type, device type, referring/exit pages, and timestamps.</li>
            <li><strong>Analytics Data:</strong> We use third-party analytics tools (e.g., Google Analytics) to help us measure traffic and usage trends. These tools collect information sent by your device, including the web pages you visit.</li>
            <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our platform and hold certain information.</li>
          </ul>

          <h2>2. Use of Information</h2>
          <p>We use the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain our cybersecurity tools and services.</li>
            <li>To monitor the usage of our platform to ensure stability and security.</li>
            <li>To detect, prevent, and address technical issues or abuse of our infrastructure.</li>
            <li>To display relevant advertisements via trusted ad networks.</li>
          </ul>

          <h2>3. Advertising and Google AdSense</h2>
          <p>
            ReconShield is a free platform. To keep our enterprise-grade tools free, we use third-party advertising companies, including Google AdSense, to serve ads when you visit our website.
          </p>
          <ul>
            <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to ReconShield and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
          </ul>

          <h2>4. Data Retention and Security</h2>
          <p>
            We prioritize the security of your data. The queries you submit to our tools (e.g., IP addresses, domains) are processed in real-time to generate your report and are temporarily cached for performance. We do not permanently log or attribute target scans to your IP address to ensure operational security (OPSEC) for our researchers.
          </p>

          <h2>5. GDPR and CCPA Compliance</h2>
          <p>
            If you are a resident of the European Economic Area (EEA) or California, you have certain data protection rights, including:
          </p>
          <ul>
            <li>The right to access, update, or delete the information we have on you.</li>
            <li>The right of rectification.</li>
            <li>The right to object and restrict processing.</li>
            <li>The right to data portability.</li>
          </ul>
          <p>To exercise any of these rights, please contact us at privacy@reconshield.in.</p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.
          </p>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex gap-4">
          <Link href="/terms" className="text-sm font-mono text-gray-500 hover:text-white transition-colors flex items-center gap-2">
             Terms of Service <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/disclaimer" className="text-sm font-mono text-gray-500 hover:text-white transition-colors flex items-center gap-2">
             Legal Disclaimer <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
