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
  updateData: (props: updateDataProps) => void;
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
      setData(settings);
    } catch (err) {
      setError('Failed to fetch document');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("SiteSettingsProvider 1")
    fetchData();
  }, []);

  useEffect(() => {
    console.log("SiteSettingsProvider 2")

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
    console.log("SiteSettingsProvider 3")

    if (!selectedItem?.name || !data  || !data._updatedAt) {
      return;
    }

    setSelectedData(data[selectedItem.name])
  }, [selectedItem, data?._updatedAt])

  const handleBack = () => {
    setSelectedItem(null);
  };

  async function updateData(structure: Record<string, any>) {
    const controller = new AbortController();
    const signal = controller.signal;

    const res = await patchSanityDocument(structure._id, structure, signal);
    setData(res);
  }

  const reset = () => {
    setSelectedItem(null);
    setError(null);
    setData(undefined);
    fetchData();
  };

  return (
    <SiteSettingsContext.Provider value={{ reset, loading, error, data, selectedItem, selectedData, handleSelect, handleBack, updateData }}>
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
