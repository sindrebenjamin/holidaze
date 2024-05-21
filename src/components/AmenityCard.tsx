import Car from "./Layout/icons/Car";
import Wifi from "./Layout/icons/Wifi";
import Dog from "./Layout/icons/Dog";
import Coffee from "./Layout/icons/Coffee";

interface AmenityCardProps {
  icon: string;
  title: string;
  onClick: () => void;
  selected: boolean;
}

const AmenityCard: React.FC<AmenityCardProps> = ({
  icon,
  title,
  onClick,
  selected,
}) => {
  const classes = selected
    ? "bg-gray-900 text-white border-gray-900"
    : "border-gray-400 hover:border-gray-600";

  const selectedIcon = () => {
    switch (icon) {
      case "car":
        return <Car color={selected ? "white" : ""} />;
      case "wifi":
        return <Wifi color={selected ? "white" : ""} />;
      case "dog":
        return <Dog color={selected ? "white" : ""} />;
      case "coffee":
        return <Coffee color={selected ? "white" : ""} />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`${classes} rounded-lg flex flex-col gap-1 items-center justify-center border p-4 sm:p-8 cursor-pointer transition-colors duration-100`}
    >
      {selectedIcon()}
      <p className="whitespace-nowrap">{title}</p>
    </div>
  );
};

export default AmenityCard;
