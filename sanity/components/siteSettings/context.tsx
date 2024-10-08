import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import patchSanityDocument from '@/sanity/lib/post.client';
import useSelectedItem from '@/functions/hooks/useSelectedStructure';
import { SanityDocument } from 'sanity';
import { componentDocumentType, sanityStructure } from '@/types/sanity.type';

type updateDataProps = {
  reference: string;
  structure: Record<string, any>;
};

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
  sanityStructure: sanityStructure[];
}

const SiteSettingsContext = createContext<SiteSettingsContextProps | undefined>(
  undefined,
);

type ProviderProps = {
  sanityDocument: componentDocumentType;
  sanityStructure: sanityStructure[];
  children: ReactNode;
};

export const SiteSettingsProvider = ({
  sanityDocument,
  sanityStructure,
  children,
}: ProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { displayed, draft, published } = sanityDocument;
  // TODO: update to allow switching between draft / displayed / and published
  const content = draft || displayed;
  const [data, setData] = useState<Record<string, any> | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<
    Record<string, any> | undefined
  >();
  const [selectedItem, setSelectedItem] = useSelectedItem(sanityStructure);

  function cleanAndSetData(dataObject: Partial<SanityDocument>) {
    console.log('cleaning and setting data');
    const { _rev, ...rest } = dataObject;
    const cleanedResponse = Object.assign(Object.create(null), rest);
    console.log('### setting data to ', cleanedResponse);
    setData(cleanedResponse);
    return cleanedResponse;
  }

  useEffect(() => {
    cleanAndSetData(content);
  }, [sanityDocument]);

  useEffect(() => {
    // handles situations where the schema only has 1 child.
    // This probably belongs in a more generic provider in the future.
    if (sanityStructure.length && sanityStructure.length === 1) {
      setSelectedItem(sanityStructure[0]);
    }
  }, []);

  const handleSelect = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget.dataset;

    const structure = sanityStructure.find((struct) => struct.name === name);
    if (structure) {
      setSelectedItem(structure);
    } else {
      throw new Error('could not load structure.');
    }
  };

  useEffect(() => {
    if (!selectedItem?.name || !data) {
      console.log(
        '%c no selected Item and/or no Data so just resetting to base content',
        'color: red; font-weight: bold;',
        { content },
      );
      setSelectedData(content);
      return;
    }
    console.log(
      '%c sanityStructure',
      'color: red; font-weight: bold;',
      sanityStructure,
    );

    setSelectedData(data[selectedItem.name]);
  }, [selectedItem, data?._updatedAt]);

  const handleBack = () => {
    setSelectedItem(null);
  };

  async function updateData(
    documentData: Record<string, any>,
  ): Promise<SanityDocument> {
    console.log('saving data of ', documentData);
    const controller = new AbortController();
    const signal = controller.signal;
    const id = documentData._id ? documentData._id : 'site_settings';
    const res = await patchSanityDocument(id, documentData, signal);
    return cleanAndSetData(res);
  }

  const reset = () => {
    setSelectedItem(null);
    setError(null);
    setData(content);
    // fetchData();
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        sanityStructure,
        reset,
        loading,
        error,
        data,
        selectedItem,
        /** selectedData,*/ handleSelect,
        handleBack,
        updateData,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettingsContext = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error(
      'SiteSettingsContext must be used within a SiteSettingsProvider',
    );
  }
  return context;
};
