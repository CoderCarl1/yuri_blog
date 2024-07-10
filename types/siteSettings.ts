import type { PortableTextBlock } from "@portabletext/types";

export type Settings = {
    title?: string;
    description?: PortableTextBlock[];
}

// export interface ProjectPayload {
//     client?: string;
//     coverImage?: Image;
//     description?: PortableTextBlock[];
//     overview?: PortableTextBlock[];
//     site?: string;
//     slug: string;
//     tags?: string[];
//     title?: string;
//   }
