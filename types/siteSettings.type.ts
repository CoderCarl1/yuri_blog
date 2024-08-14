import type { PortableTextBlock } from '@portabletext/types';
import { Rule, SanityDocument } from 'sanity';

// TODO: make the colorType more robust;
export type colorType = string;

export type SiteColors = SanityDocument & {
  color_primary: colorType;
  color_primary_text: colorType;
  color_secondary: colorType;
  color_secondary_text: colorType;
  color_accent: colorType;
  color_accent_text: colorType;
  color_grayscale_dark: colorType;
  color_grayscale_light: colorType;
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

export type sanityValidationRules = Rule[];

export type sanityStructure = {
  name: string;
  fieldset: string;
  group: string;
  type: {
    title: string;
    validation: sanityValidationRules;
  } & Record<string, any>;
}
export type PageBoxProps = {
  sanityStructure: sanityStructure[];
};