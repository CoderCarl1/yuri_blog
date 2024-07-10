import { QueryParams } from 'next-sanity';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { POSTS_QUERY, POST_QUERY } from '@/sanity/lib/queries';
import { Post } from '@/components/Post';
import type { Post_SanityDocument } from '@/types';


import { sanityFetch } from '@/sanity/lib/fetch.server';
import Main from '@/components/Main';

export async function generateMetaData() {

}

export async function generateStaticParams() {
  const posts: Post_SanityDocument[] = await sanityFetch<Post_SanityDocument[]>(
    {
      query: POSTS_QUERY,
      perspective: 'published',
      stega: false,
    },
  );

  return posts.map((post: Post_SanityDocument) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: { params: QueryParams }) {
  const post = await sanityFetch<Post_SanityDocument>({
    query: POST_QUERY,
    params,
  });
  if (!post) {
    return notFound();
  }
  return (
    <Main>
      <Post post={post} />
    </Main>
  );
}
