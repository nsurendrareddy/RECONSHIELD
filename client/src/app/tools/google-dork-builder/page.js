import React from 'react';
import GoogleDorkBuilderClient from '@/components/GoogleDorkBuilderClient';
import FlagshipToolGuide from '@/components/FlagshipToolGuide';

export const metadata = {
  title: "Google Dork Query Builder & OSINT Studio | ReconShield",
  description: "Construct advanced Google Dorks for OSINT reconnaissance. Discover exposed files, login portals, database backups, and S3 buckets safely. 100% free.",
  alternates: { canonical: "https://reconshield.in/tools/google-dork-builder" },
  keywords: ["google dork builder", "osint search query generator", "google dorks bug bounty", "find exposed files google dork"]
};

export default function GoogleDorkBuilderPage() {
  const faqs = [
    { question: "What is Google Dorking (Google Hacking)?", answer: "Google Dorking involves using specialized search operators (like site:, filetype:, inurl:, intitle:) to discover indexing anomalies, exposed sensitive documents, and unlinked admin portals indexed by search engines." },
    { question: "Is Google Dorking legal?", answer: "Querying public search engines using operators is legal. However, accessing unauthorized systems or exploiting discovered vulnerabilities without permission is illegal." },
    { question: "What does the site: operator do?", answer: "The site: operator restricts search results strictly to the specified domain or top-level domain." },
    { question: "What does filetype: or ext: do?", answer: "It filters search results to specific file extensions, such as filetype:pdf, filetype:sql, or ext:env." },
    { question: "What is the difference between inurl: and allinurl:?", answer: "inurl: requires at least one keyword to match the URL string, whereas allinurl: requires all specified keywords to exist in the URL." },
    { question: "What is intitle: operator?", answer: "intitle: searches for pages containing specific text inside the HTML <title> element, such as intitle:'Index of /'." },
    { question: "How do security teams prevent Google Dorking on their sites?", answer: "Configure proper robots.txt disallow directives, enforce authentication on admin endpoints, and set X-Robots-Tag: noindex HTTP response headers on sensitive assets." },
    { question: "Can robots.txt stop Google from indexing files?", answer: "Robots.txt prevents crawling, but if a URL is linked elsewhere, Google might index the URL without reading content. Use <meta name='robots' content='noindex'> or HTTP X-Robots-Tag: noindex to prevent indexing completely." },
    { question: "What is the Exploit Database GHDB?", answer: "The Google Hacking Database (GHDB) maintained by Offensive Security is an authoritative repository of search dork patterns categorized by vulnerability type." },
    { question: "How to search for exposed Amazon S3 Buckets?", answer: "Use operators like site:s3.amazonaws.com 'companyname' or site:digitaloceanspaces.com." },
    { question: "How to search for exposed log files?", answer: "Use operators such as site:example.com ext:log OR intext:'Stack trace'." },
    { question: "What is cache: operator?", answer: "cache: shows Google's cached snapshot of a webpage as it appeared when last indexed." },
    { question: "What is link: operator?", answer: "link: legacy operator used to find pages linking to a targeted URL." },
    { question: "Why do Google CAPTCHAs appear during dorking?", answer: "Automated or rapid search query patterns trigger Google's bot detection system to prevent scraper abuse." },
    { question: "How often does Google index new dorks?", answer: "Search crawlers continuously index web content based on domain authority, sitemap update frequency, and link popularity." }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "ReconShield Google Dork Builder",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "FAQPage",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-[#05080f] min-h-screen text-white py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs text-matrix-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-matrix-400/10 border border-matrix-400/20">
              // OSINT RECONNAISSANCE SUITE
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              Google Dork Builder <span className="text-matrix-400">&amp; OSINT Studio</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
              Construct targeted search operator dorks for security audits, shadow IT discovery, and passive asset reconnaissance.
            </p>
          </div>

          <GoogleDorkBuilderClient />

          <FlagshipToolGuide
            toolName="Google Dork Builder & OSINT Query Studio"
            subtitle="Advanced Search Engine Reconnaissance & Attack Surface Management"
            description="Google Dorking utilizes advanced search operators to uncover sensitive data exposed on public web servers. Security researchers and DevSecOps teams use dorks passively to identify misconfigured storage buckets, exposed config files, and administrative panels."
            category="OSINT"
            whatIsContent={
              <p>
                Search engines continuously crawl public web assets. Without proper indexation controls (such as X-Robots-Tag: noindex headers or strict authentication boundaries), internal databases, staging environments, and backup files get indexed and exposed to public search results.
              </p>
            }
            howItWorksSteps={[
              { title: "Domain Scope Selection", description: "Target domain scope is defined using site: restrictions." },
              { title: "Operator Stacking", description: "Combine site:, filetype:, inurl:, and intitle: operators using logical OR/AND constraints." },
              { title: "Query Execution", description: "Execute search query securely on Google to audit publicly indexed assets." }
            ]}
            bestPractices={[
              { title: "Enforce X-Robots-Tag Headers", description: "Serve X-Robots-Tag: noindex, nofollow on sensitive files and staging environments." },
              { title: "Perform Regular Attack Surface Audits", description: "Automate monthly dork checks to discover unintended information disclosure." }
            ]}
            faqs={faqs}
          />
        </div>
      </div>
    </>
  );
}
