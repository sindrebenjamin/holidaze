import { DateValueType, DateType } from "react-tailwindcss-datepicker";

import { Booking } from "../interfaces";

export function isVenueAvailable(
  desiredDates: DateValueType,
  bookedDates: Booking[]
) {
  function parseDate(dateStr: string | DateType): Date {
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
