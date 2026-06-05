import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shield, Lock, LayoutTemplate, Activity, ChevronRight, Server, Globe } from 'lucide-react';

const allowedHeaders = [
  'server',
  'content-security-policy',
  'x-frame-options',
  'strict-transport-security',
  'x-content-type-options',
  'referrer-policy',
  'permissions-policy'
];

const headerData = {
  'referrer-policy': {
    name: 'Referrer-Policy',
    icon: Globe,
    desc: 'Governs which referrer information, sent in the Referer header, should be included with requests made.',
    attackMitigation: 'Privacy Leakage, Session Token Leakage',
    configExample: 'Referrer-Policy: strict-origin-when-cross-origin',
    bestPractices: [
      'Use strict-origin-when-cross-origin as a safe default',
      'Avoid no-referrer-when-downgrade unless necessary',
      'Do not pass sensitive URL parameters that could be leaked in referrers'
    ]
  },
  'permissions-policy': {
    name: 'Permissions-Policy',
    icon: Shield,
    desc: 'Allows web developers to selectively enable, disable, and modify the behavior of certain browser APIs and features.',
    attackMitigation: 'Feature Misuse, Browser Resource Hijacking',
    configExample: 'Permissions-Policy: geolocation=(), microphone=(), camera=()',
    bestPractices: [
      'Disable unneeded APIs globally using empty lists ()',
      'Grant permissions selectively using origin whitelists',
      'Audit iframe sandbox definitions to prevent permission inheritance'
    ]
  },
  'content-security-policy': {
    name: 'Content-Security-Policy (CSP)',
    icon: Shield,
    desc: 'Prevents Cross-Site Scripting (XSS) and data injection attacks by restricting which dynamic resources are allowed to load.',
    attackMitigation: 'Cross-Site Scripting (XSS), Clickjacking, Packet Sniffing',
    configExample: "Content-Security-Policy: default-src 'self'; img-src https://*; child-src 'none';",
    bestPractices: [
      'Avoid using unsafe-inline and unsafe-eval',
      'Start in report-only mode to identify legitimate blocked resources',
      'Define strict fallback default-src directives'
    ]
  },
  'x-frame-options': {
    name: 'X-Frame-Options',
    icon: LayoutTemplate,
    desc: 'Protects visitors against clickjacking attacks by indicating whether a browser should be allowed to render a page in a <frame>, <iframe>, <embed> or <object>.',
    attackMitigation: 'Clickjacking (UI Redressing)',
    configExample: 'X-Frame-Options: DENY',
    bestPractices: [
      'Use DENY if you never intend for the page to be framed',
      'Use SAMEORIGIN if you only frame pages from your own site',
      'Modern applications should migrate to CSP frame-ancestors directive'
    ]
  },
  'strict-transport-security': {
    name: 'Strict-Transport-Security (HSTS)',
    icon: Lock,
    desc: 'Forces browsers to only interact with the server using secure HTTPS connections, rather than insecure HTTP.',
    attackMitigation: 'Man-in-the-Middle (MitM) attacks, SSL Stripping',
    configExample: 'Strict-Transport-Security: max-age=63072000; includeSubDomains; preload',
    bestPractices: [
      'Set a long max-age (e.g., 2 years)',
      'Include all subdomains using the includeSubDomains directive',
      'Submit the domain to the HSTS preload list'
    ]
  },
  'x-content-type-options': {
    name: 'X-Content-Type-Options',
    icon: Activity,
    desc: 'Prevents the browser from MIME-sniffing a response away from the declared content-type, which reduces exposure to drive-by downloads and XSS.',
    attackMitigation: 'MIME-Sniffing Attacks, Drive-by Downloads',
    configExample: 'X-Content-Type-Options: nosniff',
    bestPractices: [
      'Always set to nosniff',
      'Ensure backend services correctly set the Content-Type header for all assets'
    ]
  },
  'server': {
    name: 'Server',
    icon: Server,
    desc: 'Contains information about the software used by the origin server to handle the request.',
    attackMitigation: 'Information Disclosure (Passive Reconnaissance)',
    configExample: 'Server: obscure-server-name',
    bestPractices: [
      'Remove or obfuscate the Server header',
      'Do not leak version numbers of the web server (e.g., Apache/2.4.1)',
      'Use a generic name to disrupt automated vulnerability scanners'
    ]
  }
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const headerId = resolvedParams?.header;

  if (!headerId || !allowedHeaders.includes(headerId)) {
    return { title: 'Invalid Security Header' };
  }

  const intel = headerData[headerId];

  return {
    title: `${intel.name} Security Header Analysis & Configuration`,
    description: `Learn how to configure the ${intel.name} HTTP header to mitigate ${intel.attackMitigation}.`,
    alternates: {
      canonical: `https://reconshield.in/headers/${headerId}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      url: `https://reconshield.in/headers/${headerId}`,
      title: `${intel.name} Security Header Profile`,
      description: `Complete guide on configuring ${intel.name} and implementing web security best practices.`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${intel.name} Security Profile`,
      description: `Complete guide on configuring ${intel.name}.`,
      images: ['/og-image.png']
    }
  };
}

export default async function HeaderIntelligencePage({ params }) {
  const resolvedParams = await params;
  const headerId = resolvedParams?.header;

  if (!headerId || !allowedHeaders.includes(headerId)) {
    notFound();
  }

  const intel = headerData[headerId];
  const Icon = intel.icon;

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `https://reconshield.in/headers/${headerId}#article`,
    headline: `${intel.name} Security Header Configuration Guide`,
    description: intel.desc,
    articleSection: 'Web Security',
    publisher: {
      '@type': 'Organization',
      name: 'ReconShield Threat Research'
    },
    url: `https://reconshield.in/headers/${headerId}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <div className="min-h-screen pb-20">
        <div className="max-w-5xl mx-auto px-4 pt-8">
          
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/tools/http-headers" className="hover:text-[#00ff88] transition-colors">Security Headers</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#00ff88]">{intel.name}</li>
            </ol>
          </nav>

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-mono text-blue-400 mb-4 uppercase tracking-widest">
              <Icon className="w-3 h-3" />
              <span>HTTP Security Header</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {intel.name}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              {intel.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  Configuration Snapshot
                </h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Header Name</dt>
                    <dd className="text-white font-bold">{intel.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500 font-mono mb-1 uppercase">Primary Mitigation</dt>
                    <dd className="text-white font-bold">{intel.attackMitigation}</dd>
                  </div>
                </dl>

                <h3 className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Example Configuration</h3>
                <div className="bg-black/60 p-4 rounded-xl border border-white/10 font-mono text-sm text-[#00ff88] overflow-x-auto">
                  {intel.configExample}
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Implementation Best Practices
                </h2>
                <ul className="text-gray-400 leading-relaxed list-disc pl-5 space-y-2">
                  {intel.bestPractices.map((bp, i) => (
                    <li key={i}>{bp}</li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-white mt-8 mb-3">Audit Your Configuration</h3>
                <p className="text-gray-400 leading-relaxed">
                  Properly implementing <strong>{intel.name}</strong> is critical for achieving a robust security posture. A misconfigured header can leave your application exposed to client-side attacks or accidentally block legitimate functionality. Use our Security Headers auditing tool to evaluate your live production setup.
                </p>
                <Link href="/tools/http-headers" className="inline-block mt-4 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl transition-colors font-medium">
                  Scan Your Website
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24">
                <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">Related Security Tools</h3>
                
                <div className="space-y-3">
                  <Link href={`/tools/http-headers`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                      <LayoutTemplate className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Header Scanner</div>
                      <div className="text-xs text-gray-500">Live configuration audit</div>
                    </div>
                  </Link>

                  <Link href={`/tools/vulnerability-scanner`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500/20">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Exposure Check</div>
                      <div className="text-xs text-gray-500">Full domain security scan</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return allowedHeaders.map(header => ({ header }));
}
