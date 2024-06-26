import { useNavigate } from "react-router-dom";
import useLastPageStore from "../store/useLastPageStore";
import ArrowLeft from "./icons/ArrowLeft";

const BackButton = ({ overrideClasses }: { overrideClasses?: string }) => {
  const navigate = useNavigate();
  const lastPath = useLastPageStore((state) => state.lastPath);
  // const setLastPath = useLastPageStore((state) => state.setLastPath);

  function handleBackClick() {
    if (lastPath === "/add" || lastPath === "") {
      navigate("/");
    } else {
      navigate(-1);
    }
  }

  return (
    <button
      className={`${overrideClasses} hover:bg-gray-100 duration-100 transition-colors p-2.5 rounded-full`}
      onClick={handleBackClick}
      type="button"
    >
      <ArrowLeft color="#9CA3AF" />
    </button>
  );
};

export default BackButton;
