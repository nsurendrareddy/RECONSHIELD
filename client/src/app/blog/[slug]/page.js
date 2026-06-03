import BlogPostClient from '@/components/BlogPostClient';
import { ShieldAlert, ArrowLeft, WifiOff } from 'lucide-react';
import Link from 'next/link';
import { client, blogDetailQuery, urlFor, recentPostsQuery, categoriesWithCountQuery, relatedPostsQuery } from '@/utils/sanity';
export const revalidate = 60;

const MOCK_POSTS_DATA = {
  'anatomy-of-passive-osint': {
    title: "The Anatomy of Passive OSINT: Mapping Infrastructure Without Noise",
    slug: "anatomy-of-passive-osint",
    publishedAt: "2026-05-28T09:00:00Z",
    excerpt: "Learn how modern threat hunters map enterprise footprints entirely through cached DNS, transparency logs, and global RIR data without triggering network intrusion detection systems.",
    categories: [{ title: "OSINT & Analysis" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1520,
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Passive Infrastructure Mapping' }]
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Passive reconnaissance represents a critical blind spot for many enterprise security programs. While active scans are logged, passive data gathering using certificate transparency logs and regional caching databases leaves zero footprints on target systems.' }]
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Key Investigation Vectors' }]
      },
      {
        _key: 'b4',
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Security teams must assume that their entire public-facing architecture is mapped and regularly audit their DNS zone files to purge unused hostnames.' }]
      }
    ]
  },
  'securing-bgp-route-leaks': {
    title: "Securing BGP Route Leaks: Why Large ASNs Fall Victim to Hijacking Campaigns",
    slug: "securing-bgp-route-leaks",
    publishedAt: "2026-05-25T11:30:00Z",
    excerpt: "A deep dive into Autonomous System Number (ASN) path verification, peer filtering mechanisms, and the crucial role of RPKI repository deployment in preventing routing exposures.",
    categories: [{ title: "Threat Intelligence" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1840,
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Securing BGP Paths' }]
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'BGP route security remains the Achilles\' heel of core internet routing. Rogue route advertisements can redirect enterprise traffic through adversarial infrastructure, enabling man-in-the-middle attacks. Security analysts must verify BGP path logs, configure explicit neighbor maps, and deploy RPKI certificates.' }]
      }
    ]
  },
  'spf-dkim-dmarc-blueprint': {
    title: "Demystifying SPF, DKIM, and DMARC: A Blueprint for Email Spoofing Defense",
    slug: "spf-dkim-dmarc-blueprint",
    publishedAt: "2026-05-22T08:15:00Z",
    excerpt: "Misconfigured mail records remain the leading vector for business email compromise (BEC). We breakdown how to implement strict authentication protocols to protect corporate brands.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1390,
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Hardening Email Infrastructure' }]
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Email spoofing remains one of the primary delivery methods for business compromise payloads. By configuring SPF, DKIM, and strict DMARC enforcement policies, organizations can prevent malicious mail delivery using their domains.' }]
      }
    ]
  },
  'owasp-http-headers-hardening': {
    title: "OWASP Top 10 Web Configuration Audits: Hardening HTTP Headers",
    slug: "owasp-http-headers-hardening",
    publishedAt: "2026-05-19T14:00:00Z",
    excerpt: "Why Content-Security-Policy (CSP), Strict-Transport-Security, and X-Frame-Options are the first line of defense against cross-site scripting and modern clickjacking attacks.",
    categories: [{ title: "Web Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1250,
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'OWASP HTTP Headers Hardening' }]
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'HTTP response security headers provide instructions to the browser on how to isolate web contexts. Content-Security-Policy (CSP), X-Frame-Options, and Strict-Transport-Security form the baseline core of website hardening.' }]
      }
    ]
  },
  'ssl-tls-regulatory-compliance': {
    title: "The Critical Role of SSL/TLS Ciphers in Regulatory Compliance Frameworks",
    slug: "ssl-tls-regulatory-compliance",
    publishedAt: "2026-05-15T10:45:00Z",
    excerpt: "Outdated transport protocols are direct compliance violations under GDPR and PCI-DSS. Here is how to perform passive checks and audit your cryptography trust chains.",
    categories: [{ title: "Vulnerability Research" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 2100,
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Cryptographic Protocol Auditing' }]
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Outdated cryptographic handshakes (SSLv3, TLS 1.0, and TLS 1.1) represent severe configuration risks. Regulated environments must verify they only authenticate with TLS 1.2 and TLS 1.3 ciphers.' }]
      }
    ]
  },
  'shadow-it-exposed-ports': {
    title: "Shadow IT Discovery: Passive Identification of Exposed Database and Administrative Ports",
    slug: "shadow-it-exposed-ports",
    publishedAt: "2026-05-10T16:20:00Z",
    excerpt: "Exposing SSH, RDP, or raw database interfaces to the public internet presents catastrophic risk. We explore how to inventory assets using regional passive telemetry databases.",
    categories: [{ title: "Network Security" }],
    author: { name: "Surendra Reddy", slug: "surendra-reddy" },
    estimatedWordCount: 1670,
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Shadow IT Exposed Interface Scanning' }]
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Managing external assets exposure requires continuous inventory tracking. Passive port mapping identifies databases, management panels, and raw consoles exposed to the wider internet.' }]
      }
    ]
  }
};

async function getPost(slug) {
  if (!slug || slug === 'undefined') return null;
  
  try {
    const sanityPost = await client.fetch(blogDetailQuery, { slug });
    if (sanityPost) return sanityPost;
  } catch (err) {
    console.error('>>> SANITY FETCH ERROR:', err);
  }

  // Fallback to static mock articles
  return MOCK_POSTS_DATA[slug] || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || post._error) return { title: 'Intelligence Briefing Missing' };

  const description = post.excerpt;
  const imageUrl = post.mainImageUrl || '/og-image.png';
  const authorName = post.author?.name ?? "ReconShield Team";
  
  return {
    title: `${post.title} | Intelligence`,
    description: description,
    alternates: {
      canonical: `https://reconshield.in/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: description,
      url: `https://reconshield.in/blog/${slug}`,
      siteName: 'ReconShield',
      images: [{ url: imageUrl }],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [authorName],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [imageUrl],
    }
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || post._error) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto text-center py-20 px-4">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-display font-bold text-white tracking-wider uppercase">
          Intelligence Briefing Missing
        </h1>
        <p className="text-gray-500 font-mono mt-2 mb-8">
          The requested intelligence briefing does not exist or has been classified.
        </p>
        <div className="block">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-800 text-sm font-mono text-matrix-400 hover:bg-surface-700 transition-all border border-matrix-400/20">
            <ArrowLeft className="w-4 h-4" /> Return to Archives
          </Link>
        </div>
      </div>
    );
  }

  // Fetch sidebar and related data with individual catch handlers to prevent 500 crashes
  const [recentPosts, categories, relatedPosts] = await Promise.all([
    client.fetch(recentPostsQuery, { slug }).catch(err => {
      console.error('Error fetching recent posts:', err);
      return [];
    }),
    client.fetch(categoriesWithCountQuery).catch(err => {
      console.error('Error fetching categories:', err);
      return [];
    }),
    client.fetch(relatedPostsQuery, { slug }).catch(err => {
      console.error('Error fetching related posts:', err);
      return [];
    })
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": post.categories?.[0]?.title === "Cyber News" ? "NewsArticle" : "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.mainImageUrl || (post.mainImage ? urlFor(post.mainImage).url() : "https://reconshield.in/og-image.png"),
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Surendra Reddy",
      "url": `https://reconshield.in/author/${post.author?.slug?.current || post.author?.slug || 'surendra-reddy'}`,
      "sameAs": [
        "https://linkedin.com/in/surendrareddy3",
        "https://github.com/nsurendrareddy"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "ReconShield",
      "url": "https://reconshield.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reconshield.in/og-image.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://reconshield.in/blog/${slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient 
        post={post} 
        recentPosts={recentPosts || []} 
        categories={categories || []} 
        relatedPosts={relatedPosts || []}
      />
    </>
  );
}
