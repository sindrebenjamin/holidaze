import { ApiStatus, ApiOptions } from "../interfaces";
import { loginUser } from "./loginUser";

export async function registerUser(
  url: string,
  options: ApiOptions,
  setApiStatus: (status: ApiStatus) => void
) {
  const data = JSON.parse(options.body);

  try {
    setApiStatus("loading");
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      const loginOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      };
      loginUser(
        "https://v2.api.noroff.dev/auth/login",
        loginOptions,
        setApiStatus
      );
      // console.log(result);
    } else {
      setApiStatus(result);
    }
  } catch (e) {
    setApiStatus("error");
  } finally {
    //setApiStatus("idle");
  }
}
