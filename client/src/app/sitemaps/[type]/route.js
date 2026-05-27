import { NextResponse } from 'next/server';
import { TOOLS } from '@/utils/toolsData';
import { client, blogListQuery } from '@/utils/sanity';

export const runtime = 'edge'; 

const BASE_URL = 'https://reconshield.in';
const STATIC_LAST_MODIFIED = new Date().toISOString();

// Pre-defined static fallbacks for programmatic SEO routes to ensure sitemap is never empty
const FALLBACK_DATA = {
  ports: ['80', '443', '21', '22', '25', '53', '3306', '5432', '8080', '8443'],
  headers: ['strict-transport-security', 'content-security-policy', 'x-frame-options', 'x-content-type-options', 'server'],
  ssl: ['google.com', 'reconshield.in', 'github.com'],
  asn: ['AS15169', 'AS13335', 'AS714', 'AS32934', 'AS16509'],
  ip: ['8.8.8.8', '1.1.1.1', '9.9.9.9'],
  dns: ['google.com', 'cloudflare.com', 'microsoft.com'],
  whois: ['google.com', 'cloudflare.com'],
  subdomains: ['google.com', 'yahoo.com'],
  'malicious-ips': ['185.191.171.2', '194.165.16.2']
};

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const type = resolvedParams?.type;
    
    // Validate sitemap chunk request
    const match = type?.match(/^([a-z-]+)-(\d+)\.xml$/);
    if (!match) return new NextResponse('Not Found', { status: 404 });
    
    const entityType = match[1];
    const page = parseInt(match[2], 10);
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Static Core Sitemaps
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
    // 2. Tools Sitemaps
    else if (entityType === 'tools' && page === 1) {
       xml += `  <url>\n    <loc>${BASE_URL}/tools</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
       
       TOOLS.forEach(tool => {
          xml += `  <url>\n    <loc>${BASE_URL}/tools/${tool.id}</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${tool.popular ? 0.9 : 0.8}</priority>\n  </url>\n`;
       });
    }
    // 3. Blog Sitemaps
    else if (entityType === 'blog' && page === 1) {
        xml += `  <url>\n    <loc>${BASE_URL}/blog</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
        
        try {
            const posts = await client.fetch(blogListQuery);
            const safePosts = (posts || []).filter(post => post?.slug?.current || typeof post?.slug === 'string');
            
            safePosts.forEach(post => {
              const slug = post?.slug?.current || post?.slug;
              if (slug && typeof slug === 'string') {
                  const lastMod = post?.publishedAt || post?._createdAt || STATIC_LAST_MODIFIED;
                  xml += `  <url>\n    <loc>${BASE_URL}/blog/${slug}</loc>\n    <lastmod>${new Date(lastMod).toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
              }
            });
        } catch (sanityError) {
            console.error('Sanity fetch error in sitemap:', sanityError);
        }
    }
    // 4. Dynamic Entity Sitemaps (IP, ASN, Ports, Domains, etc)
    else {
        let hasData = false;
        
        // Attempt to fetch programmatic SEO URLs from backend
        try {
          const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://reconshield.onrender.com';
          const cacheTime = entityType?.includes('malicious') ? 3600 : 86400; // 1hr for threat intel, 24hr for stable entities
          
          const backendRes = await fetch(`${backendUrl}/api/sitemap-generate?type=${entityType}&page=${page}`, {
            next: { revalidate: cacheTime } 
          });

          if (backendRes.ok) {
             const textData = await backendRes.text();
             let extractedUrls = [];
             
             try {
                // Try parsing as JSON first
                const jsonData = JSON.parse(textData);
                if (Array.isArray(jsonData)) {
                    extractedUrls = jsonData;
                }
             } catch (e) {
                // If it's XML, extract the <loc> values manually
                const locMatches = [...textData.matchAll(/<loc>(.*?)<\/loc>/gi)];
                extractedUrls = locMatches.map(m => ({ url: m[1].trim() }));
             }

             // Apply strict filter logic
             const validUrls = extractedUrls.filter(
                (u) =>
                u &&
                typeof u.url === 'string' &&
                u.url.startsWith('https://') &&
                !u.url.includes('undefined') &&
                !u.url.includes('null')
             );

             if (validUrls.length > 0) {
                 hasData = true;
                 
                 // Deduplicate URLs to prevent duplicate URL nodes
                 const uniqueUrls = new Map();
                 validUrls.forEach(u => uniqueUrls.set(u.url, u));
                 
                 Array.from(uniqueUrls.values()).forEach(u => {
                    // Escape XML entities
                    const safeUrl = u.url.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
                    const lastmod = u.lastmod || STATIC_LAST_MODIFIED;
                    const changefreq = u.changefreq || 'weekly';
                    const priority = u.priority || '0.6';
                    
                    xml += `  <url>\n    <loc>${safeUrl}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
                 });
             }
          }
        } catch(e) {
            console.error(`Backend sitemap generation failed for ${entityType}-${page}:`, e);
        }
        
        // STATIC FALLBACK: If backend fails or returns empty, use static fallback data to prevent GSC errors
        if (!hasData && page === 1) {
            const fallbackItems = FALLBACK_DATA[entityType] || [];
            
            // Map entity type to the exact path required
            let pathPrefix = entityType;
            if (entityType === 'dns') pathPrefix = 'dns-records';
            if (entityType === 'malicious-ips') pathPrefix = 'ip';
            if (entityType === 'cve') pathPrefix = 'cve'; // if cve sitemap exists
            
            if (fallbackItems.length > 0) {
              fallbackItems.forEach(item => {
                xml += `  <url>\n    <loc>${BASE_URL}/${pathPrefix}/${encodeURIComponent(item)}</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
              });
            } else {
               // Minimal fallback for root entity type if no specific items exist
               xml += `  <url>\n    <loc>${BASE_URL}/${pathPrefix}</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
            }
        }
    }

    xml += `</urlset>`;
    
    // Critical validation: NEVER output an empty <urlset>
    if (!xml.includes('<url>')) {
        return new NextResponse('Not Found', { status: 404 });
    }
    
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Fatal Sitemap Error:', error);
    // Returning 404 is safer than returning an empty <urlset> which triggers GSC malformed errors
    return new NextResponse('Not Found', { status: 404 });
  }
}
