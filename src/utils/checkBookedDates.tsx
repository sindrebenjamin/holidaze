import { Booking } from "../interfaces";

/**
 * Transforms a list of booking objects into an array of date ranges in 'YYYY-MM-DD' format.
 *
 * @param bookings - An array of booking objects or undefined. Each booking object should have 'dateFrom' and 'dateTo' properties.
 * @returns An array of objects representing the date ranges of the bookings, with 'startDate' and 'endDate' properties in 'YYYY-MM-DD' format. Returns an empty array if no bookings are provided.
 */

export function checkBookedDates(bookings: Booking[] | undefined) {
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
