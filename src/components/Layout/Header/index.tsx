import { useUserStore } from "../../../store/useUserStore";
import Logo from "../../icons/Logo";

const Header = () => {
  const user = useUserStore((state) => state.user);
  return (
    <header>
      <Logo />
      {!user ? "hei" : "nei"}
      <UserAvatar />
    </header>
  );
};

export default Header;

const UserAvatar = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div className="relative w-fit h-fit">
      <img
        className="rounded-full h-11 w-11"
        src={user?.avatar.url}
        alt={user?.avatar.alt}
      />
      <div className="bg-gray-50 justify-center items-center flex rounded-full h-3 w-3 absolute bottom-0 right-0">
        <svg
          width={6}
          height={4}
          viewBox="0 0 6 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L3 3L5 1"
            stroke="#F472B6"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
