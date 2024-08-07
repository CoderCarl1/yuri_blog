import { useEffect, useState } from 'react';
import { Rule, SanityDocument } from 'sanity';
import { getSettings } from '@/functions/loaders/settings';
import { patchSanityDocument } from '../lib/post.client';
import { useStateWithDebounce } from '@/functions/hooks/useDebounce';
import { compareObjects } from '@/functions/comparisons';
import Button from '@/components/Button';

type sanityValidationRules = Rule[];

type sanityStructure = {
  name: string;
  fieldset: string;
  group: string;
  type: { 
    title: string;
    validation: sanityValidationRules;
  } & Record<string, any>;
}
type MainProps = {
  sanityStructure: sanityStructure[];
};

const Main: React.FC<MainProps> = ({ sanityStructure }) => {
  console.log("+ structure", sanityStructure)
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<SanityDocument | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<sanityStructure | null>(null);

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
    const res = await patchSanityDocument('siteSettings', data);
    return (!!res);
  }

console.log("data", data && data)
console.log("selectedItem", selectedItem && selectedItem)

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

type BoxMapProps = {
  structureArray: sanityStructure[];
  clickHandler: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
};

const BoxMap: React.FC<BoxMapProps> = ({ structureArray = [], clickHandler }) => {
  return (
    <>
      {structureArray.map(({ name }) => (
        <button data-name={name} key={name} onClick={clickHandler}>
          {name}
        </button>
      ))}
    </>
  );
};

type BoxProps = {
  selectedStructure: sanityStructure;
  data: Record<string, any>;
  clickHandler: () => void;
  saveHandler: (data: any) => Promise<boolean>;
};

function Box({ selectedStructure, data, clickHandler, saveHandler }: BoxProps) {
  const [documentData, setDocumentData] = useStateWithDebounce<Record<string, any>>(data, 50);
  const { title, fields } = selectedStructure.type;
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
console.log("selectedStructure", selectedStructure)
console.log("documentData", documentData)
console.log({title})
console.log({fields})
  function handleBack() {
    // Do this better for UX
    if (isSaved) {
      clickHandler();
    }
  }
  function reset() {
    setDocumentData(data);
    setValidationErrors({});
  }

console.log("Object.keys(documentData)",title && documentData[title] && Object.keys(documentData[title]))

function validateFields() {
  const errors: Record<string, string> = {};
  
  fields.forEach((field: any) => {
    const isRequired = field?.type?.validation?.some((rule: any) => rule._required);
    const fieldValue = documentData[field.name];

    if (isRequired && !fieldValue) {
      errors[field.name] = `${field.name} is required`;
    }
  });

  setValidationErrors(errors);
  return Object.keys(errors).length === 0; // Return true if no errors
}

async function handleSave() {
  if (!validateFields()) {
    return; // Exit if there are validation errors
  }

//     const requiredFieldsAreSaved = Object.keys(documentData).every(field => {
//       if (field.type.type.validation[0]._required) && documentData[title]){
//   return true
// }
// return false
// } 
// )

    setIsSaving(true);
    await saveHandler({ reference: selectedStructure.name, structure: documentData });
    setIsSaving(false);
  }

  function handleLocalChanges(changes: Record<string, any>): void {
    setDocumentData({ ...documentData, ...changes })
  }

  useEffect(() => {
    setIsSaved(compareObjects(documentData, data));
  }, [documentData, data])

  return (
    <>
      <div className="[ pageBox__controls ]">
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleSave} loading={isSaving}>Save</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
      {documentData &&
        <RenderDocument 
        documentTitle={title} 
        documentFields={fields} 
        documentData={documentData} 
        changeHandler={handleLocalChanges}
        validationErrors={validationErrors}
        
        />
      }
    </>
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
