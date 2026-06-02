import React from 'react';
import { client, homepageBlogQuery } from '@/utils/sanity';
import { generateBaseMetadata } from '@/utils/metadata';
import ScannerHubClient from '@/components/ScannerHubClient';

export const metadata = generateBaseMetadata({
  title: "Passive Diagnostics Suite - Infrastructure Exposure Diagnostics | ReconShield",
  description: "Validate email security (SPF/DMARC), inspect SSL cipher health, analyze HTTP security headers, and identify exposed services using passive infrastructure intelligence and non-intrusive diagnostics.",
  path: '/scanner'
});

const MOCK_POSTS = [
  {
    _id: "mock-1",
    title: "The Anatomy of Passive OSINT: Mapping Infrastructure Without Noise",
    slug: "anatomy-of-passive-osint",
    publishedAt: "2026-05-28T09:00:00Z",
    excerpt: "Learn how modern threat hunters map enterprise footprints entirely through cached DNS, transparency logs, and global RIR data without triggering network intrusion detection systems.",
    categories: [{ title: "OSINT & analysis" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1520
  },
  {
    _id: "mock-2",
    title: "Securing BGP Route Leaks: Why Large ASNs Fall Victim to Hijacking Campaigns",
    slug: "securing-bgp-route-leaks",
    publishedAt: "2026-05-25T11:30:00Z",
    excerpt: "A deep dive into Autonomous System Number (ASN) path verification, peer filtering mechanisms, and the crucial role of RPKI repository deployment in preventing routing exposures.",
    categories: [{ title: "Threat Intelligence" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1840
  },
  {
    _id: "mock-3",
    title: "Demystifying SPF, DKIM, and DMARC: A Blueprint for Email Spoofing Defense",
    slug: "spf-dkim-dmarc-blueprint",
    publishedAt: "2026-05-22T08:15:00Z",
    excerpt: "Misconfigured mail records remain the leading vector for business email compromise (BEC). We breakdown how to implement strict authentication protocols to protect corporate brands.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1390
  }
];

export default async function ScannerPage() {
  let posts = [];
  try {
    posts = await client.fetch(homepageBlogQuery);
  } catch (error) {
    console.error('Error fetching blog posts for scanner page:', error);
  }

  // Use mock posts if Sanity query fails or yields empty results (mitigates "thin-content" penalties)
  if (!posts || posts.length === 0) {
    posts = MOCK_POSTS;
  }

  // Display top 3 latest posts
  const latestPosts = posts.slice(0, 3);

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://reconshield.in/scanner#software",
        "name": "Passive Diagnostics Suite",
        "operatingSystem": "All",
        "applicationCategory": "SecurityApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Validate email security (SPF/DMARC), inspect SSL cipher health, analyze HTTP security headers, and identify exposed services using passive infrastructure intelligence and non-intrusive diagnostics."
      },
      {
        "@type": "FAQPage",
        "@id": "https://reconshield.in/scanner#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the Passive Diagnostics Suite work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Passive Diagnostics Suite queries cached threat intelligence, public DNS records, Certificate Transparency logs, and globally aggregated network metadata. It does not send direct packets or run active intrusion payloads against the target domain."
            }
          },
          {
            "@type": "Question",
            "name": "Why is non-intrusive scanning important?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Non-intrusive analysis allows organizations and researchers to identify exposures without causing service disruptions, triggering security alarms, or violating compliance regulations regarding active penetration testing."
            }
          },
          {
            "@type": "Question",
            "name": "What is infrastructure exposure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Infrastructure exposure refers to visible services, misconfigured email records (like SPF/DMARC), weak SSL ciphers, and missing HTTP headers that could be leveraged by threat actors to compromise an organization's digital footprint."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://reconshield.in/scanner#breadcrumb",
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
            "name": "Passive Diagnostics Suite",
            "item": "https://reconshield.in/scanner"
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Structured Schema Markup (SoftwareApplication, FAQPage, and BreadcrumbList) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      
      {/* Interactive Unified Scanner Hub Dashboard Component */}
      <ScannerHubClient latestPosts={latestPosts} />
    </>
  );
}
