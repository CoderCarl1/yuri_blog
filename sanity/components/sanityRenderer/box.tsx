import Button from "@/components/Button";
import { BoxChild } from "./box.child";
import type { sanityStructure } from "@/types/siteSettings.type";
import UseBox from "./UseBox";

type BoxProps = {
    selectedStructure: sanityStructure;
    data: Record<string, any>;
    saveHandler: (data: any) => void;
    clickHandler?: () => void;
};

export default function Box(props: BoxProps) {
    const { documentData, title, fields, isSaved, isSaving, validationErrors, handleBack, reset, handleSave, handleLocalChanges } = UseBox(props);
// console.log("inside box documentData ", documentData)
// console.log("inside box fields", fields)
    return (
        <>
            <div className="[ pageBox__controls ]">
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleSave} disabled={isSaved} loading={isSaving}>Save</Button>
                <Button onClick={reset} type="reset" />
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