import { useState, useEffect, useMemo, useCallback } from "react";
import { useDebounce } from "use-debounce";

//import { useUserStore } from "../store/useUserStore";
import { Venue } from "../interfaces";
import { validateVenue } from "../utils/validateVenue";
//import VenueCard from "../components/VenueCard";
import VenueCard from "../components/VenueCard";
import useLastPageStore from "../store/useLastPageStore";
import { useRedirectStore } from "../store/useRedirectStore";
import { useFilterStore } from "../store/useFilterStore";
import FilterModule from "../components/modules/HomePage/FilterModule";

const HomePage = () => {
  //const user = useUserStore((state) => state.user);
  const setLastPath = useLastPageStore((state) => state.setLastPath);
  // const { amenities, maxGuests, minimumRating, sliderValue } = useFilterStore(
  //   (state) => ({
  //     amenities: state.amenities,
  //     maxGuests: state.maxGuests,
  //     minimumRating: state.minimumRating,
  //     sliderValue: state.sliderValue,
  //   })
  // );

  const [data, setData] = useState<Venue[]>([]);
  const [status, setStatus] = useState("idle");
  const [filteredData, setFilteredData] = useState<Venue[]>([]);

  useEffect(() => {
    let ignore = false;
    let pageNumber = 1;
    async function getData() {
      try {
        setStatus("loading");
        const res = await fetch(
          "https://v2.api.noroff.dev/holidaze/venues?page=" + pageNumber
        );
        const json = await res.json();
        if (!ignore) {
          setData((prevData) => {
            const venueSet = new Set(prevData.map((venue) => venue.id));
            const newData = json.data.filter(
              (venue: Venue) => !venueSet.has(venue.id)
            );
            return [...prevData, ...newData];
          });
          setFilteredData((prevData) => {
            const venueSet = new Set(prevData.map((venue) => venue.id));
            const newData = json.data.filter(
              (venue: Venue) => !venueSet.has(venue.id)
            );
            return [...prevData, ...newData];
          });
          if (!json.meta.isLastPage) {
            pageNumber++;
            getData();
          }
        }
      } catch (error) {
        setStatus("error");
      } finally {
        if (!ignore) {
          setStatus("success");
        }
      }
    }

    getData();

    return () => {
      ignore = true;
    };
  }, []);

  const validatedVenues = filteredData.filter((venue) => {
    if (validateVenue(venue)) {
      return venue;
    }
  });

  /*
  const filteredVenues = useMemo(() => {
    return data.filter((venue) => {
      const validated = validateVenue(venue);
      const amenitiesFilter = amenities.every((amenity) => venue.meta[amenity]);
      const sliderFilter =
        venue.price >= debouncedSliderValue[0] &&
        venue.price <= debouncedSliderValue[1];
      const ratingFilter = venue.rating >= minimumRating ? true : false;
      const guestFilter =
        maxGuests === null ? true : maxGuests <= venue.maxGuests ? true : false;
      if (
        validated &&
        guestFilter &&
        ratingFilter &&
        sliderFilter &&
        amenitiesFilter
      ) {
        return venue;
      }
    });
  }, [data, amenities, maxGuests, minimumRating, debouncedSliderValue]);

 

  console.log(data);

  const redirect = useRedirectStore((state) => state.setRedirect);
  redirect("/");
  setLastPath("/");

  */

  //console.log(validatedVenues);

  console.log("rerender");

  return (
    <main>
      <FilterModule
        data={data}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        //filterCount={filteredVenues.length}
        //onFilter={() => setData(filteredVenues)}
      />
      {validatedVenues.map((venue: Venue) => {
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
      })}
    </main>
  );
};

export default HomePage;
