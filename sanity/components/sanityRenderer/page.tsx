import useSelectedItem from "@/functions/hooks/useSelectedSettings";
import { getSettings } from "@/functions/loaders/settings";
import patchSanityDocument from "@/sanity/lib/post.client";
import { PageBoxProps } from "@/types/siteSettings.type";
import { useEffect, useState } from "react";
import Box from "./box";
import { BoxMap } from "./boxMap";


const Main: React.FC<PageBoxProps> = ({ sanityStructure }) => {
    console.log("+ structure", sanityStructure)
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
      if (name) {
        const structure = sanityStructure.find(struct => struct.name === name);
        if (structure) {
          setSelectedItem(structure);
        } else {
          throw new Error('could not load structure.')
        }
      }
    };
  
    const handleBack = () => {
      setSelectedItem(null);
    };
  
  
    async function updateData(data: Record<string, any>) {
      const signal = new AbortSignal()
      const res = await patchSanityDocument('siteSettings', data, signal);
      return (!!res);
    }
  
    return (
      <div className='[ pageBox ]'>
        {(selectedItem && data) ? (
          <Box
            selectedStructure={selectedItem}
            data={data}
            clickHandler={handleBack}
            saveHandler={updateData}
          />
        ) : (
          <BoxMap
            structureArray={sanityStructure}
            clickHandler={handleSelect}
          />
        )}
      </div>
    );
  };

  export default Main;