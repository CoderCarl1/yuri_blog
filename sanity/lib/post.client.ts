import { AttributeSet, SanityDocument } from 'next-sanity';
import { apiFetch } from './fetch.client';
import { isSanityDocument } from 'sanity';

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
        if (isSanityDocument(response)){
            const {_id, _rev, _type, _createdAt, ...dataToReturn} = response;

            return Object.assign(Object.create(null), dataToReturn) as QueryResponse;
        }
        return response as QueryResponse;

    } catch (err) {
        console.error('Error patching sanity document:', {
            error: err,
            documentId: sanityDocumentId,
        });

        throw new Error('Failed to patch document');
    }
}

export async function createSanityDocument<QueryResponse = SanityDocument>(
    sanityDocumentId: string,
    data: AttributeSet,
    signal?: AbortSignal
): Promise<QueryResponse> {
    if (!sanityDocumentId) throw new Error('The documentID must be provided');
    if (!data || Object.keys(data).length === 0) throw new Error('Data must be provided to create the document');
    const objectWithoutProto = Object.assign(Object.create(null), data);

    try {
        const response = await apiFetch('/api/create', {
            method: 'POST',
            body: JSON.stringify({
                // _id: sanityDocumentId,
                ...objectWithoutProto
            }),
            signal
        });

        return response as QueryResponse;

    } catch (err) {
        console.error('Error creating sanity document:', {
            error: err,
            documentId: sanityDocumentId,
        });

        throw new Error('Failed to create document');
    }
}

