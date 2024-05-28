function isVenueAvailable(desiredDates, bookedDates) {
  function parseDate(dateStr) {
    return dateStr ? new Date(dateStr) : new Date();
  }

  const desiredStartDate = desiredDates && parseDate(desiredDates.startDate);
  const desiredEndDate = desiredDates && parseDate(desiredDates.endDate);

  if (desiredStartDate && desiredEndDate) {
    for (const booking of bookedDates) {
      const bookedStartDate = parseDate(booking.dateFrom);
      const bookedEndDate = parseDate(booking.dateTo);

      if (
        (desiredStartDate >= bookedStartDate &&
          desiredStartDate <= bookedEndDate) ||
        (desiredEndDate >= bookedStartDate &&
          desiredEndDate <= bookedEndDate) ||
        (desiredStartDate <= bookedStartDate && desiredEndDate >= bookedEndDate)
      ) {
        return false;
      }
    }
  }

  return true;
}

describe("IsVenueAvailable", () => {
  test("returns true if there are no bookings", () => {
    const desiredDates = { startDate: "2024-05-01", endDate: "2024-05-05" };
    const bookedDates = [];
    const result = isVenueAvailable(desiredDates, bookedDates);
    expect(result).toBe(true);
  });

  test("returns true if the desired dates do not overlap with any bookings", () => {
    const desiredDates = { startDate: "2024-05-01", endDate: "2024-05-05" };
    const bookedDates = [
      { startDate: "2024-06-01", endDate: "2024-06-05" },
      { startDate: "2024-07-01", endDate: "2024-07-05" },
    ];
    const result = isVenueAvailable(desiredDates, bookedDates);
    expect(result).toBe(true);
  });

  test("returns false if the desired start date overlaps with an existing booking", () => {
    const desiredDates = { startDate: "2024-05-01", endDate: "2024-05-05" };
    const bookedDates = [{ dateFrom: "2024-04-30", dateTo: "2024-05-02" }];
    const result = isVenueAvailable(desiredDates, bookedDates);
    expect(result).toBe(false);
  });
});
