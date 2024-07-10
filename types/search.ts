import type { SanityDocument } from "sanity";
import type { Author } from "./author";
import type { Post } from "./post";

export type SearchResults_SanityDocument = Partial<Author> & Partial<Post> & SanityDocument;