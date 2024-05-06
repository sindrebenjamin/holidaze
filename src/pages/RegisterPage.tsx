import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink } from "react-router-dom";

import { registerUser } from "../auth/registerUser";
import { FormH1 } from "../components/TailwindComponents";
import InputAndLabelAndMessage from "../components/InputAndLabelAndMessage";
import SelectorButton from "../components/SelectorButton";
import Button from "../components/Button";
import { ApiStatus, RegisterFormData } from "../interfaces";

const schema = yup
  .object({
    name: yup
      .string()
      .max(20, "Name cannot exceed 20 characters.")
      .matches(/^[a-zA-Z0-9_]+$/, "Name can only use a-Z, 0-9, and _")
      .required("Please enter your first name"),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
        "Only stud.noroff.no emails are allowed to register"
      )
      .required("Please enter your email"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters.")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  })
  .required();

const RegisterPage = () => {
  const [venueManager, setVenueManager] = useState(true);
  const [subPage, setSubPage] = useState("accountType");
  const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [subPage]);

  const apiErrors = typeof apiStatus === "object" ? apiStatus.errors : null;

  function onSubmit(data: RegisterFormData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        venueManager: venueManager,
      }),
    };

    registerUser(
      "https://v2.api.noroff.dev/auth/register",
      options,
      setApiStatus
    );
  }

  return (
    <main className="sm:bg-gray-50 sm:flex sm:flex-col sm:justify-center sm:items-center sm:min-h-screen sm:py-12">
      <div className="bg-white w-full px-4 py-12 min-h-screen sm:min-h-0 sm:p-10 sm:rounded-lg sm:shadow-md max-w-[535px]">
        <FormH1 className="mb-6">Create Account</FormH1>
        {subPage === "accountType" ? (
          <div className="gap-6 flex flex-col">
            <p className="text-gray-600">
              What type of account do you wish to create?
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Account type</p>
              <SelectorButton
                onClick={() => setVenueManager(true)}
                selected={venueManager === true}
              >
                Venue manager
              </SelectorButton>
              <SelectorButton
                onClick={() => setVenueManager(false)}
                selected={!venueManager}
              >
                Guest
              </SelectorButton>
            </div>
            <Button
              fullWidth={true}
              onClick={() => setSubPage("form")}
              size="xl"
              color="white"
            >
              Continue
            </Button>
          </div>
        ) : (
          <>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputAndLabelAndMessage
                type="text"
                register={register}
                placeholder="John Johnson"
                name="name"
                label="Name"
                error={Boolean(errors.name)}
                message={errors.name?.message}
              />
              <InputAndLabelAndMessage
                autocomplete="username"
                type="email"
                register={register}
                placeholder="john@stud.noroff.no"
                name="email"
                label="Email"
                error={Boolean(errors.email)}
                message={errors.email?.message}
              />
              <InputAndLabelAndMessage
                autocomplete="new-password"
                type="password"
                register={register}
                placeholder="********"
                name="password"
                label="Password"
                error={Boolean(errors.password)}
                message={errors.password?.message}
              />
              <InputAndLabelAndMessage
                autocomplete="new-password"
                type="password"
                register={register}
                placeholder="********"
                name="confirmPassword"
                label="Confirm password"
                error={Boolean(errors.confirmPassword)}
                message={errors.confirmPassword?.message}
              />
              <div className="flex flex-col gap-4 mt-2">
                <Button
                  type="button"
                  fullWidth={true}
                  onClick={() => setSubPage("accountType")}
                  size="xl"
                  color="white"
                >
                  Back
                </Button>
                <Button
                  disabled={!isValid}
                  type="submit"
                  fullWidth={true}
                  size="xl"
                  color="gray-dark"
                >
                  {apiStatus === "loading" ? (
                    <div className="spinner-light"></div>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
        <p className="text-gray-800 mt-4">
          Already have a user?{" "}
          <NavLink
            to="/login"
            className="underline text-pink-700 hover:text-pink-800 transition-colors duration-100"
          >
            Log in here
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
  );
};

export default RegisterPage;
