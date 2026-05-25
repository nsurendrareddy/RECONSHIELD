import Link from 'next/link';
import { ChevronRight, Zap, Star, ArrowRight } from 'lucide-react';
import ToolsHubClient from '@/components/ToolsHubClient';
import { TOOLS, CATEGORIES, COLOR_MAP } from '@/utils/toolsData';

export const metadata = {
  title: 'Free Cybersecurity Tools — IP Lookup, DNS, SSL & OSINT | ReconShield',
  description: 'Explore our ultimate free cybersecurity tools ecosystem. IP Lookup, WHOIS Checker, DNS Lookup, SSL Checker, Subdomain Finder, Port Scanner, HTTP Headers, and threat intelligence. No signup required.',
  keywords: [
    'cybersecurity tools', 'free security tools', 'IP lookup', 'WHOIS checker', 'DNS lookup tool',
    'SSL checker', 'subdomain finder', 'port scanner', 'HTTP headers checker', 'email security checker',
    'IP blacklist checker', 'technology detector', 'network security tools', 'online security scanner', 'OSINT tools'
  ],
  alternates: { canonical: 'https://reconshield.in/tools' },
  openGraph: {
    title: 'Free Cybersecurity Tools — ReconShield',
    description: 'Explore 10+ free cybersecurity tools for IP lookup, DNS analysis, SSL auditing, subdomain discovery and more.',
    url: 'https://reconshield.in/tools',
    type: 'website',
  },
};

const FAQ = [
  {
    q: 'Are all ReconShield tools free?',
    a: 'Yes. Every tool on ReconShield is completely free to use with no registration required. We believe professional-grade security intelligence should be accessible to everyone.',
  },
  {
    q: 'Is it legal to use these tools?',
    a: 'ReconShield only performs passive reconnaissance using publicly available data. You may scan any domain or IP you own or have explicit authorization to test. Unauthorized scanning may violate local laws.',
  },
  {
    q: 'How accurate are the results?',
    a: 'Our tools aggregate data from authoritative DNS resolvers, global threat intelligence feeds, certificate transparency logs, and OSINT databases, providing highly accurate real-time results.',
  },
  {
    q: 'What is the difference between active and passive scanning?',
    a: 'Passive scanning collects data from public registries and third-party databases without directly interacting with the target servers. ReconShield exclusively uses passive techniques to ensure legality and zero performance impact on targets.',
  },
  {
    q: 'Can I export results?',
    a: 'Each tool provides copy-to-clipboard and JSON export functionality. Full export features are available directly from the tool results panel.',
  },
  {
    q: 'Which tool should I start with?',
    a: 'For a quick security overview, start with DNS Lookup and SSL Checker. For threat intelligence research, use IP Lookup and IP Blacklist Checker. For web app security, use HTTP Headers Checker and Tech Detector.',
  },
];

export default function ToolsHubPage() {
  const popularTools = TOOLS.filter(t => t.popular);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': 'https://reconshield.in/#website',
                url: 'https://reconshield.in',
                name: 'ReconShield',
                description: 'AI-powered cybersecurity platform for threat intelligence and vulnerability scanning.',
                publisher: {
                  '@type': 'Organization',
                  name: 'ReconShield',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://reconshield.in/og-image.png'
                  }
                },
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://reconshield.in/tools?q={search_term_string}',
                  'query-input': 'required name=search_term_string'
                }
              },
              {
                '@type': 'WebApplication',
                '@id': 'https://reconshield.in/tools/#software',
                name: 'ReconShield Security Tools Suite',
                applicationCategory: 'SecurityApplication',
                operatingSystem: 'All',
                browserRequirements: 'Requires JavaScript. Requires HTML5.',
                url: 'https://reconshield.in/tools',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD'
                },
                author: {
                  '@type': 'Organization',
                  name: 'ReconShield Security'
                }
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
                  { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://reconshield.in/tools' },
                ],
              },
              {
                '@type': 'ItemList',
                name: 'ReconShield Cybersecurity Tools',
                description: 'Free cybersecurity tools for IP lookup, DNS analysis, SSL auditing, and more',
                numberOfItems: TOOLS.length,
                itemListElement: TOOLS.map((t, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  name: t.name,
                  url: `https://reconshield.in/tools/${t.id}`,
                  description: t.desc,
                })),
              },
              {
                '@type': 'FAQPage',
                mainEntity: FAQ.map(f => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          <ol className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <li><Link href="/" className="hover:text-[#00ff88] transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-[#00ff88]">Tools</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff88]/5 border border-[#00ff88]/20 rounded-full text-xs font-mono text-[#00ff88] mb-8 uppercase tracking-widest">
            <Zap className="w-3 h-3" />
            <span>10 Professional Security Tools — 100% Free</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Free Cybersecurity<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-cyan-400 to-blue-400">
              Intelligence Tools
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional-grade network reconnaissance, threat intelligence, and security analysis tools
            used by security researchers worldwide. No sign-up required.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { value: '10+', label: 'Security Tools' },
              { value: '100%', label: 'Free & Open' },
              { value: 'Real-time', label: 'Results' },
              { value: 'Zero', label: 'Registration' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-[#00ff88] font-mono">{value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Tools */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-4 h-4 text-[#00ff88]" />
            <h2 className="text-sm font-mono font-bold text-[#00ff88] uppercase tracking-widest">Popular Tools</h2>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTools.map(tool => {
              const Icon = tool.icon;
              const c = COLOR_MAP[tool.color];
              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className={`group relative p-5 rounded-xl bg-[#0d1117] border ${c.border} ${c.hover} transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
                >
                  <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1">{tool.category}</div>
                  <h3 className="text-white font-semibold mb-2">{tool.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{tool.desc}</p>
                  <div className={`mt-4 flex items-center gap-1 text-xs ${c.text} font-mono opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <span>Launch Tool</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Interactive Tools Hub Client (Search + Grid) */}
        <ToolsHubClient />

        {/* SEO Content Block */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-gray-400 prose-h2:text-white prose-h2:font-bold prose-h3:text-white prose-h3:font-semibold">
          <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-4 mb-6">
            Professional Cybersecurity Tools for Security Researchers
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            ReconShield provides a comprehensive suite of <strong>free cybersecurity tools</strong> designed for security professionals,
            penetration testers, network administrators, and OSINT researchers. Each tool leverages passive reconnaissance techniques
            and real-time threat intelligence data to give you accurate, actionable security insights without impacting your target infrastructure.
          </p>

          <h3 className="text-xl font-semibold text-white mt-10 mb-4">Why Use ReconShield Security Tools?</h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            Unlike generic online scanners, ReconShield tools are purpose-built for cybersecurity professionals. Our <strong>IP Lookup tool</strong>
            provides geolocation, ISP, ASN, and threat reputation in a single query. The <strong>DNS Lookup tool</strong> checks A, AAAA, MX, TXT,
            NS, and CNAME records while detecting DNSSEC, SPF, and DMARC configurations. Our <strong>SSL Checker</strong> performs deep TLS auditing
            including cipher suite analysis and security grading.
          </p>

          <h3 className="text-xl font-semibold text-white mt-10 mb-4">Comprehensive Attack Surface Analysis</h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            Modern security threats exploit exposed infrastructure components. Our <strong>Port Scanner</strong> identifies open ports and
            high-risk service exposures. The <strong>Subdomain Finder</strong> passively enumerates subdomains from certificate transparency
            logs and DNS databases. The <strong>HTTP Headers Checker</strong> evaluates your Content Security Policy (CSP), HSTS, and
            X-Frame-Options settings to prevent XSS and clickjacking attacks.
          </p>

          <h3 className="text-xl font-semibold text-white mt-10 mb-4">Email Security & Domain Reputation</h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            Email-based attacks are the #1 vector for data breaches. Our <strong>Email Security Checker</strong> validates SPF, DKIM,
            and DMARC records to ensure your domain is protected against phishing and email spoofing. The <strong>IP Blacklist Checker</strong>
            cross-references your IP against 50+ threat intelligence databases to identify reputation issues affecting email deliverability.
          </p>

          <h3 className="text-xl font-semibold text-white mt-10 mb-4">Technology Fingerprinting & OSINT</h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            The <strong>Tech Detector</strong> identifies CMS platforms (WordPress, Drupal, Joomla), JavaScript frameworks (React, Vue, Angular),
            analytics tools, CDN providers, and WAF solutions. The <strong>WHOIS Checker</strong> reveals domain registration history, expiry
            dates, and name servers — crucial for domain monitoring and threat attribution.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <div className="flex items-center gap-3 mb-10">
            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-[#0d1117] border border-white/[0.06] hover:border-white/10 transition-all">
                <h3 className="text-white font-semibold mb-2 text-sm">{item.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links Footer */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0d1117] to-[#0a0f1a] border border-[#00ff88]/10">
            <h2 className="text-lg font-bold text-white mb-6 font-mono">// RELATED RESOURCES</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {TOOLS.map(tool => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="text-xs font-mono text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3" />
                  {tool.name}
                </Link>
              ))}
              <Link href="/blog" className="text-xs font-mono text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />Security Blog
              </Link>
              <Link href="/ip-scanner" className="text-xs font-mono text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />IP Scanner
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
