import { client, blogListQuery } from "@/utils/sanity";

export const revalidate = 86400; // Cache RSS feed for 24 hours

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  const posts = await client.fetch(blogListQuery, {}, { next: { tags: ['blog'] } });
  const siteUrl = "https://reconshield.in";
  
  const rssItems = posts
    .map((post) => {
      const pubDate = new Date(post.publishedAt || post._createdAt).toUTCString();
      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${siteUrl}/blog/${post.slug}</link>
          <guid>${siteUrl}/blog/${post.slug}</guid>
          <pubDate>${pubDate}</pubDate>
          <description>${escapeXml(post.excerpt || '')}</description>
        </item>
      `;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>ReconShield Intelligence</title>
        <link>${siteUrl}</link>
        <description>AI-powered cybersecurity platform for threat intelligence, OSINT, and exposure assessment.</description>
        <language>en</language>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        ${rssItems}
      </channel>
    </rss>
  `;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400"
    },
  });
}
