import { documentFieldChild } from "@/types/box.type";
import { useEffect } from "react";

type RenderDocumentProps = {
  documentTitle: string;
  documentFields: documentFieldChild[];
  componentSelector: (props: documentFieldChild) => JSX.Element | undefined;
};

export const BoxChild: React.FC<RenderDocumentProps> = ({
  documentTitle,
  documentFields,
  componentSelector
}) => {

  return (
    <div className='[ page-box__child document-render ]'>
      <h2>{documentTitle}</h2>
      <div className="flex gap-4">
        {documentFields.map(child => componentSelector(child))}
        {/* {Component(documentFields[0])} */}

      </div>
    </div>
  )
};
