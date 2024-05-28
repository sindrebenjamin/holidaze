import { useState } from "react";
import { NavLink } from "react-router-dom";

import { SingleVenueResponse } from "../../../interfaces";
import UserCircle from "../../icons/UserCircle";
import Star from "../../icons/Star";
import Location from "../../icons/Location";
import Wifi from "../../icons/Wifi";
import Car from "../../icons/Car";
import Dog from "../../icons/Dog";
import Coffee from "../../icons/Coffee";
import { checkLongText } from "../../../utils/checkLongText";
import { Divider } from "../../TailwindComponents";
import { checkRating } from "../../../utils/checkRating";
import { useCheckMedia } from "../../../hooks/useCheckMedia";

const VenueDetails = ({ data }: { data: SingleVenueResponse | undefined }) => {
  const [showMore, setShowMore] = useState(false);
  const noAmenities = Object.values(data?.data.meta || {}).every(
    (amenity) => amenity === false
  );
  const media = data?.data.owner.avatar;
  const imageUrl = media && media.url ? media.url : "/nomedia.jpg";
  const altText = media && media.alt ? media.alt : "";
  const checkedImage = useCheckMedia(imageUrl);

  if (data) {
    const desc = !showMore
      ? checkLongText(data.data.description.trim(), 300)
      : data?.data.description;
    return (
      <div className="flex flex-col gap-6 w-full lg:max-w-[660px] mt-2 md:mt-4 lg:mt-6 md:pb-[60px] lg:pb-[120px]">
        <div className="flex items-center gap-2 text-gray-700">
          <div className="flex items-center gap-0.5">
            <UserCircle color="#374151" />
            <p>{data?.data.maxGuests}</p>
          </div>
          <svg
            width={4}
            height={4}
            viewBox="0 0 4 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx={2} cy={2} r={2} fill="#374151" />
          </svg>
          <div className="flex items-center gap-0.5">
            <Star color="#374151" />
            <p>{checkRating(data?.data.rating)}</p>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <p className="font-bold">Listed by</p>

          <NavLink
            to={`/profile/${data.data.owner.name}`}
            className="flex items-center gap-2"
          >
            <img
              className="rounded-full h-11 w-11 object-cover min-h-11 min-w-11"
              src={checkedImage}
              alt={altText}
            />
            <p>{data?.data.owner.name}</p>
          </NavLink>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <p className="font-bold">Address</p>
          <div className="flex items-center gap-2">
            <Location color="#374151" />
            <p className="text-gray-700 max-w-[90%] md:max-w-[300px] break-words">
              {data.data.location.address &&
                checkLongText(data.data.location.address.trim(), 60)}
            </p>
          </div>
        </div>
        <Divider />
        {!noAmenities && (
          <>
            <div className="flex flex-col flex-wrap gap-6 md:flex-row text-gray-700">
              {data?.data.meta.wifi && (
                <div className="flex gap-2 items-center">
                  <Wifi color="#374151" />
                  Wifi
                </div>
              )}
              {data?.data.meta.parking && (
                <div className="flex gap-2 items-center">
                  <Car color="#374151" />
                  Parking
                </div>
              )}
              {data?.data.meta.pets && (
                <div className="flex gap-2 items-center">
                  <Dog color="#374151" />
                  Pets allowed
                </div>
              )}
              {data?.data.meta.breakfast && (
                <div className="flex gap-2 items-center">
                  <Coffee color="#374151" />
                  Breakfast
                </div>
              )}
            </div>
            <Divider />
          </>
        )}

        <div className="flex flex-col gap-2">
          <p className="font-bold text-gray-700">Description</p>
          {!data.data.description ? (
            <p>This venue has no description.</p>
          ) : (
            <p>
              {desc}{" "}
              {data.data.description.length > 300 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="underline font-bold hover:opacity-70 transition-opacity duration-100"
                >
                  {showMore ? "Show less" : "Read more"}
                </button>
              )}
            </p>
          )}
        </div>
      </div>
    );
  }
};

export default VenueDetails;
