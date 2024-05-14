import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import { ApiStatus } from "../interfaces";
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
import { useDebounce } from "use-debounce";
import { basicApi } from "../utils/basicApi";

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
  const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
  const [bio, setBio] = useState(user?.bio);
  const [debouncedBio] = useDebounce(bio, 500);

  console.log(user);
  function updateProfile() {
    console.log("hei");
  }

  {
    /* Update bio */
  }
  useEffect(() => {
    const bioOptions = {
      method: "PUT",
      headers: {
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bio: debouncedBio,
      }),
    };

    if (debouncedBio !== user?.bio) {
      (async function () {
        await basicApi(
          `https://v2.api.noroff.dev/holidaze/profiles/${user?.name}`,
          bioOptions,
          setApiStatus
        );
        if (user && debouncedBio) {
          useUserStore.setState({ user: { ...user, bio: debouncedBio } });
        }
      })();
    }
  }, [debouncedBio]);

  if (user) {
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
        <div className="md:px-6">
          <Container className="md:flex md:justify-between gap-12">
            <AccountSettings
              bio={bio}
              setBio={setBio}
              user={user}
              updateProfile={updateProfile}
            />
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
      </main>
    );
  }
};

export default AccountPage;
