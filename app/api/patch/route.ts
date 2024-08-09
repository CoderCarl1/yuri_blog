import { NextRequest, NextResponse } from 'next/server';
import { AttributeSet } from 'next-sanity';
import patchSanityDocument from '@/sanity/lib/post.client';

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

