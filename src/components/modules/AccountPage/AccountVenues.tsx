import { NavLink } from "react-router-dom";

import { StyledH2 } from "../../TailwindComponents";
import VenueManagerCard from "../../VenueManagerCard";
import Button from "../../Button";
import { Venue } from "../../../interfaces";

const AccountVenues = ({
  venues,
  bookings,
}: {
  venues: Venue[];
  bookings: number;
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <StyledH2 className="m-0 md:m-0">My Venues</StyledH2>
        <NavLink to="/add">
          <Button type="button" color="gray-light" size="sm">
            Add new venue
          </Button>
        </NavLink>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-[60px] md:mb-0">
        {venues.map((venue) => {
          return (
            <VenueManagerCard
              name={venue.name}
              media={venue.media[0]}
              address={venue.location.address}
              id={venue.id}
              key={venue.id}
              bookings={bookings ?? 0}
            />
          );
        })}
      </div>
    </>
  );
};

export default AccountVenues;