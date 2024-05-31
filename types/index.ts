import type { PortableTextBlock } from 'next-sanity';
import type { Image } from 'sanity';

export interface ProjectPayload {
  client?: string;
  coverImage?: Image;
  description?: PortableTextBlock[];
  duration?: {
    start?: string;
    end?: string;
  };
  overview?: PortableTextBlock[];
  site?: string;
  slug: string;
  tags?: string[];
  title?: string;
}
