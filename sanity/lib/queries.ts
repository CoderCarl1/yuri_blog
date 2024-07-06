import { groq } from 'next-sanity';

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
    _id,
    body,
    title,
    "slug": slug.current,
    mainImage,
    "mainImageMetaData": mainImage.asset-> metadata
    }`;

export const SEARCH_QUERY = groq`*[_type in ['post', 'author', 'category'] &&
    (
        body[].children[].text match $queryString + '*' ||
        title match $queryString + '*' || 
        name match $queryString + '*' || 
    ) && ~(_id in path('drafts.**'))] | order(publishedAt desc) [0..5]{
        _id,
        body,
        title,
        "slug": slug.current,
        mainImage,
        "mainImageMetaData": mainImage.asset-> metadata
     }`;