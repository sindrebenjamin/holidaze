import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Input } from "./TailwindComponents";

interface InputAndLabelAndMessageProps<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  error?: boolean;
  message?: string;
  label: string;
  type: string;
  autocomplete?: string;
  register: UseFormRegister<T>;
}

function InputAndLabelAndMessage<T extends FieldValues>({
  name,
  placeholder,
  error,
  message,
  label,
  type,
  autocomplete,
  register,
}: InputAndLabelAndMessageProps<T>) {
  const errorClasses = error ? "text-red-500" : "";

  return (
    <div className={`${errorClasses} flex flex-col gap-2`}>
      <label className={`text-sm font-medium`} htmlFor={String(name)}>
        {label}
      </label>
      <div>
        <Input
          autoComplete={autocomplete}
          {...register(name)}
          id={String(name)}
          placeholder={placeholder}
          $error={error}
          type={type}
        />
        <p>{message}</p>
      </div>
    </div>
  );
}

export default InputAndLabelAndMessage;

//type..... for button as well? Submit?
