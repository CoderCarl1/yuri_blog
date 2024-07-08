'use client';
import { useEffect, useState } from 'react';
import { Post_SanityDocument } from './Post';


export const getRequestWithNativeFetch = async (
  url: string,
  signal: AbortSignal | null | undefined = null,
) => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  return response.json() as Promise<Post_SanityDocument[]>;
};

export default function SearchBar() {
  const [searchString, setSearchString] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Post_SanityDocument[]>([]);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function getPosts(str: string): Promise<void> {
      try {
        setHasCompleted(false);
        const postsData = await getRequestWithNativeFetch(
          `/api/search?query=${str}`,
          controller.signal,
        );
        console.log('POSTS', postsData);
        if (postsData) {
          setSearchResults(postsData);
        }
      } catch (err) {
        console.log('ERRRRR', err);
      } finally {
        setHasCompleted(true);
      }
    }
    if (searchString !== "") {
      void getPosts(searchString);
    }
  }, [searchString]);

  return (
    <div>
      <input
        type="text"
        value={searchString}
        name="searchString"
        id="searchString"
        onChange={(e) => setSearchString(e.currentTarget.value)}
      />{' '}
      Posts: <b>{searchResults.length}</b>{' '}
      {searchResults.length > 0 && (
        <div>{<PostsOutput posts={searchResults} />}</div>
      )}
    </div>
  );
}

function PostsOutput({ posts = [] }: { posts: Post_SanityDocument[] }) {
  const [data, setData] = useState<Post_SanityDocument[]>([]);

  useEffect(() => {
    console.log('weeeee', data);
    setData(posts);
  }, []);
  return (
    <main className="container mx-auto grid grid-cols-1 gap-y-2 divide-y divide-blue-100">
      {data.length > 0 &&
        data.map((post, idx) => <h2 key={post._id}>{idx}</h2>)}
    </main>
  );
}
