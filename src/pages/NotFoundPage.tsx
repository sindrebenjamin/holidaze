import { NavLink } from "react-router-dom";
import Button from "../components/Button";

const NotFoundPage = () => {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-6">
      <h1 className="font-medium text-8xl flex flex-col items-center">
        404<span className="text-5xl">not found</span>
      </h1>
      <NavLink to="/">
        <Button size="md" color="pink">
          Return to home
        </Button>
      </NavLink>
    </main>
  );
};

export default NotFoundPage;
