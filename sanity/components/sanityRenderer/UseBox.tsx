import { compareObjects } from "@/functions/comparisons";
import { useStateWithDebounce } from "@/functions/hooks/useDebounce";
import { documentFieldChild } from "@/types/box.type";
import type { sanityStructure } from "@/types/siteSettings.type";
import { useMemo, useState } from "react";
import { SanityDocument } from "sanity";
import ColorInput from "./components/input.color";

type BoxProps = {
    selectedStructure: sanityStructure;
    data: Record<string, any>;
    saveHandler: (data: any) => Promise<SanityDocument>;
    clickHandler?: () => void;
};

export default function UseBox({ selectedStructure, data, saveHandler, clickHandler }: BoxProps) {
    const [documentData, setDocumentData] = useStateWithDebounce<Record<string, any>>(data, 50);
    console.log("selectedStructure.type", selectedStructure.type)
    const {fields, title} = selectedStructure.type;
    /**
     * 
     * TODO:  reference the  selectedStructure.type.name which is either 'object' or 'array'
     * if Array, the data will need to be +'able to add the fields for as many of them as the user wants
     */
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = useState(false);

    const isSaved = useMemo(() => {
        return compareObjects(documentData[title.toLowerCase()], data);
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

    async function handleSave() {
        if (!validateFields()) return;
        setIsSaving(true);
        const { _createdAt, _updatedAt, ...rest } = documentData
        const dataToSave = Object.assign(Object.create(null), rest)
        await saveHandler(dataToSave);
        setIsSaving(false);
    }

    function handleLocalChanges(changes: Record<string, any>, documentKey: string): void {
        const cleanObj = Object.assign(
            Object.create(null),
            documentData,
            {[documentKey]: Object.assign(Object.create(null), documentData[documentKey], changes)}
        );

        setDocumentData(cleanObj)
    }

    function reset() {
        setDocumentData(data);
        setValidationErrors({});
    }

    function Component({ name = '' }: documentFieldChild) {
        try {
          const value = {...documentData[title.toLowerCase()]}.hasOwnProperty(name)
            ? documentData[title.toLowerCase()][name]
            : '';
          const componentType = name.split('_')[0];
          function _handleChange({ fieldName, value }: { fieldName: string; value: string }) {
            handleLocalChanges({ [fieldName]: value }, title.toLowerCase());
          };

          switch (componentType) {
            case 'color':
              return <ColorInput key={name} currentValue={value} fieldName={name} onChangeCB={_handleChange} />;
            // Add other cases for different types
            // case 'string':
            //   return <StringInput key={name} currentValue={value} fieldName={name} onChangeCB={handleChange} />;
            default:
              return <div key={name}>Unsupported component: {name}</div>;
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
        documentData, Component, title, fields, isSaved, isSaving, validationErrors, handleBack, reset, handleSave, handleLocalChanges
    }
}