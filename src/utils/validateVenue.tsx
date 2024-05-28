import { Venue } from "../interfaces";

/**
 * Validates a venue object to ensure it meets specific criteria.
 * The venue is considered valid if it has media, a non-empty address, and a non-empty name.
 *
 * @param venue - The venue object to be validated.
 * @returns True if the venue meets all the validation criteria, otherwise false.
 */

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
