import { useState } from "react";

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
import BasicModal from "../../BasicModal";

const VenueDetails = ({ data }: { data: SingleVenueResponse | undefined }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const noAmenities = Object.values(data?.data.meta || {}).every(
    (amenity) => amenity === false
  );

  if (data) {
    return (
      <div className="flex flex-col gap-6">
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
            <p>{data?.data.rating}</p>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <p className="font-bold">Listed by</p>
          <div className="flex items-center gap-2">
            <img
              className="rounded-full h-11 w-11 object-cover min-h-11 min-w-11"
              src={data?.data.owner.avatar.url}
              alt={data?.data.owner.avatar.alt}
            />
            <p>{data?.data.owner.name}</p>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <p className="font-bold">Address</p>
          <div className="flex items-center gap-2">
            <Location color="#374151" />
            <p className="text-gray-700">{data?.data.location.address}</p>
          </div>
        </div>
        <Divider />
        {!noAmenities && (
          <>
            <div className="flex flex-col gap-6 sm:flex-row">
              {data?.data.meta.wifi && (
                <div className="flex gap-2 items-center">
                  <Wifi />
                  Wifi
                </div>
              )}
              {data?.data.meta.parking && (
                <div className="flex gap-2 items-center">
                  <Car />
                  Parking
                </div>
              )}
              {data?.data.meta.pets && (
                <div className="flex gap-2 items-center">
                  <Dog />
                  Pets allowed
                </div>
              )}
              {data?.data.meta.pets && (
                <div className="flex gap-2 items-center">
                  <Coffee />
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
              {checkLongText(data.data.description, 300)}{" "}
              {data.data.description.length > 300 && (
                <button
                  onClick={() => setModalIsOpen(true)}
                  className="underline font-bold hover:opacity-70 transition-opacity duration-100"
                >
                  Read more
                </button>
              )}
            </p>
          )}
        </div>
        {modalIsOpen && (
          <BasicModal
            title="Description"
            onCloseModal={() => setModalIsOpen(false)}
            modalIsOpen={modalIsOpen}
          >
            <p>{data.data.description}</p>
          </BasicModal>
        )}
      </div>
    );
  }
};

export default VenueDetails;
