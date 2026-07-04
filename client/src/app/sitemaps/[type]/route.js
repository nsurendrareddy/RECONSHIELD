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
import { RESEARCH_REPORTS } from '@/utils/researchReportsData';
import { GLOSSARY_TERMS } from '@/utils/glossaryData';
import { SSL_TOPICS_DATA, SUBDOMAIN_TOPICS_DATA } from '@/utils/programmaticTopicsData';

export const runtime = 'edge'; 

const BASE_URL = 'https://reconshield.in';
const STATIC_LAST_MODIFIED = new Date().toISOString();

// Centralized sitemap fallback data generated from verified existing pages
const FALLBACK_DATA = {
  ports: KNOWN_PORTS.map(String),
  headers: KNOWN_HEADERS,
  ssl: [
    'certificate-chain', 
    'cipher-suites', 
    'self-signed-certificate',
    'wildcard-certificate',
    'pki-explained',
    'https-security'
  ],
  asn: [],
  ip: [],
  dns: KNOWN_DOMAINS,
  whois: [],
  subdomains: [
    'subdomain-enumeration', 
    'passive-enumeration', 
    'certificate-transparency', 
    'subdomain-takeover', 
    'shadow-it',
    'active-enumeration',
    'asset-discovery',
    'attack-surface-management'
  ],
  'malicious-ips': [],
  'dns-types': [],
  'ssl-errors': [],
  'email-auths': Object.keys(EMAIL_AUTHS_DATA),
  technology: ['react', 'nextjs', 'wordpress', 'shopify', 'cloudflare', 'nginx', 'apache'],
  vulnerability: ['sql-injection', 'stored-xss', 'reflected-xss', 'dom-xss', 'csrf', 'clickjacking', 'open-redirect', 'exposed-git', 'exposed-env', 'directory-listing', 'missing-csp', 'missing-hsts', 'missing-x-frame-options', 'missing-x-content-type-options', 'missing-dmarc', 'missing-spf', 'expired-ssl']
};

// Local registry verification to filter invalid/non-200 urls
function isUrlIndexableAndValid(urlStr) {
  try {
    const url = new URL(urlStr);
    const path = url.pathname;
    
    // Normalize path to remove trailing slash
    let cleanPath = path;
    if (cleanPath.endsWith('/') && cleanPath !== '/') {
      cleanPath = cleanPath.slice(0, -1);
    }
    
    // Exclude any known redirecting paths to ensure no 301/302/307/308 in sitemap
    const redirectPaths = [
      '/ssl/ssl-vs-tls',
      '/ssl/tls-1-2-vs-tls-1-3',
      '/compare/port-scan-vs-vulnerability-scan',
      '/threat-intelligence',
      '/tools/threat-intelligence',
      '/ip-scanner',
      '/ip-lookup',
      '/whois',
      '/whois-lookup',
      '/dns-lookup',
      '/reverse-dns',
      '/asn-lookup',
      '/port-scanner',
      '/security-headers',
      '/ssl-checker',
      '/vulnerability-scanner',
      '/blog/categories'
    ];
    if (redirectPaths.includes(cleanPath)) return false;
    
    // Exclude legacy routes and internal redirects
    if (
      cleanPath.startsWith('/tools/whois/') ||
      cleanPath.startsWith('/dns/') ||
      cleanPath.startsWith('/ip-lookup/') ||
      cleanPath.startsWith('/whois/') ||
      cleanPath.startsWith('/dns-lookup/') ||
      cleanPath.startsWith('/blog/categories/') ||
      cleanPath.startsWith('/reports/') ||
      cleanPath.startsWith('/admin/') ||
      cleanPath.startsWith('/search')
    ) {
      return false;
    }

    // Exclude dynamic tool scanning pages (e.g. /tools/[toolId]/[domain] or /tools/port-scanner/[host])
    // Since these pages are configured with noindex in metadata
    const toolsParts = cleanPath.split('/');
    if (toolsParts[1] === 'tools' && toolsParts.length > 3) {
      return false;
    }

    // Exclude lookup routes and others configured as noindex
    if (
      cleanPath.startsWith('/ip/') ||
      cleanPath.startsWith('/asn/') ||
      cleanPath.startsWith('/domain/') ||
      cleanPath.startsWith('/dns-records/types/') ||
      cleanPath.startsWith('/ssl/errors/')
    ) {
      return false;
    }

    // Check ports
    if (cleanPath.startsWith('/ports/')) {
      const port = cleanPath.replace('/ports/', '');
      return KNOWN_PORTS.includes(parseInt(port, 10));
    }
    
    // Check headers
    if (cleanPath.startsWith('/headers/')) {
      const header = cleanPath.replace('/headers/', '');
      return KNOWN_HEADERS.includes(header.toLowerCase());
    }
    
    // Check SSL
    if (cleanPath.startsWith('/ssl/')) {
      const domain = cleanPath.replace('/ssl/', '').toLowerCase();
      const sslTopics = [
        'ssl-vs-tls', 
        'tls-1-2-vs-tls-1-3', 
        'certificate-chain', 
        'cipher-suites', 
        'self-signed-certificate',
        'wildcard-certificate',
        'pki-explained',
        'https-security'
      ];
      return sslTopics.includes(domain);
    }

    // Check DNS Records
    if (cleanPath.startsWith('/dns-records/')) {
      const domain = cleanPath.replace('/dns-records/', '');
      return KNOWN_DOMAINS.includes(domain.toLowerCase());
    }

    // Check Email Auths
    if (cleanPath.startsWith('/email-auth/')) {
      const auth = cleanPath.replace('/email-auth/', '');
      return Object.keys(EMAIL_AUTHS_DATA).includes(auth.toLowerCase());
    }
    
    // Check Subdomains
    if (cleanPath.startsWith('/subdomains/')) {
      const domain = cleanPath.replace('/subdomains/', '').toLowerCase();
      const subdomainTopics = [
        'subdomain-enumeration', 
        'passive-enumeration', 
        'certificate-transparency', 
        'subdomain-takeover', 
        'shadow-it',
        'active-enumeration',
        'asset-discovery',
        'attack-surface-management'
      ];
      return subdomainTopics.includes(domain);
    }

    // Check Technology
    if (cleanPath.startsWith('/technology/')) {
      const slug = cleanPath.replace('/technology/', '');
      return ['react', 'nextjs', 'wordpress', 'shopify', 'cloudflare', 'nginx', 'apache'].includes(slug.toLowerCase());
    }

    // Check Vulnerability
    if (cleanPath.startsWith('/vulnerability/')) {
      const slug = cleanPath.replace('/vulnerability/', '');
      return ['sql-injection', 'stored-xss', 'reflected-xss', 'dom-xss', 'csrf', 'clickjacking', 'open-redirect', 'exposed-git', 'exposed-env', 'directory-listing', 'missing-csp', 'missing-hsts', 'missing-x-frame-options', 'missing-x-content-type-options', 'missing-dmarc', 'missing-spf', 'expired-ssl'].includes(slug.toLowerCase());
    }

    // Default true for core static pages, blog posts, and tool hubs
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
        { url: `${BASE_URL}/methodology`, priority: 0.6, freq: 'monthly' },
        { url: `${BASE_URL}/update-policy`, priority: 0.5, freq: 'monthly' },
        { url: `${BASE_URL}/glossary`, priority: 0.7, freq: 'weekly' },
        { url: `${BASE_URL}/opensource`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/academic`, priority: 0.7, freq: 'weekly' },
        { url: `${BASE_URL}/resources`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/stats`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/about-reconshield`, priority: 0.7, freq: 'monthly' },
        { url: `${BASE_URL}/press`, priority: 0.7, freq: 'monthly' },
        { url: `${BASE_URL}/stats/tls-adoption`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/stats/tls-adoption/2026-06`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/stats/tls-adoption/2026-05`, priority: 0.7, freq: 'monthly' },
        { url: `${BASE_URL}/stats/security-headers`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/stats/security-headers/2026-06`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/stats/security-headers/2026-05`, priority: 0.7, freq: 'monthly' },
        { url: `${BASE_URL}/stats/email-security`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/stats/email-security/2026-06`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/stats/email-security/2026-05`, priority: 0.7, freq: 'monthly' },
        { url: `${BASE_URL}/stats/open-port-exposure`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/stats/open-port-exposure/2026-06`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/stats/open-port-exposure/2026-05`, priority: 0.7, freq: 'monthly' },
        { url: `${BASE_URL}/stats/subdomain-security`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/stats/subdomain-security/2026-06`, priority: 0.8, freq: 'weekly' },
        { url: `${BASE_URL}/stats/subdomain-security/2026-05`, priority: 0.7, freq: 'monthly' },
      ];

      // Append dynamic comparison URLs
      Object.keys(COMPARISONS_DATA).forEach(slug => {
        staticUrls.push({ url: `${BASE_URL}/compare/${slug}`, priority: 0.8, freq: 'weekly' });
      });

      // Append research reports URLs
      Object.keys(RESEARCH_REPORTS).forEach(slug => {
        staticUrls.push({ url: `${BASE_URL}/research/${slug}`, priority: 0.7, freq: 'weekly' });
      });

      // Append glossary URLs
      Object.keys(GLOSSARY_TERMS).forEach(slug => {
        staticUrls.push({ url: `${BASE_URL}/glossary/${slug}`, priority: 0.8, freq: 'weekly' });
      });

      // Append SSL topics URLs
      Object.keys(SSL_TOPICS_DATA).forEach(slug => {
        if (slug === 'ssl-vs-tls' || slug === 'tls-1-2-vs-tls-1-3') {
          return;
        }
        staticUrls.push({ url: `${BASE_URL}/ssl/${slug}`, priority: 0.7, freq: 'weekly' });
      });

      // Append Subdomain topics URLs
      Object.keys(SUBDOMAIN_TOPICS_DATA).forEach(slug => {
        staticUrls.push({ url: `${BASE_URL}/subdomains/${slug}`, priority: 0.7, freq: 'weekly' });
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
                const rawSlug = post?.slug?.current || post?.slug;
                if (rawSlug && typeof rawSlug === 'string') {
                    const slug = rawSlug.trim();
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
             const mappedUrls = extractedUrls.map(u => {
                  if (u && typeof u.url === 'string') {
                     let newUrl = u.url;
                     
                     // Canonicalize redirects dynamically
                     if (newUrl.includes('/ssl/ssl-vs-tls')) newUrl = newUrl.replace('/ssl/ssl-vs-tls', '/compare/ssl-vs-tls');
                     else if (newUrl.includes('/ssl/tls-1-2-vs-tls-1-3')) newUrl = newUrl.replace('/ssl/tls-1-2-vs-tls-1-3', '/compare/tls-1-2-vs-tls-1-3');
                     else if (newUrl.includes('/compare/port-scan-vs-vulnerability-scan')) newUrl = newUrl.replace('/compare/port-scan-vs-vulnerability-scan', '/compare/port-scanner-vs-vulnerability-scanner');
                     else if (newUrl.includes('/threat-intelligence')) newUrl = newUrl.replace('/threat-intelligence', '/tools/ip-lookup');
                     else if (newUrl.includes('/tools/threat-intelligence')) newUrl = newUrl.replace('/tools/threat-intelligence', '/tools/ip-lookup');
                     else if (newUrl.includes('/ip-scanner')) newUrl = newUrl.replace('/ip-scanner', '/tools/ip-lookup');
                     else if (newUrl.includes('/ip-lookup') && !newUrl.includes('/tools/ip-lookup')) newUrl = newUrl.replace('/ip-lookup', '/tools/ip-lookup');
                     else if (newUrl.includes('/whois') && !newUrl.includes('/tools/whois') && !newUrl.includes('/whois-lookup')) newUrl = newUrl.replace('/whois', '/tools/whois');
                     else if (newUrl.includes('/whois-lookup')) newUrl = newUrl.replace('/whois-lookup', '/tools/whois');
                     else if (newUrl.includes('/dns-lookup') && !newUrl.includes('/tools/dns-lookup')) newUrl = newUrl.replace('/dns-lookup', '/tools/dns-lookup');
                     else if (newUrl.includes('/reverse-dns')) newUrl = newUrl.replace('/reverse-dns', '/tools/dns-lookup');
                     else if (newUrl.includes('/asn-lookup')) newUrl = newUrl.replace('/asn-lookup', '/tools/ip-lookup');
                     else if (newUrl.includes('/port-scanner') && !newUrl.includes('/tools/port-scanner')) newUrl = newUrl.replace('/port-scanner', '/tools/port-scanner');
                     else if (newUrl.includes('/security-headers')) newUrl = newUrl.replace('/security-headers', '/tools/http-headers');
                     else if (newUrl.includes('/ssl-checker') && !newUrl.includes('/tools/ssl-checker')) newUrl = newUrl.replace('/ssl-checker', '/tools/ssl-checker');
                     else if (newUrl.includes('/vulnerability-scanner') && !newUrl.includes('/tools/vulnerability-scanner')) newUrl = newUrl.replace('/vulnerability-scanner', '/tools/vulnerability-scanner');
                     
                     if (newUrl.includes('/tools/whois/') && !newUrl.includes('/domain/')) {
                         newUrl = newUrl.replace('/tools/whois/', '/domain/');
                     }
                     if (newUrl.includes('/dns/') && !newUrl.includes('/dns-records/')) {
                         newUrl = newUrl.replace('/dns/', '/dns-records/');
                     }
                     if (newUrl.includes('/ip-lookup/') && !newUrl.includes('/tools/ip-lookup/')) {
                         newUrl = newUrl.replace('/ip-lookup/', '/tools/ip-lookup/');
                     }
                     if (newUrl.includes('/whois/') && !newUrl.includes('/tools/whois/')) {
                         newUrl = newUrl.replace('/whois/', '/tools/whois/');
                      }
                     if (newUrl.includes('/dns-lookup/') && !newUrl.includes('/tools/dns-lookup/')) {
                         newUrl = newUrl.replace('/dns-lookup/', '/tools/dns-lookup/');
                      }
                     if (newUrl.includes('/blog/categories/')) {
                         newUrl = newUrl.replace('/blog/categories/', '/blog/category/');
                      }
                     return { ...u, url: newUrl };
                  }
                  return u;
               });
              const validUrls = mappedUrls.filter(
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
            if (entityType === 'whois') pathPrefix = 'domain';
            if (entityType === 'dns-types') pathPrefix = 'dns-records/types';
            if (entityType === 'ssl-errors') pathPrefix = 'ssl/errors';
            if (entityType === 'email-auths') pathPrefix = 'email-auth';
            if (entityType === 'technology') pathPrefix = 'technology';
            if (entityType === 'vulnerability') pathPrefix = 'vulnerability';
            
            if (fallbackItems.length > 0) {
              for (const item of fallbackItems) {
                const url = `${BASE_URL}/${pathPrefix}/${encodeURIComponent(item)}`;
                if (isUrlIndexableAndValid(url)) {
                  xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
                }

                // Add public report pages if applicable
                if (entityType === 'ssl' && KNOWN_DOMAINS.includes(item.toLowerCase())) {
                  const reportUrl = `${BASE_URL}/reports/ssl/${encodeURIComponent(item)}`;
                  if (isUrlIndexableAndValid(reportUrl)) {
                    xml += `  <url>\n    <loc>${reportUrl}</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
                  }
                }
                if (entityType === 'subdomains' && KNOWN_DOMAINS.includes(item.toLowerCase())) {
                  const reportUrl = `${BASE_URL}/reports/subdomains/${encodeURIComponent(item)}`;
                  if (isUrlIndexableAndValid(reportUrl)) {
                    xml += `  <url>\n    <loc>${reportUrl}</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
                  }
                }
                if (entityType === 'ports' && KNOWN_PORTS.includes(parseInt(item, 10))) {
                  // For ports, generate reports/ports/[host] using KNOWN_DOMAINS/KNOWN_IPS
                  KNOWN_DOMAINS.forEach(dom => {
                    const reportUrl = `${BASE_URL}/reports/ports/${encodeURIComponent(dom)}`;
                    if (isUrlIndexableAndValid(reportUrl)) {
                      xml += `  <url>\n    <loc>${reportUrl}</loc>\n    <lastmod>${STATIC_LAST_MODIFIED}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
                    }
                  });
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
