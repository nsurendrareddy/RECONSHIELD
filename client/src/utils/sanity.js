import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'etmnx6kx',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return null;
  return builder.image(source);
};

// GROQ Queries
export const blogListQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "category": categories[0]->title,
  excerpt
}`;

export const blogDetailQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  body,
  "category": categories[0]->title,
  "author": author->name
}`;
