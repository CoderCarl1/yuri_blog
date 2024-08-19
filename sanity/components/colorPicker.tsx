import React, { useState } from "react";

type cbProps = {
    colorRef: string; 
    value: string
}

type ColorPickerProps = {
    currentValue: string;
    colorRef: string;
    cb: (data: cbProps) => unknown;
}

export default function ColorPicker({currentValue = '0,0,0', colorRef, cb}: ColorPickerProps){
    const [color, setColor] = useState(currentValue)

    function handleChange(event:  React.SyntheticEvent<HTMLInputElement>){
        console.log("ColorPicker", {colorRef} , { currentValue })
        if (!cb) return;
        setColor(event.currentTarget.value);
        cb({colorRef, value: event.currentTarget.value })
    }

    return <input type="color" id={colorRef} name={colorRef} value={color} onChange={handleChange}/>

}