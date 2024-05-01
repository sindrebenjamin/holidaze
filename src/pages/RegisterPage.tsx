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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputAndLabelAndMessage from "../components/InputAndLabelAndMessage";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  const isError = errors.firstName ? true : false;

  console.log(isValid);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputAndLabelAndMessage
        register={register}
        placeholder="First name"
        name="firstName"
        label="First name"
        error={isError}
        message={errors.firstName?.message}
      />

      <input type="submit" disabled={!isValid} />
    </form>
  );
};

export default RegisterPage;
