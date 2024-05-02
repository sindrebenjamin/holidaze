import { ApiStatus, ApiOptions } from "../interfaces";
import { useUserStore } from "../store/useUserStore";

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
      useUserStore.setState({ user: result.data });
    } else {
      setApiStatus(result);
    }
  } catch (e) {
    setApiStatus("error");
  } finally {
    //setApiStatus("idle");
  }
}
