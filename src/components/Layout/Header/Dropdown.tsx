import { NavLink } from "react-router-dom";

import { useUserStore } from "../../../store/useUserStore";

const Dropdown = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const user = useUserStore((state) => state.user);

  return (
    <nav className="top-[46px] right-0 rounded-md overflow-hidden shadow bg-white absolute z-[1000]">
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
      <div className="flex flex-col">
        <button
          onClick={() => useUserStore.setState({ user: null })}
          className="text-left text-gray-500 px-4 py-3 hover:bg-gray-50 transtion-colors duration-100"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default Dropdown;
