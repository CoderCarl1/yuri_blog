import { AttributeSet, SanityDocument } from 'next-sanity';
import { apiFetch } from './fetch.client';

export default async function patchSanityDocument<QueryResponse = SanityDocument>(
    sanityDocumentId: string = '',
    data: AttributeSet = {},
    signal?: AbortSignal
): Promise<QueryResponse> {

    if (!sanityDocumentId) throw new Error('The documentID must be provided');;
    if (!data || Object.keys(data).length === 0) throw new Error('Data must be provided to update the document');

    try {
        const response = await apiFetch('/api/patch', {
            method: 'PATCH',
            body: JSON.stringify({
                data,
                documentId: sanityDocumentId
            })
        },
            signal
        )
        console.log("response from post client", {response})
        return response as QueryResponse;

    } catch (err) {
        console.error('Error patching sanity document:', {
            error: err,
            documentId: sanityDocumentId,
        });

        throw new Error('Failed to patch document');
    }
}