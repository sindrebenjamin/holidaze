import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { MediaItem } from "../interfaces";
import { checkMedia } from "../utils/checkMedia";
import Star from "./icons/Star";

interface VenueCardProps {
  media: MediaItem;
  address: string | null;
  price: number;
  rating: number;
  id: string;
}

const VenueCard = ({ media, address, price, rating, id }: VenueCardProps) => {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    checkMedia(media.url).then((url) => {
      if (isMounted) {
        setImageSrc(url as string);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [media.url]);

  return (
    <NavLink
      to={`/venue/${id}`}
      className="group flex flex-col gap-2 cursor-pointer"
    >
      <div className="relative rounded-xl overflow-hidden aspect-square">
        <div className="absolute bg-black w-full h-full opacity-0 group-hover:opacity-80 transition-opacity duration-200  flex items-center justify-center z-10">
          <p className="text-white">View more</p>
        </div>

        <img
          className="w-full h-full group-hover:scale-105 transition-transform duration-200 object-cover"
          src={imageSrc}
          alt={media.alt}
        />
      </div>
      <div>
        <div className="flex justify-between">
          <p className="font-bold">{address}</p>
          <div className="flex items-center gap-0.5">
            <Star />
            <p>{rating}</p>
          </div>
        </div>
        <p className="text-gray-700">{price} NOK per night</p>
      </div>
    </NavLink>
  );
};

export default VenueCard;
