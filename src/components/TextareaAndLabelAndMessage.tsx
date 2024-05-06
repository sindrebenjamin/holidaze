import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Textarea } from "./TailwindComponents";

interface TextareaAndLabelAndMessageProps<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  error?: boolean;
  message?: string;
  label: string;
  autocomplete?: string;
  register: UseFormRegister<T>;
}

const TextareaAndLabelAndMessage = <T extends FieldValues>({
  name,
  placeholder,
  error,
  message,
  label,
  autocomplete,
  register,
}: TextareaAndLabelAndMessageProps<T>) => {
  const errorClasses = error ? "text-red-500" : "";

  return (
    <div className={`${errorClasses} flex flex-col gap-2`}>
      <label className={`text-sm font-medium`} htmlFor={String(name)}>
        {label}
      </label>
      <div>
        <Textarea
          autoComplete={autocomplete}
          {...register(name)}
          id={String(name)}
          placeholder={placeholder}
          $error={error}
        />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default TextareaAndLabelAndMessage;
