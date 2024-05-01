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

import InputAndLabelAndMessage from "../components/InputAndLabelAndMessage";
import SelectorButton from "../components/SelectorButton";
import Button from "../components/Button";

interface FormData {
  firstName: string;
}

const schema = yup
  .object({
    firstName: yup
      .string()
      .min(3, "Your first name should be at least 3 characters.")
      .max(10)
      .required("Please enter your first name"),
  })
  .required();

const RegisterPage = () => {
  const [venueManager, setVenueManager] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  function onSubmit(data: FormData) {
    console.log(data);
    console.log(venueManager);
  }

  console.log(Boolean(errors.firstName));

  return (
    <>
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
        onClick={() => console.log("Hei")}
        size="xl"
        color="pink"
      >
        Continue
      </Button>
      <Button
        fullWidth={true}
        onClick={() => console.log("Hei")}
        size="lg"
        color="gray-light"
      >
        Continue
      </Button>
      <Button
        fullWidth={false}
        onClick={() => console.log("Hei")}
        size="md"
        color="gray"
      >
        Continue
      </Button>
      <Button
        fullWidth={false}
        onClick={() => console.log("Hei")}
        size=""
        color=""
      >
        Continue
      </Button>
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
