

type RenderDocumentProps = {
    documentTitle: string;
    documentFields: Record<string, any>;
    documentData: Record<string, any>;
    changeHandler: (changes: Record<string, any>) => void;
    validationErrors: Record<string, any>;
  };
  
  export const RenderDocument: React.FC<RenderDocumentProps> = ({
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
        {
          JSON.stringify(documentData, null, 2)
        }
      </div>
    )
  };