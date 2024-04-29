import { useApi } from "./hooks/useApi";
import { useState, useMemo } from "react";

import "./App.css";

function App() {
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

  console.log(data, status);

  return <></>;
}

export default App;
