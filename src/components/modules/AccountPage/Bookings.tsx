import { StyledH2 } from "../../TailwindComponents";
import Tab from "../../Tab";
import { Booking } from "../../../interfaces";
import BookingCard from "../../BookingCard";

const Bookings = ({ bookings }: { bookings: Booking[] }) => {
  return (
    <div className="w-full max-w-[800px] px-4 sm:px-6 md:px-0">
      <StyledH2 className="mb-6">My Bookings</StyledH2>
      <div className="mb-6">
        <Tab
          sizing="w-[100px]"
          title="Upcoming"
          active={true}
          onClick={() => console.log("tabclick")}
        />
        <Tab
          sizing="w-[100px]"
          title="Completed"
          active={false}
          onClick={() => console.log("tabclick")}
        />
      </div>

      {/* Booking cards */}
      {bookings ? (
        <div className="flex flex-col gap-2">
          {bookings.map((booking) => {
            return (
              <BookingCard
                key={booking.id}
                title={booking.venue.location.address ?? "No address available"}
                guests={booking.guests}
                duration="15.03.2025 - 21.05.2024"
              />
            );
          })}
        </div>
      ) : (
        "No bookings yet"
      )}
    </div>
  );
};

export default Bookings;
