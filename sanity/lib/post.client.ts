import { client } from '@/sanity/lib/client';
import { writeToken } from '@/sanity/lib/token';
import { AttributeSet, SanityDocument } from 'next-sanity';

const clientWithWritePermission = client.withConfig({ token: writeToken });

export default async function patchSanityDocument<QueryResponse = SanityDocument>
    (sanityDocumentId: string = '', data: AttributeSet = {}): Promise<QueryResponse> {

    if (!sanityDocumentId) throw new Error('The documentID must be provided');;
    if (!data || Object.keys(data).length === 0) throw new Error('Data must be provided to update the document');

    try {
        const response = await clientWithWritePermission
            .patch(sanityDocumentId)
            .set(data)
            .commit();

        console.log('Patch response:', response);
        return response as QueryResponse;

    } catch (err) {
        console.error('Error patching sanity document:', {
            error: err,
            documentId: sanityDocumentId,
        });

        throw new Error('Failed to patch document');
    }
}