function checkDaysBetweenDates(startDate, endDate) {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const difference = end.getTime() - start.getTime();

  const days = difference / (1000 * 60 * 60 * 24);

  return Math.round(days);
}

describe("checkDaysBetweenDates", () => {
  test("returns the correct number of days between two valid dates", () => {
    const startDate = "2024-05-01";
    const endDate = "2024-05-10";
    const result = checkDaysBetweenDates(startDate, endDate);
    expect(result).toBe(9);
  });

  test("returns 0 if the start date is missing", () => {
    const startDate = null;
    const endDate = "2024-05-10";
    const result = checkDaysBetweenDates(startDate, endDate);
    expect(result).toBe(0);
  });
});
