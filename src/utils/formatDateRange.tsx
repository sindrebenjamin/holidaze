import { format, parseISO } from "date-fns";

/**
 * Formats a range of dates from ISO string format to "MMM dd, yyyy" format.
 *
 * @param startDateString - The start date in ISO string format.
 * @param endDateString - The end date in ISO string format.
 * @returns A string representing the formatted date range in "MMM dd, yyyy - MMM dd, yyyy" format.
 */

export function formatDateRange(
  startDateString: string,
  endDateString: string
) {
  const startDate = parseISO(startDateString);
  const endDate = parseISO(endDateString);

  const startFormatted = format(startDate, "MMM dd, yyyy");
  const endFormatted = format(endDate, "MMM dd, yyyy");

  return `${startFormatted} - ${endFormatted}`;
}
