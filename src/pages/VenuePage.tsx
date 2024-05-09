import { useMemo, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { useOutsideClick } from "../hooks/useOutsideClick";
import VenueDetails from "../components/modules/VenuePage/VenueDetails";
import { useApi } from "../hooks/useApi";
import { SingleVenueResponse } from "../interfaces";
import MobileSlideShow from "../components/MobileSlideShow";
import DesktopSlideShow from "../components/DesktopSlideShow";
import { Section, Container, StyledH1 } from "../components/TailwindComponents";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker";
import { checkBookedDates } from "../utils/checkBookedDates";
import { checkDaysBetweenDates } from "../utils/checkDaysBetweenDates";
import GuestSelector from "../components/GuestSelector";

const VenuePage = () => {
  const params = useParams();
  const [dates, setDates] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const options = useMemo(
    () => ({
      method: "GET",
    }),
    []
  );
  const { data } = useApi<SingleVenueResponse>(
    `https://v2.api.noroff.dev/holidaze/venues/${params.id}?_owner=true&_bookings=true`,
    options
  );
  const [guestSelectorIsOpen, setGuestSelectorIsOpen] = useState(false);
  const inputRef = useRef(null);
  useOutsideClick(inputRef, () => setGuestSelectorIsOpen(false));

  const bookedDates = checkBookedDates(data?.data.bookings);
  const daysBooked =
    (dates?.startDate &&
      dates?.endDate &&
      checkDaysBetweenDates(dates?.startDate, dates?.endDate)) ||
    0;

  console.log(dates);

  function handleDatesChange(newValue: DateValueType) {
    console.log(newValue);
    setDates(newValue);
  }

  if (data) {
    return (
      <>
        <div className="lg:hidden">
          <MobileSlideShow images={data?.data.media} />
        </div>
        <div className="hidden lg:block">
          <Section $noXPadding={true}>
            <Container>
              <DesktopSlideShow images={data?.data.media} />
            </Container>
          </Section>
        </div>
        <Section $noYPadding={true}>
          <Container>
            <StyledH1>{data?.data.name}</StyledH1>
            <VenueDetails data={data} />
            {/* Booker */}
            <form className="flex flex-col gap-6">
              <p>
                <span className="text-xl text-gray-700">
                  {data?.data.price} NOK
                </span>{" "}
                <span className="text-gray-500">per night</span>
              </p>
              {/* Inputs */}
              <div className="flex flex-col gap-2">
                <Datepicker
                  showFooter={true}
                  minDate={new Date()}
                  separator="->"
                  primaryColor="pink"
                  value={dates}
                  onChange={handleDatesChange}
                  disabledDates={bookedDates}
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
                      guestSelectorIsOpen
                        ? "border-gray-800"
                        : "border-gray-300"
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
                    Total for {daysBooked}{" "}
                    {daysBooked === 1 ? "night" : "nights"}
                  </p>
                  <p>{daysBooked * data.data.price} NOK</p>
                </div>
              )}
            </form>
          </Container>
        </Section>
      </>
    );
  }
};

export default VenuePage;
