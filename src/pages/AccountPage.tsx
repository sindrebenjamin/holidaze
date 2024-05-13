import { useMemo } from "react";
import { NavLink } from "react-router-dom";

import BookingCard from "../components/BookingCard";
import { useApi } from "../hooks/useApi";
import { useUserStore } from "../store/useUserStore";
import { ProfileResponse } from "../interfaces";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { StyledH1, StyledH2 } from "../components/TailwindComponents";
import AccountSettings from "../components/modules/AccountPage/AccountSettings";

const AccountPage = () => {
  const user = useUserStore((state) => state.user);
  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
    }),
    [user?.accessToken]
  );
  const data = useApi<ProfileResponse>(
    `https://v2.api.noroff.dev/holidaze/profiles/${user?.name}?_venues=true&_bookings=true`,
    options
  );

  function updateProfile() {
    console.log("hei");
  }

  console.log(data);
  if (user) {
    return (
      <>
        <div className="flex justify-between items-center">
          <BackButton />
          <NavLink to={`/profile/${user?.name}`}>
            <Button type="button" color="gray-light" size="sm">
              View public profile
            </Button>
          </NavLink>
        </div>
        <StyledH1>My Account</StyledH1>
        <AccountSettings user={user} updateProfile={updateProfile} />
        <StyledH2>My Bookings</StyledH2>
      </>
    );
  }
};

export default AccountPage;
