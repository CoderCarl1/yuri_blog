import { useEffect, useState } from 'react';
import { getSettings } from '@/functions/loaders/settings';
import { useStateWithDebounce } from '@/functions/hooks/useDebounce';
import { compareObjects } from '@/functions/comparisons';
import Button from '@/components/Button';
import { TfiReload } from "react-icons/tfi";
import patchSanityDocument from '../lib/post.client';
import { PageBoxProps, sanityStructure } from '@/types/siteSettings.type';
import useSelectedItem from '@/functions/hooks/useSelectedSettings';

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



type RenderDocumentProps = {
  documentTitle: string;
  documentFields: Record<string, any>;
  documentData: Record<string, any>;
  changeHandler: (changes: Record<string, any>) => void;
  validationErrors: Record<string, any>;
};

const RenderDocument: React.FC<RenderDocumentProps> = ({
  documentTitle,
  documentFields,
  documentData,
  changeHandler,
  validationErrors
}) => {

  const handleChange = (fieldName: string, value: any) => {
    changeHandler({ [fieldName]: value });
  };

  console.log("documentFields", documentFields)

  return (
    <div className='[ document-render ]'>
      <h2>{documentTitle}</h2>
      {
        JSON.stringify(documentData, null, 2)
      }
    </div>
  )

  // const [colors, setColors] = useState({});
  // const [saving, setSaving] = useState(false);
  // const user = useCurrentUser();
  // console.log("USER INFORMATION", user)

  // if (!document) return null;
  // // TODO: add a button to update one of the colors and send to sanity api
  // console.log("document ", document)

  // if (document.title === 'Colors') {
  //   function handlechange({ colorRef, value }: any) {
  //     setColors({...colors, [`colors.${colorRef}`]: value} )
  //     // changeHandler({ documentName: document.title, updatedDocument: { colorRef, value } })
  //   }
  //   async function handleSave(){
  //     console.log("colors from state", colors)
  //     console.log("handleSave invoked")
  //     if (!user) return;
  //     console.log("isSiteColors(colors)", isSiteColors(colors))
  //     if (!isSiteColors(colors)) {
  //       console.log("returning early because something is not right")
  //       return;
  //     }

  //     setSaving(true);
  //     const response = await patchSanityDocument('siteSettings', colors);
  //     if (!response.ok) {
  //       // do something meaningful here
  //     }
  //     setSaving(false);
  //     console.log("respoonse from saving ", await response.json())
  //   }
  //   return (
  //     <>
  //       {document.fields.map(colorField => {
  //         return <ColorPicker key={colorField.name} currentValue={''} colorRef={colorField.name} cb={handlechange} />
  //       })}
  //       <button onClick={handleSave}>Save Colors</button>
  //     </>
  //   )

  // }
  // return (
  //   <div>
  //     {/* Render each field of the document */}
  //     {/* {Object.keys(document).map((key) => (
  //       <div key={key}>
  //         <strong>{key}:</strong> {JSON.stringify(document[key], null, 2)}
  //       </div>
  //     ))} */}
  //   </div>
  // );
};

export default Main;
