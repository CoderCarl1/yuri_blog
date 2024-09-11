import type { Post_SanityDocument } from '@/types';
import { client } from './client';
import { SanityDocument } from 'sanity';
import { IMAGES_QUERY, SETTINGS_QUERY } from './queries';
import { SettingsMap } from '@/types/siteSettings.type';
import { Console } from 'console';

export async function apiFetch<QueryResponse>(
  url: string,
  options: RequestInit = {},
  signal?: AbortSignal
): Promise<QueryResponse> {
  // Default options are marked with *
  const defaultOptions: RequestInit = {
    method: 'GET', // Default method is GET
    headers: {
      'Content-Type': 'application/json',
      // Include any authentication headers if needed
      // Authorization: `Bearer ${getAuthToken()}`,
    },
    signal, // Optional abort signal
    ...options,
  };
  const response = await fetch(url, defaultOptions);
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  return response.json() as Promise<QueryResponse>;
}

// Function to retrieve auth token
function getAuthToken(): string | null {
  // Retrieve token from cookies, localStorage, or another source
  // This is a placeholder implementation
  return localStorage.getItem('sanityToken') || null;
}

// Function to ensure the user is authenticated
function ensureAuthenticated(): void {
  const token = getAuthToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }
}


export async function searchAPI(
  str: string,
  signal?: AbortSignal,
): Promise<Post_SanityDocument[]> {
  const url = `/api/search?query=${str}`;
  let results;

  try {
    results = await apiFetch<Post_SanityDocument[]>(url, {}, signal);
  } catch (err) {
    console.log(err);
  } finally {
    return results || [];
  }
}

export async function sanityDocumentFetch(
  id: string = '',
): Promise<SanityDocument | undefined> {
  try {
  console.log("%c +_+_+_+_+_ sanityDocumentFetch invoked", "color: white; background: red;")

    return await client.getDocument(id);
  } catch (err) {
    console.log(err);
  }
}

export function queryFetch(query: string = ''): Promise<SanityDocument | undefined> {
  console.log("%c +_+_+_+_+_ queryFetch invoked", "color: white; background: red;")
  return client.fetch(query)
    .then((results) => results)
    .catch((err) => {
      console.error('Failed to fetch data:', err);
      return undefined;
    });
}

export function images_fetch(): Promise<SanityDocument| undefined>{
  console.log("%c +_+_+_+_+_ images_fetch invoked", "color: white; background: red;")
  return queryFetch(IMAGES_QUERY)
  .then((result) => {
    return result;  
  })
}

/** Create new settings object only if needed */
// if (!result) {
//   console.log("no site settings found, creating new document")
//   const controller = new AbortController();
//   const signal = controller.signal;
//   result = await createSanityDocument('siteSettings', data, signal)
// }

export async function settingsFetch(): Promise<SettingsMap> {
  let data = {
    _type: 'site_settings',
    seo: Object.create(null),
    analytics: Object.create(null),
    colors: Object.create(null),
    general: Object.create(null),
    siteSettings: Object.create(null),
    social_media: Object.create(null),
    typography: Object.create(null),
  };

  const result = await queryFetch(SETTINGS_QUERY) as SettingsMap[] | undefined;
console.log("result", result)
  if (result && result.length) {
    // console.log("deep merge happening")
    // console.log("checking if one of the results has an id of site_settings")
    // const siteSettingsObj = result.filter(settingsObj => settingsObj._id === 'site_settings')
    // console.log("filtered", siteSettingsObj)
    // if (siteSettingsObj.length){
    //   data = Object.assign(Object.create(null), _deepMerge(data, siteSettingsObj[0]))
    // } else {
      data = Object.assign(Object.create(null), _deepMerge(data, result[0]))
    // }
  }

  return data as SettingsMap;

  function _deepMerge(target: any, source: any): any {
    for (const key in source) {
      if (source[key] !== null && source[key] !== undefined) {
        if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
          target[key] = _deepMerge(target[key] || {}, source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
}


