'use server';

import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId } from './api';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export async function urlForImage(
  source: Image,
): Promise<(height: number, width: number) => string> {
  return (height: number = 1200, width: number = 800) => {
    return imageBuilder
      .image(source)
      .auto('format')
      .height(height)
      .width(width)
      .fit('fill')
      .url();
  };
}

export async function resolveHref(
  documentType?: string,
  slug?: string,
): Promise<string | undefined> {
  switch (documentType) {
    case 'home':
      return '/';
    case 'page':
      return slug ? `/${slug}` : undefined;
    case 'project':
      return slug ? `/projects/${slug}` : undefined;
    default:
      console.warn('Invalid document type:', documentType);
      return undefined;
  }
}
