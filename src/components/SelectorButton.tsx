interface SelectorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
}

const SelectorButton: React.FC<SelectorButtonProps> = ({
  children,
  onClick,
  selected,
}) => {
  const classes = selected
    ? "bg-gray-900 text-white border-gray-900"
    : "bg-gray-50 text-gray-900 hover:bg-gray-100 border-gray-300";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${classes} border font-medium transition-colors duration-100 p-6 w-full rounded-lg`}
    >
      {children}
    </button>
  );
};

export default SelectorButton;
