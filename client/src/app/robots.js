export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/ip/',
        '/domain/',
        '/dns-records/',
        '/ports/',
        '/ssl/',
        '/subdomains/',
        '/asn/',
        '/api/',
        '/reports/',
        '/scan/',
        '/lookup/'
      ],
    },
    sitemap: 'https://reconshield.in/sitemap.xml',
  }
}
