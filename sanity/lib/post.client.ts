import { isSanityDocument } from '@/types/guard';
import { client } from './client';
import { SanityDocument } from 'sanity';

export default async function Patch<QueryResponse = any>({
  sanityDocument
}: {
  sanityDocument: SanityDocument
}): Promise<QueryResponse> {

  // Ensure the _id property is present
  if (!isSanityDocument(sanityDocument)) {
    throw new Error('The document must be a sanity document');
  }

  const mutations = [{
    createOrReplace: sanityDocument
  }]
  try {
    const response = await client.mutate(mutations)
    console.log('Patch response:', response);
    
    return response as QueryResponse;

  } catch (err) {
    console.error('Error patching document:', {
      error: err,
      documentId: sanityDocument._id,
      documentType: sanityDocument._type,
    });

    throw new Error('Failed to patch document');
  }
}