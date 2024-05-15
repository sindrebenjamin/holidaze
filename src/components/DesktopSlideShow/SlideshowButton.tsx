import ArrowLeft from "../Layout/icons/ArrowLeft";
import ArrowRight from "../Layout/icons/ArrowRight";

const SlideShowButton = ({
  onClick,
  direction,
}: {
  onClick: () => void;
  direction?: "left" | "right";
}) => {
  return (
    <button
      onClick={onClick}
      className="p-4 bg-gray-300 hover:opacity-90 transition-opacity active:scale-90 rounded-full"
    >
      {direction === "left" ? <ArrowLeft /> : <ArrowRight />}
    </button>
  );
};

export default SlideShowButton;
