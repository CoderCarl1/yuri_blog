'use client';
import { useEffect, useState } from "react";
import { SanityDocument } from 'next-sanity';
import { PostList } from "./Post";
import router, { useRouter } from "next/router";


type Props = {
    input?: string}

export default function SearchBar({input}: Props){
    const [searchString, setSearchString] = useState('SEARCH STRING EXAMPLE');
    const [searchResults, setSearchResults] = useState<SanityDocument[]>([]);
    const [hasCompleted, setHasCompleted] = useState(false);

    async function getPosts(){
        setHasCompleted(false);
        const postsData = await fetch(`/api/search?query=${searchString}`);
        console.log("POSTS", postsData);
        if (postsData) {
            const data = await postsData.json() as SanityDocument[];
        console.log("POSTS data", data);

        setSearchResults(data);
        setHasCompleted(true);
        }
    }
    return (
    <div>
        <button onClick={getPosts}>GET POSTS</button>
        {' '} Posts: <b>{searchResults.length}</b> {' '}
        {searchResults.length > 0 && (
            <div>
                {<PostsOutput posts={searchResults} />}
            </div>
        )}
        </div>

    )
}

function PostsOutput({ posts = [] }: { posts: SanityDocument[] }) {
    const [data, setData] = useState<SanityDocument[]>([])

    useEffect(() => {
        console.log("weeeee", data)
        setData(posts)
    }, [])
      return (
        <main className="container mx-auto grid grid-cols-1 gap-y-2 divide-y divide-blue-100">
          {data.length > 0 && data.map((post, idx) => <h2>{idx}</h2>)}
        </main>
      );
}