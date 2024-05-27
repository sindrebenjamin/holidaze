import { useMemo } from "react";
import { NavLink } from "react-router-dom";

import { useApi } from "../hooks/useApi";
import { useUserStore } from "../store/useUserStore";
import { ProfileResponse } from "../interfaces";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { Container, Divider, StyledH1 } from "../components/TailwindComponents";
import AccountSettings from "../components/modules/AccountPage/AccountSettings";
import { Section } from "../components/TailwindComponents";
import Bookings from "../components/modules/AccountPage/Bookings";
import AccountVenues from "../components/modules/AccountPage/AccountVenues";

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
  const { data, status } = useApi<ProfileResponse>(
    `https://v2.api.noroff.dev/holidaze/profiles/${user?.name}?_venues=true&_bookings=true`,
    options
  );

  if (status === "loading") {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <div className="spinner-dark"></div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <p>Something went wrong</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <NavLink
          className="underline text-pink-700 hover:text-pink-800 transition-colors duration-100 text-center"
          to="/login"
        >
          Log in to view your account
        </NavLink>
      </main>
    );
  }

  if (status === "success") {
    return (
      <main className="min-h-screen">
        <div className="lg:hidden flex justify-between items-center px-4 mb-6 mt-4">
          <BackButton />
          <NavLink to={`/profile/${user?.name}`}>
            <Button type="button" color="gray-light" size="sm">
              View public profile
            </Button>
          </NavLink>
        </div>

        {/* H1 - View button - Wrapper */}
        <div className="px-6 lg:mt-[120px]">
          <Container className="lg:flex lg:justify-between items-center mb-6 lg:mb-8">
            <StyledH1 className="text-center md:text-left">My Account</StyledH1>
            <NavLink className="hidden lg:block" to={`/profile/${user?.name}`}>
              <Button type="button" color="gray-light" size="sm">
                View public profile
              </Button>
            </NavLink>
          </Container>
        </div>

        {/* Settings - Bookings - Wrapper */}
        <div className={`md:px-6 ${!user.venueManager && "py-[60px]"}`}>
          <Container className="md:flex md:justify-between gap-12">
            <AccountSettings />
            <Divider className="mx-4 sm:mx-4 mb-6 md:hidden" />
            <Bookings bookings={data?.data.bookings ?? []} />
          </Container>
        </div>
        {user.venueManager && (
          <Section className="py-0 md:py-[60px] mb-[60px] md:mb-0">
            <Container>
              <Divider className="my-6 md:hidden" />
              <AccountVenues venues={data?.data.venues ?? []} />
            </Container>
          </Section>
        )}
      </main>
    );
  }
};

export default AccountPage;
