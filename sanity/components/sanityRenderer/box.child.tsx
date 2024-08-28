import { documentFieldChild } from "@/types/box.type";
import UseBox from "./UseBox";

type RenderDocumentProps = {
  documentTitle: string;
  documentFields: documentFieldChild[];
  // documentData: Record<string, any>;
  // changeHandler: (changes: Record<string, any>, documentTitle: string) => void;
  // validationErrors: Record<string, any>;
  Component: (props: documentFieldChild) => JSX.Element;
};

export const BoxChild: React.FC<RenderDocumentProps> = ({
  documentTitle,
  documentFields,
  // documentData,
  // changeHandler,
  // validationErrors,
  Component
}) => {

  console.log(`documentFields for ${documentTitle}`, documentFields)

  return (
    <div className='[ page-box__child document-render ]'>
      <h2>{documentTitle}</h2>
      <div className="flex gap-4">
        {/* {documentFields.map(child => Component(child))} */}
        {/* {Component(documentFields[0])} */}

      </div>
    </div>
  )
};
