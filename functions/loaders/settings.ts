import { sanityFetch } from '@/sanity/lib/fetch.server';
import { Settings } from '@/types';
import { SETTINGS_QUERY } from '@/sanity/lib/queries';
import { SiteColors, SettingsMap, colorType } from '@/types/siteSettings.type';
import { queryFetch, sanityDocumentFetch } from '@/sanity/lib/fetch.client';
import COLOR from 'color';

export async function getSettings() {
  const result = await sanityDocumentFetch('siteSettings') as SettingsMap | undefined;
  const settings = {
    colors: {},
    general: {},
    siteSettings: {},
    SiteSEO: {},
    social_media: {},
  }
  if (!result) return settings;
    console.log("%c get settings func initial RESULT \n","color: purple; background-color: cyan", result)
    if(result.colors){
      settings.colors = result.colors
    }
    if(result.SiteSEO){
      settings.SiteSEO = result.SiteSEO
    }
    if(result.social_media){
      settings.social_media = result.social_media
    }
    if(result.siteSettings){
      settings.siteSettings = result.siteSettings
    }
    if(result.general){
      settings.general = result.general
    }
  // const sortedResults = result.reduce((acc: SettingsMap, item) => {
  //   acc[item._id] = item;
  //   return acc;
  // }, {});
  return Object.assign(settings, {_createdAt: result._createdAt, _updatedAt: result._updatedAt});
};

export async function getSiteSpecifics(){
  const result = await sanityDocumentFetch('siteSettings') as SettingsMap | undefined;
  const settings = {
    styles: '',
    general: '',
    siteSettings: '',
    SiteSEO: '',
    social_media: '',
  }
  if (result) {
    console.log("getSiteSpecifics func", result)
    settings.styles = generateStyles(result.colors)

  }
  // const sortedResults = result.reduce((acc: SettingsMap, item) => {
  //   acc[item._id] = item;
  //   return acc;
  // }, {});
  return settings;
}

// export const setUserPreferences = (settings: SettingsMap) => {
//   const retval: Record<[k: string]: string > = {};
//   if (settings['colors']){
//    retval['css'] = generateStyles(settings['colors'])
//   }

//   return retval;
// }

interface hslColor {
  color: number[];
  model: string;
  valpha: number
}
export const generateStyles = (colors: SiteColors) => {
  return Object.keys(colors).map((key) => {
    const color = colors[key as keyof SiteColors] as colorType;
    if (typeof color !== 'string' || !color.length) return;

    const [h, s, l] = (COLOR.hsl() as unknown as hslColor).color;

    const { active, hover, text, hsl } = generateStateColor({ h, s, l })
    key = key.replace('_', '-');

    return `
      --${key}: ${hsl};
      --${key}-active: ${active};
      --${key}-hover: ${hover};
      --${key}-text: ${text};
    `;
  }).join(' ');

};

function generateStateColor(
  { h, s, l }: { h: number; s: number; l: number }
) {

  s = s * 100;
  return {
    active: `${h} ${s}% ${l * 100 - 10}%`,
    hover: `${h} ${s}% ${l * 100 + 10}%`,
    text: `${h} ${s}% ${l * 100 - 20}%`,
    hsl: `${h} ${s}% ${l * 100}%`
  }
}
