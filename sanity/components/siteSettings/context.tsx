import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getSettings } from "@/functions/loaders/settings";
import patchSanityDocument from "@/sanity/lib/post.client";
import type { sanityStructure, PageBoxProps, SiteSettings } from "@/types/siteSettings.type";
import useSelectedItem from "@/functions/hooks/useSelectedSettings";
import { SanityDocument } from "sanity";

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
      console.log("%c 1. inside site settings context", "color: white; background-color: black;", {settings})
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
    if (!selectedItem?.name || !data ) {
      console.warn("++_+_+_+_++   NO SELECTED ITEM OR NOT DATA   ++_+_+_+_++")
      return;
    }
    const key = selectedItem?.name;
    const dataObj = {...data};
    console.log("%c 4. use effect ran to update selected data", "color: white; background-color: cyan;", {selectedItem})

    console.log("%c 4. data ", "color: white; background-color: cyan;", data?.data)
    console.log("%c 4. data[selectedItem.name] ", "color: white; background-color: cyan;", data[selectedItem.name])
    console.log("%c 4. dataObj[key] ", "color: white; background-color: cyan;", dataObj[key])


    setSelectedData(data[selectedItem.name])
  }, [selectedItem, data])

  const handleBack = () => {
    setSelectedItem(null);
  };

  async function updateData(structure: Record<string, any>) {
    console.log("1. UPDATE DATA FUNC RUN INSIDE SITE SETTINGS CONTEXT ", {structure})
    const controller = new AbortController();
    const signal = controller.signal;
    const res = await patchSanityDocument(`siteSettings`, structure, signal);
    console.log("2. sending response to Data")
    setData(res.data);
    console.log("%c 3. UPDATE DATA FUNC", "color: red; background-color: rgb(25,25,25);", res)
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
