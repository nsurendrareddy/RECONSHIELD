import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    let body = {};
    try {
      body = await req.json();
    } catch (e) {
      console.warn('Webhook request body is empty or not valid JSON:', e.message);
    }

    console.log('Sanity webhook triggered revalidation with body:', body);

    // 1. Revalidate data tags (Data Cache)
    revalidateTag('sanity');
    revalidateTag('blog');
    revalidateTag('homepage');

    if (body.slug && body.slug.current) {
      revalidateTag(`blog-post-${body.slug.current}`);
    }

    if (body.authorSlug && body.authorSlug.current) {
      revalidateTag(`author-${body.authorSlug.current}`);
    }

    if (body.categorySlugs && Array.isArray(body.categorySlugs)) {
      body.categorySlugs.forEach(cat => {
        if (cat && cat.current) {
          revalidateTag(`category-${cat.current}`);
        }
      });
    }

    // 2. Revalidate paths (Full Route Cache)
    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/scanner');
    revalidatePath('/newsletter');
    revalidatePath('/rss.xml');
    revalidatePath('/feed.xml');
    revalidatePath('/sitemap.xml');

    // Invalidate chunked sitemaps
    revalidatePath('/sitemaps/[type]', 'page');

    // Invalidate dynamic page patterns to cover newly published, updated, or deleted posts, categories, and authors
    revalidatePath('/blog/[slug]', 'page');
    revalidatePath('/category/[slug]', 'page');
    revalidatePath('/blog/category/[slug]', 'page');
    revalidatePath('/author/[slug]', 'page');

    // If specific parameters exist in the webhook body, we also purge their concrete routes for instant updates
    if (body.slug && body.slug.current) {
      revalidatePath(`/blog/${body.slug.current}`);
    }
    if (body.authorSlug && body.authorSlug.current) {
      revalidatePath(`/author/${body.authorSlug.current}`);
    }
    if (body.categorySlugs && Array.isArray(body.categorySlugs)) {
      body.categorySlugs.forEach(cat => {
        if (cat && cat.current) {
          revalidatePath(`/category/${cat.current}`);
          revalidatePath(`/blog/category/${cat.current}`);
        }
      });
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'Revalidation complete (Tags and Full Route Cache purged).'
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}
