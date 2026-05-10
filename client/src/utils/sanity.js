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
