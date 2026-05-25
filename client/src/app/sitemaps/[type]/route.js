import { NextResponse } from 'next/server';
import { TOOLS } from '@/utils/toolsData';

export const runtime = 'edge'; 

const BASE_URL = 'https://reconshield.in';
const STATIC_LAST_MODIFIED = '2026-05-25';

export async function GET(request, { params }) {
  const { type } = params; // e.g. "malicious-ips-2.xml"
  
  const match = type.match(/^([a-z-]+)-(\d+)\.xml$/);
  if (!match) return new NextResponse('Not Found', { status: 404 });
  
  const entityType = match[1];
  const page = parseInt(match[2], 10);
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Fallback static generation for core routes (since backend sitemap generator isn't fully built yet)
  if (entityType === 'core' && page === 1) {
    const staticUrls = [
      { url: BASE_URL, priority: 1.0, freq: 'daily' },
      { url: `${BASE_URL}/about`, priority: 0.5, freq: 'monthly' },
      { url: `${BASE_URL}/contact`, priority: 0.4, freq: 'yearly' },
      { url: `${BASE_URL}/privacy`, priority: 0.3, freq: 'yearly' },
      { url: `${BASE_URL}/terms`, priority: 0.3, freq: 'yearly' },
    ];
    staticUrls.forEach(({ url, priority, freq }) => {
      xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
    });
  } 
  else if (entityType === 'tools' && page === 1) {
     xml += `  <url>\n    <loc>${BASE_URL}/tools</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
     xml += `  <url>\n    <loc>${BASE_URL}/ip-scanner</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
     
     TOOLS.forEach(tool => {
        xml += `  <url>\n    <loc>${BASE_URL}/tools/${tool.id}</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${tool.popular ? 0.9 : 0.8}</priority>\n  </url>\n`;
     });
  }
  else if (entityType === 'blog' && page === 1) {
      xml += `  <url>\n    <loc>${BASE_URL}/blog</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
      // We would fetch blog posts from Sanity here in production.
  }
  else {
      // Dynamic Entity Sitemaps (IP, ASN, Ports, Domains, etc)
      // Attempt to proxy to the backend if the endpoint exists.
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://reconshield.onrender.com';
        const backendRes = await fetch(`${backendUrl}/api/sitemap-generate?type=${entityType}&page=${page}`, {
          next: { revalidate: entityType.includes('malicious') ? 3600 : 86400 } // Threat intelligence cached for 1 hour, clean for 1 day
        });

        if (backendRes.ok) {
           const backendXml = await backendRes.text();
           return new NextResponse(backendXml, {
             headers: {
               'Content-Type': 'text/xml',
               'Cache-Control': entityType.includes('malicious') ? 'public, s-maxage=3600' : 'public, s-maxage=86400'
             }
           });
        }
      } catch(e) {
          console.error(`Sitemap generation failed for ${entityType}-${page}:`, e);
      }
      
      // Fallback empty sitemap if backend is not ready
      xml += `<!-- Waiting for Database connection for ${entityType} chunk ${page} -->\n`;
  }

  xml += `</urlset>`;
  
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 'public, s-maxage=3600'
    }
  });
}
