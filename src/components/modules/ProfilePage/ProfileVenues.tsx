import VenueCard from "../../VenueCard";
import { Venue } from "../../../interfaces";

const ProfileVenues = ({ venues }: { venues: Venue[] }) => {
  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 mb-[60px] md:mb-0 w-full">
      {venues.map((venue) => {
        return (
          <VenueCard
            price={venue.price}
            key={venue.id}
            id={venue.id}
            address={venue.location.address}
            media={venue.media[0]}
            rating={venue.rating}
          />
        );
      })}
    </section>
  );
};

export default ProfileVenues;
