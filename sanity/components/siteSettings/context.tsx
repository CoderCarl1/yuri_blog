import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getSettings } from "@/functions/loaders/settings";
import patchSanityDocument from "@/sanity/lib/post.client";
import { sanityStructure, PageBoxProps } from "@/types/siteSettings.type";
import useSelectedItem from "@/functions/hooks/useSelectedSettings";

interface SiteSettingsContextProps {
  loading: boolean;
  error: string | null;
  data: Record<string, any> | undefined;
  selectedItem: sanityStructure | null;
  handleSelect: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  handleBack: () => void;
  updateData: (data: Record<string, any>) => Promise<boolean>;
}

const SiteSettingsContext = createContext<SiteSettingsContextProps | undefined>(undefined);

export const SiteSettingsProvider = ({ sanityStructure, children }: PageBoxProps & { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Record<string, any> | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useSelectedItem(sanityStructure);

  useEffect(() => {
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

  const handleBack = () => {
    setSelectedItem(null);
  };

  async function updateData(data: Record<string, any>) {
    const signal = new AbortSignal();
    const res = await patchSanityDocument('siteSettings', data, signal);
    return !!res;
  }

  return (
    <SiteSettingsContext.Provider value={{ loading, error, data, selectedItem, handleSelect, handleBack, updateData }}>
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