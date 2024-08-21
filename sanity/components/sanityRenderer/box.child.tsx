import ColorInput from "./components/input.color";


type RenderDocumentProps = {
    documentTitle: string;
    documentFields: Record<string, any>;
    documentData: Record<string, any>;
    changeHandler: (changes: Record<string, any>, documentTitle: string) => void;
    validationErrors: Record<string, any>;
  };
  
  export const BoxChild: React.FC<RenderDocumentProps> = ({
    documentTitle,
    documentFields,
    documentData,
    changeHandler,
    validationErrors
  }) => {
  
    const handleChange = ({fieldName, value}: {fieldName: string; value: string}) => {
      // console.warn("+++++  handle change inside of box child ", {documentTitle}, {fieldName, value})
      if (!changeHandler) return;

      changeHandler({ [fieldName]: value}, documentTitle.toLowerCase());
    };
  
    // console.log("documentFields", documentFields)
    // console.log("documentData", documentData)


    const selectComponent = (child: { name: string; type: { jsonType: string; [key: string]: any } }) => {
      const { name, type } = child;

      const componentMap: Record<string, React.FC<any>> = {
        color: ColorInput,
        // string: StringInput, // Example: Add more components as needed
        // Add other types/components here...
      };
      const matchedComponent = Object.keys(componentMap).find((key) => name.includes(key) || type.jsonType === key);

      if (matchedComponent) {
        const Component = componentMap[matchedComponent];
        const value = documentData[documentTitle.toLowerCase()][name] ?? "#000";
        console.log("value", value)
        return <Component key={name} currentValue={value} fieldName={name} onChangeCB={handleChange} />;
      }
  
      return <div key={name}>Unsupported component: {name}</div>;
    };

    return (
      <div className='[ page-box__child document-render ]'>
        <h2>{documentTitle}</h2>
        <div className="flex gap-4">
          {/* {documentFields.map(child => selectComponent(child))} */}
          {selectComponent(documentFields[0])}

        </div>
      </div>
    )
  };