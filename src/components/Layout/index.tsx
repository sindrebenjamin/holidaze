import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/login">Home</NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Layout;
