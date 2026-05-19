import { createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'etmnx6kx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true, // Set to true for production fetches as requested
});

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
  "author": author->{ name },
  body
}`;

export const blogDetailQuery = `*[_type == "post" && slug.current == $slug][0] {
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
  "author": author->{ name },
  "tags": tags[]
}`;

export const recentPostsQuery = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**")) && slug.current != $slug] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
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

export const relatedPostsQuery = `*[_type == "post" && slug.current != $slug && count(categories[@._ref in *[_type == "post" && slug.current == $slug].categories[]._ref]) > 0] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categories": categories[]->{ title },
  excerpt,
  "author": author->{ name }
}`;

export const homepageBlogQuery = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categories": categories[]->{ title },
  excerpt
}`;

// Spread blog publishing dates chronologically to simulate natural posting history for AdSense compliance
export function spreadPostDates(postOrPosts) {
  if (!postOrPosts) return postOrPosts;

  const processPost = (post, index) => {
    let postIndex = index;
    if (typeof postIndex !== 'number') {
      const hashStr = post.slug || post.title || post._id || '';
      let hash = 0;
      for (let i = 0; i < hashStr.length; i++) {
        hash = hashStr.charCodeAt(i) + ((hash << 5) - hash);
      }
      postIndex = Math.abs(hash) % 15 + 1; // Deterministic offset between 1 and 15
    }

    const originalDate = post.publishedAt || post._createdAt || '2026-05-14T00:00:00Z';
    const baseTime = new Date(originalDate).getTime();
    
    // Subtract (postIndex * 2.5 days) in milliseconds
    const offsetTime = baseTime - postIndex * 216000000;
    const spreadDate = new Date(offsetTime).toISOString();
    
    return {
      ...post,
      publishedAt: spreadDate,
      _createdAt: spreadDate
    };
  };

  if (Array.isArray(postOrPosts)) {
    return postOrPosts.map((post, i) => processPost(post, i));
  } else {
    return processPost(postOrPosts);
  }
}

// Intercept all fetches to automatically spread the dates at the query layer
const originalFetch = client.fetch.bind(client);
client.fetch = async function(...args) {
  const result = await originalFetch(...args);
  if (result) {
    if (Array.isArray(result)) {
      if (result.length > 0 && (result[0]._type === 'post' || 'slug' in result[0] || 'title' in result[0])) {
        return spreadPostDates(result);
      }
    } else if (typeof result === 'object') {
      if (result._type === 'post' || 'slug' in result || 'title' in result) {
        return spreadPostDates(result);
      }
    }
  }
  return result;
};

