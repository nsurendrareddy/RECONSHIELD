import { NextResponse } from 'next/server';
import { TOOLS } from '@/utils/toolsData';
import { client, blogListQuery } from '@/utils/sanity';
import { MOCK_POSTS_DATA } from '@/utils/mockBlogData';
import { 
  KNOWN_IPS, 
  KNOWN_ASNS, 
  KNOWN_PORTS, 
  KNOWN_HEADERS, 
  KNOWN_DOMAINS 
} from '@/lib/entityRegistry';
import { DNS_TYPES_DATA } from '@/utils/dnsTypesData';
import { SSL_ERRORS_DATA } from '@/utils/sslErrorsData';
import { EMAIL_AUTHS_DATA } from '@/utils/emailAuthsData';
import { COMPARISONS_DATA } from '@/utils/comparisonsData';

export const runtime = 'edge'; 

const BASE_URL = 'https://reconshield.in';
const STATIC_LAST_MODIFIED = new Date().toISOString();

// Centralized sitemap fallback data generated from verified existing pages
const FALLBACK_DATA = {
  ports: KNOWN_PORTS.map(String),
  headers: KNOWN_HEADERS,
  ssl: KNOWN_DOMAINS,
  asn: KNOWN_ASNS,
  ip: KNOWN_IPS.slice(0, 5),
  dns: KNOWN_DOMAINS,
  whois: KNOWN_DOMAINS,
  subdomains: KNOWN_DOMAINS,
  'malicious-ips': ['185.191.171.2', '194.165.16.2'],
  'dns-types': Object.keys(DNS_TYPES_DATA),
  'ssl-errors': Object.keys(SSL_ERRORS_DATA),
  'email-auths': Object.keys(EMAIL_AUTHS_DATA)
};

// Local registry verification to filter invalid/non-200 urls
function isUrlIndexableAndValid(urlStr) {
  try {
    const url = new URL(urlStr);
    const path = url.pathname;
    
    // Check ports
    if (path.startsWith('/ports/')) {
      const port = path.replace('/ports/', '');
      return KNOWN_PORTS.includes(parseInt(port, 10));
    }
    
    // Check IPs
    if (path.startsWith('/ip/')) {
      const ip = path.replace('/ip/', '');
      return KNOWN_IPS.includes(ip);
    }
    
    // Check ASNs
    if (path.startsWith('/asn/')) {
      const asn = path.replace('/asn/', '');
      return KNOWN_ASNS.includes(asn.toUpperCase());
    }
    
    // Check headers
    if (path.startsWith('/headers/')) {
      const header = path.replace('/headers/', '');
      return KNOWN_HEADERS.includes(header.toLowerCase());
    }
    
    // Check SSL Errors first, then domain-specific SSL paths
    if (path.startsWith('/ssl/errors/')) {
      const err = path.replace('/ssl/errors/', '');
      return Object.keys(SSL_ERRORS_DATA).includes(err);
    }
    if (path.startsWith('/ssl/')) {
      const domain = path.replace('/ssl/', '');
      return KNOWN_DOMAINS.includes(domain.toLowerCase());
    }

    // Check DNS Types first, then domain-specific DNS paths
    if (path.startsWith('/dns-records/types/')) {
      const type = path.replace('/dns-records/types/', '');
      return Object.keys(DNS_TYPES_DATA).includes(type);
    }
    if (path.startsWith('/dns-records/')) {
      const domain = path.replace('/dns-records/', '');
      return KNOWN_DOMAINS.includes(domain.toLowerCase());
    }

    // Check Email Auths
    if (path.startsWith('/email-auth/')) {
      const auth = path.replace('/email-auth/', '');
      return Object.keys(EMAIL_AUTHS_DATA).includes(auth);
    }
    
    if (path.startsWith('/subdomains/')) {
      const domain = path.replace('/subdomains/', '');
      return KNOWN_DOMAINS.includes(domain.toLowerCase());
    }
    if (path.startsWith('/tools/whois/')) {
      const domain = path.replace('/tools/whois/', '');
      return KNOWN_DOMAINS.includes(domain.toLowerCase());
    }

    // Default true for core static pages, blog posts, and scanner tools
    return true;
  } catch (e) {
    return false;
  }
}

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
        { url: `${BASE_URL}/research-methodology`, priority: 0.5, freq: 'monthly' },
        { url: `${BASE_URL}/security-disclosure`, priority: 0.5, freq: 'monthly' },
        { url: `${BASE_URL}/research`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/reports`, priority: 0.7, freq: 'weekly' },
        { url: `${BASE_URL}/studies`, priority: 0.7, freq: 'weekly' },
        { url: `${BASE_URL}/authors`, priority: 0.6, freq: 'monthly' },
        { url: `${BASE_URL}/editorial-standards`, priority: 0.6, freq: 'monthly' },
        { url: `${BASE_URL}/fact-checking-policy`, priority: 0.6, freq: 'monthly' },
        { url: `${BASE_URL}/data-sources`, priority: 0.6, freq: 'monthly' },
        { url: `${BASE_URL}/research-team`, priority: 0.6, freq: 'monthly' },
        { url: `${BASE_URL}/compare`, priority: 0.8, freq: 'weekly' },
      ];

      // Append dynamic comparison URLs
      Object.keys(COMPARISONS_DATA).forEach(slug => {
        staticUrls.push({ url: `${BASE_URL}/compare/${slug}`, priority: 0.8, freq: 'weekly' });
      });

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
             let safePosts = (posts || []).filter(post => post?.slug?.current || typeof post?.slug === 'string');
             
             if (safePosts.length === 0) {
                 safePosts = Object.values(MOCK_POSTS_DATA);
             }
             
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
                !u.url.includes('null') &&
                !u.url.includes(' ') &&
                !u.url.includes('(') &&
                !u.url.includes(')') &&
                isUrlIndexableAndValid(u.url)
             );

             if (validUrls.length > 0) {
                  hasData = true;
                  
                  // Deduplicate URLs to prevent duplicate URL nodes
                  const uniqueUrls = new Map();
                  validUrls.forEach(u => uniqueUrls.set(u.url, u));
                  
                  for (const u of Array.from(uniqueUrls.values())) {
                    const safeUrl = u.url.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
                    const lastmod = u.lastmod || STATIC_LAST_MODIFIED;
                    const changefreq = u.changefreq || 'weekly';
                    const priority = u.priority || '0.6';
                    xml += `  <url>\n    <loc>${safeUrl}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
                  }
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
            if (entityType === 'cve') pathPrefix = 'cve';
            if (entityType === 'whois') pathPrefix = 'tools/whois';
            if (entityType === 'dns-types') pathPrefix = 'dns-records/types';
            if (entityType === 'ssl-errors') pathPrefix = 'ssl/errors';
            if (entityType === 'email-auths') pathPrefix = 'email-auth';
            
            if (fallbackItems.length > 0) {
              for (const item of fallbackItems) {
                const url = `${BASE_URL}/${pathPrefix}/${encodeURIComponent(item)}`;
                if (isUrlIndexableAndValid(url)) {
                  xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
                }
              }
            } else {
               // Minimal fallback for root entity type if no specific items exist
               const rootUrl = `${BASE_URL}/${pathPrefix}`;
               xml += `  <url>\n    <loc>${rootUrl}</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
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
    return new NextResponse('Not Found', { status: 404 });
  }
}
