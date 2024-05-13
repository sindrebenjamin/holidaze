import { Venue } from "../interfaces";

export function validateVenue(venue: Venue) {
  if (venue) {
    if (venue.media && venue.media.length > 0 && venue.media[0]) {
      if (
        venue.location &&
        venue.location.address &&
        venue.location.address.trim() &&
        venue.name.trim()
      ) {
        return true;
      }
    }
  } else {
    return false;
  }
}
