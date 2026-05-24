import { TOOLS } from '@/utils/toolsData'

const BASE_URL = 'https://reconshield.in'
const SANITY_PROJECT_ID = 'etmnx6kx'
const SANITY_DATASET = 'production'
const SANITY_API_VERSION = '2021-10-21'

async function getBlogPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) { "slug": slug.current, publishedAt }`
  const encodedQuery = encodeURIComponent(query)
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodedQuery}`

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // revalidate every 1 hour
    })

    if (!res.ok) {
      console.error('Failed to fetch posts from Sanity:', res.status)
      return []
    }

    const data = await res.json()
    return data.result ?? []
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return []
  }
}

export default async function sitemap() {
  const posts = await getBlogPosts()

  const blogUrls = posts
    .filter((post) => post.slug && post.slug !== 'how-to-check-ip-reputation-a-complete-guide-for-security-researchers')
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  const staticUrls = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ip-scanner`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const toolUrls = TOOLS.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: tool.popular ? 0.9 : 0.8,
  }))

  return [...staticUrls, ...toolUrls, ...blogUrls]
}
