import Edit from "./icons/Edit";

const EditButton = ({
  overrideClasses,
  onClick,
}: {
  overrideClasses?: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${overrideClasses} p-2.5 rounded-full bg-white hover:bg-gray-100 transition-colors duration-100`}
    >
      <Edit />
    </button>
  );
};

export default EditButton;
