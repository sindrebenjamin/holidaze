import { NavLink, useNavigate } from "react-router-dom";

import { useUserStore } from "../../../store/useUserStore";

const Dropdown = ({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}) => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const classes = isOpen
    ? `translate-y-0 opacity-1 z-[1001]`
    : `translate-y-4 opacity-0 z-[-1]`;

  return (
    <nav
      className={`${classes} top-[55px] rounded-lg right-0 border border-gray-300 shadow bg-white absolute transition-all duration-300 ease-out`}
    >
      <div className="absolute z-20 h-4 w-4 rotate-45 mt-0.5 border-l border-t border-gray-300 bg-white top-[-11px] right-3"></div>
      <div className="px-4 py-3">
        <p className="font-semibold">{user?.name}</p>
        <p>{user?.email}</p>
      </div>
      <div className="h-[1px] w-full bg-gray-100"></div>
      <div className="flex flex-col">
        <NavLink
          onClick={() => setIsOpen(false)}
          className="text-gray-500 px-4 py-3 hover:bg-gray-50 transtion-colors duration-100"
          to={"/account"}
        >
          My account
        </NavLink>
        {user?.venueManager && (
          <NavLink
            onClick={() => setIsOpen(false)}
            className="text-gray-500 px-4 py-3 hover:bg-gray-50 transtion-colors duration-100"
            to={"/add"}
          >
            Add new venue
          </NavLink>
        )}
      </div>
      <div className="h-[1px] w-full bg-gray-100"></div>
      <div className="flex flex-col ">
        <button
          onClick={() => {
            useUserStore.setState({ user: null });
            navigate("/");
          }}
          className="text-left text-gray-500 px-4 py-3 hover:bg-gray-50 transtion-colors duration-100 rounded-b-lg"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default Dropdown;
