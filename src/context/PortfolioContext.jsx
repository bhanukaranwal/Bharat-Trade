import React, { createContext, useState, useEffect } from "react";
import { fetchPortfolioApi } from "../api/mockApi";

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState({
    holdings: [],
    transactions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolioApi()
      .then((data) => {
        setPortfolioData({
          holdings: data.holdings || [],
          transactions: data.transactions || [],
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message ?? "Failed to load portfolio");
        setLoading(false);
      });
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolioData, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};
