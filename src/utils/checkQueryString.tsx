import { Venue } from "../interfaces";

/**
 * Checks if a query string matches any relevant fields of a given venue.
 * The relevant fields include the venue's address, name, city, country, continent, and description.
 *
 * @param venue - The venue object to be checked against the query string. The venue object should contain location (address, city, country, continent) and description fields.
 * @param queryString - The query string to be matched against the venue's fields.
 * @returns True if the query string matches any of the venue's fields, otherwise false.
 */

export function checkQueryString(venue: Venue, queryString: string) {
  const queryLocation =
    venue.location.address &&
    venue.location.address.toLowerCase().includes(queryString.toLowerCase());

  const queryTitle =
    venue.name && venue.name.toLowerCase().includes(queryString.toLowerCase());

  const queryCity =
    venue.location.city &&
    venue.location.city.toLowerCase().includes(queryString.toLowerCase());

  const queryCountry =
    venue.location.country &&
    venue.location.country.toLowerCase().includes(queryString.toLowerCase());

  const queryContinent =
    venue.location.continent &&
    venue.location.continent.toLowerCase().includes(queryString.toLowerCase());

  const queryDescription =
    venue.description &&
    venue.description.toLowerCase().includes(queryString.toLowerCase());

  const query =
    queryLocation ||
    queryTitle ||
    queryCity ||
    queryCountry ||
    queryContinent ||
    queryDescription;

  return query;
}
