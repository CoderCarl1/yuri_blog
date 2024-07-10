import type { Post_SanityDocument } from '@/types';

export async function searchAPI(
    str: string,
    signal: AbortSignal | null | undefined = null,
): Promise<Post_SanityDocument[]>{

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

export async function apiFetch<QueryResponse>(
    url: string,
    signal: AbortSignal | null | undefined = null,
  ){
    console.log("fetch request made")
    const response = await fetch(url, { signal });
  
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
  
    return response.json() as Promise<QueryResponse>;
  };