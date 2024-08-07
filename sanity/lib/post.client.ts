import { client } from './client';

// import { writeToken } from '@/sanity/lib/token';

// export default async function patch<QueryResponse = any>
// (sanityDocumentId: string = '', data: Record<string, any> = {}): Promise<QueryResponse> {

//   if (!sanityDocumentId) throw new Error('The documentID must be provided');;
//   if (!data || Object.keys(data).length === 0) throw new Error('Data must be provided to update the document');

//   try {
//     const response = await client
//                           .patch(sanityDocumentId)
//                           .set(data)
//                           .commit();
              
//     console.log('Patch response:', response);
//     return response as QueryResponse;

//   } catch (err) {
//     console.error('Error patching document:', {
//       error: err,
//       documentId: sanityDocumentId,
//     });

//     throw new Error('Failed to patch document');
//   }
// }

export async function patchSanityDocument
(
  sanityDocumentId: string = '', 
  data: Record<string, any> = {}
): Promise<Response> {
  const request = await fetch('/api/patch', {
    method: "PATCH",
    body: JSON.stringify({
      documentId: sanityDocumentId,
      data
    })
  })

  return request;
}