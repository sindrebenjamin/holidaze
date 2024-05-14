import { ChangeEvent } from "react";

import { Textarea } from "./TailwindComponents";

interface BioInputProps {
  name: string;
  placeholder: string;
  error?: boolean;
  message?: string;
  label: string;
  autocomplete?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const BioInput = ({
  name,
  placeholder,
  error,
  message,
  label,
  autocomplete,
  value,
  onChange,
}: BioInputProps) => {
  const errorClasses = error ? "text-red-500" : "";

  return (
    <div className={`${errorClasses} flex flex-col gap-2 w-full`}>
      <label className={`text-sm font-medium`} htmlFor={String(name)}>
        {label}
      </label>
      <div>
        <Textarea
          onChange={onChange}
          autoComplete={autocomplete}
          id={String(name)}
          placeholder={placeholder}
          $error={error}
          value={value}
        />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default BioInput;
