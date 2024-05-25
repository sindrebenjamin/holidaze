import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
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
  const [hasMore, setHasMore] = useState(true);

  const { filteredData, setFilteredData } = useFilteredDataStore((state) => ({
    filteredData: state.filteredData,
    setFilteredData: state.setFilteredData,
  }));

  const [venuePage, setVenuePage] = useState(1);
  const [visibleVenues, setVisibleVenues] = useState<Venue[]>([]);
  const venuesPerPage = 100;

  useEffect(() => {
    const initialVenues = filteredData.slice(0, venuesPerPage);
    setVisibleVenues(initialVenues);
  }, [filteredData]);

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

  const validatedVenues = visibleVenues.filter((venue) => {
    if (validateVenue(venue)) {
      return venue;
    }
  });

  function resetLoader() {
    setVenuePage(1);
    setHasMore(true);
  }

  const redirect = useRedirectStore((state) => state.setRedirect);
  redirect("/");
  setLastPath("/");

  function loadMoreVenues() {
    const nextPage = venuePage + 1;
    const start = nextPage * venuesPerPage;
    const end = start + venuesPerPage;
    const moreVenues = filteredData.slice(start, end);

    if (moreVenues.length === 0) {
      setHasMore(false);
    }
    setVisibleVenues((prevVenues) => [...prevVenues, ...moreVenues]);
    setVenuePage(nextPage);
  }

  console.log(hasMore);
  console.log(venuePage);

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  return (
    <main>
      <div className="bg-[url('/holidaze_banner.jpg')] bg-cover px-4 sm:px-6 py-[60px] lg:py-[120px]">
        <Searcher resetLoader={resetLoader} data={data} />
      </div>
      <Section>
        <HomeContainer>
          <FilterModule resetLoader={resetLoader} data={data} />

          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={loadMoreVenues}
            hasMore={hasMore}
            threshold={500}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
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
          </InfiniteScroll>
        </HomeContainer>
      </Section>
    </main>
  );
};

export default HomePage;
