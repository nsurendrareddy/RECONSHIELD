/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['recharts', 'lucide-react'],
    nextScriptWorkers: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://news.google.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://cdn.sanity.io https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org https://c.tile.openstreetmap.org; font-src 'self' data:; connect-src 'self' https://*.google-analytics.com https://cdn.sanity.io https://*.api.sanity.io wss://*.api.sanity.io https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://fundingchoicesmessages.google.com https://reconshield.onrender.com http://127.0.0.1:* http://localhost:*; frame-src 'self' https://news.google.com https://googleads.g.doubleclick.net https://fundingchoicesmessages.google.com;" }
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:10000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/threat-intelligence',
        destination: '/tools/ip-lookup',
        permanent: true,
      },
      {
        source: '/tools/threat-intelligence',
        destination: '/tools/ip-lookup',
        permanent: true,
      },
      { source: '/ip-scanner', destination: '/tools/ip-lookup', permanent: true },
      { source: '/ip-lookup', destination: '/tools/ip-lookup', permanent: true },
      { source: '/whois', destination: '/tools/whois', permanent: true },
      { source: '/dns-lookup', destination: '/tools/dns-lookup', permanent: true },
      { source: '/port-scanner', destination: '/tools/port-scanner', permanent: true },
      { source: '/security-headers', destination: '/tools/http-headers', permanent: true },
      { source: '/ssl-checker', destination: '/tools/ssl-checker', permanent: true },
      { source: '/vulnerability-scanner', destination: '/tools/vulnerability-scanner', permanent: true },
      { source: '/subdomains', destination: '/tools/subdomain-finder', permanent: true }
    ];
  },
};

export default nextConfig;
