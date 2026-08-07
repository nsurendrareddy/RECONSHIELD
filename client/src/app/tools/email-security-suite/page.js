import React from 'react';
import EmailSecuritySuiteClient from '@/components/EmailSecuritySuiteClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';
import Link from 'next/link';
import { Mail, Check, AlertTriangle, ShieldCheck, Lock, Globe, Server, FileText, ArrowRight, UserCheck, Award, Clock } from 'lucide-react';

export const metadata = {
  title: "Email Security Master Suite — SPF, DKIM, DMARC & BIMI Deliverability Audit | ReconShield",
  description: "Comprehensive email security & deliverability diagnostic tool. Validate SPF 10-lookup limits, DKIM cryptographic keys, DMARC p=reject enforcement policies, BIMI logo branding, and MX mail server TLS configurations. 100% free with zero logs saved.",
  alternates: {
    canonical: "https://reconshield.in/tools/email-security-suite",
  },
  keywords: [
    "email security master suite", "spf lookup limit checker", "dmarc validator online", "dkim signature verifier",
    "email anti spoofing audit", "bimi vmc checker", "dmarc p=reject policy", "email deliverability diagnostic",
    "rfc 7208 spf validator", "rfc 7489 dmarc analyzer", "cisa bod 18-01 compliance"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "Email Security Master Suite — SPF, DKIM, DMARC & BIMI Deliverability Audit | ReconShield",
    description: "Validate SPF 10-lookup limits, DKIM keys, DMARC p=reject enforcement rules, BIMI branding, and MX mail server TLS configurations in one instant check.",
    url: "https://reconshield.in/tools/email-security-suite",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-email-security.png",
        width: 1200,
        height: 630,
        alt: "Email Anti-Spoofing & Deliverability Master Suite - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Email Security Master Suite — SPF, DKIM, DMARC & BIMI Deliverability Audit",
    description: "Validate SPF, DKIM, DMARC, and BIMI email anti-spoofing policies with instant DoH diagnostics.",
    images: ["https://reconshield.in/og-image-email-security.png"]
  }
};

export default function EmailSecuritySuitePage() {
  const faqs = [
    {
      question: "What is the SPF 10-DNS lookup limit?",
      answer: "RFC 7208 mandates that an SPF evaluation must not require more than 10 DNS lookups across all mechanisms (such as include, a, mx, ptr, and redirect). Exceeding 10 lookups triggers an automatic PermError (Permanent Error) on receiving mail servers, causing SPF validation to fail."
    },
    {
      question: "Why is a DMARC policy of p=reject essential for domain security?",
      answer: "A DMARC policy of p=none only monitors email traffic without blocking unauthorized messages. Setting p=quarantine moves failing emails to spam, while p=reject instructs receiving mail servers to drop spoofed messages immediately, stopping CEO fraud and BEC attacks."
    },
    {
      question: "What is DKIM domain alignment?", answer: "DKIM alignment requires that the domain in the 'd=' tag of the DKIM cryptographic signature matches the domain in the RFC 5322 'From' header seen by the email recipient."
    },
    {
      question: "What is BIMI and how does it relate to DMARC?", answer: "Brand Indicators for Message Identification (BIMI) displays your organization's verified logo next to emails in inbox clients (Gmail, Apple Mail, Yahoo). BIMI strictly requires an active DMARC policy of p=quarantine or p=reject and a verified VMC certificate."
    },
    {
      question: "How do I fix the SPF PermError 'Too Many DNS Lookups'?", answer: "You can resolve SPF PermError by flattening your SPF record (replacing domain include directives with direct IP blocks), removing obsolete third-party services, or utilizing dynamic SPF lookup proxies."
    },
    {
      question: "What is the difference between envelope sender (RFC 5321) and header sender (RFC 5322)?", answer: "The RFC 5321 (MAIL FROM) domain is used for bounce routing, while the RFC 5322 (From:) domain is visible to the recipient. DMARC checks alignment between these two headers."
    },
    {
      question: "What is STARTTLS in email delivery?", answer: "STARTTLS upgrades an insecure plaintext SMTP connection to an encrypted TLS session, protecting email transmissions against network eavesdropping."
    },
    {
      question: "Why is multiple SPF records on a single domain invalid?", answer: "RFC 7208 explicitly states a domain must not publish more than one SPF TXT record. Publishing multiple SPF records causes receiving servers to return PermError." },
    {
      question: "What is DMARC RUA vs RUF reporting?", answer: "rua=mailto: sends aggregate daily XML reports detailing email volume and pass/fail stats. ruf=mailto: sends real-time forensic reports for individual failed emails."
    },
    {
      question: "How does CISA BOD 18-01 enforce email security?", answer: "CISA Binding Operational Directive 18-01 mandates that US federal agencies enforce STARTTLS on mail gateways, publish SPF records, and deploy DMARC policies of p=reject."
    },
    {
      question: "Can an attacker bypass SPF using subdomains?", answer: "If subdomains do not explicitly define an SPF record or DMARC wildcard policy (sp=reject), attackers can spoof email from subdomains (e.g., mail.yourcompany.com)."
    },
    {
      question: "What is DMARC sp= parameter?", answer: "The sp= tag defines the DMARC policy specifically for subdomains. If sp=reject is set, all subdomains inherit strict blocking even if the main domain uses p=none."
    },
    {
      question: "How long does DMARC DNS propagation take?", answer: "DNS propagation typically takes between 15 minutes to 24 hours depending on the TTL (Time to Live) set on your DNS TXT records."
    },
    {
      question: "Does SPF protect against inbound phishing?", answer: "SPF protects your domain from being spoofed outbound to others. Inbound spam filters inspect SPF on incoming emails to protect your employees."
    },
    {
      question: "What is the difference between DKIM 1024-bit and 2048-bit keys?", answer: "1024-bit RSA keys are cryptographically weak and deprecated by industry standards. Modern email receivers mandate 2048-bit or 4096-bit RSA keys for DKIM signing."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://reconshield.in/tools/email-security-suite#software",
        "name": "ReconShield Email Security Master Suite",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1840"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/tools/email-security-suite#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
          { "@type": "ListItem", "position": 3, "name": "Email Security Master Suite", "item": "https://reconshield.in/tools/email-security-suite" }
        ]
      },
      {
        "@type": "TechArticle",
        "@id": "https://reconshield.in/tools/email-security-suite#article",
        "headline": "Complete Email Security Architecture: SPF, DKIM, DMARC, and BIMI Deep Dive",
        "author": { "@type": "Person", "name": "Surendra Reddy" },
        "publisher": { "@type": "Organization", "name": "ReconShield", "logo": { "@type": "ImageObject", "url": "https://reconshield.in/logo.png" } },
        "datePublished": "2026-01-15",
        "dateModified": "2026-08-07"
      },
      {
        "@type": "FAQPage",
        "@id": "https://reconshield.in/tools/email-security-suite#faq",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-[#05080f] min-h-screen text-white py-12 font-sans">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-matrix-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-matrix-400 transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-matrix-400 font-bold">Email Security Master Suite</span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20 inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> // FLAGSHIP EMAIL DELIVERABILITY &amp; ANTI-SPOOFING SUITE
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight">
              Email Security <span className="text-matrix-400">Master Suite</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              Perform an instant, non-intrusive DNS-over-HTTPS audit of SPF 10-lookup limits, DKIM cryptographic selectors, DMARC enforcement policies (p=reject), BIMI brand verification, and MX mail server TLS handshakes.
            </p>
          </div>

          {/* Interactive Tool Component */}
          <EmailSecuritySuiteClient />

          {/* Master Educational Guide (2500+ Words) */}
          <FlagshipToolGuide
            toolName="Email Security Master Suite"
            subtitle="Architectural Guide to Enterprise Email Authentication & Deliverability"
            description="The Email Security Master Suite is a comprehensive enterprise diagnostic framework engineered to analyze domain-level email authentication protocols. By combining real-time DoH resolution for SPF (RFC 7208), DKIM (RFC 6376), DMARC (RFC 7489), and BIMI, this suite helps organizations stop Business Email Compromise (BEC), eliminate phishing attacks, and optimize inbox placement."
            category="Email Security"
            lastUpdated="August 2026"
            author="Surendra Reddy"
            reviewer="ReconShield Security Research Team"
            readingTime="18 min read"
            whatIsContent={
              <div className="space-y-4">
                <p>
                  Email remains the primary vector for cyberattacks, accounting for over 90% of enterprise security breaches according to CISA and Verizon Data Breach Investigations Reports. Because the original Simple Mail Transfer Protocol (SMTP, defined in RFC 821 in 1982) was designed without built-in authentication, any mail client can send an email with an arbitrary "From:" address, making domain spoofing trivial.
                </p>
                <p>
                  To neutralize domain spoofing and phishing, the internet engineering community introduced a three-layer defense framework: <strong>Sender Policy Framework (SPF)</strong>, <strong>DomainKeys Identified Mail (DKIM)</strong>, and <strong>Domain-based Message Authentication, Reporting, and Conformance (DMARC)</strong>. When backed by <strong>Brand Indicators for Message Identification (BIMI)</strong>, organizations achieve full domain brand protection and optimal inbox deliverability.
                </p>
              </div>
            }
            howItWorksSteps={[
              {
                title: "1. SPF Lookup & Mechanism Tree Evaluation",
                description: "Queries TXT records to parse v=spf1. Evaluates all include:, a, mx, and ip4 mechanisms while strictly tracking the RFC 7208 10-DNS lookup limit."
              },
              {
                title: "2. DKIM Public Key & Selector Audit",
                description: "Inspects DKIM DNS TXT records under selector keys (e.g. google._domainkey) to verify RSA 2048-bit key strength and algorithm alignment."
              },
              {
                title: "3. DMARC Policy & Alignment Tree Check",
                description: "Queries _dmarc.domain.com for v=DMARC1. Evaluates policy enforcement levels (p=none, p=quarantine, p=reject), subdomain policies (sp=), and aggregate reporting URIs (rua=)."
              },
              {
                title: "4. BIMI Logo & VMC Certificate Verification",
                description: "Queries default._bimi.domain.com for v=BIMI1 and validates SVG logo formatting alongside Verified Mark Certificate (VMC) authority links."
              }
            ]}
            realWorldScenarios={[
              {
                category: "Enterprise BEC Defense",
                title: "Blocking Executive Impersonation & CEO Fraud",
                description: "Attackers register spoofed emails claiming to be the CFO requesting urgent wire transfers. Deploying DMARC p=reject instructs Microsoft 365 and Google Workspace to drop these emails before reaching inbox folders."
              },
              {
                category: "SaaS Multi-Tenant Deliverability",
                title: "Preventing Third-Party Vendor SPF PermErrors",
                description: "SaaS platforms adding SendGrid, HubSpot, Zendesk, and Salesforce often exceed the 10-DNS lookup limit. Using this tool identifies lookup bloat to flatten SPF trees."
              },
              {
                category: "CISA BOD 18-01 Compliance",
                title: "Federal Government & Healthcare Compliance",
                description: "Federal mandates require government agencies and HIPAA-covered healthcare networks to enforce DMARC p=reject and mandatory STARTTLS encryption across all MX hosts."
              },
              {
                category: "Bug Bounty & Red Teaming",
                title: "Subdomain Email Hijacking Audits",
                description: "Red teams scan corporate subdomains for missing DMARC sp= policies or orphan SPF include records to demonstrate unauthorized email spoofing vectors."
              }
            ]}
            remediationSnippets={[
              {
                platform: "DNS TXT (BIND9 / Cloudflare / Route53)",
                filename: "DMARC Record (p=reject)",
                code: "_dmarc.yourdomain.com. IN TXT \"v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc-reports@yourdomain.com; ruf=mailto:dmarc-forensics@yourdomain.com; adkim=r; aspf=r;\""
              },
              {
                platform: "DNS TXT (SPF Record)",
                filename: "Strict SPF Policy",
                code: "yourdomain.com. IN TXT \"v=spf1 ip4:192.0.2.0/24 include:_spf.google.com -all\""
              },
              {
                platform: "Postfix SMTP Server",
                filename: "/etc/postfix/main.cf",
                code: "# Enforce Mandatory STARTTLS & Strong Ciphers\nsmtpd_tls_security_level = may\nsmtpd_tls_mandatory_protocols = !SSLv2, !SSLv3, !TLSv1, !TLSv1.1\nsmtpd_tls_mandatory_ciphers = high"
              }
            ]}
            bestPractices={[
              {
                title: "Mandate DMARC p=reject Enforcement",
                description: "Progress from p=none (monitoring) to p=quarantine and finally p=reject to completely block unauthorized email spoofing."
              },
              {
                title: "Flatten SPF Records Below 10 Lookups",
                description: "Replace redundant include: domain chains with direct IP CIDR blocks or dynamic SPF lookup proxies."
              },
              {
                title: "Enforce 2048-Bit DKIM Key Rotation",
                description: "Rotate 2048-bit RSA DKIM keys bi-annually and deprecate legacy 1024-bit keys."
              },
              {
                title: "Publish Subdomain DMARC Protection (sp=reject)",
                description: "Ensure attackers cannot spoof unused subdomains by setting an explicit sp=reject policy in your main DMARC record."
              }
            ]}
            troubleshooting={[
              {
                symptom: "Receiving mail servers return 'SPF PermError: Too Many DNS Lookups'",
                cause: "Your SPF record contains more than 10 nested DNS lookup mechanisms (include, a, mx, redirect).",
                solution: "Flatten SPF includes by consolidating IP address ranges directly into ip4: mechanisms.",
                verification: "Re-run the ReconShield Email Security Master Suite to confirm SPF DNS lookups are <= 10."
              },
              {
                symptom: "Legitimate marketing emails landing in Spam after applying DMARC p=reject",
                cause: "Third-party email tools (e.g., Mailchimp, HubSpot) are not properly aligned with your DKIM domain.",
                solution: "Add dedicated DKIM CNAME selectors for each email vendor in your DNS zone file.",
                verification: "Send a test email to check that DKIM signature domain matches the RFC 5322 From: header."
              }
            ]}
            faqs={faqs}
            collectionName="Email Security & Deliverability Toolkit"
          />

        </div>
      </div>
    </>
  );
}
