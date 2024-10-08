import { ObjectDefinition, Rule, SanityDocument, SchemaType } from 'sanity';
// import siteSettings from '../sanity/schemas/singletons/siteSettings'

export type componentDocumentType = {
  draft: SanityDocument | null;
  displayed: Partial<SanityDocument>;
  historical: Partial<SanityDocument> | null;
  published: SanityDocument | null;
};

export type componentParamsType = {
  document: componentDocumentType;
  documentId: string;
  options: Record<string, any>;
  schemaType: SchemaType & ObjectDefinition;
};

export type sanityValidationRules = Rule[];

export type sanityStructure = {
  name: string;
  fieldset: string;
  group: string;
  type: {
    title: string;
    validation: sanityValidationRules;
  } & Record<string, any>;
};
