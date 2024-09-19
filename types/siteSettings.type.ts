import type { PortableTextBlock } from '@portabletext/types';
import { SanityDocument } from 'sanity';

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


export type SiteAnalytics = SanityDocument & {
  googleAnalyticsId?: string;
}

type FontObject = {
  font_file?: string;
  font_url?: string;
}

export type SiteTypography = SanityDocument & {
  font_main?: FontObject;
  headingFont?: FontObject;
}

type submenuItem = {
  title: string;
  url?: string;
}

type SiteNavigationItem = {
  title: string;
  link_type: 'single' | 'submenu';
  url?: string;
  submenu: submenuItem;
}
export type SiteGeneral = SanityDocument & {
  title: string;
  description: string;
  favicon: SanityImage;
  navigation: SiteNavigationItem[];
}

export type SettingsMap = {
  // Required index signature
  seo: SiteSEO;
  analytics: SiteAnalytics;
  colors: SiteColors;
  general: SiteGeneral;
  siteSettings: SiteSettings;
  social_media: SiteSocials;
  typography: SiteTypography;
  [key: string]: SiteSEO  | SiteAnalytics | SiteColors | SiteGeneral |SiteSettings | SiteSocials | SiteTypography | undefined;
} & Pick<SanityDocument, '_createdAt' | '_updatedAt' | '_type' | '_id'>;

export type Settings = [SiteColors, SiteSEO, SiteSettings, SiteSocials];
