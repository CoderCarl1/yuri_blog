import type { ImageMetadata, SanityDocument } from 'sanity';
import type { PortableTextBlock } from '@portabletext/types';

export type Post_SanityDocument = SanityDocument & {
  title: string;
  mainImage: SanityImage;
  mainImageMetaData: ImageMetadata;
  slug: string;
  body: PortableTextBlock | PortableTextBlock[];
};
