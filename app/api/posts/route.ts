import { Post_SanityDocument } from '@/components/Post';
import { sanityFetch } from '@/sanity/lib/fetch.server';
import { POSTS_QUERY } from '@/sanity/lib/queries';

export async function GET() {
  const posts = await sanityFetch<Post_SanityDocument[]>({
    query: POSTS_QUERY,
  });

  return Response.json({ data: posts });
}
