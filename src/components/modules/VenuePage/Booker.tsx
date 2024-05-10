import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker";

import { SingleVenueResponse } from "../../../interfaces";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { checkBookedDates } from "../../../utils/checkBookedDates";
import { checkDaysBetweenDates } from "../../../utils/checkDaysBetweenDates";
import { Divider } from "../../TailwindComponents";
import Button from "../../Button";
import GuestSelector from "../../GuestSelector";
import { basicApi } from "../../../utils/basicApi";
import { useUserStore } from "../../../store/useUserStore";
import { ApiStatus } from "../../../interfaces";

interface BookerProps {
  data: SingleVenueResponse | undefined;
  adults: number;
  setAdults: (adults: number) => void;
  children: number;
  setChildren: (children: number) => void;
  dates: DateValueType;
  setDates: (dates: DateValueType) => void;
}

const Booker: React.FC<BookerProps> = ({
  data,
  adults,
  setAdults,
  children,
  setChildren,
  dates,
  setDates,
}) => {
  const params = useParams();
  const user = useUserStore((state) => state.user);
  const [guestSelectorIsOpen, setGuestSelectorIsOpen] = useState(false);
  const [bookedDates, setBookedDates] = useState<DateValueType[]>(
    checkBookedDates(data?.data.bookings)
  );
  const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
  const inputRef = useRef(null);
  useOutsideClick(inputRef, () => setGuestSelectorIsOpen(false));
  function handleDatesChange(newValue: DateValueType) {
    setDates(newValue);
  }

  const daysBooked =
    (dates?.startDate &&
      dates?.endDate &&
      checkDaysBetweenDates(dates?.startDate, dates?.endDate)) ||
    0;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateFrom: dates?.startDate,
        dateTo: dates?.endDate,
        guests: adults + children,
        venueId: params.id,
      }),
    };
    (async () => {
      await basicApi(
        "https://v2.api.noroff.dev/holidaze/bookings",
        options,
        setApiStatus
      );
      if (dates) {
        setBookedDates([
          ...bookedDates,
          { startDate: dates?.startDate, endDate: dates?.endDate },
        ]);
      }
      setDates({
        startDate: null,
        endDate: null,
      });
    })();
  }

  const convertedBookedDates = bookedDates.map((date) => ({
    startDate: date?.startDate || new Date(),
    endDate: date?.endDate || new Date(),
  }));

  if (data) {
    return (
      <>
        <Divider className="mt-6 md:hidden" />
        <form
          onSubmit={onSubmit}
          className="h-fit flex flex-col gap-6 my-6 sm:max-w-[350px] w-full sm:rounded-lg sm:shadow-md sm:p-6"
        >
          <p>
            <span className="text-xl text-gray-700">
              {data?.data.price} NOK
            </span>{" "}
            <span className="text-gray-500">per night</span>
          </p>

          <div className="flex flex-col gap-2">
            <Datepicker
              toggleClassName="hidden"
              showFooter={true}
              minDate={new Date()}
              separator="->"
              primaryColor="pink"
              value={dates}
              onChange={handleDatesChange}
              disabledDates={convertedBookedDates}
              readOnly={true}
              inputClassName="px-4 py-3.5 border-gray-300 border bg-gray-50 rounded-lg text-sm placeholder-gray-500 w-full focus:border-gray-800 outline-none cursor-pointer hover:bg-gray-100 transition-colors duration-100"
              placeholder="Start date -> End date"
            />

            <div className="relative">
              <div
                onClick={() => {
                  setGuestSelectorIsOpen(true);
                }}
                className={`cursor-pointer hover:bg-gray-100 transition-colors duration-100 px-4 py-3.5 border bg-gray-50 rounded-lg ${
                  guestSelectorIsOpen ? "border-gray-800" : "border-gray-300"
                }`}
              >
                <p className="text-sm text-gray-500">
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
          {dates?.startDate && dates?.endDate && (
            <div className="flex justify-between">
              <p>
                Total for {daysBooked} {daysBooked === 1 ? "night" : "nights"}
              </p>
              <p>{daysBooked * data.data.price} NOK</p>
            </div>
          )}
          <Button
            type="submit"
            disabled={!dates?.startDate}
            size="lg"
            color="gray-dark"
          >
            {apiStatus === "loading" ? (
              <div className="spinner-light"></div>
            ) : (
              "Book"
            )}
          </Button>
        </form>
      </>
    );
  }
};

export default Booker;
