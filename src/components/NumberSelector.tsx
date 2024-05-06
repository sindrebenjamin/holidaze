const NumberSelector = ({
  title,
  selected,
}: {
  title: string;
  selected: boolean;
}) => {
  const classes = selected
    ? "bg-gray-900 border-gray-900 text-white"
    : "border-gray-400 hover:border-gray-600";
  return (
    <div
      className={`${classes} border p-2 transition-colors rounded-lg flex items-center justify-center cursor-pointer`}
    >
      {title}
    </div>
  );
};

export default NumberSelector;
