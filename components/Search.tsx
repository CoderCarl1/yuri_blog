'use client';
import { useEffect, useState } from 'react';
import { PostCard } from './Post';
import { searchAPI } from '@/sanity/lib/fetch.client';
import { useDebounce } from '@/functions/hooks/useDebounce';
import { isAuthor, isPost } from '@/types/guard';
import type { Author, Post_SanityDocument, SearchResults_SanityDocument} from '@/types';
import AuthorCard from './Author/Author.Card';

export default function SearchBar() {
  const [searchString, setSearchString] = useState<string>("");
  const debouncedSearchString = useDebounce(searchString);
  const [searchResults, setSearchResults] = useState<SearchResults_SanityDocument[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function getResults(str: string): Promise<void> {
      if (str === "") {
        setSearchResults([]);
      } else {
        const apiResults = await searchAPI(
          debouncedSearchString,
          controller.signal,
        );

        if (apiResults) {
          setSearchResults(apiResults);
        }
      }
      setLoading(false);
    }

    setLoading(true);
    void getResults(debouncedSearchString);

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
      <div className="
    [ overflow-y-scroll overscroll-contain absolute left-0 z-10 rounded-b-md ]
    [ max-h-40 w-full ]
    [ bg-grayscale-primary shadow-lg ]">
        {loading && <div>loading...</div>}
        {!loading && searchResults.length > 0 && <SearchOutput results={searchResults} />}
      </div>
    </div>
  );
}

function SearchOutput({ results = [] }: { results: SearchResults_SanityDocument[] }) {
  const [data] = useState<SearchResults_SanityDocument[]>(results);

  return (
    <>
      <span className='text-xs font-bold px-2 border-y-grayscale-secondary/60'>Results</span>
      {
        data.length > 0 &&
        data.map((doc) => {
          if (isPost(doc)) {
            return <PostCard key={doc._id} post={doc as Post_SanityDocument} />
          }
          if (isAuthor(doc)) {
            return <AuthorCard  key={doc._id} author={doc as Author} />
          }
          return null;
        }
        )
      }
    </ >
  );
}