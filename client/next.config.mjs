/** @type {import('next').NextConfig} */
const adsenseDomains = [
  'https://pagead2.googlesyndication.com',
  'https://*.googlesyndication.com',
  'https://tpc.googlesyndication.com',
  'https://googleads.g.doubleclick.net',
  'https://*.g.doubleclick.net',
  'https://www.google.com',
  'https://adservice.google.com',
  'https://*.adtrafficquality.google'
];

const adsenseDomainSources = adsenseDomains.join(' ');

const isDev = process.env.NODE_ENV !== 'production';

const cspHeader = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com ${adsenseDomainSources}`,
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
  `img-src 'self' blob: data: https://cdn.sanity.io https://*.googleusercontent.com https://www.google-analytics.com ${adsenseDomainSources}`,
  `font-src 'self' data: https://fonts.gstatic.com`,
  `connect-src 'self' https://api.reconshield.in https://*.google-analytics.com https://www.google-analytics.com https://www.googletagmanager.com https://cdn.sanity.io https://*.api.sanity.io wss://*.api.sanity.io http://127.0.0.1:* http://localhost:* ${adsenseDomainSources}`,
  `frame-src 'self' ${adsenseDomainSources}`,
  `child-src 'self' blob:`,
  "worker-src 'self' blob:"
].join('; ');

const nextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['recharts', 'lucide-react', 'framer-motion', '@xyflow/react', 'leaflet', 'react-leaflet'],
  },
  trailingSlash: false,
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
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'Content-Security-Policy', value: cspHeader }
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
      {
        source: '/sanity-cdn/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, immutable, max-age=31536000' }],
      },
      {
        source: '/(images|icons|favicons|logos)/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/manifest.json',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      {
        source: '/og-image.png',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }],
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
        source: '/sanity-cdn/:path*',
        destination: 'https://cdn.sanity.io/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      { source: '/ssl/ssl-vs-tls', destination: '/compare/ssl-vs-tls', permanent: true },
      { source: '/ssl/tls-1-2-vs-tls-1-3', destination: '/compare/tls-1-2-vs-tls-1-3', permanent: true },
      { source: '/compare/port-scan-vs-vulnerability-scan', destination: '/compare/port-scanner-vs-vulnerability-scanner', permanent: true },
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
      { source: '/ip-lookup/:path*', destination: '/tools/ip-lookup/:path*', permanent: true },
      { source: '/whois', destination: '/tools/whois', permanent: true },
      { source: '/whois/:path*', destination: '/tools/whois/:path*', permanent: true },
      { source: '/whois-lookup', destination: '/tools/whois', permanent: true },
      { source: '/dns-lookup', destination: '/tools/dns-lookup', permanent: true },
      { source: '/dns-lookup/:path*', destination: '/tools/dns-lookup/:path*', permanent: true },
      { source: '/reverse-dns', destination: '/tools/dns-lookup', permanent: true },
      { source: '/asn-lookup', destination: '/tools/ip-lookup', permanent: true },
      { source: '/port-scanner', destination: '/tools/port-scanner', permanent: true },
      { source: '/security-headers', destination: '/tools/http-headers', permanent: true },
      { source: '/ssl-checker', destination: '/tools/ssl-checker', permanent: true },
      { source: '/vulnerability-scanner', destination: '/tools/vulnerability-scanner', permanent: true },
      { source: '/dns/:domain', destination: '/dns-records/:domain', permanent: true },
      { source: '/blog/categories', destination: '/blog', permanent: true },
      { source: '/blog/categories/:slug', destination: '/blog/category/:slug', permanent: true }
    ];
  },
};

export default nextConfig;
