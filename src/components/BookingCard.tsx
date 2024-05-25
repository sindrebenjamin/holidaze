import UserCircle from "./icons/UserCircle";

interface BookingCardProps {
  title: string;
  guests: number;
  duration: string;
  onClick?: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  title,
  guests,
  duration,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col gap-6 p-3 rounded-lg border border-gray-400 hover:border-gray-600 transition-colors duration-100"
    >
      <p>{title}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          <UserCircle />
          <p>{guests}</p>
        </div>
        <p className="text-gray-500 text-sm">{duration}</p>
      </div>
    </div>
  );
};

export default BookingCard;
