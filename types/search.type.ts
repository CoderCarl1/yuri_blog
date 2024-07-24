import type { SanityDocument } from 'sanity';
import type { Author } from './author.type';
import type { Post } from './post.type';

export type SearchResults_SanityDocument = Partial<Author> &
  Partial<Post> &
  SanityDocument;
