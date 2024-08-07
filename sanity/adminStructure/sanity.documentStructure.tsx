import { DefaultDocumentNodeContext, StructureBuilder } from 'sanity/structure';
import JsonPreview from '../components/JSONPreview';

export default function main(
  S: StructureBuilder,
  { documentId, schemaType }: DefaultDocumentNodeContext,
) {
  if (documentId && (schemaType === 'post')) {
    return S.document().views([
      S.view.form(),
      S.view.component(JsonPreview).title('JSON'),
    ]);
  }


}
