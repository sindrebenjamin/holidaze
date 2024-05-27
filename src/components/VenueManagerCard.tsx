import { NavLink } from "react-router-dom";

import { MediaItem } from "../interfaces";
import { useCheckMedia } from "../hooks/useCheckMedia";

interface VenueManagerCardProps {
  name: string;
  media: MediaItem;
  address: string | null;
  id: string;
}

const VenueManagerCard = ({
  name,
  media,
  address,
  id,
}: VenueManagerCardProps) => {
  const imageUrl = media && media.url ? media.url : "/nomedia.jpg";
  const altText = media && media.alt ? media.alt : "";
  const checkedImage = useCheckMedia(imageUrl);

  return (
    <NavLink
      to={`/edit/${id}`}
      className="transition-all group flex flex-col cursor-pointer shadow-md overflow-hidden rounded-xl"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          className="w-full h-full group-hover:scale-105 transition-transform duration-200 object-cover"
          src={checkedImage}
          alt={altText}
        />
      </div>
      <div className="flex flex-col gap-2 p-6">
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-gray-700">{address}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default VenueManagerCard;
