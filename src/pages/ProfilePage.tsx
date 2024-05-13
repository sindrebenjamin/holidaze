import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useApi } from "../hooks/useApi";
import { useUserStore } from "../store/useUserStore";
import { ProfileResponse } from "../interfaces";
import ProfileInfo from "../components/modules/ProfilePage/ProfileInfo";

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

  console.log(data.data);
  return (
    <main>
      <ProfileInfo user={data.data?.data} />
    </main>
  );
};

export default ProfilePage;
