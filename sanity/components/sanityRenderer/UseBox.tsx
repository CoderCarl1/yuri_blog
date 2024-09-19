import { compareObjects } from "@/functions/comparisons";
import { useStateWithDebounce } from "@/functions/hooks/useDebounce";
import { documentFieldChild } from "@/types/box.type";
import type { sanityStructure } from "@/types/siteSettings.type";
import { useMemo, useState } from "react";
import { type SanityDocument } from "sanity";
import ColorInput from "./components/input.color";
import StringInput from "./components/input.string";
import TextAreaInput from "./components/input.textArea";
import Image from '../Image.client';



type BoxProps = {
  selectedStructure: sanityStructure;
  data: Record<string, any>;
  saveHandler: (data: any) => Promise<SanityDocument>;
  clickHandler?: () => void;
};

export default function UseBox({ selectedStructure, data, saveHandler, clickHandler }: BoxProps) {
  const [documentData, setDocumentData] = useStateWithDebounce<Record<string, any>>(data, 50);
  const { fields, title, jsonType } = selectedStructure.type;
  const isArray = useMemo(() => jsonType === "array", [jsonType])

  /**
   * 
   * TODO:  reference the  selectedStructure.type.name which is either 'object' or 'array'
   * if Array, the data will need to be +'able to add the fields for as many of them as the user wants
   */
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const isSaved = useMemo(() => {
    return compareObjects(documentData, data);
  }, [documentData, data]);


  function handleBack() {
    // TODO: add some sort of refresh here to handle this situation.
    if (!isSaved || !clickHandler) return;

    clickHandler();
  }

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
    return Object.keys(errors).length === 0;
  }

  function handleSave() {
    if (!validateFields()) return;
    setIsSaving(true);
    const { _createdAt, _updatedAt, ...rest } = documentData
    const dataToSave = Object.assign(Object.create(null), rest)
    return saveHandler(dataToSave)
    .then(() => {
      // TODO: handle cases when saving is not OK
      setIsSaving(false);
    });
  }

  function handleLocalChanges(changes: Record<string, any>, documentKey: string): void {
    const cleanObj = Object.assign(
      Object.create(null),
      documentData,
      { [documentKey]: Object.assign(Object.create(null), documentData[documentKey], changes) }
    );
console.log("handleLocalChanges => setDocumentData running ")
    setDocumentData(cleanObj)
  }

  function reset() {
    setDocumentData(data);
    setValidationErrors({});
  }

  function componentSelector({ name = '', ...props }: documentFieldChild) {
    try {
      const value = { ...documentData[title.toLowerCase()] }.hasOwnProperty(name)
        ? documentData[title.toLowerCase()][name]
        : '';
      // console.log("documentData", documentData)
      // console.log("value", value)

      const [componentType, ...componentNamePieces] = name.split('_');
      const componentName = componentNamePieces.join(" ");
      // console.log("props", props)
      // console.log("image value ", value)
      // console.log("looking for name of ",name)
      // console.log("documentData", documentData)
      // console.log("data", data)
      // console.log("documentData[title.toLowerCase()] ", documentData[title.toLowerCase()])
      // console.log("documentData[title.toLowerCase()][name]", documentData[title.toLowerCase()][name])

      function _handleChange({ value }: { fieldName: string; value: string }) {       
        handleLocalChanges({ [name]: value }, title.toLowerCase());
      };

      function _addNewEntry(fieldName: string) {
        const updatedArray = [...(value || []), {}]; // Add an empty object or default value
        handleLocalChanges({ [fieldName]: updatedArray }, title.toLowerCase());
      }

      if (isArray) {
        console.log("It is an Array")
        console.log("value", value)

        return (
          <div key={name}>
            <h3>{name}</h3>
            {Array.isArray(value) &&
              value.map((entry, index) => (
                <div key={index}>
                  {/* Render a component for each entry in the array */}
                  {/* You can create a recursive component to handle nested structures */}
                  {/* <Component key={index} name={name} type={type} /> */}
                </div>
              ))}
            <button onClick={() => _addNewEntry(name)}>Add New {componentName}</button>
          </div>
        )
      }

      switch (componentType) {
        case 'color':
          return <ColorInput key={name} currentValue={value} fieldName={componentName} onChangeCB={_handleChange} />;
        // Add other cases for different types
        case 'text':
          return <StringInput key={name} currentValue={value} fieldName={componentName} onChangeCB={_handleChange} />;
        case 'textArea':
          return <TextAreaInput key={name} currentValue={value} fieldName={componentName} onChangeCB={_handleChange} />;
        case 'image':
          // if (value.asset.ref)
          return <div><Image image={value}/></div>
          // return <div>IMAGE PLACEHOLDER </div>
        // return  <ImageInput value={value} fieldName={componentName} onChangeCB={(url) => _handleChange({ fieldName: name, value: url })} />
        // return <Image key={name} currentValue={value} fieldName={componentName} onChangeCB={_handleChange} />;
        default:
          return <div key={name}>Unsupported component: {componentName}</div>;
      }
    } catch (err) {

      console.log("error ", err)
      console.log("documentFields", selectedStructure)
      console.log("documentData", documentData)
      console.log("documentTitle.toLowerCase()", title.toLowerCase())
      // const val = documentData[documentTitle.toLowerCase()].hasOwnProperty(name)
      // ? documentData[documentTitle.toLowerCase()][name]
      // : null;
      // console.log("documentData[documentTitle.toLowerCase()][name]"), documentData[documentTitle.toLowerCase()][name]
      // console.log("documentData[documentTitle.toLowerCase()][name] ?  documentData[documentTitle.toLowerCase()][name] : null;", documentData[documentTitle.toLowerCase()][name] ? documentData[documentTitle.toLowerCase()][name] : null)
      return <div key={name}>Unsupported component: {name}</div>;
    }

  };

  return {
    documentData, componentSelector, title, fields, isSaved, isSaving, validationErrors, handleBack, reset, handleSave, handleLocalChanges
  }
}