'use client';
import { useEffect, useState } from 'react';
import { Post_SanityDocument } from './Post';
import { searchAPI } from '@/sanity/lib/fetch.client';
import { useDebounce } from '@/functions/hooks/useDebounce';

export default function SearchBar() {
  const [searchString, setSearchString] = useState<string>("");
  const debouncedSearchString = useDebounce(searchString);
  const [searchResults, setSearchResults] = useState<Post_SanityDocument[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function getPosts(str: string): Promise<void> {
      if (str === "") {
        setSearchResults([]);
      } else {
        const apiResults = await searchAPI(
          debouncedSearchString,
          controller.signal,
        );

        console.log('searchResults', apiResults);
        if (apiResults) {
          setSearchResults(apiResults);
        }
      }
      setLoading(false);
    }

    setLoading(true);
    void getPosts(debouncedSearchString);

  }, [debouncedSearchString]);

  return (
    <div className='relative text-grayscale-secondary bg-grayscale-primary '>
      <input
        type="text"
        value={searchString}
        name="searchString"
        id="searchString"
        placeholder="Search..."
        className='px-2'
        onChange={(e) => setSearchString(e.currentTarget.value)}
      />
      {loading && <div>loading...</div>}
      {!loading && searchResults.length > 0 && <PostsOutput posts={searchResults} />}
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
    <div className="
    [ overflow-y-scroll overscroll-contain absolute left-0 z-10 rounded-b-md ]
    [ max-h-40 w-full ]
    [ bg-grayscale-primary shadow-lg ]">
      <span className='text-xs font-bold px-2'>Results</span>
      {data.length > 0 &&
        data.map((post) => <div key={post._id}
          className="
        [ py-2 px-2 ]
        [ hover:text-grayscale-primary hover:bg-secondary-400/80 ]">{post.title}</div>)
      }
    </div>
  );
}
