// CustomImageInput.tsx
import { ReactNode, ReactElement } from 'react';
import { useFormState, useFormValue, set, unset, FieldProps, InputProps, ObjectItemProps, Path, RenderPreviewCallbackProps } from 'sanity';
import { ImageInput } from 'sanity'; // Use the built-in ImageInput component from Sanity

type CustomImageInputProps = {
  fieldPath: string[];
};

export default function CustomImageInput({ fieldPath }: CustomImageInputProps) {
  // Get the current value of the image field
  const currentValue = useFormValue(fieldPath) as any;

  // Get the form state, useful for checking if the document is being saved, etc.
  // const { id, validation } = useFormState();

  // Handle changes to the image input
  const handleChange = (updatedValue: any) => {
    // Update the field value with the new image data
    if (updatedValue) {
      set(currentValue, updatedValue);
    } else {
      unset(currentValue);
    }
  };

  return (
    <div>
      <h3>Upload or Select an Image</h3>
      <ImageInput
        value={currentValue}
        onChange={handleChange}
        readOnly={false}
        // validation={validation}
        path={fieldPath}
        focusPath={[]}
        groups={[]}
        members={[]}
        id={''}
        schemaType={undefined}
        level={0}
        presence={[]}
        validation={[]}
        changed={false}
        onFieldCollapse={}
         onFieldExpand={}
         onFieldSetCollapse={}
          onFieldSetExpand={}
          onFieldGroupSelect={}
           onPathFocus={} onFieldOpen={}
         onFieldClose={}
         renderInput={}
         renderField={}
         renderItem={}
         renderPreview={ }
         elementProps={}
         renderDefault={ }      />
    </div>
  );
}
