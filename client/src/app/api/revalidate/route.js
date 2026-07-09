import { revalidatePath, revalidateTag } from 'next/cache';
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

    // Revalidate the entire Sanity Data Cache to ensure fetch responses are fresh
    revalidateTag('sanity');

    // Revalidate the blog listing page
    revalidatePath('/blog');
    
    // Revalidate the specific blog post if a slug is provided
    if (body.slug && body.slug.current) {
      revalidatePath(`/blog/${body.slug.current}`);
    }
    
    // Revalidate the author page if an author slug is provided in the webhook payload
    if (body.authorSlug && body.authorSlug.current) {
      revalidatePath(`/author/${body.authorSlug.current}`);
    }
    
    // Revalidate all associated category pages if category slugs are provided
    if (body.categorySlugs && Array.isArray(body.categorySlugs)) {
      body.categorySlugs.forEach(cat => {
        if (cat && cat.current) {
          revalidatePath(`/category/${cat.current}`);
          revalidatePath(`/blog/category/${cat.current}`);
        }
      });
    }
    
    // Revalidate the homepage since it also shows recent blog posts
    revalidatePath('/');
    
    // Revalidate the sitemap to ensure search engines see the update immediately
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}
