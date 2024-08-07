import { sanityFetch } from '@/sanity/lib/fetch.server';
import { Settings } from '@/types';
import { SETTINGS_QUERY } from '@/sanity/lib/queries';
import { SiteColors, SettingsMap, colorType } from '@/types/siteSettings.type';
import { queryFetch, sanityDocumentFetch } from '@/sanity/lib/fetch.client';

export const getSettings = async () => {
  const result = await sanityDocumentFetch('siteSettings');

  // const sortedResults = result.reduce((acc: SettingsMap, item) => {
  //   acc[item._id] = item;
  //   return acc;
  // }, {});
  return result;
};

// export const setUserPreferences = (settings: SettingsMap) => {
//   const retval: Record<[k: string]: string > = {};
//   if (settings['colors']){
//    retval['css'] = generateStyles(settings['colors'])
//   }

//   return retval;
// }

export const generateStyles = (colors: SiteColors) => {
  const styleLines = Object.keys(colors).map((key) => {
    const color = colors[key as keyof SiteColors] as colorType;
    if (color && color.hsl) {
      const { h, s, l } = color.hsl;
      const hslValue = `${h} ${s * 100}% ${l * 100}%`;
      const activeValue = generateStateColor(color.hsl, 'active');
      const hoverValue = generateStateColor(color.hsl, 'hover');
      const textValue = generateStateColor(color.hsl, 'text');

      key = key.replace('_', '-');
      return `
        --color-${key}: ${hslValue};
        --color-${key}-active: ${activeValue};
        --color-${key}-hover: ${hoverValue};
        --color-${key}-text: ${textValue};
      `;
    }
    return '';
  });

  return styleLines.join(' ');
};

function generateStateColor(
  { h, s, l }: { h: number; s: number; l: number },
  state: string,
) {
  switch (state) {
    case 'active':
      return `${h} ${s * 100}% ${l * 100 - 10}%`;
    case 'hover':
      return `${h} ${s * 100}% ${l * 100 + 10}%`;
    case 'text':
      return `${h} ${s * 100}% ${l * 100 - 20}%`;
    default:
      return `${h} ${s * 100}% ${l * 100}%`;
  }
}
