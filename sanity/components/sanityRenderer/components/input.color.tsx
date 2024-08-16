import { useState } from "react";
import cx from 'classnames';
import classNames from "classnames";

type cbProps = {
    fieldName: string; 
    value: string
}

type ColorInputProps = {
    currentValue: string;
    fieldName: string;
    onChangeCB: (data: cbProps) => unknown;
}

export default function ColorInput({
    currentValue = '0,0,0', 
    fieldName, 
    onChangeCB
}: ColorInputProps){
    const [color, setColor] = useState(currentValue)

    function handleChange(event:  React.SyntheticEvent<HTMLInputElement>){
        if (!onChangeCB) return;
        console.log("%c color input onchange handleChange", 'background: #222; color: #bada55', {fieldName, value: event.currentTarget.value } )
        setColor(event.currentTarget.value);
        onChangeCB({fieldName, value: event.currentTarget.value })
    }

    return <div>
        <label htmlFor={fieldName}>{fieldName}</label>
        <input 
                type="color"
                className={cx("input color", classNames)}
                id={fieldName} 
                name={fieldName} 
                value={color} 
                onChange={handleChange}
            />
            </div>

}