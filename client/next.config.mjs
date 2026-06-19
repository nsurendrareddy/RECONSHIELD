/** @type {import('next').NextConfig} */
const adDomains = [
  'https://ep1.adtrafficquality.google',
  'https://ep2.adtrafficquality.google'
];

const monetagDomains = [
  'https://n6wxm.com',
  'https://*.n6wxm.com',
  'https://nap5k.com',
  'https://*.nap5k.com'
];

const adsterraDomains = [
  'https://www.highperformanceformat.com',
  'https://*.highperformanceformat.com',
  'https://pl29692251.effectivecpmnetwork.com',
  'https://pl29692252.effectivecpmnetwork.com',
  'https://*.effectivecpmnetwork.com'
];

const additionalAdDomains = [
  'https://jhnwr.com',
  'https://*.jhnwr.com',
  'https://ldrws.com',
  'https://*.ldrws.com',
  'https://bobapsoabauns.com',
  'https://*.bobapsoabauns.com',
  'https://my.rtmark.net',
  'https://*.my.rtmark.net',
  'https://preferencenail.com',
  'https://*.preferencenail.com',
  'https://protrafficinspector.com',
  'https://*.protrafficinspector.com'
];

const allAdDomains = [...adDomains, ...monetagDomains, ...adsterraDomains, ...additionalAdDomains].join(' ');

const isDev = process.env.NODE_ENV !== 'production';

const cspHeader = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""} https://news.google.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://va.vercel-scripts.com ${allAdDomains}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  `img-src 'self' blob: data: https://cdn.sanity.io https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org https://c.tile.openstreetmap.org ${allAdDomains}`,
  "font-src 'self' data: https://fonts.gstatic.com",
  `connect-src 'self' https://*.google-analytics.com https://cdn.sanity.io https://*.api.sanity.io wss://*.api.sanity.io https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://fundingchoicesmessages.google.com https://reconshield.onrender.com http://127.0.0.1:* http://localhost:* ${allAdDomains}`,
  `frame-src 'self' https://news.google.com https://www.google.com https://googleads.g.doubleclick.net https://fundingchoicesmessages.google.com ${allAdDomains}`,
  `child-src 'self' blob: ${allAdDomains}`,
  "worker-src 'self' blob:"
].join('; ');

const nextConfig = {
  images: {
    unoptimized: true,
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
