import type { PortableTextBlock } from '@portabletext/types';
import { ColorValue } from '@sanity/color-input';
import { SanityDocument } from 'sanity';

export type colorType = ColorValue & {
  alpha: number;
};
export type SiteColors = SanityDocument & {
  primary: colorType;
  secondary: colorType;
  accent: colorType;
  ['grayscale-dark']: colorType;
  ['grayscale-light']: colorType;
};
export type SiteSettings = SanityDocument & {
  title?: string;
  description?: PortableTextBlock[];
  favicon?: SanityImage;
};

export type SiteSEO = SanityDocument & {
  overview?:  PortableTextBlock[];
  ogImage?: SanityImage;
}

export type SiteSocials = SanityDocument & {
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

export type SettingsMap = {
  // Required index signature
  [key: string]: SiteSettings | SiteColors | SiteSEO | undefined;
  siteSettings: SiteSettings;
  colors: SiteColors;
  SiteSEO: SiteSEO;
  social_media: SiteSocials
};
export type Settings = [SiteColors, SiteSEO, SiteSettings, SiteSocials];

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
