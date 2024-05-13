import { useMemo } from "react";

import { useApi } from "../hooks/useApi";
//import { useUserStore } from "../store/useUserStore";
import { Venue, VenueResponse } from "../interfaces";
import { validateVenue } from "../utils/validateVenue";
//import VenueCard from "../components/VenueCard";
import VenueCard from "../components/VenueCard";
import useLastPageStore from "../store/useLastPageStore";

const HomePage = () => {
  //const user = useUserStore((state) => state.user);
  const setLastPath = useLastPageStore((state) => state.setLastPath);
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

  setLastPath("/");

  console.log(data);

  return (
    <div>
      {data &&
        data.data.map((venue: Venue) => {
          if (validateVenue(venue)) {
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
