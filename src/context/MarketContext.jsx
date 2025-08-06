import React, { createContext, useState, useEffect } from "react";
import { fetchMarketDataApi } from "../api/mockApi";

export const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMarketDataApi()
      .then((data) => {
        setMarketData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <MarketContext.Provider value={{ marketData, loading, error }}>
      {children}
    </MarketContext.Provider>
  );
};
