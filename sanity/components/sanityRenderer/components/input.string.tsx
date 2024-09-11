import { useState } from "react";
import cx from 'classnames';
import classNames from "classnames";

type cbProps = {
    fieldName: string;
    value: string
}

type StringInputProps = {
    currentValue: string;
    fieldName: string;
    onChangeCB: (data: cbProps) => unknown;
}

export default function StringInput({
    currentValue = '',
    fieldName,
    onChangeCB
}: StringInputProps) {
    const [value, setValue] = useState(currentValue)

    function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
        if (!onChangeCB) return;
        console.log("%c string input onchange handleChange", 'background: #222; color: #bada55', { fieldName, value: event.currentTarget.value })
        setValue(event.currentTarget.value);
        onChangeCB({ fieldName, value: event.currentTarget.value })
    }

    return <div>
        <label htmlFor={fieldName}>{fieldName}</label>
        <input
            type="text"
            className={cx("input text", classNames)}
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={handleChange}
        />
    </div>

}