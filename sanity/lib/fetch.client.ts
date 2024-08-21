import type { Post_SanityDocument } from '@/types';
import { client } from './client';
import { SanityDocument } from 'sanity';

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