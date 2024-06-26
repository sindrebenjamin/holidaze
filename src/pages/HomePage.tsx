import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
import VenueCardSkeleton from "../components/VenueCardSkeleton";

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
  const [hideScrollLoader, setHideScrollLoader] = useState(true);

  const venuesPerPage = 100;

  useEffect(() => {
    function resetScrollPos() {
      window.scrollTo(0, 0);
    }
    window.addEventListener("beforeunload", resetScrollPos);
    return () => {
      window.removeEventListener("beforeunload", resetScrollPos);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      setHideScrollLoader(false);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const initialVenues = filteredData.slice(0, venuesPerPage);
    setVisibleVenues(initialVenues);

    setHideScrollLoader(true);
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
          if (!res.ok) {
            setStatus("error");
            return;
          }
          setData((prevData) => {
            const venueSet = new Set(prevData.map((venue) => venue.id));
            const newData = json.data.filter(
              (venue: Venue) => !venueSet.has(venue.id)
            );
            return [...prevData, ...newData];
          });

          setFilteredData((prevData: Venue[]) => {
            const venueSet = new Set(prevData.map((venue) => venue.id));
            const newData = json.data.filter(
              (venue: Venue) => !venueSet.has(venue.id)
            );
            return [...prevData, ...newData];
          });

          if (!json.meta.isLastPage && status !== "error") {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function createGhostVenues(amount: number) {
    const ghostArray = [];
    for (let i = 0; i < amount; i++) {
      ghostArray.push({ id: i });
    }
    return ghostArray;
  }

  const noVenuesFound = validatedVenues.length === 0;

  return (
    <>
      <Helmet>
        <title>Holidaze | Vacation Homes</title>
        <meta
          name="description"
          content="Discover unique places to stay and experiences around the world on our platform. Whether you're looking for a cozy apartment, a luxurious villa, or a unique stay, find the perfect accommodation that feels like home."
        />
      </Helmet>
      <main className="min-h-screen">
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
              threshold={200}
              loader={
                noVenuesFound || hideScrollLoader ? (
                  <div key={1}></div>
                ) : (
                  <div key={0} className="spinner-dark m-auto mt-2"></div>
                )
              }
            >
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] gap-6">
                {status === "loading" && (
                  <>
                    {createGhostVenues(12).map((ghost) => {
                      return <VenueCardSkeleton key={ghost.id} />;
                    })}
                  </>
                )}
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
                {validatedVenues.length < 12 && !noVenuesFound && (
                  <>
                    {createGhostVenues(12).map((ghost) => {
                      return <div key={ghost.id}></div>;
                    })}
                  </>
                )}
                {noVenuesFound && status !== "loading" && (
                  <p>No venues found</p>
                )}
                {status === "error" && <p>Something went wrong</p>}
              </div>
            </InfiniteScroll>
          </HomeContainer>
        </Section>
      </main>
    </>
  );
};

export default HomePage;
