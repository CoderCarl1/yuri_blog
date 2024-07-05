// import { validatePreviewUrl } from '@sanity/preview-url-secret';
// import { draftMode } from 'next/headers';
// import { redirect } from 'next/navigation';

// import { client } from '@/sanity/lib/client';
// import { token } from '@/sanity/lib/token';
// import { sanityFetch } from '@/sanity/lib/fetch';

// const clientWithToken = client.withConfig({ token });

import { SanityDocument } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/fetch';
import { POSTS_QUERY } from '@/sanity/lib/queries';

export async function GET() {
    const posts = await sanityFetch<SanityDocument[]>({
        query: POSTS_QUERY,
      });

  return Response.json({data: posts})
}
