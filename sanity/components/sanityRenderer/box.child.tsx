import ColorInput from "./components/input.color";


type documentFieldChild = { 
  name: string;
  type: { 
    jsonType: string;
    name: string;
    title: string;
    validation: [];
    [key: string]: any }
   }
type RenderDocumentProps = {
    documentTitle: string;
    documentFields: documentFieldChild[];
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
      if (!changeHandler) return;
      changeHandler({ [fieldName]: value}, documentTitle.toLowerCase());
    };
    console.log("documentFields", documentFields)
    const selectComponent = (child: documentFieldChild) => {
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
        return <Component key={name} currentValue={value} fieldName={name} onChangeCB={handleChange} />;
      }
  
      return <div key={name}>Unsupported component: {name}</div>;
    };

    return (
      <div className='[ page-box__child document-render ]'>
        <h2>{documentTitle}</h2>
        <div className="flex gap-4">
          {documentFields.map(child => selectComponent(child))}
        </div>
      </div>
    )
  };