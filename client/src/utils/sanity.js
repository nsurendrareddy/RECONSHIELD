import { createClient } from 'next-sanity';
import { cache } from 'react';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'etmnx6kx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false, // Set to false to bypass Sanity CDN cache, since Next.js handles caching via ISR
});

function trimSlugs(val) {
  if (!val) return val;
  if (Array.isArray(val)) {
    return val.map(trimSlugs);
  }
  if (typeof val === 'object') {
    const trimmed = {};
    for (const [key, value] of Object.entries(val)) {
      if (key === 'slug' && typeof value === 'string') {
        trimmed[key] = value.trim();
      } else if (key === 'slug' && value && typeof value === 'object' && typeof value.current === 'string') {
        trimmed[key] = {
          ...value,
          current: value.current.trim()
        };
      } else {
        trimmed[key] = trimSlugs(value);
      }
    }
    return trimmed;
  }
  return val;
}

function rewriteLegacyUrls(obj) {
  if (!obj) return obj;
  try {
    let serialized = JSON.stringify(obj);
    serialized = serialized
      .replaceAll('/compare/port-scan-vs-vulnerability-scan', '/compare/port-scanner-vs-vulnerability-scanner')
      .replaceAll('/ssl/ssl-vs-tls', '/compare/ssl-vs-tls')
      .replaceAll('/ssl/tls-1-2-vs-tls-1-3', '/compare/tls-1-2-vs-tls-1-3');
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Error rewriting legacy URLs in fetch result:', err);
    return obj;
  }
}

const originalFetch = client.fetch.bind(client);

// Memoize query execution using React cache and serialized arguments
const memoizedFetch = cache(async (query, paramsStr, optionsStr) => {
  const params = paramsStr ? JSON.parse(paramsStr) : undefined;
  const options = optionsStr ? JSON.parse(optionsStr) : undefined;
  return await originalFetch(query, params, options);
});

client.fetch = async function (query, params, options = {}) {
  // Fallback to false (indefinite edge cache) if no revalidate option is provided
  const revalValue = options.next?.revalidate !== undefined ? options.next.revalidate : false;
  options.cache = options.cache || 'force-cache';
  options.next = { 
    ...options.next, 
    revalidate: revalValue, 
    tags: options.next?.tags || [] 
  };
  
  // Serialize params and options to strings for exact argument matching in React cache
  const paramsStr = params ? JSON.stringify(params) : '';
  const optionsStr = options ? JSON.stringify(options) : '';
  
  const result = await memoizedFetch(query, paramsStr, optionsStr);
  const trimmed = trimSlugs(result);
  return rewriteLegacyUrls(trimmed);
};

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return null;
  return builder.image(source);
};

// GROQ Queries
export const blogListQuery = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categories": categories[]->{ title },
  excerpt,
  "author": author->{ name, "slug": slug.current, image },
  "estimatedWordCount": length(pt::text(body))
}`;

export const blogDetailQuery = `*[_type == "post" && (slug.current == $slug || slug.current == $slug + " " || slug.current == " " + $slug || slug.current == " " + $slug + " " || slug.current == $slug + "%20" || slug.current == "%20" + $slug)][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  "mainImageUrl": mainImage.asset->url,
  publishedAt,
  excerpt,
  body,
  "category": categories[0]->title,
  "categories": categories[]->{ title },
  "author": author->{ name, "slug": slug.current, image, bio },
  "tags": tags[]
}`;

export const recentPostsQuery = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**")) && !(slug.current == $slug || slug.current == $slug + " " || slug.current == " " + $slug || slug.current == " " + $slug + " " || slug.current == $slug + "%20" || slug.current == "%20" + $slug)] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categories": categories[]->{ title }
}`;

export const categoriesWithCountQuery = `*[_type == "category"] {
  _id,
  title,
  "count": count(*[_type == "post" && references(^._id)])
}`;

export const relatedPostsQuery = `*[_type == "post" && !(slug.current == $slug || slug.current == $slug + " " || slug.current == " " + $slug || slug.current == " " + $slug + " " || slug.current == $slug + "%20" || slug.current == "%20" + $slug) && count(categories[@._ref in *[_type == "post" && (slug.current == $slug || slug.current == $slug + " " || slug.current == " " + $slug || slug.current == " " + $slug + " " || slug.current == $slug + "%20" || slug.current == "%20" + $slug)].categories[]._ref]) > 0] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categories": categories[]->{ title },
  excerpt,
  "author": author->{ name, "slug": slug.current }
}`;

export const homepageBlogQuery = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc)[0...10] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categories": categories[]->{ title },
  excerpt,
  "author": author->{ name, "slug": slug.current },
  "estimatedWordCount": length(pt::text(body))
}`;

export const authorDetailQuery = `*[_type == "author" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  image,
  bio
}`;

export const authorPostsQuery = `*[_type == "post" && author->slug.current == $slug && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categories": categories[]->{ title },
  excerpt,
  "author": author->{ name, "slug": slug.current },
  "estimatedWordCount": length(pt::text(body))
}`;

export const blogSidebarQuery = `{
  "recent": *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**")) && !(slug.current == $slug || slug.current == $slug + " " || slug.current == " " + $slug || slug.current == " " + $slug + " " || slug.current == $slug + "%20" || slug.current == "%20" + $slug)] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
    _id, title, "slug": slug.current, mainImage, publishedAt, "categories": categories[]->{ title }
  },
  "categories": *[_type == "category"] {
    _id, title, "count": count(*[_type == "post" && references(^._id)])
  },
  "related": *[_type == "post" && !(slug.current == $slug || slug.current == $slug + " " || slug.current == " " + $slug || slug.current == " " + $slug + " " || slug.current == $slug + "%20" || slug.current == "%20" + $slug) && count(categories[@._ref in *[_type == "post" && (slug.current == $slug || slug.current == $slug + " " || slug.current == " " + $slug || slug.current == " " + $slug + " " || slug.current == $slug + "%20" || slug.current == "%20" + $slug)].categories[]._ref]) > 0] | order(publishedAt desc)[0...3] {
    _id, title, "slug": slug.current, mainImage, publishedAt, "categories": categories[]->{ title }, excerpt, "author": author->{ name, "slug": slug.current }
  }
}`;
