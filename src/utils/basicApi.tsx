import { ApiStatus, ApiOptions } from "../interfaces";

/**
 * Performs an API call and updates the API status.
 *
 * @async
 * @function basicApi
 * @param url - The URL to fetch data from.
 * @param options - The options to pass to the fetch call.
 * @param setApiStatus - A callback function to set the API status.
 * @returns The result of the API call if successful.
 *
 */

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
