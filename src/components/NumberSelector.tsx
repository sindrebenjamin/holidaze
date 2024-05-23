const NumberSelector = ({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) => {
  const classes = selected
    ? "bg-gray-900 border-gray-900 text-white"
    : "border-gray-400 hover:border-gray-600";
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${classes} border p-2 transition-colors rounded-lg flex items-center justify-center cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default NumberSelector;
