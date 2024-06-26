import { useState, useRef } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker";

import { useOutsideClick } from "../../../hooks/useOutsideClick";
import GuestSelector from "../../GuestSelector";
import Button from "../../Button";
import Search from "../../icons/Search";
import { Venue } from "../../../interfaces";
import { useFilteredDataStore } from "../../../store/useFilteredDataStore";
import { useFilterStore } from "../../../store/useFilterStore";
import { isVenueAvailable } from "../../../utils/isVenueAvailable";
import { checkQueryString } from "../../../utils/checkQueryString";
import InputClose from "../../icons/InputClose";

const Searcher = ({
  data,
  resetLoader,
}: {
  data: Venue[];
  resetLoader: () => void;
}) => {
  const [guestSelectorIsOpen, setGuestSelectorIsOpen] = useState(false);
  const { setFilteredData } = useFilteredDataStore((state) => ({
    setFilteredData: state.setFilteredData,
  }));
  const {
    setMaxGuests,
    queryString,
    setQueryString,
    dates,
    setDates,
    adults,
    setAdults,
    children,
    setChildren,
  } = useFilterStore((state) => ({
    setMaxGuests: state.setMaxGuests,
    queryString: state.queryString,
    setQueryString: state.setQueryString,
    dates: state.dates,
    setDates: state.setDates,
    adults: state.adults,
    setAdults: state.setAdults,
    children: state.children,
    setChildren: state.setChildren,
  }));

  const inputRef = useRef(null);
  const totalGuests = adults + children;
  useOutsideClick(inputRef, () => setGuestSelectorIsOpen(false));

  function handleDatesChange(newValue: DateValueType) {
    setDates(newValue);
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    resetLoader();
    setFilteredData(filteredVenues);
    totalGuests >= 6 ? setMaxGuests(6) : setMaxGuests(totalGuests);
  }

  const filteredVenues = data.filter((venue) => {
    const query = checkQueryString(venue, queryString);

    const guestFilter =
      totalGuests === 0 ? true : totalGuests <= venue.maxGuests ? true : false;
    const venueIsAvailable = isVenueAvailable(dates, venue.bookings);

    if (guestFilter && venueIsAvailable && query) {
      return venue;
    }
  });

  return (
    <div className="p-4 md:p-6 rounded-lg bg-white shadow-md flex flex-col gap-4 lg:gap-6 max-w-[1200px] w-full m-auto lg:items-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl">Find your dream stay</h1>
      {/* Inputs */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 lg:flex-row w-full"
      >
        <label className="sr-only" htmlFor="where-to">
          Where do you want to travel?
        </label>
        <div className="w-full relative">
          <input
            id="where-to"
            onChange={(e) => setQueryString(e.target.value)}
            value={queryString}
            placeholder="Where to?"
            className="px-4 py-3.5 border-gray-300 border bg-gray-50 rounded-lg text-sm placeholder-gray-500 w-full focus:border-gray-800 outline-none hover:bg-gray-100 transition-colors duration-100"
            type="text"
          />
          {queryString && <InputClose onClick={() => setQueryString("")} />}
        </div>

        {/* Bottom inputs */}
        <div className="flex flex-col gap-3 sm:flex-row lg:w-[200%]">
          <Datepicker
            value={dates}
            onChange={handleDatesChange}
            showFooter={true}
            minDate={new Date()}
            separator="->"
            primaryColor="pink"
            readOnly={true}
            inputClassName="px-4 py-3.5 border-gray-300 border bg-gray-50 rounded-lg text-sm placeholder-gray-500 w-full focus:border-gray-800 outline-none cursor-pointer hover:bg-gray-100 transition-colors duration-100"
            placeholder="Check in -> Check out"
          />
          <div className="relative w-full">
            {adults > 0 || children > 0 ? (
              <InputClose
                onClick={() => {
                  setAdults(0);
                  setChildren(0);
                }}
              />
            ) : (
              ""
            )}

            <div
              onClick={() => {
                setGuestSelectorIsOpen(true);
              }}
              className={`cursor-pointer hover:bg-gray-100 transition-colors duration-100 px-4 py-3.5 border bg-gray-50 rounded-lg ${
                guestSelectorIsOpen ? "border-gray-800" : "border-gray-300"
              }`}
            >
              <p
                className={`${
                  adults < 1 && children < 1 && "text-gray-500"
                } text-sm`}
              >
                {adults < 1 && children < 1 && "Guests"}
                {adults > 0 &&
                  adults + `${adults === 1 ? " Adult" : " Adults"}`}
                {children > 0 &&
                  ", " +
                    children +
                    `${children === 1 ? " Child" : " Children"}`}
              </p>
            </div>
            <div ref={inputRef}>
              <GuestSelector
                lowestAllowed={0}
                incrementDisabled={adults + children === 100}
                adultQuantity={adults}
                handleQuantityAdult={setAdults}
                childQuantity={children}
                handleQuantityChild={setChildren}
                setIsOpen={setGuestSelectorIsOpen}
                isOpen={guestSelectorIsOpen}
              />
            </div>
          </div>
        </div>
        <Button override="w-full sm:w-fit" size="xl" color="pink" type="submit">
          <Search color="white" /> Search
        </Button>
      </form>
    </div>
  );
};

export default Searcher;
