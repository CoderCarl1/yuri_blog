import { NextRequest } from 'next/server';
import { client } from '@/sanity/lib/client';
import { writeToken } from '@/sanity/lib/token';

const acceptedDocuments = {};

export async function PATCH(request: NextRequest) {
    const {documentId, data} = await request.json();
    console.log("request.body", documentId, data)
    const patchResponse = await patchSanityDocument(documentId, data);
    console.log("res", patchResponse)
    return Response.json({ data: patchResponse });
}


const clientWithWritePermission = client.withConfig({ token: writeToken });

export default async function patchSanityDocument<QueryResponse = any>
    (sanityDocumentId: string = '', data: Record<string, any> = {}): Promise<QueryResponse> {

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