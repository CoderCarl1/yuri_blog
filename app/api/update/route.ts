import type { Post_SanityDocument } from '@/types';
import { sanityFetch } from '@/sanity/lib/fetch.server';
import { POSTS_QUERY } from '@/sanity/lib/queries';

export async function GET() {
  const posts = await sanityFetch<Post_SanityDocument[]>({
    query: POSTS_QUERY,
  });

  return Response.json({ data: posts });
}
