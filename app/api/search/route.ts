import { Post_SanityDocument } from '@/components/Post';
import { sanityFetch } from '@/sanity/lib/fetch';
import { SEARCH_QUERY } from '@/sanity/lib/queries';
import { NextRequest /**, NextResponse */ } from 'next/server';

export async function GET(req: NextRequest /**, res: NextResponse*/) {
  // const { query, resultLength } = req.query;
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const searchString = params.get('query');

  const data = await sanityFetch<Post_SanityDocument[]>({
    query: SEARCH_QUERY,
    params: { queryString: searchString },
  });
  console.log('results ', data);

  console.log('++_+_+ searchString ', searchString);
  // const posts = await sanityFetch<SanityDocument[]>({
  //     query: POSTS_QUERY,
  //   });
  // console.log("request", req.url)
  return Response.json(data);
}
