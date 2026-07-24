export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/reports/'
      ],
    },
    sitemap: 'https://reconshield.in/sitemap.xml',
  }
}

