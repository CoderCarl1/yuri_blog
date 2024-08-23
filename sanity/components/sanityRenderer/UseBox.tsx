import { compareObjects } from "@/functions/comparisons";
import { useStateWithDebounce } from "@/functions/hooks/useDebounce";
import type { sanityStructure } from "@/types/siteSettings.type";
import { useEffect, useMemo, useState } from "react";

type BoxProps = {
    selectedStructure: sanityStructure;
    data: Record<string, any>;
    saveHandler: (data: any) => void;
    clickHandler?: () => void;
};

export default function UseBox({ selectedStructure, data, saveHandler, clickHandler }: BoxProps) {
    const [documentData, setDocumentData] = useStateWithDebounce<Record<string, any>>(data, 50);
    const { title, fields } = selectedStructure.type;
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const [isSaving, setIsSaving] = useState(false);
    
    const isSaved = useMemo(() => {
        return compareObjects(documentData[title.toLowerCase()], data[title.toLowerCase()]);
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
        const { _createdAt, _updatedAt, ...record } = documentData
        await saveHandler(record);
        setIsSaving(false);
    }

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