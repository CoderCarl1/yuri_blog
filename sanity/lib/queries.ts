import { groq } from 'next-sanity';

// consider removing body from here.
export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]{
    _id,
    body,
    title,
    "slug": slug.current,
    "postImage": {
        "image": mainImage,
        "metaData": mainImage.asset-> metadata
    },
    "type": _type
}`;

// Add metadata for site here? or generate it through function?
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
    _id,
    body,
    title,
    "slug": slug.current,
    "postImage": {
        "image": mainImage,
        "metaData": mainImage.asset-> metadata
    },
    "type": _type
    }`;

const bodyQuery = 'body[].children[].text';
const bioQuery = 'bio[].children[].text';
export const SEARCH_QUERY = groq`*[_type in ['post', 'author'] &&
    (
        ${bodyQuery} match $queryString + '*' ||
        ${bioQuery} match $queryString + '*' ||
        title match $queryString + '*' || 
        name match $queryString + '*') && 
        !(_id in path('drafts.**'))] | order(publishedAt desc){
        _id,
        body,
        title,
        "slug": slug.current,
        "postImage": {
            "image": mainImage,
            "metaData": mainImage.asset-> metadata
        },
        "authorImage": {
            "image": image,
            "metaData": image.asset-> metadata
        },
        "type": _type,
         'searchedQuery': select(
            ${bodyQuery} match $queryString + '*' =>{
              'cardExcerpt': ${bodyQuery},
            },
            ${bioQuery} match $queryString + '*' =>{
              'cardExcerpt': ${bioQuery},
            }
          ),
     }[0...5]`;

export const SETTINGS_QUERY = groq`*[_type in ["siteSettings", "colors", "navigation"]]{
    ...
}`;