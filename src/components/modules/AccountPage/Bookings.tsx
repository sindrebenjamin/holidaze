import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker";

import { StyledH2, Section } from "../../TailwindComponents";
import Tab from "../../Tab";
import { Booking } from "../../../interfaces";
import BookingCard from "../../BookingCard";
import { formatDateRange } from "../../../utils/formatDateRange";
import BasicModal from "../../BasicModal";
import { checkBookedDates } from "../../../utils/checkBookedDates";

const Bookings = ({ bookings }: { bookings: Booking[] }) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const [bookedDates, setBookedDates] = useState<DateValueType[]>(
    checkBookedDates(selectedBooking?.venue.bookings)
  );
  const [dates, setDates] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("upcoming");
  const sortedByDate = bookings.sort(
    (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
  );

  console.log(new Date(selectedBooking?.dateFrom));

  const bookingsByTab = sortedByDate.map((booking) => {
    const today = new Date();
    const bookingDate = new Date(booking.dateFrom);
    switch (currentTab) {
      case "upcoming":
        if (bookingDate >= today) {
          return booking;
        }
        break;
      case "completed":
        if (bookingDate < today) {
          return booking;
        }
    }
  });

  const noBookings = bookingsByTab.every((booking) => booking === undefined);

  function handleDatesChange(newValue: DateValueType) {
    setDates(newValue);
  }

  const convertedBookedDates = bookedDates.map((date) => ({
    startDate: date?.startDate || new Date(),
    endDate: date?.endDate || new Date(),
  }));

  return (
    <Section $noYPadding={true} className="w-full max-w-[800px] md:px-0">
      <StyledH2>My Bookings</StyledH2>
      <div className="mb-6">
        <Tab
          sizing="w-[100px]"
          title="Upcoming"
          active={currentTab === "upcoming"}
          onClick={() => setCurrentTab("upcoming")}
        />
        <Tab
          sizing="w-[100px]"
          title="Completed"
          active={currentTab === "completed"}
          onClick={() => setCurrentTab("completed")}
        />
      </div>

      {/* Booking cards */}

      <div className="flex flex-col gap-2">
        {bookingsByTab.map((booking) => {
          if (booking) {
            return (
              <BookingCard
                onClick={() => {
                  setDates(() => ({
                    startDate: new Date(booking.dateFrom || ""),
                    endDate: new Date(booking.dateTo || ""),
                  }));
                  setSelectedBooking(booking);
                  setModalIsOpen(true);
                }}
                key={booking.id}
                title={booking.venue.location.address ?? "No address available"}
                guests={booking.guests}
                duration={formatDateRange(booking.dateFrom, booking.dateTo)}
              />
            );
          }
        })}

        {noBookings && (
          <p>
            {`You have no ${
              currentTab === "upcoming" ? "upcoming" : "completed"
            }
              bookings`}
          </p>
        )}
      </div>
      {/* {modalIsOpen && (
        <BasicModal
          title={selectedBooking?.venue.location.address!}
          onCloseModal={() => setModalIsOpen(false)}
          modalIsOpen={modalIsOpen}
        >
          <Datepicker
            // toggleClassName="hidden"
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
        </BasicModal>
      )} */}
    </Section>
  );
};

export default Bookings;
