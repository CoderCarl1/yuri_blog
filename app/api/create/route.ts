import { NextRequest, NextResponse } from 'next/server';
import { IdentifiedSanityDocumentStub, SanityDocument } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { writeToken } from '@/sanity/lib/token';

export async function PATCH(request: NextRequest) {
    try {
    console.log("CREATION REQUEST INIT")

        const body = await request.json();
        console.log("CREATION REQUEST ", body)
        const data: IdentifiedSanityDocumentStub = body.data;
        // if (!data || !data._id) {
        //     return NextResponse.json(
        //         { error: 'Invalid input: documentId and data are required' },
        //         { status: 400 }
        //     );
        // }

        const response = await createSanityDocument(data);
        return NextResponse.json({ response });

    } catch (error) {
        console.error('Error handling CREATE request:', error);

        return NextResponse.json(
            { error: 'An unexpected error occurred while processing your request' },
            { status: 500 }
        );
    }

}

const clientWithWritePermission = client.withConfig({ token: writeToken });

async function createSanityDocument<QueryResponse = SanityDocument>
    (data: IdentifiedSanityDocumentStub): Promise<QueryResponse> {

    if (!data._id) throw new Error('The documentID must be provided');;
    if (!data || Object.keys(data).length === 0) throw new Error('Data must be provided to update the document');

    try {
        const response = await clientWithWritePermission
            .createIfNotExists({...data})

        console.log('creation response:', response);
        return response as QueryResponse;

    } catch (err) {
        console.error('Error patching sanity document:', {
            error: err,
            documentId: data._id,
        });

        throw new Error('Failed to patch document');
    }
}