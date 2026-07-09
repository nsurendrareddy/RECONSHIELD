import React from 'react';
import Link from 'next/link';
import { Cpu, Shield, Activity, ChevronRight, Lock, AlertTriangle, Globe, Server } from 'lucide-react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';

export const revalidate = false;
export const dynamicParams = false;

const TECH_DATA = {
  react: {
    name: "React",
    category: "Frontend Library",
    desc: "React frontend analysis including version detection, component mapping, and client-side security auditing metrics.",
    metaTitle: "React Website Technology Analysis – Detect Stack & Config | ReconShield",
    metaDesc: "Audit React applications. Learn how React web components are fingerprinted, associated DOM properties, and best security configurations.",
    details: {
      description: "React is an open-source, front-end JavaScript library for building user interfaces. It is maintained by Meta and a community of individual developers and companies.",
      security: "React features built-in XSS protections via automated escaping. However, developers can bypass this security layer using dangerouslySetInnerHTML. Passive checking looks for React Developer Tools global hooks and data-reactroot attributes to identify active builds.",
      defensive: "Ensure all React library packages are kept up to date. Avoid injecting unsanitized user inputs into dangerouslySetInnerHTML, and evaluate script bundle sizes to prevent exposure of internal source maps in production deployments."
    },
    faqs: [
      { q: "How do you detect if a website is built with React?", a: "React websites can be identified by specific DOM attributes like 'data-reactroot' or React global properties under the browser's window object." },
      { q: "Is React secure against Cross-Site Scripting (XSS)?", a: "Yes, by default, React escapes values before rendering them. However, using dangerouslySetInnerHTML or old versions of packages can introduce XSS configuration risks." },
      { q: "What is the role of React Developer Tools in profiling?", a: "React Developer Tools hooks into the __REACT_DEVTOOLS_GLOBAL_HOOK__ variable, which our detector uses to verify the framework is active." }
    ]
  },
  nextjs: {
    name: "Next.js",
    category: "React Framework",
    desc: "Security and exposure profiling for Next.js web applications, routing systems, and server-side rendering setups.",
    metaTitle: "Next.js Tech Stack Auditing – Framework Detection & Security | ReconShield",
    metaDesc: "Audit Next.js framework setups. Discover how server-side routing, build manifests, and static exports are fingerprinted and secured.",
    details: {
      description: "Next.js is an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and static website generation.",
      security: "Next.js includes robust default security parameters. However, misconfigured environment variables (e.g. exposing private keys in NEXT_PUBLIC_) or server-side request forgery (SSRF) within getStaticProps/getServerSideProps present severe exposure points.",
      defensive: "Add the poweredByHeader: false configuration inside next.config.js to strip the X-Powered-By header. Ensure private secrets are never prefixed with NEXT_PUBLIC_ to prevent bundling into client-side build files."
    },
    faqs: [
      { q: "How is Next.js detected on a website?", a: "Next.js websites are detected via the '__NEXT_DATA__' script block, specific bundle paths matching '/_next/static/', and the presence of the 'X-Powered-By: Next.js' header." },
      { q: "How can I hide the Next.js powered-by header?", a: "You can disable it by adding 'poweredByHeader: false' to your 'next.config.js' file." },
      { q: "Is Next.js safe from SSRF attacks?", a: "Next.js itself is secure, but custom server-side data-fetching methods that accept unsanitized user inputs can leak access to internal networks (SSRF)." }
    ]
  },
  wordpress: {
    name: "WordPress",
    category: "Content Management System (CMS)",
    desc: "WordPress vulnerability profiling, CMS version checks, plugin vulnerabilities, and core security hardening strategies.",
    metaTitle: "WordPress Tech Stack Checker – CMS Detection & Security Audit | ReconShield",
    metaDesc: "Verify WordPress CMS technology configurations. Map out WordPress directories, inspect common vulnerability markers, and secure configurations.",
    details: {
      description: "WordPress is a free and open-source content management system written in PHP and paired with a MySQL or MariaDB database. It powers over 40% of all websites.",
      security: "Because WordPress is highly popular, it is a primary target. Most compromises occur through vulnerable third-party plugins or templates. Additionally, exposed admin panels (/wp-admin) suffer constant brute-force attempts.",
      defensive: "Remove default generator meta tags, disable XML-RPC if unused, enforce strict passwords on the login panel, and continuously audit installed plugins for known CVEs using our database."
    },
    faqs: [
      { q: "How is WordPress identified by technology detectors?", a: "By inspecting the source code for paths containing '/wp-content/' or '/wp-includes/', and scanning for meta generator tags matching 'WordPress [version]'." },
      { q: "What are the biggest security risks for WordPress?", a: "Outdated plugins and themes account for over 90% of WordPress security breaches. Hardening authentication is critical." },
      { q: "How do I hide my WordPress version?", a: "You can remove it by adding code snippets to your theme's functions.php that strip the 'generator' tag and version strings from style and script links." }
    ]
  },
  shopify: {
    name: "Shopify",
    category: "E-Commerce CMS",
    desc: "E-commerce platform detection, CDN routing parameters, and payment gateway auditing criteria.",
    metaTitle: "Shopify Tech Stack Profiling – E-commerce Detector & Audit | ReconShield",
    metaDesc: "Audit Shopify web stores. Identify standard Shopify scripts, global objects, CDN resources, and verify e-commerce security configurations.",
    details: {
      description: "Shopify is a multinational e-commerce company that provides a proprietary e-commerce platform for online stores and retail point-of-sale systems.",
      security: "Shopify is a fully managed SaaS platform, meaning server-level configuration risks are handled by Shopify. Security audits focus on third-party application permissions and client-side scripts that could lead to Magecart-style credential harvesting.",
      defensive: "Monitor and audit third-party apps installed in the store administration panel. Implement Content Security Policy (CSP) headers to restrict where scripts can transmit transaction and credit card data."
    },
    faqs: [
      { q: "How is a Shopify website detected?", a: "Shopify sites are recognized by global javascript variables (like 'Shopify.shop'), asset links pointing to 'cdn.shopify.com', and theme references in the DOM." },
      { q: "Is Shopify secure against payment data theft?", a: "Shopify maintains strict PCI-DSS compliance. The primary threat vector is malicious third-party apps or scripts injected via Cross-Site Scripting (XSS)." },
      { q: "What should I audit on a Shopify site?", a: "Regularly audit installed admin apps, check for rogue tracking pixels, and enforce strict two-factor authentication (2FA) for all staff accounts." }
    ]
  },
  cloudflare: {
    name: "Cloudflare",
    category: "Content Delivery Network (CDN) / WAF",
    desc: "Content Delivery Network validation, WAF protection headers, and reverse-proxy caching parameters.",
    metaTitle: "Cloudflare Technology Lookup – CDN, WAF & Routing Audits | ReconShield",
    metaDesc: "Analyze Cloudflare integration parameters. Learn how Cloudflare reverse proxy headers, IP routing, and WAF rules are audited.",
    details: {
      description: "Cloudflare is a web infrastructure and website security company, providing content delivery network services, DDoS mitigation, Internet security, and distributed domain name server services.",
      security: "Cloudflare acts as a protective shield. However, if origin server IPs are leaked or bypassable (direct access to hosting provider without going through Cloudflare), threat actors can route around WAF protections entirely.",
      defensive: "Whitelist only Cloudflare IP ranges in your origin server's firewall (e.g. security group rules in AWS/GCP). Implement authenticated origin pulls using SSL certificates to verify traffic passes through Cloudflare."
    },
    faqs: [
      { q: "How do you detect Cloudflare usage on a domain?", a: "Cloudflare is identified by DNS resolver lookup resolving to Cloudflare IPs, and HTTP headers like 'CF-Ray', 'cf-cache-status', and 'Server: cloudflare'." },
      { q: "What is an origin bypass vulnerability?", a: "It is an architecture error where a server protected by Cloudflare allows direct connections to its origin IP, allowing attackers to bypass all WAF protections." },
      { q: "How does Cloudflare protect against DDoS attacks?", a: "By acting as a reverse proxy, Cloudflare absorbs massive traffic spikes across its global edge network, filtering malicious botnets before they hit origin web servers." }
    ]
  },
  nginx: {
    name: "Nginx",
    category: "Web Server",
    desc: "Web server identification, Nginx security header analysis, and server token obfuscation guidelines.",
    metaTitle: "Nginx Web Server Profiling – Technology Lookup & Security | ReconShield",
    metaDesc: "Verify Nginx server configurations. Detect running Nginx version banners, missing security headers, and reverse proxy details.",
    details: {
      description: "Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy, and HTTP cache. It powers a huge portion of high-traffic sites.",
      security: "Exposing Nginx version details (e.g. Nginx/1.18.0) allows attackers to identify specific known CVEs. Misconfigured configurations can also lead to issues like path traversal or folder escape exposures.",
      defensive: "Hide the Nginx version by configuring 'server_tokens off;' inside the nginx.conf configuration file. Audit proxy configurations to ensure backend services are not unintentionally exposed to the public."
    },
    faqs: [
      { q: "How does our technology checker identify Nginx?", a: "By parsing the HTTP 'Server' response header, which typically outputs 'Server: nginx' or details specific version banners if not disabled." },
      { q: "Why is exposing the Nginx version number dangerous?", a: "It allows threat actors to look up specific CVEs (such as integer overflow or memory disclosure bugs) associated with that version." },
      { q: "How do I hide the Nginx version string?", a: "You can turn off version broadcasting by setting 'server_tokens off;' within the HTTP block of your Nginx configuration." }
    ]
  },
  apache: {
    name: "Apache",
    category: "Web Server",
    desc: "Apache technology detection, directory listing exposures, and module hardening strategies.",
    metaTitle: "Apache Web Server Hardening – Tech stack analysis & CVEs | ReconShield",
    metaDesc: "Audit Apache HTTP server deployments. Identify Apache version headers, common directory listing exposures, and secure configurations.",
    details: {
      description: "The Apache HTTP Server is a free and open-source cross-platform web server software, released under the terms of Apache License 2.0.",
      security: "Apache is highly modular. Security risks stem from obsolete modules (e.g. mod_cgi vulnerabilities), directory listing exposure (indexes on paths lacking index.html), and public version banners.",
      defensive: "Hard-configure 'ServerTokens ProductOnly' and 'ServerSignature Off' to hide the server version details. Explicitly disable directory listings by removing 'Indexes' from the 'Options' directive."
    },
    faqs: [
      { q: "How is Apache detected on a website?", a: "Apache is detected by the 'Server: Apache' response header, and sometimes via unique default file icons or directory listing layouts." },
      { q: "How do I disable version listings in Apache?", a: "Add 'ServerTokens ProductOnly' and 'ServerSignature Off' to your main configuration file (e.g., httpd.conf or apache2.conf)." },
      { q: "What is the security risk of Apache directory listing?", a: "If Directory Indexes are enabled, attackers can browse files in directories that do not contain an index file, potentially exposing source code, config files, or backup archives." }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(TECH_DATA).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const data = TECH_DATA[slug];

  if (!data) return { title: 'Technology Not Found' };

  return {
    title: data.metaTitle,
    description: data.metaDesc,
    alternates: {
      canonical: `https://reconshield.in/technology/${slug}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      url: `https://reconshield.in/technology/${slug}`,
      title: data.metaTitle,
      description: data.metaDesc,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle,
      description: data.metaDesc,
      images: ['/og-image.png']
    }
  };
}

export default async function TechnologyProgrammaticPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const data = TECH_DATA[slug];

  if (!data) {
    notFound();
  }

  // Schema generation: WebApplication, SoftwareApplication, Organization, BreadcrumbList, FAQPage, HowTo
  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `https://reconshield.in/technology/${slug}/#webapp`,
        name: `ReconShield Technology Analyzer - ${data.name}`,
        description: data.desc,
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'All',
        url: `https://reconshield.in/technology/${slug}`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        author: {
          '@type': 'Organization',
          '@id': 'https://reconshield.in/#organization'
        }
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `https://reconshield.in/technology/${slug}/#software`,
        name: `Website Technology Checker`,
        description: `Passive technology checker, CMS detector, and framework analysis utility.`,
        applicationCategory: 'SecurityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        publisher: {
          '@type': 'Organization',
          '@id': 'https://reconshield.in/#organization'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://reconshield.in/#organization',
        name: 'ReconShield',
        url: 'https://reconshield.in',
        logo: {
          '@type': 'ImageObject',
          url: 'https://reconshield.in/icon.png'
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://reconshield.in/technology/${slug}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reconshield.in' },
          { '@type': 'ListItem', position: 2, name: 'Website Technology Checker', item: 'https://reconshield.in/tools/tech-detector' },
          { '@type': 'ListItem', position: 3, name: data.name, item: `https://reconshield.in/technology/${slug}` }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': `https://reconshield.in/technology/${slug}/#faq`,
        mainEntity: data.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a
          }
        }))
      },
      {
        '@type': 'HowTo',
        '@id': `https://reconshield.in/technology/${slug}/#howto`,
        name: `How to detect ${data.name} usage on any website`,
        description: `Follow these simple steps to perform a technology scan and verify if a site uses ${data.name}.`,
        step: [
          {
            '@type': 'HowToStep',
            url: `https://reconshield.in/technology/${slug}/#step-1`,
            name: 'Access Website Technology Checker',
            text: 'Navigate to the ReconShield Website Technology Checker tool page.'
          },
          {
            '@type': 'HowToStep',
            url: `https://reconshield.in/technology/${slug}/#step-2`,
            name: 'Enter Target Domain',
            text: 'Input the URL or domain name you want to profile and launch the query.'
          },
          {
            '@type': 'HowToStep',
            url: `https://reconshield.in/technology/${slug}/#step-3`,
            name: 'Analyze Findings',
            text: `Examine the generated stack report to verify the detected version and configurations of ${data.name}.`
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <div className="min-h-screen pb-20">
        <div className="max-w-5xl mx-auto px-4 pt-8">
          
          <Breadcrumbs crumbs={[
            { label: 'Technology Detection Hub', href: '/technology' },
            { label: data.name, href: `/technology/${slug}` }
          ]} />

          <div className="border-b border-white/10 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-[10px] font-mono text-teal-400 mb-4 uppercase tracking-widest">
              <Cpu className="w-3 h-3" />
              <span>Technology Auditing & Analysis</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="text-teal-400">{data.name}</span> Profile
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Find out how the presence of {data.name} is fingerprinted, associated security risks, and recommended configurations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              
              <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal-400" />
                  Software Profile
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-500 font-mono mb-1 uppercase">Name</div>
                    <div className="text-white font-bold">{data.name}</div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="text-xs text-gray-500 font-mono mb-1 uppercase">Class</div>
                    <div className="text-white font-bold text-teal-400">{data.category}</div>
                  </div>
                </div>

                <Link href={`/tools/tech-detector`} className="inline-flex items-center justify-center gap-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 border border-teal-500/30 px-6 py-3 rounded-xl font-bold transition-all">
                  <Activity className="w-4 h-4" />
                  Detect {data.name} on a Website
                </Link>
              </div>

              <div className="prose prose-invert max-w-none space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-3 border-b border-white/5 pb-2">
                    What is {data.name}?
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    {data.details.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Security and Vulnerability Footprint</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {data.details.security}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Defensive Best Practices</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {data.details.defensive}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/5 pb-2">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {data.faqs.map((faq, i) => (
                    <div key={i} className="p-5 rounded-xl bg-[#0d1117] border border-white/[0.06]">
                      <h3 className="text-white font-semibold mb-2 text-sm">{faq.q}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Resources Hub & Sibling Links */}
              <div className="pt-10 border-t border-white/5">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">
                  Related Technology Profiles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.keys(TECH_DATA)
                    .filter(s => s !== slug)
                    .slice(0, 4)
                    .map(s => (
                      <Link 
                        key={s} 
                        href={`/technology/${s}`} 
                        className="bg-[#0d1117] border border-white/5 hover:border-teal-500/30 p-5 rounded-xl transition-all group flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] text-teal-400 font-mono uppercase tracking-wider">{TECH_DATA[s].category}</span>
                          <h3 className="text-sm font-bold text-white group-hover:text-[#00ff88] transition-colors mt-1 mb-2">
                            {TECH_DATA[s].name}
                          </h3>
                          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{TECH_DATA[s].desc}</p>
                        </div>
                        <div className="text-xs text-[#00ff88] font-mono mt-4 flex items-center gap-1 opacity-80">
                          View Profile <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <Link href="/technology" className="text-xs text-teal-400 hover:text-teal-300 font-mono flex items-center gap-1">
                    Explore all technology profiles <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1117] to-transparent border border-white/5 sticky top-24 space-y-6">
                <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest">
                  Core Security Tools
                </h3>
                
                <div className="space-y-3">
                  <Link href={`/tools/whois`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">WHOIS Checker</div>
                      <div className="text-xs text-gray-500">Domain registrar data</div>
                    </div>
                  </Link>

                  <Link href={`/tools/dns-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">DNS Lookup</div>
                      <div className="text-xs text-gray-500">Check SPF & DMARC</div>
                    </div>
                  </Link>

                  <Link href={`/tools/ip-lookup`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">IP Reputation</div>
                      <div className="text-xs text-gray-500">Analyze host IPs</div>
                    </div>
                  </Link>

                  <Link href={`/tools/ssl-checker`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/20">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">SSL Checker</div>
                      <div className="text-xs text-gray-500">Audit TLS grades</div>
                    </div>
                  </Link>

                  <Link href={`/tools/port-scanner`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500/20">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Port Scanner</div>
                      <div className="text-xs text-gray-500">Map open ports</div>
                    </div>
                  </Link>
                </div>

                <div className="pt-4 border-t border-white/5 text-xs text-gray-500 leading-relaxed font-mono">
                  All scans are passive and comply with our non-intrusive auditing policy.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
