import { Post_SanityDocument } from '@/components/Post/types';
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

export function isPostSanityDocument(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doc: any,
): doc is Post_SanityDocument {
  return (
    isObject(doc) &&
    typeof doc.title === 'string' &&
    isImage(doc.mainImage) &&
    isAssetMetadataType(doc.mainImageMetaData) &&
    typeof doc.slug === 'string' &&
    typeof doc._id === 'string' &&
    Array.isArray(doc.body)
  );
}
