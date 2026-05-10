import { client, blogListQuery } from '@/utils/sanity'
import BlogClient from './BlogClient'

export const dynamic = 'force-dynamic'
export const revalidate = 60 // revalidate every minute

export default async function BlogPage() {
  let posts = []
  
  try {
    posts = await client.fetch(blogListQuery)
    console.log('Fetched posts count:', posts?.length || 0)
  } catch (error) {
    console.error('Error fetching blog posts from Sanity:', error)
  }

  return (
    <div className="bg-[#0a0c0f]">
      <BlogClient posts={posts || []} />
    </div>
  )
}
