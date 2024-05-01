/*
import { useApi } from "./hooks/useApi";
import { useState, useMemo } from "react";

 const inputOptions = useMemo(
    () => ({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "sinderblock2@stud.noroff.no",
        password: "12345678",
      }),
    }),
    []
  );
  const { data, status } = useApi(
    "https://v2.api.noroff.dev/auth/login",
    inputOptions
  );
*/

import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { StyledH1 } from "../components/TailwindComponents";
import InputAndLabelAndMessage from "../components/InputAndLabelAndMessage";
import SelectorButton from "../components/SelectorButton";
import Button from "../components/Button";

interface FormData {
  name: string;
}

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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  function onSubmit(data: FormData) {
    console.log(data);
    console.log(venueManager);
  }

  return (
    <>
      <StyledH1>Create Account</StyledH1>
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
              type="email"
              register={register}
              placeholder="john@stud.noroff.no"
              name="email"
              label="Email"
              error={Boolean(errors.email)}
              message={errors.email?.message}
            />
            <InputAndLabelAndMessage
              type="password"
              register={register}
              placeholder="********"
              name="password"
              label="Password"
              error={Boolean(errors.password)}
              message={errors.password?.message}
            />
            <InputAndLabelAndMessage
              type="password"
              register={register}
              placeholder="********"
              name="confirmPassword"
              label="Confirm password"
              error={Boolean(errors.confirmPassword)}
              message={errors.confirmPassword?.message}
            />

            <input type="submit" disabled={!isValid} />
          </form>
          <Button
            fullWidth={true}
            onClick={() => setSubPage("accountType")}
            size="xl"
            color="gray-dark"
          >
            Back
          </Button>
        </>
      )}
    </>
  );

  /*
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputAndLabelAndMessage
        register={register}
        placeholder="First name"
        name="firstName"
        label="First name"
        error={Boolean(errors.firstName)}
        message={errors.firstName?.message}
      />

      <input type="submit" disabled={!isValid} />
    </form>
  );

  */
};

export default RegisterPage;
