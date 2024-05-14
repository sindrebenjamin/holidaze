import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useApi } from "../hooks/useApi";
import { useUserStore } from "../store/useUserStore";
import { ProfileResponse } from "../interfaces";
import ProfileInfo from "../components/modules/ProfilePage/ProfileInfo";
import ProfileVenues from "../components/modules/ProfilePage/ProfileVenues";
import { Container, Divider, StyledH2 } from "../components/TailwindComponents";

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
  const data = useApi<ProfileResponse>(
    `https://v2.api.noroff.dev/holidaze/profiles/${params.name}?_venues=true`,
    options
  );

  if (data) {
    return (
      <main className="lg:px-6 lg:py-[120px] md:pb-[60px] min-h-screen">
        <Container className="lg:flex lg:gap-12">
          {data.data?.data && <ProfileInfo user={data.data?.data} />}
          <div className="w-full px-4 sm:px-6 lg:px-0">
            <Divider className="lg:hidden mb-6" />
            <StyledH2>{data.data?.data.name}'s Venues</StyledH2>
            <ProfileVenues venues={data.data?.data.venues ?? []} />
          </div>
        </Container>
      </main>
    );
  }
};

export default ProfilePage;
