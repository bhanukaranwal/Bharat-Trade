// src/api/mockApi.js

// Mock data imports (you can also fetch these from public/mock-data/*.json files if using fetch)
import marketData from "../../public/mock-data/market.json";
import portfolioData from "../../public/mock-data/portfolio.json";

// Simulate network latency, returns a Promise resolving data after a delay
const simulateApiCall = (data, delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const loginApi = async (email, password) => {
  // Mock user database
  const users = [
    {
      email: "user@example.com",
      password: "password123",
      pan: "ABCDE1234F",
      name: "John Doe",
      accountBalance: 100000,
    },
  ];
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    // Return mock JWT token and user data
    const token = btoa(JSON.stringify({ email: user.email, pan: user.pan }));
    return simulateApiCall({ token, user });
  } else {
    return Promise.reject(new Error("Invalid email or password"));
  }
};

export const registerApi = async (userData) => {
  // Simulate registration success
  return simulateApiCall({ success: true });
};

export const fetchMarketDataApi = async () => {
  // Return market data from mock JSON
  return simulateApiCall(marketData);
};

export const fetchPortfolioApi = async () => {
  return simulateApiCall(portfolioData);
};

export const placeOrderApi = async (order) => {
  // Simulate order placement success response
  return simulateApiCall({
    success: true,
    orderId: Math.floor(Math.random() * 100000),
    status: "Executed (mock)",
    ...order,
  });
};

export const fetchTransactionHistoryApi = async () => {
  // Return mocked transaction history as part of portfolio data or separate
  return simulateApiCall(portfolioData.transactions || []);
};
