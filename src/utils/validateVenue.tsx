import { Venue } from "../interfaces";

export function validateVenue(venue: Venue) {
  if (venue.media[0] && venue.location.address && venue.name) {
    return true;
  } else {
    return false;
  }
}
