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
