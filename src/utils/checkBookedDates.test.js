function checkBookedDates(bookings) {
  if (bookings) {
    const bookedDates = bookings.map((booking) => {
      const sDate = new Date(booking.dateFrom);
      const eDate = new Date(booking.dateTo);
      return {
        startDate: sDate.toLocaleDateString("en-CA"),
        endDate: eDate.toLocaleDateString("en-CA"),
      };
    });

    return bookedDates;
  }

  return [];
}

describe("checkBookedDates", () => {
  test("returns formatted booked dates when bookings are provided", () => {
    const bookings = [
      {
        dateFrom: "2024-05-01T00:00:00.000Z",
        dateTo: "2024-05-05T00:00:00.000Z",
      },
      {
        dateFrom: "2024-06-01T00:00:00.000Z",
        dateTo: "2024-06-10T00:00:00.000Z",
      },
    ];
    const expected = [
      { startDate: "2024-05-01", endDate: "2024-05-05" },
      { startDate: "2024-06-01", endDate: "2024-06-10" },
    ];
    const result = checkBookedDates(bookings);
    expect(result).toEqual(expected);
  });

  test("returns an empty array when no bookings are provided", () => {
    const bookings = [];
    const result = checkBookedDates(bookings);
    expect(result).toEqual([]);
  });

  test("returns an empty array when bookings is undefined", () => {
    const result = checkBookedDates(undefined);
    expect(result).toEqual([]);
  });

  test("correctly handles bookings with invalid dates", () => {
    const bookings = [
      { dateFrom: "invalid-date", dateTo: "2024-05-05T00:00:00.000Z" },
      { dateFrom: "2024-06-01T00:00:00.000Z", dateTo: "invalid-date" },
    ];
    const expected = [
      { startDate: "Invalid Date", endDate: "2024-05-05" },
      { startDate: "2024-06-01", endDate: "Invalid Date" },
    ];
    const result = checkBookedDates(bookings);
    expect(result).toEqual(expected);
  });
});
