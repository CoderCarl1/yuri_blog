import type { Post } from './post.type';
import type { Author } from './author.type';
import type { Image, ImageMetadata } from 'sanity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(obj: any): obj is Object {
  return typeof obj === 'object' && obj !== null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isImage(image: any): image is Image {
  return (
    isObject(image) &&
    isObject(image.asset) &&
    typeof image.asset._ref === 'string' &&
    typeof image.asset._type === 'string'
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAssetMetadataType(meta: any): meta is ImageMetadata {
  return (
    isObject(meta) &&
    isObject(meta.dimensions) &&
    typeof meta.dimensions.width === 'number' &&
    typeof meta.dimensions.height === 'number' &&
    typeof meta.lqip === 'string' &&
    isObject(meta.palette) &&
    isObject(meta.palette.darkMuted) &&
    typeof meta.palette.darkMuted.background === 'string' &&
    typeof meta.palette.darkMuted.foreground === 'string' &&
    typeof meta.palette.darkMuted.population === 'number' &&
    typeof meta.palette.darkMuted.title === 'string'
  );
}

export function isPost(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doc: any,
): doc is Post {
  return (
    isObject(doc) &&
    typeof doc.title === 'string' &&
    doc.title &&
    isObject(doc.postImage) &&
    isImage(doc.postImage.image) &&
    isAssetMetadataType(doc.postImage.metaData) &&
    typeof doc.slug === 'string' &&
    doc.slug &&
    typeof doc._id === 'string' &&
    doc._id &&
    Array.isArray(doc.body)
  );
}

export function isAuthor(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doc: any,
): doc is Author {
  return (
    isObject(doc) &&
    typeof doc.name === 'string' &&
    doc.name &&
    isObject(doc.authorImage) &&
    isImage(doc.authorImage.image) &&
    isAssetMetadataType(doc.authorImage.metaData) &&
    Array.isArray(doc.bio)
  );
}
