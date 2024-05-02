import { Outlet, NavLink } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <ul>
        <li>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Layout;
