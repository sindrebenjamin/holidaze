/**
 * Calculates the number of days between two dates.
 *
 * @param startDate - The start date as a string or Date object.
 * @param endDate - The end date as a string or Date object.
 * @returns The number of days between the start and end dates. Returns 0 if either date is invalid.
 */

export function checkDaysBetweenDates(
  startDate: string | Date,
  endDate: string | Date
): number {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const difference = end.getTime() - start.getTime();

  const days = difference / (1000 * 60 * 60 * 24);

  return Math.round(days);
}
