function checkQueryString(venue, queryString) {
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

const venue = {
  location: {
    address: "eee",
    city: "bergen",
    country: "canada",
    continent: "amerika",
  },
  name: "53422344",
  description: "jippi",
};

describe("checkQueryString", () => {
  test("matches query string with address", () => {
    const queryString = "eee";
    const result = checkQueryString(venue, queryString);
    expect(result).toBe(true);
  });

  test("matches query string with city", () => {
    const queryString = "bergen";
    const result = checkQueryString(venue, queryString);
    expect(result).toBe(true);
  });

  test("matches query string with country", () => {
    const queryString = "canada";
    const result = checkQueryString(venue, queryString);
    expect(result).toBe(true);
  });

  test("matches query string with continent", () => {
    const queryString = "amerika";
    const result = checkQueryString(venue, queryString);
    expect(result).toBe(true);
  });

  test("matches query string with name", () => {
    const queryString = "53422344";
    const result = checkQueryString(venue, queryString);
    expect(result).toBe(true);
  });

  test("matches query string with description", () => {
    const queryString = "jippi";
    const result = checkQueryString(venue, queryString);
    expect(result).toBe(true);
  });

  test("query string does not match", () => {
    const queryString = "x";
    const result = checkQueryString(venue, queryString);
    expect(result).toBe(false);
  });
});
