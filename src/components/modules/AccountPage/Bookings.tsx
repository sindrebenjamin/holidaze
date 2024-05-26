import { useState } from "react";

import { StyledH2, Section } from "../../TailwindComponents";
import Tab from "../../Tab";
import { Booking } from "../../../interfaces";
import BookingCard from "../../BookingCard";
import { formatDateRange } from "../../../utils/formatDateRange";
import BasicModal from "../../BasicModal";

const Bookings = ({ bookings }: { bookings: Booking[] }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentModalTab, setCurrentModalTab] = useState("upcoming");
  const [currentTab, setCurrentTab] = useState("upcoming");
  const sortedByDate = bookings.sort(
    (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
  );

  function handleFilterByTab(booking: Booking, switchString: string) {
    const today = new Date();
    const bookingDate = new Date(booking.dateFrom);
    switch (switchString) {
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
  }

  const bookingsByTab = sortedByDate.filter((booking) => {
    const nextBooking = handleFilterByTab(booking, currentTab);
    return nextBooking;
  });

  const bookingsByModalTab = sortedByDate.filter((booking) => {
    const nextBooking = handleFilterByTab(booking, currentModalTab);
    return nextBooking;
  });

  const noBookings = bookingsByTab.every((booking) => booking === undefined);

  const noModalBookings = bookingsByModalTab.every(
    (booking) => booking === undefined
  );

  return (
    <>
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
          {bookingsByTab.map((booking, index) => {
            if (booking && index < 4) {
              return (
                <BookingCard
                  key={booking.id}
                  title={
                    booking.venue.location.address ?? "No address available"
                  }
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
          {bookingsByTab.length > 4 && (
            <button
              className="mt-2 w-fit underline text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => {
                setCurrentModalTab(currentTab);
                setModalIsOpen(true);
              }}
            >
              Show all ({bookingsByTab.length})
            </button>
          )}
        </div>
      </Section>
      {modalIsOpen && (
        <BasicModal
          tabs={
            <div className="mb-6">
              <Tab
                sizing="w-[100px]"
                title="Upcoming"
                active={currentModalTab === "upcoming"}
                onClick={() => setCurrentModalTab("upcoming")}
              />
              <Tab
                sizing="w-[100px]"
                title="Completed"
                active={currentModalTab === "completed"}
                onClick={() => setCurrentModalTab("completed")}
              />
            </div>
          }
          modalIsOpen={modalIsOpen}
          title="Bookings"
          onCloseModal={() => setModalIsOpen(false)}
        >
          <div className="flex flex-col gap-2">
            {bookingsByModalTab.map((booking) => {
              if (booking) {
                return (
                  <BookingCard
                    key={booking.id}
                    title={
                      booking.venue.location.address ?? "No address available"
                    }
                    guests={booking.guests}
                    duration={formatDateRange(booking.dateFrom, booking.dateTo)}
                  />
                );
              }
            })}

            {noModalBookings && (
              <p>
                {`You have no ${
                  currentModalTab === "upcoming" ? "upcoming" : "completed"
                }
              bookings`}
              </p>
            )}
          </div>
        </BasicModal>
      )}
    </>
  );
};

export default Bookings;
