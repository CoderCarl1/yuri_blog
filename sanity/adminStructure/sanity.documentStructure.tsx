import { DefaultDocumentNodeContext, StructureBuilder } from 'sanity/structure';
// import BlogPreview from "./sanity/components/blog/blog.Preview";
// import { SanityDocument } from "sanity";
import { Post } from '../../components/Post';
// import { ColorPicker } from '../components/PageBox';
import JsonPreview from '../components/JSONPreview';


function displaysJSON(
  documentId: string,
  schemaType: string,
  S: StructureBuilder,
) {
  console.log("=== documentId", documentId)
  console.log("=== schemaType", schemaType)
  if (schemaType === 'post') {
    return [S.view.component(JsonPreview).title('JSON')];
  }
  return [];
}

function postViews(schemaType: string, S: StructureBuilder) {
  if (schemaType === 'post' ) {
    return [S.view.form(), S.view.component(Post).title('Preview')];
  }
  return [];
}

function settingsViews(schemaType: string, S: StructureBuilder) {
  console.log("SETTINGS VIEWS IN DOCUMENTsTRUCTURE ", {schemaType})
  console.log("SETTINGS VIEWS IN DOCUMENTsTRUCTURE ", {S})
//   if (schemaType === 'siteSettings') {
//     return [S.view.form(), S.view.component(ColorPicker).title('woooHOO')]
//   }
  return [];
}

export default function main(
  S: StructureBuilder,
  { documentId, schemaType }: DefaultDocumentNodeContext,
) {
  console.log("++++ documentId", documentId)
  if (documentId && (schemaType === 'post' || documentId === 'siteSettings')) {
    return S.document().views([
      ...postViews(schemaType, S),
      ...settingsViews(schemaType, S),
      ...displaysJSON(documentId, schemaType, S),
    ]);
  }
}
