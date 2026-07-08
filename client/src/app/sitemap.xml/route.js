import { NextResponse } from 'next/server';

const BASE_URL = 'https://reconshield.in';
const SITEMAP_TYPES = ['core', 'tools', 'blog', 'ports', 'headers', 'dns', 'email-auths', 'technology', 'vulnerability', 'ssl', 'subdomains'];

export async function GET() {
  try {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Static/Core Sitemaps (Always 1 file)
    xml += `  <sitemap>\n    <loc>${BASE_URL}/sitemaps/core-1.xml</loc>\n  </sitemap>\n`;
    xml += `  <sitemap>\n    <loc>${BASE_URL}/sitemaps/tools-1.xml</loc>\n  </sitemap>\n`;
    xml += `  <sitemap>\n    <loc>${BASE_URL}/sitemaps/blog-1.xml</loc>\n  </sitemap>\n`;
    
    // 2. Dynamic Chunked Sitemaps
    // Fetch chunk counts from backend API. For now, fallback to 1 chunk if API unavailable.
    let chunks = {};
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://reconshield.onrender.com';
      const backendRes = await fetch(`${backendUrl}/api/sitemap-metadata`, {
        next: { revalidate: 86400 } 
      });
      if (backendRes.ok) {
        chunks = await backendRes.json();
      }
    } catch (error) {
      console.error('Failed to fetch sitemap metadata:', error);
    }
    
    for (const type of SITEMAP_TYPES) {
      if (['core', 'tools', 'blog'].includes(type)) continue; // Handled statically above

      // Use chunk count from backend, default to 1 if undefined, but respect 0 if explicitly returned.
      const chunkCount = chunks[type] !== undefined ? chunks[type] : 1;
      if (chunkCount === 0) continue;
      for (let i = 1; i <= chunkCount; i++) {
        xml += `  <sitemap>\n`;
        xml += `    <loc>${BASE_URL}/sitemaps/${type}-${i}.xml</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += `  </sitemap>\n`;
      }
    }

    xml += `</sitemapindex>`;
    
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Fatal Sitemap Index Error:', error);
    return new NextResponse('Not Found', { status: 404 });
  }
}
