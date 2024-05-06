interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: "gray-dark" | "pink" | "white" | "gray-light" | undefined;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  fullWidth?: boolean;
  disabled?: boolean;
  override?: string;
}

const Button: React.FC<ButtonProps> = ({
  color,
  size,
  type,
  fullWidth,
  children,
  disabled,
  onClick,
  override,
}) => {
  const sizeClasses =
    size === "sm"
      ? "px-3 py-2 text-xs"
      : size === "md"
      ? "px-3 py-2 text-sm"
      : size === "lg"
      ? "px-5 py-2.5 text-sm"
      : size === "xl"
      ? "px-5 py-3 text-base"
      : size === "2xl"
      ? "px-6 py-3.5 text-base"
      : "text-sm";

  const colorClasses =
    color === "gray-dark"
      ? "border bg-gray-900 hover:bg-gray-800 text-white border-gray-900 hover:bg-gray-800 focus:outline focus:outline-gray-300"
      : color === "pink"
      ? "border bg-pink-700 hover:bg-pink-800 text-white border-pink-700 hover:border-pink-800 focus:outline focus:outline-pink-300"
      : color === "white"
      ? "border bg-white text-gray-900 border-gray-300 hover:bg-gray-50 focus:outline focus:outline-gray-800"
      : color === "gray-light"
      ? "border bg-gray-200 hover:bg-gray-300 text-gray-900 border-gray-200 hover:bg-gray-300 focus:outline focus:outline-gray-800"
      : "opacity-70 hover:opacity-100";

  return (
    <button
      disabled={disabled}
      type={type}
      className={`${colorClasses} ${sizeClasses} ${fullWidth && "w-full"} ${
        disabled && "opacity-50"
      } flex items-center gap-2 justify-center transition-all duration-100 rounded-lg disabled:pointer-events-none ${override}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
