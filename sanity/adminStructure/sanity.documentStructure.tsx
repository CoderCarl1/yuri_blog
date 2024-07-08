import { DefaultDocumentNodeContext, StructureBuilder } from 'sanity/structure';
// import BlogPreview from "./sanity/components/blog/blog.Preview";
// import { SanityDocument } from "sanity";
import { Post } from '../../components/Post';
import { type componentParamsType } from './sanity.types';

function JsonPreview({ document }: componentParamsType) {
  const { displayed } = document;
  const title = displayed?.title || 'title not found';
  return (
    <div>
      <h1>JSON Data for "{title}"</h1>
      <pre>{JSON.stringify(displayed, null, 2)}</pre>
    </div>
  );
}

function displaysJSON(
  documentId: string,
  schemaType: string,
  S: StructureBuilder,
) {
  if (schemaType === 'post' || documentId === 'siteSettings') {
    return [S.view.component(JsonPreview).title('JSON')];
  }
  return [];
}

function postViews(schemaType: string, S: StructureBuilder) {
  if (schemaType === 'post') {
    return [S.view.form(), S.view.component(Post).title('Preview')];
  }
  return [];
}

export default function main(
  S: StructureBuilder,
  { documentId, schemaType }: DefaultDocumentNodeContext,
) {
  if (documentId && (schemaType === 'post' || documentId === 'siteSettings')) {
    return S.document().views([
      ...postViews(schemaType, S),
      ...displaysJSON(documentId, schemaType, S),
    ]);
  }
}
