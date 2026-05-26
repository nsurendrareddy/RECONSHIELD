import { NextResponse } from 'next/server';

// Configuration for routes the middleware should run on
export const config = {
  matcher: [
    '/ip/:path*',
    '/asn/:path*',
    '/ports/:path*',
    '/ssl/:path*',
    '/dns/:path*',
    '/tools/whois/:path*',
    '/subdomains/:path*',
    '/headers/:path*'
  ],
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

const isValidPort = (portStr) => {
  const port = parseInt(portStr, 10);
  return !isNaN(port) && port >= 1 && port <= 65535;
};

const isValidASN = (asnStr) => {
  const match = asnStr?.match(/^(?:AS)?(\d+)$/i);
  if (!match) return false;
  const num = parseInt(match[1], 10);
  return num > 0 && num <= 4294967295;
};

const isValidDomain = (domain) => {
  // Basic validation. Prevents obvious junk.
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  return domainRegex.test(domain) && domain.length <= 253;
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
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
  }

  // 2. Port Validation
  if (pathname.startsWith('/ports/')) {
    const port = pathname.replace('/ports/', '').split('/')[0];
    if (!isValidPort(port)) {
      return new NextResponse('Invalid Port Range', { status: 400 });
    }
  }

  // 3. ASN Validation
  if (pathname.startsWith('/asn/')) {
    const asn = pathname.replace('/asn/', '').split('/')[0];
    if (!isValidASN(asn)) {
      return new NextResponse('Invalid Autonomous System Number', { status: 400 });
    }
  }

  // 4. Domain Validation (Applies to multiple routes)
  const domainRoutes = ['/ssl/', '/dns/', '/tools/whois/', '/subdomains/', '/headers/'];
  const matchingRoute = domainRoutes.find(route => pathname.startsWith(route));
  
  if (matchingRoute) {
    const domain = pathname.replace(matchingRoute, '').split('/')[0];
    if (!isValidDomain(domain)) {
      return new NextResponse('Invalid Domain Format', { status: 400 });
    }
  }

  // Allow valid requests to proceed
  return NextResponse.next();
}
