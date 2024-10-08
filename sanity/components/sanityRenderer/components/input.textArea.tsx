import { useCallback, useState } from 'react';
import cx from 'classnames';
import classNames from 'classnames';

type cbProps = {
  fieldName: string;
  value: string;
};

type TextAreaInputProps = {
  currentValue: string;
  fieldName: string;
  onChangeCB: (data: cbProps) => unknown;
};

export default function TextAreaInput({
  currentValue = '',
  fieldName,
  onChangeCB,
}: TextAreaInputProps) {
  const [value, setValue] = useState(currentValue);

  const handleChange = useCallback(
    (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
      if (!onChangeCB) return;
      console.log(
        '%c string input onchange handleChange',
        'background: #222; color: #bada55',
        { fieldName, value: event.currentTarget.value },
      );
      setValue(event.currentTarget.value);
      onChangeCB({ fieldName, value: event.currentTarget.value });
    },
    [value],
  );

  return (
    <div>
      <label htmlFor={fieldName}>{fieldName}</label>
      <textarea
        className={cx('input textArea', classNames)}
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
