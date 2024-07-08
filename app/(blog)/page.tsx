import { SanityDocument } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/fetch';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { PostList } from '@/components/Post';

export default async function Page() {
  const posts = await sanityFetch<SanityDocument[]>({
    query: POSTS_QUERY,
  });

  return <PostList posts={posts} />;
}
