import { format, parseISO } from "date-fns";

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
