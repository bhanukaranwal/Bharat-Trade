import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const mockPortfolioBreakdown = {
  Stocks: 50000,
  MutualFunds: 30000,
  ETFs: 15000,
  Bonds: 5000,
};

const mockIndices = [
  { symbol: "NIFTY50", name: "NIFTY 50", price: 17600, change: 0.8 },
  { symbol: "SENSEX", name: "BSE SENSEX", price: 58000, change: -0.2 },
  { symbol: "NIFTYBANK", name: "NIFTY BANK", price: 40000, change: 1.2 },
];

const mockNews = "RBI maintains interest rates, signals steady growth ahead.";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const total = Object.values(mockPortfolioBreakdown).reduce(
      (sum, val) => sum + val,
      0
    );
    setPortfolioValue(total);

    // Setup Pie chart for portfolio diversification
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(mockPortfolioBreakdown),
        datasets: [
          {
            label: "Portfolio Breakdown",
            data: Object.values(mockPortfolioBreakdown),
            backgroundColor: [
              "#f97316", // amber-500
              "#22c55e", // green-500
              "#2563eb", // blue-600
              "#eab308", // yellow-500
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  }, []);

  if (!user) {
    return (
      <div className="text-center mt-20">
        <p>Please login to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Welcome, {user.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account Summary */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h3 className="text-xl font-semibold mb-2">Account Balance</h3>
          <p className="text-2xl font-bold text-green-600">₹{user.accountBalance.toLocaleString()}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h3 className="text-xl font-semibold mb-2">Portfolio Value</h3>
          <p className="text-2xl font-bold text-blue-600">₹{portfolioValue.toLocaleString()}</p>
        </div>

        {/* Market Indices */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h3 className="text-xl font-semibold mb-2">Market Indices</h3>
          <ul>
            {mockIndices.map(({ symbol, name, price, change }) => (
              <li
                key={symbol}
                className={`flex justify-between py-1 ${
                  change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                <span>{name}</span>
                <span>
                  {price.toLocaleString()} ({change > 0 ? "+" : ""}
                  {change}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Portfolio Diversification Chart */}
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4 max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-2 text-center">Portfolio Diversification</h3>
        <canvas ref={chartRef} aria-label="Portfolio Diversification Pie Chart" role="img"></canvas>
      </div>

      {/* Latest Market News */}
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-2">Latest Market News</h3>
        <p>{mockNews}</p>
      </div>
    </div>
  );
};

export default Dashboard;
