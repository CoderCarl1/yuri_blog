import { sanityFetch } from '@/sanity/lib/fetch';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { PostList, Post_SanityDocument } from '@/components/Post';

export default async function Page() {
  const posts = await sanityFetch<Post_SanityDocument[]>({
    query: POSTS_QUERY,
  });

  return <PostList posts={posts} />;
}
