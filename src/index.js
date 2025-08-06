import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { MarketProvider } from "./context/MarketContext";
import { PortfolioProvider } from "./context/PortfolioContext";
import { OrderProvider } from "./context/OrderContext";
import { NotificationProvider } from "./context/NotificationContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <MarketProvider>
      <PortfolioProvider>
        <OrderProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </OrderProvider>
      </PortfolioProvider>
    </MarketProvider>
  </UserProvider>
);
