import { Booking } from "../interfaces";

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

    console.log([...bookedDates]);

    return bookedDates;
  }

  return [];
}
