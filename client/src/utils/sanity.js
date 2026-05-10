import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'etmnx6kx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false, // Set to false to ensure we get the latest published content immediately
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return null;
  return builder.image(source);
};

// GROQ Queries
export const blogListQuery = `*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
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
  "author": author->{ name }
}`;
