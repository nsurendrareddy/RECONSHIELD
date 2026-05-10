const { createClient } = require('next-sanity');

// Sanity client configuration for sitemap generation
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'etmnx6kx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://reconshield.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml'], // Exclude if you have server-side sitemap
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  additionalPaths: async (config) => {
    try {
      const posts = await client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current, "_updatedAt": _updatedAt }`);
      return posts.map(p => ({
        loc: `/blog/${p.slug}`,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: p._updatedAt || new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error fetching posts for sitemap:', error);
      return [];
    }
  },
};
