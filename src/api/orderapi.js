// src/api/mockApi.js

export const placeOrderApi = async (order) => {
  // Simulate network latency and order processing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: Math.floor(Math.random() * 100000),
        status: "Executed (mock)",
        order,
      });
    }, 1000);
  });
};
