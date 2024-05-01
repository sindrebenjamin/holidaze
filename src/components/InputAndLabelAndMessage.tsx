import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Input } from "./TailwindComponents";

interface InputAndLabelAndMessageProps<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  error: boolean;
  message?: string;
  label: string;
  register: UseFormRegister<T>;
}

function InputAndLabelAndMessage<T extends FieldValues>({
  name,
  placeholder,
  error,
  message,
  label,
  register,
}: InputAndLabelAndMessageProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" htmlFor={String(name)}>
        {label}
      </label>
      <div>
        <Input
          {...register(name)}
          id={String(name)}
          placeholder={placeholder}
          $error={error}
        />
        <p className={error ? "text-red-500" : ""}>{message}</p>
      </div>
    </div>
  );
}

export default InputAndLabelAndMessage;
