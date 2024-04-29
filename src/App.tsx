import { useApi } from "./hooks/useApi";

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const { data, status } = useApi(
    "https://v2.api.noroff.dev/holidaze/profiles?_bookings=true&_venues=true",
    {
      method: "GET",
      headers: {
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2luZGVyYmxvY2siLCJlbWFpbCI6InNpbmRlcmJsb2NrQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzEzMjExMDI5fQ.1dnOhjEfE_bhfiRJMaAxSbTRKpE721WaZoLWqIkQ_Qw",
        "Content-Type": "application/json",
      },
    }
  );

  console.log(data, status);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
