import { sanityStructure } from "@/types";
import { SiteSettingsProvider, useSiteSettingsContext } from "./context";
import BoxPage from "../sanityRenderer/box.page";
import Loading from "../../../components/loading";
import { images_fetch } from "@/sanity/lib/fetch.client";
import { useState, useEffect, Suspense } from "react";
import { FieldDefinition, SanityDocument, useDocumentStore, useFormValue, useSchema, useTemplates } from "sanity";
import { get_LocalStorage, set_LocalStorage } from "@/functions/localStorage";
import { componentParamsType } from "@/types";
import { UserViewComponent } from "sanity/structure";
// import { useImages } from "./useImages";
// import {useObservable} from 'react-rx'

/**
 

type Props = {
} & componentParamsType;



*/

export default function Main({document, schemaType}: componentParamsType) {
// export default function Main({ sanityStructure }: Props) {
  const {fields} = schemaType
  return (
    <SiteSettingsProvider sanityDocument={document} sanityStructure={fields}>
      <SiteSettings />
    </SiteSettingsProvider>
  )
}

function SiteSettings() {
  // const { images, loading: imagesLoading, error: imagesError } = useImages();
  const { data, error, handleSelect, handleBack, loading, sanityStructure, selectedItem, updateData } =
    useSiteSettingsContext();

//     const schema = useSchema()
//     console.log("schema", schema)
//     const type = schema.get('site_settings')
//     console.log("type", type && type?.fields)
// console.log("sanityStructure", sanityStructure)

// const documentStore = useDocumentStore();
// console.log("documentStore", documentStore) 
// const results = useObservable(() => {
//   return documentStore.listenQuery(
//     `*[_type == 'article' && references($currentDoc) && !(_id in path("drafts.**"))]`,
//     {currentDoc: docId},
//     {}
//   )
// }, [documentStore, docId])
  // Handle loading states and errors outside of Suspense
  // if (imagesLoading || loading) return <Loading />;
  // if (imagesError) return <div>Error loading images: {imagesError}</div>;
  if (error) return <div>Error loading settings: {error}</div>;
  if (!sanityStructure) return <div><Loading /></div>

  return (

    <Suspense fallback={<Loading />}>
    <BoxPage
      sanityStructure={sanityStructure}
      loading={loading}
      data={data}
      selectedItem={selectedItem}
      handleSelect={handleSelect}
      handleBack={handleBack}
      updateData={updateData}
      error={error} />
  </Suspense>
  )
};


