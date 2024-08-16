import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getSettings } from "@/functions/loaders/settings";
import patchSanityDocument from "@/sanity/lib/post.client";
import { sanityStructure, PageBoxProps } from "@/types/siteSettings.type";
import useSelectedItem from "@/functions/hooks/useSelectedSettings";

type updateDataProps = {
  reference: string;
  structure: Record<string, any>;
}

interface SiteSettingsContextProps {
  loading: boolean;
  error: string | null;
  data: Record<string, any> | undefined;
  selectedItem: sanityStructure | null;
  selectedData: Record<string, any> | undefined;
  handleSelect: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  handleBack: () => void;
  updateData: (props: updateDataProps) => Promise<boolean>;
  reset: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextProps | undefined>(undefined);

export const SiteSettingsProvider = ({ sanityStructure, children }: PageBoxProps & { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Record<string, any> | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<Record<string, any> | undefined>();
  const [selectedItem, setSelectedItem] = useSelectedItem(sanityStructure);

  const fetchData = async () => {
    setLoading(true);
    try {
      const settings = await getSettings();
      console.log("%c inside site settings context", "color: white; background-color: black;", {settings})
      setData(settings);
    } catch (err) {
      setError('Failed to fetch document');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    if (!selectedItem|| !data ) return;
    setSelectedData(data[selectedItem.name])
    // switch(selectedItem.name){
    //   case "colors":
    // }
  }, [selectedItem])

  const handleBack = () => {
    setSelectedItem(null);
  };

  async function updateData({reference, structure}: {reference: string; structure: Record<string, any>}) {
    console.log("UPDATE DATA FUNC RUN INSIDE SITE SETTINGS CONTEXT ", {reference, structure})
    const controller = new AbortController();
    const signal = controller.signal;
    const res = await patchSanityDocument(`siteSettings`, structure, signal);
    return !!res;
  }

  const reset = () => {
    setSelectedItem(null);
    setError(null);
    setData(undefined);
    fetchData();
  };
  
  return (
    <SiteSettingsContext.Provider value={{reset, loading, error, data, selectedItem, selectedData, handleSelect, handleBack, updateData }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettingsContext = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("SiteSettingsContext must be used within a MainProvider");
  }
  return context;
};
