import React from 'react';
import Link from 'next/link';
import { Mail, Shield, ShieldCheck, ArrowRight, BookOpen, AlertTriangle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { EMAIL_AUTHS_DATA } from '@/utils/emailAuthsData';

export const metadata = {
  title: 'Email Security Authentication Database | ReconShield',
  description: 'Technical configuration manuals and diagnostic guides for SPF, DKIM, and DMARC standards.',
  alternates: {
    canonical: 'https://reconshield.in/email-auth',
  },
  robots: { index: true, follow: true }
};

export default function EmailAuthIndexPage() {
  const guides = Object.entries(EMAIL_AUTHS_DATA).map(([slug, data]) => ({
    slug,
    ...data
  }));

  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Email Security', href: '/tools/email-security' },
          { label: 'Authentication Database', href: '/email-auth' }
        ]} />

        {/* Header Section */}
        <div className="border-b border-white/10 pb-8 mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-[10px] font-mono text-pink-400 mb-4 uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            <span>Compliance Guides</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-mono tracking-tight text-white mb-4">
            Email Security <span className="text-pink-400">Authentication</span> Hub
          </h1>
          <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
            In-depth engineering guides for debugging and enforcing SPF, DKIM, and DMARC anti-spoofing standards on corporate email environments.
          </p>
        </div>

        {/* Security Warning Panel */}
        <div className="p-6 rounded-2xl bg-pink-500/5 border border-pink-500/10 mb-10 flex flex-col md:flex-row gap-4 items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 blur-[100px] rounded-full pointer-events-none" />
          <AlertTriangle className="w-6 h-6 text-pink-400 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              Spoofing Defense Architecture
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed max-w-3xl">
              Failing to implement aligned email authentication records exposes your domain to brand spoofing, phishing, and decreases outbound deliverability to major providers like Google and Outlook. Use our guides to configure your records correctly.
            </p>
          </div>
        </div>

        {/* Guides List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/email-auth/${guide.slug}`}
              className="p-6 rounded-2xl bg-[#0d1117]/60 border border-white/5 hover:border-pink-500/20 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded">
                    SMTP RFC
                  </span>
                </div>
                <h3 className="text-base font-bold font-mono text-white mb-2 group-hover:text-pink-400 transition-colors">
                  {guide.name}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-3">
                  {guide.description}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-pink-400 mt-2">
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
