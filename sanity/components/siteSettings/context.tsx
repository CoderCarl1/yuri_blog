import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getSettings } from "@/functions/loaders/settings";
import patchSanityDocument from "@/sanity/lib/post.client";
import useSelectedItem from "@/functions/hooks/useSelectedSettings";
import { FieldDefinition, SanityDocument } from "sanity";
import { componentDocumentType, sanityStructure } from "@/types/sanity.type";

type updateDataProps = {
  reference: string;
  structure: Record<string, any>;
}

interface SiteSettingsContextProps {
  loading: boolean;
  error: string | null;
  data: Record<string, any> | undefined;
  selectedItem: sanityStructure | null;
  // selectedData: Record<string, any> | undefined;
  handleSelect: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  handleBack: () => void;
  updateData: (props: updateDataProps) => Promise<SanityDocument>;
  reset: () => void;
  sanityStructure: FieldDefinition[];
}

const SiteSettingsContext = createContext<SiteSettingsContextProps | undefined>(undefined);

type ProviderProps =  {
  sanityDocument: componentDocumentType;
  sanityStructure: FieldDefinition[];
  children:  ReactNode;
};


export const SiteSettingsProvider = ({ sanityDocument, sanityStructure, children }: ProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { displayed, draft, published } = sanityDocument;
  const content = draft || displayed
  const [data, setData] = useState<Record<string, any> | undefined>(content);
  const [error, setError] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<Record<string, any> | undefined>();
  const [selectedItem, setSelectedItem] = useSelectedItem(sanityStructure);
// console.log("sanityStructure", sanityStructure)
//   if (isPreviewMode) {
//     // In preview mode, prefer the draft version
//     content = draft || displayed;
//   } else {
//     // In normal mode, use published
//     content = published || displayed;
//   }
// // Example: Show draft if it exists, otherwise fallback to displayed
//   const content = draft || displayed || published;

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const settings = await getSettings();
  //     setData(settings);
  //     console.log("%c LOADED SETTINGS DATA \n", "color: white; background:black;", settings)
  //   } catch (err) {
  //     setError('Failed to fetch document');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // fetchData();
    const cleanObj = sanityDocument
    // setData()
  }, []);

  useEffect(() => {
    if (sanityStructure.length && sanityStructure.length === 1) {
      setSelectedItem(sanityStructure[0]);
    }
  }, [])

  const handleSelect = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget.dataset;

    const structure = sanityStructure.find(struct => struct.name === name);
    if (structure) {
      setSelectedItem(structure);
    } else {
      throw new Error('could not load structure.');
    }
  };

  useEffect(() => {
    if (!selectedItem?.name || !data ) {
      setSelectedData(content);
      return;
    }
    console.log("%c sanityStructure", "color: red; font-weight: bold;", sanityStructure)

    setSelectedData(data[selectedItem.name])
  }, [selectedItem, data?._updatedAt])

  const handleBack = () => {
    setSelectedItem(null);
  };

  async function updateData(documentData: Record<string, any>): Promise<SanityDocument> {
    console.log("saving data of ", documentData)
    const controller = new AbortController();
    const signal = controller.signal;
    const id = documentData._id ? documentData._id : "site_settings";
    const res = await patchSanityDocument(id, documentData, signal);
    const { _rev, ...rest } = res
    const dataToSave = Object.assign(Object.create(null), rest)
    setData(dataToSave);
    return res;
  }

  const reset = () => {
    setSelectedItem(null);
    setError(null);
    setData(undefined);
    // fetchData();
  };

  return (
    <SiteSettingsContext.Provider value={{ sanityStructure, reset, loading, error, data, selectedItem, /** selectedData,*/ handleSelect, handleBack, updateData }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettingsContext = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("SiteSettingsContext must be used within a SiteSettingsProvider");
  }
  return context;
};
