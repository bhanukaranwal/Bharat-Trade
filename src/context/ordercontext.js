import React, { createContext, useState } from "react";
import { placeOrderApi } from "../api/mockApi";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const placeOrder = async (order) => {
    setLoading(true);
    setError(null);
    setOrderStatus(null);
    try {
      const response = await placeOrderApi(order);
      if (response.success) {
        setOrderStatus(response);
      } else {
        setError("Order failed");
      }
    } catch (err) {
      setError(err.message || "Order failed due to unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider value={{ orderStatus, loading, error, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
