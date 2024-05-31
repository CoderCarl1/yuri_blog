import { SanityDocument } from 'next-sanity';

import Posts from '@/components/Posts';
import { sanityFetch } from '@/sanity/lib/fetch';
import { POSTS_QUERY } from '@/sanity/lib/queries';

export default async function Page() {
  const posts = await sanityFetch<SanityDocument[]>({
    query: POSTS_QUERY,
  });

  return <Posts posts={posts} />;
}
