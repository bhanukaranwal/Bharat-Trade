import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { MarketProvider } from "./context/MarketContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <MarketProvider>
      <App />
    </MarketProvider>
  </UserProvider>
);
