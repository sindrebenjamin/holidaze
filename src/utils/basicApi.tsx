import { ApiStatus, ApiOptions } from "../interfaces";

export async function basicApi(
  url: string,
  options: ApiOptions,
  setApiStatus: (status: ApiStatus) => void
) {
  try {
    setApiStatus("loading");
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      setApiStatus("idle");
      return result;
    } else {
      setApiStatus(result);
    }
  } catch (e) {
    setApiStatus("error");
  } finally {
    //setApiStatus("idle");
  }
}
