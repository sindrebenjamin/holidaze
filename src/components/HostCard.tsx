import { useMemo } from "react";
import { NavLink } from "react-router-dom";

import { useUserStore } from "../store/useUserStore";
import { useApi } from "../hooks/useApi";
import { MediaItem } from "../interfaces";
import Star from "./icons/Star";
import { ProfileResponse } from "../interfaces";
import { checkRating } from "../utils/checkRating";

interface HostCardPropos {
  name: string;
  mediaItem: MediaItem;
  email: string;
}

const HostCard: React.FC<HostCardPropos> = ({ name, mediaItem, email }) => {
  const user = useUserStore((state) => state.user);
  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
    }),
    [user?.accessToken]
  );
  const data = useApi<ProfileResponse>(
    `https://v2.api.noroff.dev/holidaze/profiles/${name}?_venues=true`,
    options
  );

  function calculateAverage() {
    const venueScores = data.data?.data.venues.map((venue) => {
      return venue.rating;
    });
    if (venueScores) {
      const reduced = venueScores.reduce((total, num) => {
        return total + num;
      }, 0);
      const average = reduced / venueScores.length;
      const checked = checkRating(average);
      return checked;
    }
  }
  const averageScore = calculateAverage();

  return (
    <NavLink
      to={`/profile/${name}`}
      className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col gap-5 items-center bg-white w-full md:max-w-[500px]"
    >
      <img
        className="rounded-full h-[160px] w-[160px] object-cover"
        src={mediaItem.url}
        alt={mediaItem.url}
      />
      <div className="flex flex-col items-center gap-2 ">
        <div className="text-center ">
          <p className="text-xl ">{name}</p>
          <p className="text-gray-500">{email}</p>
        </div>

        <div className="flex items-center">
          <Star />
          <p>{averageScore}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default HostCard;
