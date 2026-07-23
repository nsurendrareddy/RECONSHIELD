import React from 'react';
import Link from 'next/link';
import { Network, Lock, ShieldCheck, FileText, ArrowRight, Shield, Award, HelpCircle, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { COMPARISONS_DATA } from '@/utils/comparisonsData';

export const revalidate = false;

export const metadata = {
  title: 'Cybersecurity Comparisons | WHOIS vs RDAP, SPF vs DKIM, SSL vs TLS | ReconShield',
  description: 'In-depth, peer-reviewed technical comparisons between legacy and modern networking protocols, mail security standards, SSL/TLS specifications, and security scanners.',
  alternates: {
    canonical: 'https://reconshield.in/compare',
  },
  openGraph: {
    title: 'Cybersecurity Comparisons | WHOIS vs RDAP, SPF vs DKIM, SSL vs TLS | ReconShield',
    description: 'In-depth, peer-reviewed technical comparisons between legacy and modern networking protocols, mail security standards, SSL/TLS specifications, and security scanners.',
    url: 'https://reconshield.in/compare',
    siteName: 'ReconShield',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity Comparisons | WHOIS vs RDAP, SPF vs DKIM, SSL vs TLS | ReconShield',
    description: 'In-depth, peer-reviewed technical comparisons between legacy and modern networking protocols, mail security standards, SSL/TLS specifications, and security scanners.',
  }
};

export default function CompareIndexPage() {
  const comparisons = Object.values(COMPARISONS_DATA);

  // Structured Data Schema definitions
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://reconshield.in/compare/#webpage",
        "url": "https://reconshield.in/compare",
        "name": "Cybersecurity Comparisons | WHOIS vs RDAP, SPF vs DKIM, SSL vs TLS | ReconShield",
        "description": "In-depth, peer-reviewed technical comparisons between legacy and modern networking protocols, mail security standards, SSL/TLS specifications, and security scanners.",
        "breadcrumb": {
          "@id": "https://reconshield.in/compare/#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/compare/#breadcrumb",
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
            "name": "Compare",
            "item": "https://reconshield.in/compare"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://reconshield.in/compare/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between WHOIS and RDAP?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "WHOIS is a legacy, text-based query protocol operating on port 43 with no standard schema, which makes it fragile to parse and insecure. RDAP (Registration Data Access Protocol) is the modern successor standardized under RFC 7480. It runs over HTTPS (port 443), returns structured JSON payloads, supports internationalization, and allows granular role-based access control."
            }
          },
          {
            "@type": "Question",
            "name": "Do SPF and DKIM require DMARC?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, to prevent spoofing effectively. SPF whitelists sender IP addresses, and DKIM signs email contents cryptographically. However, neither protocol tells the recipient server what to do if validation fails. DMARC acts as the policy enforcer, requiring alignment with the visible From header and establishing policies (none, quarantine, reject) to block unauthorized mail."
            }
          },
          {
            "@type": "Question",
            "name": "What is the main difference between SSL and TLS?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SSL (Secure Sockets Layer) is the older, deprecated suite of cryptographic protocols (SSL 1.0, 2.0, 3.0), which are highly vulnerable to attacks like POODLE. TLS (Transport Layer Security) is the modern standardized successor. The latest version, TLS 1.3 (RFC 8446), removes weak cipher suites, mandates Perfect Forward Secrecy, and accelerates connection speeds using a 1-RTT handshake."
            }
          },
          {
            "@type": "Question",
            "name": "Why is a Security Header assessment different from an SSL certificate check?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An SSL certificate check verifies transport-layer encryption (preventing eavesdropping). HTTP Security Headers (like HSTS, Content Security Policy, and X-Frame-Options) establish application-layer protections inside the user's browser, preventing vulnerabilities like Cross-Site Scripting (XSS), Clickjacking, and protocol downgrade attacks."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen pb-24 bg-[#05080f] text-white">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Comparisons', href: '/compare' }
        ]} />

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-mono text-cyan-400 mb-4 uppercase tracking-widest">
            <Network className="w-3 h-3" />
            <span>Technical Protocol Mapping Directory</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4 text-white">
            Cybersecurity Protocol Comparisons & Standards Mapping
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl leading-relaxed">
            A comprehensive, peer-reviewed directory analyzing differences, RFC compliance, and threat models of networking and transport security standards. Underwritten by the ReconShield security research team.
          </p>
          <div className="text-[10px] font-mono text-gray-500 mt-4 flex items-center gap-2">
            <span>Last Updated: June 6, 2026</span>
            <span>•</span>
            <span>Reviewed by: Surendra Reddy (Editorial Lead)</span>
          </div>
        </div>

        {/* Deep Dive Introduction */}
        <section className="prose prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-bold font-display text-white mb-4">
            The Evolution of Secure Internet Protocols
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
            The modern internet was constructed on foundational protocols developed in an era when security was not a design constraint. Early frameworks like telnet, unencrypted HTTP, and raw WHOIS transmitted data in plaintext, exposing users and organizations to eavesdropping, packet injection, and identity theft. Over the past three decades, the Internet Engineering Task Force (IETF) and security researchers have systematically deprecated legacy protocols, replacing them with cryptographically verified architectures.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
            Implementing a robust defense-in-depth posture requires security operations (SecOps) teams and network engineers to thoroughly understand these transitions. Whether evaluating domain ownership registries, hardening email delivery vectors, or enforcing browser security parameters, choosing the correct cryptographic standards directly affects an enterprise's external attack surface. Below, we compare the primary protocols governing domain, transport, and mail routing security.
          </p>
        </section>

        {/* Technical Comparisons In-Depth */}
        <div className="space-y-12 mb-16">
          {/* Comparison 1: WHOIS vs RDAP */}
          <div className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold font-display text-cyan-400 mb-3">
              1. WHOIS vs. RDAP: Domain Registration Protocols
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              WHOIS (standardized in RFC 3912) is a TCP transaction-oriented query protocol operating over port 43. When a client performs a lookup, it establishes a connection, sends a search string, and reads the text payload returned by the server. Because WHOIS does not define a standard output schema, registrars present registration data in highly custom formats. This requires security tools to maintain complex, brittle regular expressions to parse dates, nameservers, and administrative contacts.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              RDAP (Registration Data Access Protocol, RFC 7480) is the modern RESTful replacement for WHOIS. Running over standard HTTPS (port 443), RDAP returns structured, machine-readable JSON payloads. It resolves several security and administrative deficiencies of WHOIS:
            </p>
            <ul className="list-disc pl-6 text-gray-400 text-sm space-y-2 mb-4">
              <li><strong>Granular Authentication:</strong> Supports OAuth 2.0, allowing registrars to redact personal data for anonymous users while granting full access to verified law enforcement and security analysts.</li>
              <li><strong>Standardized Redirects:</strong> Leverages standard HTTP 301/302 redirect responses to cleanly route queries to authoritative registry servers.</li>
              <li><strong>Internationalization:</strong> Built natively to support Internationalized Domain Names (IDNs) and localized character sets.</li>
            </ul>
            <div className="bg-[#05080f] p-4 rounded-xl border border-white/5 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 justify-between">
              <span>Related Tool: Audit domain registrations in real-time.</span>
              <Link href="/tools/whois" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                Run WHOIS / RDAP Audit <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Comparison 2: SPF vs DKIM */}
          <div className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold font-display text-cyan-400 mb-3">
              2. SPF vs. DKIM: Email Security and Domain Spoofing Prevention
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              Sender Policy Framework (SPF, RFC 7208) and DomainKeys Identified Mail (DKIM, RFC 6376) are complementary mechanisms designed to validate email authenticity. An SPF record is published as a DNS TXT record at the root domain, outlining a whitelist of authorized sending IP addresses and mail relays. While easy to implement, SPF contains a critical vulnerability: it only verifies the "Return-Path" (envelope sender) domain and ignores the visible "From" header shown to users, making display name spoofing possible. Furthermore, SPF fails when emails are forwarded, as the forwarding server's IP is rarely whitelisted.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              DKIM resolves forwarding vulnerabilities by attaching a cryptographic signature to the message headers. The sender signs the email headers using a private key, and the receiving mail transfer agent (MTA) queries the public key published in the sender's DNS records at a selector subdomain (e.g., <code>selector._domainkey.domain.com</code>). Because the signature hashes the email body and headers, DKIM guarantees that the email was not tampered with in transit.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              Neither SPF nor DKIM defines how to handle failed emails on their own. This is where DMARC (Domain-based Message Authentication, Reporting, and Conformance) becomes necessary. DMARC requires SPF or DKIM to align with the visible From header and lets domain owners dictate whether failed messages should be logged (<code>p=none</code>), sent to spam (<code>p=quarantine</code>), or blocked completely (<code>p=reject</code>).
            </p>
            <div className="bg-[#05080f] p-4 rounded-xl border border-white/5 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 justify-between">
              <span>Related Tool: Check your SPF, DKIM, and DMARC alignments.</span>
              <Link href="/tools/email-security" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                Run Email Security Check <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Comparison 3: SSL vs TLS */}
          <div className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold font-display text-cyan-400 mb-3">
              3. SSL vs. TLS: The Transport Encryption Standard
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              Secure Sockets Layer (SSL) was developed by Netscape in 1995 to secure web communications. Due to fundamental cryptographic flaws (including weak cipher structures and vulnerability to padding oracle attacks like POODLE), SSL 1.0, 2.0, and 3.0 have all been deprecated. The Internet Engineering Task Force (IETF) superseded SSL with Transport Layer Security (TLS) in 1999.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              The current secure standard, TLS 1.3 (RFC 8446, released in 2018), represents a massive architectural improvement over TLS 1.2:
            </p>
            <ul className="list-disc pl-6 text-gray-400 text-sm space-y-2 mb-4">
              <li><strong>1-RTT Handshake:</strong> Commits cryptographic keys in a single round-trip, cutting handshake latency in half compared to TLS 1.2.</li>
              <li><strong>Zero Round-Trip Time (0-RTT):</strong> Session resumption allows browsers to send encrypted data on the first flight.</li>
              <li><strong>Perfect Forward Secrecy:</strong> Eliminates static RSA key exchange. If a server's private key is stolen, past intercepted sessions cannot be decrypted.</li>
              <li><strong>Eliminated Weak Algorithms:</strong> Drops support for RC4, SHA-1, MD5, and CBC-mode ciphers, leaving only secure AEAD ciphers.</li>
            </ul>
            <div className="bg-[#05080f] p-4 rounded-xl border border-white/5 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 justify-between">
              <span>Related Tool: Verify your server TLS handshake support and certificates.</span>
              <Link href="/tools/ssl-checker" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                Verify SSL/TLS Certificate <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Comparison 4: DNS vs WHOIS */}
          <div className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold font-display text-cyan-400 mb-3">
              4. DNS vs. WHOIS: Naming Services vs. Directory Metadata
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              Although both interact with domain names, DNS and WHOIS serve completely distinct technical purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-400 text-sm space-y-2 mb-4">
              <li><strong>DNS (Domain Name System):</strong> An active, hierarchical naming system operating on port 53 (UDP/TCP). Its primary role is routing: it maps human-readable hostnames to IP addresses, mail servers, and verification text records. DNS queries resolve in milliseconds via recursively cached layers of ISP and local resolvers using TTL policies. Security is established via DNSSEC, which signs records cryptographically to prevent cache poisoning.</li>
              <li><strong>WHOIS:</strong> An administrative directory lookup service operating on port 43 (TCP). It collects metadata about domain registrants, registrars, administrative contacts, creation and expiration dates. WHOIS is a passive database and is not involved in routing traffic. It is subject to strict rate limits and registrar policies to prevent scraping.</li>
            </ul>
            <div className="bg-[#05080f] p-4 rounded-xl border border-white/5 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 justify-between">
              <span>Related Tool: Query authoritative name servers and DNS records.</span>
              <Link href="/tools/dns-lookup" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                Perform DNS Security Scan <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Comparison 5: Security Headers vs SSL */}
          <div className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold font-display text-cyan-400 mb-3">
              5. HTTP Security Headers vs. SSL/TLS: Transport vs. Application Protection
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              A common misconception in web security is that deploying an SSL/TLS certificate is sufficient to protect a web application. SSL/TLS operates at the transport layer, encrypting data between the browser and server to prevent Man-in-the-Middle (MitM) eavesdropping. It does not control what the browser does with the decrypted application payload.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              HTTP Security Headers operate at the application layer, directing the browser to enforce security policies. Key headers include:
            </p>
            <ul className="list-disc pl-6 text-gray-400 text-sm space-y-2 mb-4">
              <li><strong>HSTS (HTTP Strict Transport Security):</strong> Enforces that browsers only connect using HTTPS, blocking downgrade attacks like SSLStrip.</li>
              <li><strong>CSP (Content Security Policy):</strong> Restricts where scripts, stylesheets, and assets can be loaded from, blocking Cross-Site Scripting (XSS) and data injection.</li>
              <li><strong>X-Frame-Options:</strong> Restricts whether the site can be rendered inside an iframe, preventing clickjacking.</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              While SSL secures the pipe, Security Headers secure the runtime environment inside the browser. Both must be implemented in tandem to achieve modern compliance standards (such as OWASP and PCI-DSS).
            </p>
            <div className="bg-[#05080f] p-4 rounded-xl border border-white/5 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 justify-between">
              <span>Related Tool: Audit HSTS, CSP, and X-Frame-Options header configurations.</span>
              <Link href="/tools/http-headers" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                Analyze HTTP Security Headers <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Comparison Summary Table */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold font-display text-white mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span>Protocol Parameters Quick Reference Table</span>
          </h2>
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#0d1117]">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#161b22] text-gray-300 font-mono">
                  <th className="p-4">Protocol Pair / Topic</th>
                  <th className="p-4">Transport Protocol</th>
                  <th className="p-4">Payload Format</th>
                  <th className="p-4">Primary Threat Mitigated</th>
                  <th className="p-4">Key RFC Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-400">
                <tr>
                  <td className="p-4 font-mono font-bold text-white">WHOIS vs RDAP</td>
                  <td className="p-4">TCP 43 vs HTTPS 443</td>
                  <td className="p-4">ASCII Text vs structured JSON</td>
                  <td className="p-4">Identity forgery & GDPR data leaks</td>
                  <td className="p-4">RFC 3912 vs RFC 7480</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-bold text-white">SPF vs DKIM</td>
                  <td className="p-4">DNS TXT Queries</td>
                  <td className="p-4">IP Subnets vs Cryptographic Keys</td>
                  <td className="p-4">Email spoofing & BEC attacks</td>
                  <td className="p-4">RFC 7208 vs RFC 6376</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-bold text-white">SSL vs TLS</td>
                  <td className="p-4">TCP Socket Layer</td>
                  <td className="p-4">Encrypted bytes (negotiated suites)</td>
                  <td className="p-4">Man-in-the-Middle (MitM) snooping</td>
                  <td className="p-4">SSL v3 vs RFC 8446 (TLS 1.3)</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-bold text-white">DNS vs WHOIS</td>
                  <td className="p-4">UDP/TCP 53 vs TCP 43</td>
                  <td className="p-4">Binary resource records vs Text data</td>
                  <td className="p-4">IP routing redirects vs Domain theft</td>
                  <td className="p-4">RFC 1035 vs RFC 3912</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-bold text-white">Security Headers vs SSL</td>
                  <td className="p-4">HTTP Headers vs TCP Sockets</td>
                  <td className="p-4">Response strings vs TLS handshakes</td>
                  <td className="p-4">XSS, Clickjacking vs Data interception</td>
                  <td className="p-4">RFC 6797 (HSTS) vs TLS specs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Comparisons Grid */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl md:text-2xl font-bold font-display text-white">
              Detailed Technical Comparison Articles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisons.map((item, i) => (
              <Link 
                key={i} 
                href={`/compare/${item.slug}`}
                className="group p-6 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[9px] font-mono text-cyan-400 uppercase tracking-wider">
                      {item.slug.replace('-vs-', ' vs ')}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">TECHNICAL ARTICLE</span>
                  </div>
                  
                  <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-400 transition-colors mb-3 leading-snug">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-gray-400 leading-relaxed font-sans mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-cyan-400 group-hover:underline">
                  <span>View Full Comparison</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-white/10 pt-12">
          <h2 className="text-xl md:text-2xl font-bold font-display text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>Protocol Comparisons FAQ</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-300">
            <div>
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                Why was WHOIS replaced by RDAP?
              </h4>
              <p className="text-gray-400 leading-relaxed text-xs pl-6">
                WHOIS lacked a standardized format (requiring fragile regex parsing), did not support localized character sets (non-ASCII), and provided no way to control data access under privacy frameworks like GDPR. RDAP resolves these points by returning JSON over HTTPS with OAuth 2.0 validation capabilities.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                Do I need both SPF and DKIM?
              </h4>
              <p className="text-gray-400 leading-relaxed text-xs pl-6">
                Yes. SPF verifies that an email came from an authorized server IP, while DKIM verifies that the email content was not altered in transit. Together with DMARC, they provide robust email domain protection.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                Is TLS 1.2 still safe to run?
              </h4>
              <p className="text-gray-400 leading-relaxed text-xs pl-6">
                Yes, but only if configured with secure cipher suites that support Forward Secrecy. Legacy configurations of TLS 1.2 that allow CBC-mode or static RSA key exchanges are vulnerable. Upgrading to TLS 1.3 is highly recommended for speed and security.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                What occurs if HSTS is misconfigured?
              </h4>
              <p className="text-gray-400 leading-relaxed text-xs pl-6">
                HTTP Strict Transport Security (HSTS) forces browsers to use HTTPS. If you configure it and your SSL certificate expires or breaks, visitors will be blocked from accessing your site entirely with no option to bypass the warning, which protects against interception.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
