import { sanityFetch } from '@/sanity/lib/fetch.server';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { PostList } from '@/components/Post';
import type { Post_SanityDocument } from '@/types';

export default async function Page() {
  const posts = await sanityFetch<Post_SanityDocument[]>({
    query: POSTS_QUERY,
  });

  return <PostList posts={posts} />;
}
