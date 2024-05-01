const SelectorButton = ({ children, onClick, selected }) => {
  const classes = selected
    ? "bg-gray-900 text-white"
    : "bg-gray-50 text-gray-900 hover:bg-gray-100";
  return (
    <button
      onClick={onClick}
      className={`${classes} font-medium transition-colors duration-100 p-6 w-full rounded-lg`}
    >
      {children}
    </button>
  );
};

export default SelectorButton;
