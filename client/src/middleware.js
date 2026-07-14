import { NextResponse } from 'next/server';
import { 
  KNOWN_IPS, 
  KNOWN_ASNS, 
  KNOWN_PORTS, 
  KNOWN_HEADERS, 
  KNOWN_DOMAINS 
} from './lib/entityRegistry';

// Configuration for routes the middleware should run on
export const config = {
  matcher: [],
};

// Private IPv4 ranges (RFC 1918) and localhost (RFC 1122)
const isPrivateIP = (ip) => {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  const p1 = parseInt(parts[0], 10);
  const p2 = parseInt(parts[1], 10);
  
  // 10.0.0.0/8
  if (p1 === 10) return true;
  // 172.16.0.0/12
  if (p1 === 172 && p2 >= 16 && p2 <= 31) return true;
  // 192.168.0.0/16
  if (p1 === 192 && p2 === 168) return true;
  // 127.0.0.0/8 (Localhost)
  if (p1 === 127) return true;
  // 169.254.0.0/16 (Link-local)
  if (p1 === 169 && p2 === 254) return true;
  
  return false;
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Redirect legacy /dns/ routes to /dns-records/
  if (pathname.startsWith('/dns/')) {
    const domain = decodeURIComponent(pathname.replace('/dns/', '').split('/')[0]).toLowerCase();
    return NextResponse.redirect(new URL(`/dns-records/${domain}`, request.url), 301);
  }

  // Redirect /tools/whois/[domain] to /domain/[domain]
  if (pathname.startsWith('/tools/whois/')) {
    const remaining = pathname.replace('/tools/whois/', '').split('/')[0];
    if (remaining) {
      const domain = decodeURIComponent(remaining).toLowerCase();
      const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
      if (domainRegex.test(domain)) {
        return NextResponse.redirect(new URL(`/domain/${domain}`, request.url), 301);
      }
    }
  }
  
  // 1. IP Validation & Crawl Budget Control
  if (pathname.startsWith('/ip/')) {
    const ip = pathname.replace('/ip/', '').split('/')[0];
    
    // Check if it's a valid IPv4 or IPv6 pattern
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$/;
    
    if (!ipv4Regex.test(ip) && !ipv6Regex.test(ip)) {
      return new NextResponse('Invalid IP format', { status: 400 });
    }
    
    // Prevent crawling/rendering of private and internal IP blocks
    if (ipv4Regex.test(ip) && isPrivateIP(ip)) {
      return new NextResponse('Private/Internal IPs are restricted from scanning to prevent abuse.', { status: 403 });
    }

    // Verify IP exists in our registry
    if (!KNOWN_IPS.includes(ip)) {
      return new NextResponse('IP Address Not Found in Threat Database', { status: 404 });
    }
  }

  // 2. Port Validation
  if (pathname.startsWith('/ports/')) {
    const portStr = pathname.replace('/ports/', '').split('/')[0];
    const port = parseInt(portStr, 10);
    
    if (isNaN(port) || port < 1 || port > 65535) {
      return new NextResponse('Invalid Port Range', { status: 400 });
    }

    // Verify port exists in our registry
    if (!KNOWN_PORTS.includes(port)) {
      return new NextResponse('Port Security Analysis Profile Not Found', { status: 404 });
    }
  }

  // 3. ASN Validation
  if (pathname.startsWith('/asn/')) {
    const asnRaw = pathname.replace('/asn/', '').split('/')[0];
    
    // Extract ASN number format
    const match = asnRaw.match(/^(?:AS)?(\d+)$/i);
    if (!match) {
      return new NextResponse('Invalid Autonomous System Number format', { status: 400 });
    }
    
    const formattedAsn = `AS${match[1]}`;

    // Verify ASN exists in our registry
    if (!KNOWN_ASNS.includes(formattedAsn)) {
      return new NextResponse('ASN Infrastructure Profile Not Found', { status: 404 });
    }
  }

  // 4. Headers Validation
  if (pathname.startsWith('/headers/')) {
    const header = pathname.replace('/headers/', '').split('/')[0].toLowerCase();
    
    if (!KNOWN_HEADERS.includes(header)) {
      return new NextResponse('HTTP Header Security Analysis Not Found', { status: 404 });
    }
  }

  // 5. Domain Validation (Applies to multiple routes)
  const domainRoutes = ['/ssl/', '/dns-records/', '/tools/whois/', '/subdomains/'];
  const matchingRoute = domainRoutes.find(route => pathname.startsWith(route));
  
  if (matchingRoute) {
    if (pathname.startsWith('/ssl/errors')) {
      return NextResponse.next();
    }
    if (pathname.startsWith('/dns-records/types')) {
      return NextResponse.next();
    }

    const domain = decodeURIComponent(pathname.replace(matchingRoute, '').split('/')[0]).toLowerCase();
    
    // Whitelist programmatic topic guides
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
    
    if (matchingRoute === '/ssl/' && sslTopics.includes(domain)) {
      return NextResponse.next();
    }
    if (matchingRoute === '/subdomains/' && subdomainTopics.includes(domain)) {
      return NextResponse.next();
    }
    
    // Basic domain validation
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    if (!domainRegex.test(domain) || domain.length > 253) {
      return new NextResponse('Invalid Domain Format', { status: 400 });
    }

    // Verify domain exists in our registry
    if (!KNOWN_DOMAINS.includes(domain)) {
      return new NextResponse('Domain Infrastructure Profile Not Found', { status: 404 });
    }
  }

  // Allow valid requests to proceed
  return NextResponse.next();
}
