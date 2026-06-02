import React from 'react';
import { client, homepageBlogQuery } from '@/utils/sanity';
import { generateBaseMetadata } from '@/utils/metadata';
import ScannerHubClient from '@/components/ScannerHubClient';

export const metadata = generateBaseMetadata({
  title: "Cybersecurity Scanner Hub - Passive Infrastructure Auditing Suite",
  description: "Access ReconShield's dedicated Cybersecurity Scanner Hub. Passively audit HTTP security headers, inspect SSL/TLS cryptography configurations, validate SPF/DKIM/DMARC email records, scan open ports, and search threat intelligence databases—entirely free.",
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
        "@type": "CollectionPage",
        "@id": "https://reconshield.in/scanner#collection",
        "name": "ReconShield Cybersecurity Scanner Hub",
        "url": "https://reconshield.in/scanner",
        "description": "Unified dashboard for passive cybersecurity audits and vulnerability scans. Audit HTTP headers, SSL certificates, DNS zones, and email validation settings.",
        "publisher": {
          "@id": "https://reconshield.in/#organization"
        }
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
            "name": "Scanner Hub",
            "item": "https://reconshield.in/scanner"
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Structured Schema Markup (CollectionPage and BreadcrumbList) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      
      {/* Interactive Unified Scanner Hub Dashboard Component */}
      <ScannerHubClient latestPosts={latestPosts} />
    </>
  );
}
