import { NextRequest, NextResponse } from 'next/server';
import { AttributeSet, SanityDocument } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { writeToken } from '@/sanity/lib/token';

interface PatchRequestBody {
    documentId: string;
    data: AttributeSet;
}

export async function PATCH(request: NextRequest) {
    try {
        const body: PatchRequestBody = await request.json();
        const { documentId, data } = body;

        if (!documentId || !data) {
            return NextResponse.json(
                { error: 'Invalid input: documentId and data are required' },
                { status: 400 }
            );
        }

        const patchResponse = await patchSanityDocument(documentId, data);
        return NextResponse.json({ data: patchResponse });

    } catch (error) {
        console.error('Error handling PATCH request:', error);

        return NextResponse.json(
            { error: 'An unexpected error occurred while processing your request' },
            { status: 500 }
        );
    }

}

const clientWithWritePermission = client.withConfig({ token: writeToken });

async function patchSanityDocument<QueryResponse = SanityDocument>
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