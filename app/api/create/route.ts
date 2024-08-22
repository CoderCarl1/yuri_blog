import { NextRequest, NextResponse } from 'next/server';
import { IdentifiedSanityDocumentStub, SanityDocument } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { writeToken } from '@/sanity/lib/token';

const clientWithWritePermission = client.withConfig({ token: writeToken });


export async function POST(request: NextRequest) {
    try {
        const body: IdentifiedSanityDocumentStub = await request.json();

        const response = await createSanityDocument(body);
        return NextResponse.json({ response });

    } catch (error) {
        console.error('Error handling CREATE request:', error);

        return NextResponse.json(
            { error: 'An unexpected error occurred while processing your request' },
            { status: 500 }
        );
    }

}


async function createSanityDocument<QueryResponse = SanityDocument>
    (data: IdentifiedSanityDocumentStub): Promise<QueryResponse> {
    if (!data || Object.keys(data).length === 0) throw new Error('Data must be provided to update the document');

    try {
        const response = await clientWithWritePermission
            .create({...data})

        return response as QueryResponse;

    } catch (err) {
        console.error('Error creating sanity document:', {
            error: err,
            documentId: data._id,
        });

        throw new Error('Failed to patch document');
    }
}