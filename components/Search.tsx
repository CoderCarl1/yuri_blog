import { useEffect, useState } from "react";
import { SanityDocument } from 'next-sanity';
import { PostList } from "./Post";

type Props = {
    input?: string}

export default function SearchBar({input}: Props){
    const [query, setQuery] = useState('');
    const [posts, setPosts] = useState<SanityDocument[]>([]);

    async function getPosts(){
        const postsData = await fetch('http://localhost:3000/api/posts')
        console.log("POSTS", postsData);
        if (postsData) {
            const data = await postsData.json() as SanityDocument[];
        console.log("POSTS data", data);

            setPosts(data)
        }
    }
    return (
    <div>
        <button onClick={getPosts}>GET POSTS</button>
        {' '} Posts: {posts.length} {' '}
        {posts.length && (
            <div>
                {<PostsOutput posts={posts} />}
            </div>
        )}
        </div>

    )
}

function PostsOutput({ posts = [] }: { posts: SanityDocument[] }) {
    const [data, setData] = useState(posts)

    useEffect(() => {
        console.log("weeeee", data)
    }, [])
      return (
        <main className="container mx-auto grid grid-cols-1 gap-y-2 divide-y divide-blue-100">
          {data.map((post, idx) => <h2>{idx}</h2>)}
        </main>
      );
}