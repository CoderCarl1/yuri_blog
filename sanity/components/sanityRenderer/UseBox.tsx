import { compareObjects } from "@/functions/comparisons";
import { useStateWithDebounce } from "@/functions/hooks/useDebounce";
import type { sanityStructure } from "@/types/siteSettings.type";
import { useEffect, useState } from "react";

type BoxProps = {
    selectedStructure: sanityStructure;
    data: Record<string, any>;
    saveHandler: (data: any) => Promise<boolean>;
    clickHandler?: () => void;
};

export default function UseBox({ selectedStructure, data, saveHandler, clickHandler }: BoxProps) {
    const [documentData, setDocumentData] = useStateWithDebounce<Record<string, any>>(data, 50);
    const { title, fields } = selectedStructure.type;
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    function handleBack() {
        console.log("handleBack invoked - current isSaved status", isSaved)
        // Do this better for UX
        
        if (isSaved && clickHandler) {
            console.log("passed truthy check")
            clickHandler();
        }
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
        console.log("handleSave ran")
        if (!validateFields()) return;

        setIsSaving(true);
        console.log("data being passed through to handleSave", { reference: selectedStructure.name, structure: documentData })
        await saveHandler({ reference: selectedStructure.name, structure: documentData });
        setIsSaving(false);
    }

    useEffect(() => {
        setIsSaved(compareObjects(documentData, data));
    }, [documentData, data])

    function handleLocalChanges(changes: Record<string, any>, documentKey: string): void {
        setDocumentData({ ...documentData, [documentKey]: { ...documentData[documentKey] , ...changes}})
    }

    function reset() {
        setDocumentData(data);
        setValidationErrors({});
    }

    return {
        documentData, title, fields, isSaved, isSaving, validationErrors, handleBack, reset, handleSave, handleLocalChanges
    }
}
