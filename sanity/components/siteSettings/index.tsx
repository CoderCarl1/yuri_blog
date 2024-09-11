import { sanityStructure } from "@/types/siteSettings.type";
import { SiteSettingsProvider, useSiteSettingsContext } from "./context";
import BoxPage from "../sanityRenderer/box.page";
import Loading from "../../../components/loading";
import { images_fetch } from "@/sanity/lib/fetch.client";
import { useState, useEffect, Suspense } from "react";
import { SanityDocument } from "sanity";
import { get_LocalStorage, set_LocalStorage } from "@/functions/localStorage";
// import { useImages } from "./useImages";

type Props = {
  sanityStructure: sanityStructure[];
}
export default function Main({ sanityStructure }: Props) {
  return (
    <SiteSettingsProvider sanityStructure={sanityStructure}>
      <SiteSettings sanityStructure={sanityStructure}/>
    </SiteSettingsProvider>
  )
}

function SiteSettings({ sanityStructure }: Props) {
  // const { images, loading: imagesLoading, error: imagesError } = useImages();
  const { loading, data, updateData, selectedItem, selectedData, handleSelect, handleBack, error } =
    useSiteSettingsContext();

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


