import { NavLink, useLocation } from "react-router-dom";
import Logo from "./icons/Logo";

const Footer = () => {
  const location = useLocation();
  const maxWidth =
    location.pathname === "/" ? "max-w-[3000px]" : "max-w-[1200px]";

  const now = new Date();
  const year = now.getFullYear();

  return (
    <footer className="bg-gray-900 py-6 px-4 sm:px-6 text-white">
      <div className={`m-auto ${maxWidth} flex justify-between`}>
        <NavLink className="w-fit" to="/">
          <Logo color="white" />
        </NavLink>
        <p className="text-sm">{year} © Holidaze</p>
      </div>
    </footer>
  );
};

export default Footer;
