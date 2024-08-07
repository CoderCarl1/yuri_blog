import type { Post_SanityDocument } from '@/types';
import { client } from './client';
import { SanityDocument } from 'sanity';

export async function searchAPI(
  str: string,
  signal: AbortSignal | null | undefined = null,
): Promise<Post_SanityDocument[]> {
  const url = `/api/search?query=${str}`;
  let results;

  try {
    results = await apiFetch<Post_SanityDocument[]>(url, signal);
  } catch (err) {
    console.log(err);
  } finally {
    return results || [];
  }
}

// add token or something to ensure its legit
export async function apiFetch<QueryResponse>(
  url: string,
  signal: AbortSignal | null | undefined = null,
) {
  console.log('fetch request made');
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  return response.json() as Promise<QueryResponse>;
}

export async function sanityDocumentFetch(
  id: string = '',
): Promise<SanityDocument | undefined> {
  try {
   return await client.getDocument(id);
  } catch (err) {
    console.log(err);
  }
}

export async function queryFetch(
  query: string = '',
): Promise<SanityDocument | undefined> {
  let results;

  try {
    results = await client.fetch(query);
    console.log('queryFetch', results);
  } catch (err) {
    console.log(err);
  } finally {
    return results;
  }
}