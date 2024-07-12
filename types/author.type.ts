import type { ImageObject } from "@/components/Image.type";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityDocument } from "sanity";

export type Author = {
    name: string;
    authorImage: ImageObject;
    bio: PortableTextBlock | PortableTextBlock[];
  }
  export type Author_SanityDocument = SanityDocument & Author;
  