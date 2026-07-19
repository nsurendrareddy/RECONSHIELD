export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/ip/',
        '/domain/',
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
