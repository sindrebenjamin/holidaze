import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { MediaItem } from "../interfaces";
import { checkMedia } from "../utils/checkMedia";
import User from "./Layout/icons/User";

interface VenueManagerCardProps {
  name: string;
  media: MediaItem;
  address: string | null;
  id: string;
  bookings: number;
}

const VenueManagerCard = ({
  name,
  media,
  address,
  id,
  bookings,
}: VenueManagerCardProps) => {
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
      to={`/edit/${id}`}
      className="transition-all group flex flex-col cursor-pointer shadow-md hover:shadow-xl overflow-hidden rounded-xl"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          className="w-full h-full group-hover:scale-105 transition-transform duration-200 object-cover"
          src={imageSrc}
          alt={media.alt}
        />
      </div>
      <div className="flex flex-col gap-2 p-6">
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-gray-700">{address}</p>
        </div>
        <p className="text-gray-700 flex items-center gap-1">
          <User />
          {bookings} {bookings !== 1 ? "Bookings" : "Booking"}
        </p>
      </div>
    </NavLink>
  );
};

export default VenueManagerCard;
