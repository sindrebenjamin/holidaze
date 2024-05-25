import { useState, useEffect } from "react";

//import { useUserStore } from "../store/useUserStore";
import { Venue } from "../interfaces";
import { validateVenue } from "../utils/validateVenue";
import VenueCard from "../components/VenueCard";
import useLastPageStore from "../store/useLastPageStore";
import { useRedirectStore } from "../store/useRedirectStore";
import FilterModule from "../components/modules/HomePage/FilterModule";
import Searcher from "../components/modules/HomePage/Searcher";
import { HomeContainer, Section } from "../components/TailwindComponents";
import { useFilteredDataStore } from "../store/useFilteredDataStore";

const HomePage = () => {
  const setLastPath = useLastPageStore((state) => state.setLastPath);

  const [data, setData] = useState<Venue[]>([]);
  const [status, setStatus] = useState("idle");
  // const [filteredData, setFilteredData] = useState<Venue[]>([]);
  const { filteredData, setFilteredData } = useFilteredDataStore((state) => ({
    filteredData: state.filteredData,
    setFilteredData: state.setFilteredData,
  }));

  console.log("test");

  useEffect(() => {
    let ignore = false;
    let pageNumber = 1;
    async function getData() {
      try {
        setStatus("loading");
        const res = await fetch(
          "https://v2.api.noroff.dev/holidaze/venues?page=" +
            pageNumber +
            "&_bookings=true"
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
          if (filteredData.length === 0) {
            setFilteredData((prevData: Venue[]) => {
              const venueSet = new Set(prevData.map((venue) => venue.id));
              const newData = json.data.filter(
                (venue: Venue) => !venueSet.has(venue.id)
              );
              return [...prevData, ...newData];
            });
          }

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

  const redirect = useRedirectStore((state) => state.setRedirect);
  redirect("/");
  setLastPath("/");

  return (
    <main>
      <div className="bg-[url('/holidaze_banner.jpg')] bg-cover px-4 sm:px-6 py-[60px] lg:py-[120px]">
        <Searcher data={data} />
      </div>
      <Section>
        <HomeContainer>
          <FilterModule data={data} />
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(340px,_1fr))] gap-6">
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
          </div>
        </HomeContainer>
      </Section>
    </main>
  );
};

export default HomePage;
