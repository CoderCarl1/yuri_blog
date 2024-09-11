import type { Post } from './post.type';
import type { Author } from './author.type';
import type { Image, ImageMetadata, SanityDocument } from 'sanity';
import { SiteColors } from './siteSettings.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(obj: any): obj is Object {
  return typeof obj === 'object' && obj !== null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isClientImage(image: any): image is ClientSanityImage {
  return (
    isObject(image) &&
    typeof image.assetId === 'string' &&
    typeof image.extension === 'string' &&
    isObject(image.metadata) &&
    typeof image.metadata._type === 'string' &&
    typeof image.mimeType === 'string' &&
    typeof image.originalFilename === 'string' &&
    typeof image.path === 'string' &&
    typeof image.sha1hash === 'string' &&
    typeof image.size === 'number' &&
    typeof image.uploadId === 'string' &&
    typeof image.url === 'string' &&
    typeof image._createdAt === 'string' &&
    typeof image._id === 'string' &&
    typeof image._rev === 'string' &&
    typeof image._type === 'string' &&
    typeof image._updatedAt === 'string'
  );
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


export function isSanityDocument(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doc: any): doc is SanityDocument {
  return (
    isObject(doc) &&
    typeof doc._id === 'string' &&
    typeof doc._type === 'string' &&
    typeof doc._createdAt === 'string' &&
    typeof doc._updatedAt === 'string' &&
    typeof doc._rev === 'string'
  );
}

export function isSiteColors(data: any): data is Partial<SiteColors> {
  // Define the allowed keys
  const allowedKeys: (keyof SiteColors)[] = [
    'colors.color_primary',
    'colors.color_primary_text',
    'colors.color_secondary',
    'colors.color_secondary_text',
    'colors.color_accent',
    'colors.color_accent_text',
    'colors.color_grayscale_dark',
    'colors.color_grayscale_light',
  ];

  return (
    typeof data === 'object' &&
    data !== null &&
    Object.keys(data).every(
      (key) => allowedKeys.includes(key as keyof SiteColors)
        && typeof data[key] === 'string'
        && isColor(data[key])
    )
  );
}
function isColor(value: string): boolean {
  if (typeof value !== 'string') return false;

  // Regular expression for HEX colors
  const hexPattern = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

  // Regular expression for RGB/RGBA colors
  const rgbPattern = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|0?\.\d+|1))?\s*\)$/;

  // Regular expression for HSL/HSLA colors
  const hslPattern = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*(?:,\s*(0|0?\.\d+|1))?\s*\)$/;

  return hexPattern.test(value) || rgbPattern.test(value) || hslPattern.test(value);
}