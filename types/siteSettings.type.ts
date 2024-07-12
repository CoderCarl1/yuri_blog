import type { PortableTextBlock } from "@portabletext/types";
import { ColorValue } from "@sanity/color-input";
import { SanityDocument } from "sanity";

export type colorType = ColorValue & {
    alpha: number;
}
export type SiteColors = SanityDocument & {
    primary: colorType;
    secondary: colorType;
    accent: colorType;
    ['grayscale-dark']: colorType;
    ['grayscale-light']: colorType;
}
export type SiteSettings = SanityDocument & {
    title?: string;
    description?: PortableTextBlock[];
    ogImage?: SanityImage;
}

export type SettingsMap = {
    [key: string]: SiteSettings | SiteColors | undefined; // Add index signature
    siteSettings?: SiteSettings;
    colors?: SiteColors;
}
export type Settings = [SiteSettings, SiteColors];

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
