import { forwardRef } from "react";

import { Input } from "./TailwindComponents";

interface VenueMediaInputProps {
  name: string;
  placeholder: string;
  label: string;
  value: string;
  error: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  disabled: boolean;
}

const VenueMediaInput = forwardRef<HTMLInputElement, VenueMediaInputProps>(
  (
    {
      name,
      placeholder,
      label,
      value,
      error,
      onChange,
      onFocus,
      onBlur,
      disabled,
    },
    ref
  ) => {
    const errorClasses = error ? "text-red-500" : "";

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
            $error={error}
            type="text"
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
          />
          {error && <p>Must be a valid image URL</p>}
        </div>
      </div>
    );
  }
);

export default VenueMediaInput;
