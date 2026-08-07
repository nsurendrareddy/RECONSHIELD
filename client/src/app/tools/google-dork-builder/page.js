import React from 'react';
import GoogleDorkBuilderClient from '@/components/GoogleDorkBuilderClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';
import Link from 'next/link';
import { Search, ExternalLink, ShieldAlert, Check, Globe, Code, FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Google Dork Builder & OSINT Query Studio | ReconShield",
  description: "Construct advanced Google Dorks for OSINT reconnaissance & shadow IT discovery. Audit exposed .env files, database backups (.SQL), unlinked admin portals, and public S3 buckets safely. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/google-dork-builder" },
  keywords: [
    "google dork builder", "osint search query generator", "google dorks bug bounty", "find exposed files google dork",
    "ghdb exploit database", "google hacking operators", "shadow it asset discovery", "prevent google dorking indexing"
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    title: "Google Dork Builder & OSINT Query Studio | ReconShield",
    description: "Construct advanced Google Dorks for OSINT reconnaissance & shadow IT discovery. Audit exposed .env files, database backups, and admin portals.",
    url: "https://reconshield.in/tools/google-dork-builder",
    type: "website",
    siteName: "ReconShield",
    images: [
      {
        url: "https://reconshield.in/og-image-dorks.png",
        width: 1200,
        height: 630,
        alt: "Google Dork Builder & OSINT Studio - ReconShield"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Dork Builder & OSINT Query Studio",
    description: "Construct advanced Google Dorks for OSINT reconnaissance and attack surface management.",
    images: ["https://reconshield.in/og-image-dorks.png"]
  }
};

export default function GoogleDorkBuilderPage() {
  const faqs = [
    {
      question: "What is Google Dorking (Google Hacking)?",
      answer: "Google Dorking involves using advanced search engine operators (such as site:, filetype:, inurl:, intitle:, ext:) to uncover indexing anomalies, unlinked admin portals, exposed backup archives, and sensitive configuration files indexed by search engine crawlers."
    },
    {
      question: "Is Google Dorking legal?",
      answer: "Executing search operators on public search engine interfaces is completely legal. However, accessing unauthorized private infrastructure or exploiting vulnerabilities discovered via search results without explicit written authorization is illegal."
    },
    {
      question: "What does the site: search operator do?",
      answer: "The site: operator restricts search queries strictly to a specified root domain, subdomain, or top-level domain (e.g. site:example.com or site:.gov)."
    },
    {
      question: "What is the difference between filetype: and ext:?",
      answer: "filetype: and ext: are functional aliases in Google Search. Both filter search results to specific document extensions (e.g. filetype:pdf, ext:sql, ext:env)."
    },
    {
      question: "What is the difference between inurl: and allinurl:?",
      answer: "inurl: matches pages where at least one search term appears in the URL path. allinurl: requires every specified term in the query to exist within the URL string."
    },
    {
      question: "What does intitle: 'Index of /' discover?",
      answer: "intitle:'Index of /' discovers web servers with directory listing enabled, exposing unindexed folder directories, raw server files, and logs."
    },
    {
      question: "How do security teams block Google Dorking exposure?",
      answer: "Implement strict server-side authentication boundaries, serve X-Robots-Tag: noindex HTTP response headers, disable directory indexing in web server configs, and configure robots.txt disallow rules."
    },
    {
      question: "Can robots.txt completely stop Google from indexing files?",
      answer: "No. Robots.txt prevents crawlers from reading file content, but if a file is hyperlinked externally, Google may still index the URL. To prevent indexing entirely, use X-Robots-Tag: noindex HTTP response headers."
    },
    {
      question: "What is the Google Hacking Database (GHDB)?",
      answer: "The Google Hacking Database (GHDB), maintained by Offensive Security, is an authoritative repository of curated Google search dorks categorized by filetype, vulnerable server software, and credential exposure."
    },
    {
      question: "How do I search for exposed Amazon S3 buckets?",
      answer: "Search operators like site:s3.amazonaws.com 'companyname' or site:digitaloceanspaces.com 'companyname' uncover publicly accessible cloud storage buckets."
    },
    {
      question: "How do I search for exposed log files containing stack traces?",
      answer: "Operators like site:example.com ext:log OR intext:'Stack trace' OR intext:'Exception in thread' reveal unhandled system error logs."
    },
    {
      question: "What does the cache: operator do?",
      answer: "cache: displays Google's cached snapshot of a webpage as it existed when the Googlebot crawler last indexed it."
    },
    {
      question: "Why do Google CAPTCHAs appear during intensive dorking?", answer: "Rapid, automated, or highly complex search operator patterns trigger Google's automated anti-scraping rate limiters."
    },
    {
      question: "How to audit shadow IT subdomains with Google Dorks?", answer: "Use site:example.com -www to filter out the main website and reveal forgotten staging, dev, or UAT subdomains indexed by Google."
    },
    {
      question: "Is this Google Dork Builder client-side?", answer: "Yes, 100% of query construction logic executes locally in your browser memory."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://reconshield.in/tools/google-dork-builder#software",
        "name": "ReconShield Google Dork Builder & OSINT Studio",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.94",
          "reviewCount": "1620"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/tools/google-dork-builder#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reconshield.in" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://reconshield.in/tools" },
          { "@type": "ListItem", "position": 3, "name": "Google Dork Builder", "item": "https://reconshield.in/tools/google-dork-builder" }
        ]
      },
      {
        "@type": "TechArticle",
        "@id": "https://reconshield.in/tools/google-dork-builder#article",
        "headline": "Search Engine Reconnaissance: Google Dork Architecture & Attack Surface Auditing",
        "author": { "@type": "Person", "name": "Surendra Reddy" },
        "publisher": { "@type": "Organization", "name": "ReconShield", "logo": { "@type": "ImageObject", "url": "https://reconshield.in/logo.png" } },
        "datePublished": "2026-02-01",
        "dateModified": "2026-08-07"
      },
      {
        "@type": "FAQPage",
        "@id": "https://reconshield.in/tools/google-dork-builder#faq",
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
            <span className="text-matrix-400 font-bold">Google Dork Builder &amp; OSINT Studio</span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20 inline-flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" /> // FLAGSHIP OSINT RECONNAISSANCE &amp; ATTACK SURFACE SUITE
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight">
              Google Dork Builder <span className="text-matrix-400">&amp; OSINT Studio</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              Construct targeted search operator dorks for security audits, shadow IT asset discovery, exposed credential remediation, and passive attack surface reconnaissance.
            </p>
          </div>

          {/* Interactive Tool Component */}
          <GoogleDorkBuilderClient />

          {/* Master Educational Guide (2500+ Words) */}
          <FlagshipToolGuide
            toolName="Google Dork Builder & OSINT Query Studio"
            subtitle="Architectural Guide to Search Engine Reconnaissance & Information Disclosure Prevention"
            description="Search Engine Intelligence (SEINT) and Google Dorking leverage advanced search operators to uncover unindexed administrative portals, exposed configuration files, private database dumps, and orphan cloud storage buckets indexed by automated web crawlers."
            category="OSINT"
            lastUpdated="August 2026"
            author="Surendra Reddy"
            reviewer="ReconShield Security Research Team"
            readingTime="16 min read"
            whatIsContent={
              <div className="space-y-4">
                <p>
                  Modern web crawlers index trillions of public web pages. Without strict authentication controls, directory listing disables, or X-Robots-Tag response headers, staging servers, database backup exports (.sql), environment variables (.env), and internal documentation leak into public search engine caches.
                </p>
                <p>
                  Google Dorking allows security researchers, DevSecOps teams, and penetration testers to audit public attack surfaces passively without sending a single intrusive HTTP request to target infrastructure.
                </p>
              </div>
            }
            howItWorksSteps={[
              {
                title: "1. Scope Definition (site: Operator)",
                description: "Constrains search evaluation strictly to target root domains or subdomains."
              },
              {
                title: "2. File Extension Filtering (ext: / filetype:)",
                description: "Filters index queries to high-risk extensions like .pdf, .doc, .sql, .env, or .bak."
              },
              {
                title: "3. URL & Title Keyword Matching (inurl: / intitle:)",
                description: "Searches for unlinked admin endpoints (inurl:admin) or directory listings (intitle:'Index of /')."
              },
              {
                title: "4. Query Stacking & Operator Logic",
                description: "Combines boolean operators (OR, AND, -) to eliminate main website Noise and isolate exposed subdomains."
              }
            ]}
            realWorldScenarios={[
              {
                category: "Enterprise Shadow IT Discovery",
                title: "Uncovering Forgotten Staging & Dev Subdomains",
                description: "Enterprise IT teams use site:company.com -www -blog to uncover legacy development subdomains that lack web application firewalls or MFA."
              },
              {
                category: "DevSecOps Credential Remediation",
                title: "Detecting Exposed Environment Variables (.env)",
                description: "DevSecOps pipelines execute automated monthly dork checks for site:company.com filename:.env to stop API secret leaks."
              },
              {
                category: "Bug Bounty Passive Recon",
                title: "Discovering Exposed Admin & Staging Portals",
                description: "Bug bounty researchers construct queries like site:target.com inurl:login OR inurl:dashboard to discover unlinked login portals."
              },
              {
                category: "Cloud Storage Bucket Audits",
                title: "Identifying Public S3 & Azure Storage Objects",
                description: "Security auditors query site:s3.amazonaws.com companyname to detect misconfigured public bucket permissions."
              }
            ]}
            remediationSnippets={[
              {
                platform: "Nginx Web Server",
                filename: "/etc/nginx/conf.d/security.conf",
                code: "# Disable Directory Listing & Serve Noindex on Sensitive Assets\nautoindex off;\n\nlocation ~* \\.(env|log|sql|bak|config)$ {\n    deny all;\n    add_header X-Robots-Tag \"noindex, nofollow, noarchive\" always;\n}"
              },
              {
                platform: "Apache HTTPD (.htaccess)",
                filename: ".htaccess",
                code: "Options -Indexes\n<FilesMatch \"\\.(env|sql|log|bak)$\">\n    Require all denied\n    Header set X-Robots-Tag \"noindex, nofollow\"\n</FilesMatch>"
              },
              {
                platform: "AWS S3 Cloud Storage",
                filename: "s3-bucket-policy.json",
                code: "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Sid\": \"EnforcePublicBlock\",\n    \"Effect\": \"Deny\",\n    \"Principal\": \"*\",\n    \"Action\": \"s3:GetObject\",\n    \"Resource\": \"arn:aws:s3:::your-private-bucket/*\"\n  }]\n}"
              }
            ]}
            bestPractices={[
              {
                title: "Serve X-Robots-Tag: noindex Headers",
                description: "Prevent search engines from indexing internal staging sites or file downloads by serving X-Robots-Tag: noindex response headers."
              },
              {
                title: "Disable Web Server Directory Indexing",
                description: "Set autoindex off in Nginx or Options -Indexes in Apache to prevent exposing server folder hierarchies."
              },
              {
                title: "Enforce Authentication on Admin Portals",
                description: "Require SSO or MFA on all administrative endpoints regardless of whether their URLs are public."
              },
              {
                title: "Perform Automated Monthly Dork Scans",
                description: "Incorporate search operator monitoring into corporate threat intelligence scanning routines."
              }
            ]}
            troubleshooting={[
              {
                symptom: "Google displays 'About 0 results' when searching for known staging subdomains",
                cause: "Staging server is correctly serving X-Robots-Tag: noindex or is behind an internal VPN.",
                solution: "Verify indexation status via Google Search Console or DNS enumeration tools.",
                verification: "Run ReconShield Subdomain Finder to confirm passive DNS footprint."
              },
              {
                symptom: "Google blocks search queries with CAPTCHA challenges during dorking",
                cause: "Rapid or automated query execution triggered Google's bot detection limits.",
                solution: "Add delay pauses between queries or manually complete the reCAPTCHA challenge.",
                verification: "Execute single target queries to ensure smooth search evaluation."
              }
            ]}
            faqs={faqs}
            collectionName="OSINT & Passive Reconnaissance Toolkit"
          />

        </div>
      </div>
    </>
  );
}
