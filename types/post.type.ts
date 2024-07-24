import type { ImageObject } from '@/components/Image.type';
import type { PortableTextBlock } from '@portabletext/types';
import type { SanityDocument } from 'sanity';

export type Post = {
  title: string;
  postImage: ImageObject;
  slug: string;
  body: PortableTextBlock | PortableTextBlock[];
};
export type Post_SanityDocument = SanityDocument & Post;
