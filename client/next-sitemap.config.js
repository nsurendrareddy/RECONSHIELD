const { createClient } = require('next-sanity');

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'etmnx6kx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

// Cache for blog posts to avoid redundant fetches during sitemap generation
let postsCache = null;
async function getPosts() {
  if (!postsCache) {
    try {
      postsCache = await client.fetch(`*[_type == "post" && defined(slug.current)]{ 
        "slug": slug.current, 
        title,
        "date": coalesce(publishedAt, _createdAt),
        _updatedAt 
      }`);
    } catch (error) {
      console.error('Error fetching posts for sitemap cache:', error);
      postsCache = [];
    }
  }
  return postsCache;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://reconshield.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml', '/apple-icon.png', '/icon.png'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  // Custom transform to handle priorities, frequencies, and Google News tags
  transform: async (config, path) => {
    // Default values
    let priority = config.priority;
    let changefreq = config.changefreq;
    let lastmod = config.autoLastmod ? new Date().toISOString() : undefined;
    let news = undefined;

    // 1. Handle Core Tool Pages
    if (['/ip-scanner', '/threat-intelligence', '/vulnerability-scanner'].includes(path)) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (['/ssl-checker', '/dns-lookup', '/security-headers'].includes(path)) {
      priority = 0.8;
      changefreq = 'weekly';
    } 
    // 2. Handle Homepage & Blog Hub
    else if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/blog') {
      priority = 0.9;
      changefreq = 'daily';
    }
    // 3. Handle About / Company
    else if (path === '/about') {
      priority = 0.5;
      changefreq = 'monthly';
    } else if (path === '/contact') {
      priority = 0.4;
      changefreq = 'monthly';
    } else if (path === '/privacy') {
      priority = 0.3;
      changefreq = 'yearly';
    } else if (path === '/terms') {
      priority = 0.3;
      changefreq = 'yearly';
    }

    // 4. Handle Blog Articles - Add Google News tags
    if (path.startsWith('/blog/') && path !== '/blog') {
      const slug = path.replace('/blog/', '');
      const posts = await getPosts();
      const post = posts.find(p => p.slug === slug);
      
      if (post) {
        priority = 0.7;
        changefreq = 'monthly';
        lastmod = post._updatedAt || post.date;
        news = {
          publication: {
            name: 'ReconShield',
            language: 'en',
          },
          publication_date: post.date || new Date().toISOString(),
          title: post.title,
        };
      }
    }

    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: lastmod,
      news: news,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  // Ensure dynamic blog posts are included in the sitemap
  additionalPaths: async (config) => {
    const posts = await getPosts();
    return posts.map(p => `/blog/${p.slug}`);
  },
};


