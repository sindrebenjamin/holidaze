import { useApi } from "./hooks/useApi";
import { Card, TextInput, Textarea } from "flowbite-react";

import { useState, useMemo } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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

  const [count, setCount] = useState(0);
  const { data, status } = useApi(
    "https://v2.api.noroff.dev/auth/login",
    inputOptions
  );

  console.log(data, status);

  return (
    <>
      <Card>Test</Card>
      <TextInput color="pink-500" />
      <Textarea />
    </>
  );
}

export default App;
