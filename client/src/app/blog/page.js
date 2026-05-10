import { client, blogListQuery } from '@/utils/sanity'
import BlogClient from './BlogClient'

export const dynamic = 'force-dynamic'
export const revalidate = 60 // revalidate every minute

export const metadata = {
  title: "Cyber Intelligence Briefings | ReconShield Blog",
  description: "Latest threat intelligence, security research, and OSINT guides from the ReconShield team.",
  alternates: {
    canonical: 'https://reconshield.com/blog',
  },
  openGraph: {
    url: 'https://reconshield.com/blog',
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
