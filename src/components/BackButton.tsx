import { useNavigate } from "react-router-dom";
import ArrowLeft from "./icons/ArrowLeft";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="hover:bg-gray-100 duration-100 transition-colors p-2.5 rounded-full"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft color="#9CA3AF" />
    </button>
  );
};

export default BackButton;
