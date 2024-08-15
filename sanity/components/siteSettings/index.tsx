import { sanityStructure } from "@/types/siteSettings.type";
import { SiteSettingsProvider, useSiteSettingsContext } from "./context";
import BoxPage from "../sanityRenderer/box.page";
import Loading from "../../../components/loading";

type Props = {
  sanityStructure: sanityStructure[];
}
export default function Main({ sanityStructure }: Props) {
  return (
    <SiteSettingsProvider sanityStructure={sanityStructure}>
      <SiteSettings sanityStructure={sanityStructure} />
    </SiteSettingsProvider>
  )
}

function SiteSettings({ sanityStructure }: Props) {
  const { loading, data, selectedItem, handleSelect, handleBack, updateData, error } = useSiteSettingsContext();

  if (!sanityStructure) return <div><Loading /></div>

  return <BoxPage
    sanityStructure={sanityStructure}
    loading={loading}
    data={data}
    selectedItem={selectedItem}
    handleSelect={handleSelect}
    handleBack={handleBack}
    updateData={updateData}
    error={error} />
};


