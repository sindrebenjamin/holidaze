import { Venue } from "../interfaces";

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
