import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

import { useUserStore } from "../../../store/useUserStore";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useRef } from "react";

import Logo from "../../icons/Logo";
import UnauthorizedNavigation from "./UnauthorizedNavigation";
import Dropdown from "./Dropdown";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setIsOpen(false));

  const maxWidth =
    location.pathname === "/" ? "max-w-[3000px]" : "max-w-[1200px]";

  return (
    <header className="py-3 px-4 sm:px-6">
      <div
        className={`relative m-auto ${maxWidth} flex items-center justify-between`}
      >
        <NavLink to="/">
          <Logo />
        </NavLink>
        <div ref={wrapperRef}>
          {user ? (
            <UserAvatar isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          ) : (
            <UnauthorizedNavigation />
          )}
          {user && isOpen && <Dropdown />}
        </div>
      </div>
    </header>
  );
};

export default Header;
