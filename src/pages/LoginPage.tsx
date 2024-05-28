import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { loginUser } from "../auth/loginUser";
import { FormH1 } from "../components/TailwindComponents";
import InputAndLabelAndMessage from "../components/InputAndLabelAndMessage";
import Button from "../components/Button";
import { ApiStatus, LoginFormData } from "../interfaces";
import useLoginRedirect from "../hooks/useLoginRedirect";
import useLastPageStore from "../store/useLastPageStore";

const LoginPage = () => {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
  const { register, handleSubmit } = useForm<LoginFormData>();
  const loginRedirect = useLoginRedirect();
  const setLastPath = useLastPageStore((state) => state.setLastPath);
  const apiErrors = typeof apiStatus === "object" ? apiStatus.errors : null;

  setLastPath("/");

  function onSubmit(data: LoginFormData) {
    const options = {
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
      "https://v2.api.noroff.dev/auth/login?_holidaze=true",
      options,
      setApiStatus,
      loginRedirect
    );
  }

  return (
    <>
      <Helmet>
        <title>Holidaze | Login</title>
      </Helmet>
      <main className="sm:bg-gray-50 sm:flex sm:flex-col sm:justify-center sm:items-center sm:min-h-screen sm:py-12">
        <div className="bg-white w-full px-4 py-12 min-h-screen sm:min-h-0 sm:p-10 sm:rounded-lg sm:shadow-md sm:max-w-[535px]">
          <FormH1 className="mb-6">Login</FormH1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputAndLabelAndMessage
              autocomplete="username"
              type="email"
              register={register}
              placeholder="john@stud.noroff.no"
              name="email"
              label="Email"
            />
            <InputAndLabelAndMessage
              autocomplete="current-password"
              type="password"
              register={register}
              placeholder="********"
              name="password"
              label="Password"
            />

            <Button type="submit" fullWidth={true} size="xl" color="gray-dark">
              {apiStatus === "loading" ? (
                <div className="spinner-light"></div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <p className="text-gray-800 mt-4">
            Not registered?{" "}
            <NavLink
              to="/register"
              className="underline text-pink-700 hover:text-pink-800 transition-colors duration-100"
            >
              Create new user
            </NavLink>
          </p>
          <ul className="text-red-500 mt-2">
            {apiErrors &&
              apiErrors.map((error) => {
                return <li key={error.message}>{error.message}</li>;
              })}
          </ul>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
