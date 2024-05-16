import { NavLink, useLocation } from "react-router-dom";
import { useState, useRef } from "react";

import { useUserStore } from "../../../store/useUserStore";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

import Logo from "../icons/Logo";
import UnauthorizedNavigation from "./UnauthorizedNavigation";
import Dropdown from "./Dropdown";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setIsOpen(false));

  const hideMobileHeader =
    location.pathname.includes("venue") ||
    location.pathname.includes("account") ||
    location.pathname.includes("profile") ||
    location.pathname.includes("edit");

  const maxWidth =
    location.pathname === "/" ? "max-w-[3000px]" : "max-w-[1200px]";

  return (
    <header
      className={`${
        hideMobileHeader ? "hidden lg:block" : ""
      } py-3 px-4 sm:px-6`}
    >
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
          {user && isOpen && <Dropdown setIsOpen={setIsOpen} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
