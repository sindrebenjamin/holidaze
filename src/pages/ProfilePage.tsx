import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useApi } from "../hooks/useApi";
import { useUserStore } from "../store/useUserStore";
import { ProfileResponse } from "../interfaces";
import ProfileInfo from "../components/modules/ProfilePage/ProfileInfo";
import ProfileVenues from "../components/modules/ProfilePage/ProfileVenues";
import { Container, Divider, StyledH2 } from "../components/TailwindComponents";
import BackButton from "../components/BackButton";
import { useRedirectStore } from "../store/useRedirectStore";

const ProfilePage = () => {
  const params = useParams();
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
    `https://v2.api.noroff.dev/holidaze/profiles/${params.name}?_venues=true`,
    options
  );
  const redirect = useRedirectStore((state) => state.setRedirect);
  redirect("/profile/" + params.name);

  if (status === "error") {
    return (
      <main className="h-screen flex items-center justify-center">
        <BackButton overrideClasses="absolute top-4 left-4 lg:hidden" />
        <p>Something went wrong</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="h-screen flex items-center justify-center">
        <BackButton overrideClasses="absolute top-4 left-4 lg:hidden" />
        <NavLink
          className="underline text-pink-700 hover:text-pink-800 transition-colors duration-100"
          to="/login"
        >
          Log in to view this profile
        </NavLink>
      </main>
    );
  }

  if (data) {
    return (
      <main className="lg:px-6 lg:py-[120px] md:pb-[60px] min-h-screen">
        <Container className="lg:flex lg:gap-12">
          {data?.data && <ProfileInfo user={data?.data} />}
          <div className="w-full px-4 sm:px-6 lg:px-0">
            <Divider className="lg:hidden mb-6" />
            <StyledH2>{data?.data.name}'s Venues</StyledH2>
            <ProfileVenues venues={data?.data.venues ?? []} />
          </div>
        </Container>
      </main>
    );
  }
};

export default ProfilePage;
