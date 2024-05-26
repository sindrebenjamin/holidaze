import { NavLink } from "react-router-dom";

import { MediaItem } from "../interfaces";
import Star from "./icons/Star";
import { checkLongText } from "../utils/checkLongText";
import { checkRating } from "../utils/checkRating";
import { useCheckMedia } from "../hooks/useCheckMedia";

interface VenueCardProps {
  media: MediaItem;
  address: string | null;
  price: number;
  rating: number;
  id: string;
}

const VenueCard = ({ media, address, price, rating, id }: VenueCardProps) => {
  const checkedImage = useCheckMedia(media.url);
  if (address) {
    return (
      <NavLink
        to={`/venue/${id}`}
        className="group flex flex-col gap-2 cursor-pointer"
      >
        <div className="relative rounded-xl overflow-hidden aspect-square">
          <div className="absolute bg-black w-full h-full opacity-0 group-hover:opacity-80 transition-opacity duration-200  flex items-center justify-center z-[2]">
            <p className="text-white">View more</p>
          </div>

          <img
            className="w-full h-full group-hover:scale-105 transition-transform duration-200 object-cover"
            src={checkedImage}
            alt={media.alt}
          />
        </div>
        <div>
          <div className="flex justify-between">
            <p className="font-bold">{checkLongText(address.trim(), 20)}</p>
            <div className="flex items-center gap-0.5">
              <Star />
              <p>{checkRating(rating)}</p>
            </div>
          </div>
          <p className="text-gray-700">{price} NOK per night</p>
        </div>
      </NavLink>
    );
  }
};

export default VenueCard;
