import React from 'react';
import ContactClient from '@/components/ContactClient';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdsterraNative from '@/components/ads/AdsterraNative';
import { ShieldCheck, Mail, HelpCircle, Bug, ShieldAlert, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Contact Secure Support & Enterprise Inquiries | ReconShield',
  description: 'Reach out to the ReconShield team for technical support, platform feedback, responsible disclosures, or enterprise cybersecurity solutions.',
  alternates: {
    canonical: 'https://reconshield.in/contact',
  },
  openGraph: {
    title: 'Contact Secure Support & Enterprise Inquiries | ReconShield',
    description: 'Reach out to the ReconShield team for technical support, platform feedback, responsible disclosures, or enterprise cybersecurity solutions.',
    url: 'https://reconshield.in/contact',
    siteName: 'ReconShield',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Secure Support & Enterprise Inquiries | ReconShield',
    description: 'Reach out to the ReconShield team for technical support, platform feedback, responsible disclosures, or enterprise cybersecurity solutions.',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://reconshield.in/contact/#webpage",
        "url": "https://reconshield.in/contact",
        "name": "Contact Secure Support & Enterprise Inquiries | ReconShield",
        "description": "Reach out to the ReconShield team for technical support, platform feedback, responsible disclosures, or enterprise cybersecurity solutions.",
        "breadcrumb": {
          "@id": "https://reconshield.in/contact/#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/contact/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://reconshield.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact",
            "item": "https://reconshield.in/contact"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Contact Support', href: '/contact' }
        ]} />

        {/* Form Section */}
        <div className="mt-8 mb-16">
          <ContactClient />
        </div>

        {/* Native ad below contact form */}
        <div className="flex justify-center mb-12">
          <AdsterraNative />
        </div>

        {/* Authority / E-E-A-T Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 border-t border-white/10 pt-12">
          
          {/* Responsible Disclosure */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              Responsible Disclosure Policy
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              ReconShield values the work of security researchers in improving internet defense. If you have discovered a security vulnerability or configuration error within our platform or systems, please report it immediately using our responsible disclosure process. 
            </p>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              We request that you encrypt your message contents and avoid publishing vulnerability details publically prior to remediation. Our team commits to reviewing all disclosures within 24 hours and keeping you updated throughout the patch validation cycle. We strictly adhere to a 90-day disclosure deadline.
            </p>
          </div>

          {/* Bug Reporting */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Bug className="w-5 h-5 text-cyan-400" />
              Bug Reporting & Tool Feedback
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Our tools (including the WHOIS lookup, DNS parser, and SSL certificate checker) aggregate telemetry from multiple open-source registries. If you encounter parser anomalies, broken links, or data formatting issues, please submit a bug report via the contact form. 
            </p>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Providing details such as target domains, browser models, and error logs will help our engineers isolate and resolve issues quickly. You can also open an issue directly in our open-source repositories on GitHub.
            </p>
          </div>

          {/* Enterprise & API Inquiries */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Enterprise Solutions & API Access
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              If your organization requires high-volume scanning, dedicated telemetry pipelines, or custom brand reputation tracking, please contact our enterprise team. We offer dedicated API endpoints with SLA support and custom search parameters.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              We also support partnerships with educational institutions and open-source security projects, providing free credits and platform access to advance research.
            </p>
          </div>

          {/* Support FAQs */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-3 text-xs text-gray-400">
              <div>
                <span className="font-bold text-white block">What is the average response time?</span>
                We are a small team and typically aim to review all general inquiries and bug reports within 48 hours.
              </div>
              <div>
                <span className="font-bold text-white block">Is there a bug bounty program?</span>
                Currently, we do not run a paid bug bounty program, but we publically acknowledge security researchers in our Hall of Fame.
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
