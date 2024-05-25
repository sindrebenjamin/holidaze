import { useState, useRef } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker";

import { useOutsideClick } from "../../../hooks/useOutsideClick";
import GuestSelector from "../../GuestSelector";
import Button from "../../Button";
import Search from "../../icons/Search";

const Searcher = () => {
  const [dates, setDates] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [guestSelectorIsOpen, setGuestSelectorIsOpen] = useState(false);
  const inputRef = useRef(null);

  useOutsideClick(inputRef, () => setGuestSelectorIsOpen(false));

  function handleDatesChange(newValue: DateValueType) {
    setDates(newValue);
  }

  return (
    <div className="p-4 md:p-6 rounded-lg bg-white shadow-md flex flex-col gap-4 lg:gap-6 max-w-[1200px] w-full m-auto lg:items-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl">Find your dream stay</h1>
      {/* Inputs */}
      <form className="flex flex-col gap-3 lg:flex-row w-full">
        <input
          placeholder="Where to?"
          className="px-4 py-3.5 border-gray-300 border bg-gray-50 rounded-lg text-sm placeholder-gray-500 w-full focus:border-gray-800 outline-none hover:bg-gray-100 transition-colors duration-100"
          type="text"
        />
        {/* Bottm inputs */}
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
