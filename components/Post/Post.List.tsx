import { SanityDocument } from 'next-sanity';
import PostCard from './Post.Card'

export default function PostList({ posts }: { posts: SanityDocument[] }) {

  if (!posts || !posts.length) {
    return null;
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-y-2 divide-y divide-blue-100">
      {posts.map((post) => <PostCard key={post._id} post={post} />)}
    </main>
  );
}