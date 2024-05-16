import { useState } from "react";

import { StyledH2, Section } from "../../TailwindComponents";
import Tab from "../../Tab";
import { Booking } from "../../../interfaces";
import BookingCard from "../../BookingCard";
import { formatDateRange } from "../../../utils/formatDateRange";

const Bookings = ({ bookings }: { bookings: Booking[] }) => {
  const [currentTab, setCurrentTab] = useState("upcoming");
  const sortedByDate = bookings.sort(
    (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
  );

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
    </Section>
  );
};

export default Bookings;
