import { useApi } from "./hooks/useApi";
import { useState, useMemo } from "react";
import { Textarea } from "./components/TailwindComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./App.css";

const schema = yup
  .object({
    firstName: yup
      .string()
      .min(3, "Your first name should be at least 3 characters.")
      .max(10)
      .required("Please enter your first name"),
  })
  .required();

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

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

  function onSubmit(data) {
    console.log(data);
  }

  console.log(isValid);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        {...register("firstName")}
        $status={errors.firstName ? "error" : ""}
      />
      <p>{errors.firstName?.message}</p>
      <input type="submit" disabled={!isValid} />
    </form>
  );
}

export default App;
