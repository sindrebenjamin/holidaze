import { useMemo } from "react";

import { useApi } from "../hooks/useApi";
//import { useUserStore } from "../store/useUserStore";
import { Venue, VenueResponse } from "../interfaces";
import { validateVenue } from "../utils/validateVenue";
//import VenueCard from "../components/VenueCard";
import VenueManagerCard from "../components/VenueManagerCard";

const HomePage = () => {
  //const user = useUserStore((state) => state.user);
  const options = useMemo(
    () => ({
      method: "GET",
    }),
    []
  );
  const { data } = useApi<VenueResponse>(
    "https://v2.api.noroff.dev/holidaze/venues",
    options
  );

  console.log(data);

  return (
    <div>
      {data &&
        data.data.map((venue: Venue) => {
          if (validateVenue(venue)) {
            return (
              /*
              <VenueCard
                key={venue.id}
                id={venue.id}
                media={venue.media[0]}
                address={venue.location.address}
                price={venue.price}
                rating={venue.rating}
              />
              */
              <VenueManagerCard
                name={venue.name}
                key={venue.id}
                id={venue.id}
                media={venue.media[0]}
                address={venue.location.address}
                bookings={venue._count.bookings}
              />
            );
          }
        })}
    </div>
  );
};

export default HomePage;
