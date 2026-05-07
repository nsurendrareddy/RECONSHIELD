'use client'
import React from 'react'
import BlogEditor from '@/components/BlogEditor'

export default function CreateBlogPage() {
  return (
    <div className="py-10">
      <BlogEditor isEdit={false} />
    </div>
  )
}
