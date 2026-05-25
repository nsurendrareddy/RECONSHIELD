import { client, blogListQuery } from '@/utils/sanity'
import BlogClient from './BlogClient'

export const revalidate = 3600; // ISR revalidate every hour

export const metadata = {
  title: "Cyber Threat Intelligence Blog | ReconShield Research",
  description: "Stay ahead of evolving threats. Explore ReconShield's cybersecurity blog for the latest in OSINT research, vulnerability analysis, and actionable intelligence.",
  alternates: {
    canonical: 'https://reconshield.in/blog',
  },
  openGraph: {
    url: 'https://reconshield.in/blog',
    type: 'website',
  }

};

export default async function BlogPage() {
  let posts = []
  
  try {
    posts = await client.fetch(blogListQuery)
    console.log("Posts fetched:", posts?.length)
  } catch (error) {
    console.error('Error fetching blog posts from Sanity:', error)
  }

  return (
    <div className="bg-[#0a0c0f]">
      <BlogClient posts={posts || []} />
    </div>
  )
}
