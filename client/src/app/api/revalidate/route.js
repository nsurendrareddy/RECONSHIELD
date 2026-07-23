import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // 1. Secret Token Verification
    const secret = req.nextUrl.searchParams.get('secret') || req.headers.get('x-revalidate-secret');
    const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;

    if (configuredSecret && secret !== configuredSecret) {
      console.warn('>>> REVALIDATE WEBHOOK: Unauthorized request (secret mismatch)');
      return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
    }

    // 2. Parse payload safely
    let body = {};
    try {
      body = await req.json();
    } catch (e) {
      console.warn('>>> REVALIDATE WEBHOOK: Request body is empty or not valid JSON:', e.message);
    }

    const docType = body._type;
    const documentId = body._id;

    if (documentId && documentId.startsWith('drafts.')) {
      console.log(`>>> REVALIDATE WEBHOOK: Skipping draft document [${documentId}]`);
      return NextResponse.json({
        revalidated: false,
        message: `Skipping revalidation for draft document [${documentId}].`
      });
    }

    console.log(`>>> REVALIDATE WEBHOOK: Triggered for document type [${docType}], ID [${documentId}]`);

    // 3. Global Purges for lists (always affected by any post/author/category modification)
    revalidateTag('sanity');
    revalidateTag('blog');
    revalidateTag('homepage');
    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/scanner');
    revalidatePath('/newsletter');
    revalidatePath('/rss.xml');
    revalidatePath('/feed.xml');
    revalidatePath('/sitemap.xml');

    // 4. Targeted Invalidation based on Document Type
    if (docType === 'post') {
      // Invalidate the post page itself
      if (body.slug && body.slug.current) {
        const postSlug = body.slug.current;
        revalidateTag(`blog-post-${postSlug}`);
        revalidatePath(`/blog/${postSlug}`);
        console.log(`>>> REVALIDATE WEBHOOK: Purged tags/paths for post: ${postSlug}`);
      }

      // Invalidate the related author's page
      if (body.authorSlug && body.authorSlug.current) {
        const authorSlug = body.authorSlug.current;
        revalidateTag(`author-${authorSlug}`);
        revalidatePath(`/author/${authorSlug}`);
        console.log(`>>> REVALIDATE WEBHOOK: Purged tags/paths for author: ${authorSlug}`);
      }

      // Invalidate the related categories
      if (body.categorySlugs && Array.isArray(body.categorySlugs)) {
        body.categorySlugs.forEach((cat) => {
          if (cat && cat.current) {
            const catSlug = cat.current;
            revalidateTag(`category-${catSlug}`);
            revalidatePath(`/category/${catSlug}`);
            revalidatePath(`/blog/category/${catSlug}`);
            console.log(`>>> REVALIDATE WEBHOOK: Purged tags/paths for category: ${catSlug}`);
          }
        });
      }
    } 
    else if (docType === 'author') {
      // Invalidate the author profile page
      if (body.slug && body.slug.current) {
        const authorSlug = body.slug.current;
        revalidateTag(`author-${authorSlug}`);
        revalidatePath(`/author/${authorSlug}`);
        console.log(`>>> REVALIDATE WEBHOOK: Purged tags/paths for author doc: ${authorSlug}`);
      }
    } 
    else if (docType === 'category') {
      // Invalidate the category pages
      if (body.slug && body.slug.current) {
        const catSlug = body.slug.current;
        revalidateTag(`category-${catSlug}`);
        revalidatePath(`/category/${catSlug}`);
        revalidatePath(`/blog/category/${catSlug}`);
        console.log(`>>> REVALIDATE WEBHOOK: Purged tags/paths for category doc: ${catSlug}`);
      }
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: `Revalidation complete for document [${documentId}] of type [${docType}].`
    });
  } catch (err) {
    console.error('>>> REVALIDATE WEBHOOK ERROR:', err);
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}
