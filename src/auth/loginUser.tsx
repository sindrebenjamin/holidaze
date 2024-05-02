import { ApiStatus, ApiOptions } from "../interfaces";
import { basicApi } from "../utils/basicApi";
import { setLocal } from "../utils/setLocal";

export async function loginUser(
  url: string,
  options: ApiOptions,
  setApiStatus: (status: ApiStatus) => void
) {
  try {
    setApiStatus("loading");
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      const nextOptions = {
        method: "GET",
        headers: {
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          Authorization: `Bearer ${result.data.accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const profileResult = await basicApi(
        `https://v2.api.noroff.dev/holidaze/profiles/${result.data.name}`,
        nextOptions,
        setApiStatus
      );

      console.log(profileResult);

      const user = {
        data: result.data,
        venueManager: profileResult.data.venueManager,
      };

      setLocal("user", user);

      console.log(user);
    } else {
      setApiStatus(result);
    }
  } catch (e) {
    setApiStatus("error");
  } finally {
    //setApiStatus("idle");
  }
}
