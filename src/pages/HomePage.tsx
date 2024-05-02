import { useMemo } from "react";

import { useApi } from "../hooks/useApi";
import { useUserStore } from "../store/useUserStore";
import { Venue, VenueResponse } from "../interfaces";
import VenueCard from "../components/VenueCard";

const HomePage = () => {
  //const user = useUserStore((state) => state.user);
  const options = useMemo(
    () => ({
      method: "GET",
    }),
    []
  );
  const { data, status } = useApi<VenueResponse>(
    "https://v2.api.noroff.dev/holidaze/venues",
    options
  );

  console.log(data);

  return (
    <div>
      {data &&
        data.data.map((venue: Venue) => {
          if (venue.media[0]) {
            return (
              <VenueCard
                key={venue.id}
                id={venue.id}
                media={venue.media[0]}
                address={venue.location.address}
                price={venue.price}
                rating={venue.rating}
              />
            );
          }
        })}
    </div>
  );
};

export default HomePage;
