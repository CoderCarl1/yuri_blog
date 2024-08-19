import Button from "@/components/Button";
import { BoxChild } from "./box.child";
import type { sanityStructure } from "@/types/siteSettings.type";
import UseBox from "./UseBox";
import { useEffect } from "react";

type BoxProps = {
    selectedStructure: sanityStructure;
    data: Record<string, any>;
    saveHandler: (data: any) => Promise<boolean>;
    clickHandler?: () => void;
};

export default function Box(props: BoxProps) {
    // console.log("props", props)
    const { documentData, title, fields, isSaved, isSaving, validationErrors, handleBack, reset, handleSave, handleLocalChanges} = UseBox(props);
// console.log("documentData after useBox", documentData)
useEffect(() => {
console.log("props", {props})
console.log("documentData", {documentData})

},[])
    return (
        <>
            <div className="[ pageBox__controls ]">
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleSave} disabled={isSaved} loading={isSaving}>Save</Button>
                <Button onClick={reset} type="reset"/>
            </div>
            {documentData &&
                <BoxChild
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