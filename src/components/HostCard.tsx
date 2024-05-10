import { MediaItem } from "../interfaces";
import Star from "./icons/Star";

interface HostCardPropos {
  name: string;
  mediaItem: MediaItem;
  email: string;
  averageScore: number;
}

const HostCard: React.FC<HostCardPropos> = ({
  name,
  mediaItem,
  email,
  averageScore,
}) => {
  return (
    <div className="p-6 rounded-lg shadow-md flex flex-col gap-5 items-center sm:flex-row bg-white w-fit">
      <img
        className="rounded-full h-[160px] w-[160px]"
        src={mediaItem.url}
        alt={mediaItem.url}
      />
      <div className="flex flex-col items-center gap-2 sm:items-start">
        <div className="text-center sm:text-left">
          <p className="text-xl ">{name}</p>
          <p className="text-gray-500">{email}</p>
        </div>

        <div className="flex items-center">
          <Star />
          <p>{averageScore}</p>
        </div>
      </div>
    </div>
  );
};

export default HostCard;
