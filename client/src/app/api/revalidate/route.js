import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();

    // Verify this request is actually coming from Sanity
    // In a real production environment, you should use a secret token
    // const secret = req.headers.get('authorization');
    // if (secret !== `Bearer ${process.env.SANITY_WEBHOOK_SECRET}`) {
    //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    // Revalidate the blog listing page
    revalidatePath('/blog');
    
    // Revalidate the specific blog post if a slug is provided
    if (body.slug && body.slug.current) {
      revalidatePath(`/blog/${body.slug.current}`);
    }
    
    // Revalidate the homepage since it also shows recent blog posts
    revalidatePath('/');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}
