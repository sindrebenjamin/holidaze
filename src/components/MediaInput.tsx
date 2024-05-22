import { forwardRef } from "react";

import { Input } from "./TailwindComponents";

interface MediaInputProps {
  name: string;
  placeholder: string;
  label: string;
  value: string;
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled: boolean;
}

const MediaInput = forwardRef<HTMLInputElement, MediaInputProps>(
  (
    {
      name,
      placeholder,
      label,
      value,
      errorMessage,
      onChange,
      onFocus,
      onBlur,
      disabled,
    },
    ref
  ) => {
    const errorClasses = errorMessage ? "text-red-500" : "";

    return (
      <div className={`${errorClasses} flex flex-col gap-2`}>
        <label className={`text-sm font-medium`} htmlFor={String(name)}>
          {label}
        </label>
        <div>
          <Input
            ref={ref}
            onChange={onChange}
            id={String(name)}
            placeholder={placeholder}
            $error={errorMessage ? true : false}
            type="text"
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
          />
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    );
  }
);

export default MediaInput;
