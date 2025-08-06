import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { MarketProvider } from "./context/MarketContext";
import { PortfolioProvider } from "./context/PortfolioContext";
import { OrderProvider } from "./context/OrderContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <MarketProvider>
      <PortfolioProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </PortfolioProvider>
    </MarketProvider>
  </UserProvider>
);
