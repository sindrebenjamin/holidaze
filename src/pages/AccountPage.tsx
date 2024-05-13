import { useMemo } from "react";
import { NavLink } from "react-router-dom";

import BookingCard from "../components/BookingCard";
import { useApi } from "../hooks/useApi";
import { useUserStore } from "../store/useUserStore";
import { ProfileResponse } from "../interfaces";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import {
  Container,
  Divider,
  StyledH1,
  StyledH2,
} from "../components/TailwindComponents";
import AccountSettings from "../components/modules/AccountPage/AccountSettings";
import Tab from "../components/Tab";
import { Section } from "../components/TailwindComponents";
import Bookings from "../components/modules/AccountPage/Bookings";
import VenueManagerCard from "../components/VenueManagerCard";
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
  const data = useApi<ProfileResponse>(
    `https://v2.api.noroff.dev/holidaze/profiles/${user?.name}?_venues=true&_bookings=true`,
    options
  );

  function updateProfile() {
    console.log("hei");
  }

  console.log(data.data?.data._count.bookings);

  if (user) {
    return (
      <>
        <div className="lg:hidden flex justify-between items-center px-4 mb-6 mt-4">
          <BackButton />
          <NavLink to={`/profile/${user?.name}`}>
            <Button type="button" color="gray-light" size="sm">
              View public profile
            </Button>
          </NavLink>
        </div>
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
        <div className="md:px-6">
          <Container className="md:flex md:justify-between gap-12">
            <AccountSettings user={user} updateProfile={updateProfile} />
            <Divider className="mx-4 sm:mx-4 mb-6 md:hidden" />
            <Bookings bookings={data.data?.data.bookings ?? []} />
          </Container>
        </div>
        <Section className="py-0 md:py-[60px]">
          <Container>
            <Divider className="my-6 md:hidden" />
            <AccountVenues
              venues={data.data?.data.venues ?? []}
              bookings={data.data?.data._count.bookings ?? 0}
            />
          </Container>
        </Section>
      </>
    );
  }
};

export default AccountPage;
