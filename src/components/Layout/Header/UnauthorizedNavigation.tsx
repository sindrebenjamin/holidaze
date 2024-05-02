import Button from "../../Button";
import { NavLink } from "react-router-dom";

const UnauthorizedNavigation = () => {
  return (
    <nav className="flex items-center gap-2">
      <NavLink to="/login">
        <Button>Login</Button>
      </NavLink>
      <p className="text-sm">or</p>
      <NavLink to="/register">
        <Button color="gray-dark" size="md">
          Sign up
        </Button>
      </NavLink>
    </nav>
  );
};

export default UnauthorizedNavigation;
