import Button from "@/components/Button";
import { compareObjects } from "@/functions/comparisons";
import { useStateWithDebounce } from "@/functions/hooks/useDebounce";
import { sanityStructure } from "@/types/siteSettings.type";
import { useEffect, useState } from "react";
import { TfiReload } from "react-icons/tfi";
import { RenderDocument } from "./renderDocument";

type BoxProps = {
    selectedStructure: sanityStructure;
    data: Record<string, any>;
    clickHandler: () => void;
    saveHandler: (data: any) => Promise<boolean>;
};

export default function Box({ selectedStructure, data, clickHandler, saveHandler }: BoxProps) {
    const [documentData, setDocumentData] = useStateWithDebounce<Record<string, any>>(data, 50);
    const { title, fields } = selectedStructure.type;
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    console.log("selectedStructure", selectedStructure)
    console.log("documentData", documentData)
    console.log({ title })
    console.log({ fields })

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
        if (!validateFields()) return; // Exit if there are validation errors


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
                <Button onClick={reset}>Reset <TfiReload color={"red"} /></Button>
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