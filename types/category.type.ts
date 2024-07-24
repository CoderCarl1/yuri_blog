import type { SanityDocument } from 'sanity';

export type Category = {
  title: string;
  description: string;
};
export type Category_SanityDocument = SanityDocument & Category;
