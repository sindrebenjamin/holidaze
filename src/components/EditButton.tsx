import Edit from "./icons/Edit";

const EditButton = ({ overrideClasses }: { overrideClasses?: string }) => {
  return (
    <button
      className={`${overrideClasses} p-2.5 rounded-full bg-white hover:bg-gray-100 transition-colors duration-100`}
    >
      <Edit />
    </button>
  );
};

export default EditButton;
