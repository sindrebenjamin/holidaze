import BookingCard from "../components/BookingCard";

const AccountPage = () => {
  return (
    <>
      <BookingCard
        title="Sindre Hansen"
        bookings={3}
        duration="Apr 23 - Apr 25, 2024"
      />
    </>
  );
};

export default AccountPage;
