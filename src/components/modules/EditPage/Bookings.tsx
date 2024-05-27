import { useState } from "react";

import { Venue } from "../../../interfaces";
import BasicModal from "../../BasicModal";
import Button from "../../Button";
import Tab from "../../Tab";
import BookingCard from "../../BookingCard";
import { formatDateRange } from "../../../utils/formatDateRange";

const Bookings = ({ venue }: { venue: Venue }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("upcoming");

  const sorted = venue.bookings.sort(
    (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
  );
  const today = new Date();
  const pastBookings = sorted.filter((booking) => {
    if (new Date(booking.dateFrom) < today) {
      return booking;
    }
  });

  const upcomingBookings = sorted.filter((booking) => {
    if (new Date(booking.dateFrom) >= today) {
      return booking;
    }
  });

  const selectedBookings =
    currentTab === "upcoming" ? upcomingBookings : pastBookings;

  return (
    <>
      <div className="w-full mb-6 p-6 lg:mb-0 rounded-lg flex flex-col gap-6 border border-gray-300 shadow mx-4 sm:mx-6 md:mx-0 max-w-[300px] lg:w-[300px]">
        <p className="text-sm text-gray-500">Bookings</p>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-1">
            <p className="text-gray-700">Upcoming</p>
            <p className="text-4xl font-medium">{upcomingBookings.length}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-700">Total</p>
            <p className="text-4xl font-medium">{sorted.length}</p>
          </div>
        </div>

        <Button
          onClick={() => setModalIsOpen(true)}
          color="gray-dark"
          size="sm"
          type="button"
        >
          View bookings
        </Button>
      </div>
      {modalIsOpen && (
        <BasicModal
          onCloseModal={() => setModalIsOpen(false)}
          modalIsOpen={modalIsOpen}
          title="Bookings"
          tabs={
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
          }
        >
          <div className="flex flex-col gap-2">
            {selectedBookings.map((booking) => {
              if (booking) {
                return (
                  <BookingCard
                    key={booking.id}
                    title={booking.customer.name}
                    guests={booking.guests}
                    duration={formatDateRange(booking.dateFrom, booking.dateTo)}
                  />
                );
              }
            })}

            {selectedBookings.length === 0 && (
              <p>
                {`${venue.name} has no ${
                  currentTab === "upcoming" ? "upcoming" : "completed"
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
