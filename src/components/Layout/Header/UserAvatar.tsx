import { useUserStore } from "../../../store/useUserStore";

const UserAvatar = ({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) => {
  const user = useUserStore((state) => state.user);
  return (
    <div
      onClick={onClick}
      className={`${
        isOpen ? "opacity-50" : ""
      } hover:opacity-80 transition-colors duration-100 cursor-pointer relative w-fit h-fit`}
    >
      <img
        className="rounded-full h-11 w-11 object-cover"
        src={user?.avatar.url}
        alt={user?.avatar.alt}
      />
      <div className="bg-gray-50 justify-center items-center flex rounded-full h-3 w-3 absolute bottom-0 right-0">
        <svg
          width={6}
          height={4}
          viewBox="0 0 6 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L3 3L5 1"
            stroke="#F472B6"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default UserAvatar;
