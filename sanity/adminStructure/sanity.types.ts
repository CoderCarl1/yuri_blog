import { SanityDocument, SchemaType, TypedObject } from 'sanity';

export type componentParamsType = {
  document: {
    draft: SanityDocument | null;
    displayed: Partial<SanityDocument> & {
      title: string;
      content: TypedObject;
    };
    historical: Partial<SanityDocument> | null;
    published: SanityDocument | null;
  };
  documentId: string;
  options: Record<string, any>;
  schemaType: SchemaType;
};
