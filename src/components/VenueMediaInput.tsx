import { Input } from "./TailwindComponents";

interface VenueMediaInputProps {
  name: string;
  placeholder: string;
  label: string;
  value: string;
  error: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VenueMediaInput = ({
  name,
  placeholder,
  label,
  value,
  error,
  onChange,
}: VenueMediaInputProps) => {
  const errorClasses = error ? "text-red-500" : "";

  return (
    <div className={`${errorClasses} flex flex-col gap-2`}>
      <label className={`text-sm font-medium`} htmlFor={String(name)}>
        {label}
      </label>
      <div>
        <Input
          onChange={onChange}
          id={String(name)}
          placeholder={placeholder}
          $error={error}
          type="text"
          value={value}
        />
        {error && <p>Must be a valid image URL</p>}
      </div>
    </div>
  );
};

export default VenueMediaInput;
