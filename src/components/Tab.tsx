const Tab = ({
  title,
  onClick,
  active,
  disabled,
  sizing,
  error,
}: {
  title: string;
  onClick: () => void;
  active: boolean;
  disabled?: boolean;
  error?: boolean | undefined;
  sizing: string;
}) => {
  const classes = error
    ? "text-red-500 border-red-500"
    : active
    ? "text-pink-600 border-pink-500"
    : "text-gray-500 border-gray-200 hover:text-gray-900 hover:border-gray-300";
  return (
    <button
      type="button"
      disabled={disabled}
      className={`${classes} ${sizing} ${
        disabled && "opacity-50"
      } transition-colors duration-100 text-sm border-b font-medium pb-3 grow-0 shrink-0 md:grow md:shrink disabled:pointer-events-none`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Tab;
