import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

// Mock portfolio data with holdings and transaction history
const mockPortfolioHoldings = [
  { symbol: "RELIANCE", type: "Stock", quantity: 50, avgPrice: 2800 },
  { symbol: "TCS", type: "Stock", quantity: 20, avgPrice: 4000 },
  { symbol: "NIFTYBEES", type: "ETF", quantity: 100, avgPrice: 145 },
  { symbol: "SBI Mutual Fund", type: "Mutual Fund", quantity: 200, avgPrice: 110 },
  { symbol: "GOLDBEES", type: "ETF", quantity: 150, avgPrice: 53 },
];

const mockLatestPrices = {
  RELIANCE: 2900.5,
  TCS: 4200.75,
  NIFTYBEES: 150.0,
  "SBI Mutual Fund": 115,
  GOLDBEES: 55.5,
};

const mockTransactions = [
  {
    id: 1,
    date: "2024-07-21",
    symbol: "RELIANCE",
    type: "Buy",
    quantity: 30,
    price: 2750,
    exchange: "NSE",
  },
  {
    id: 2,
    date: "2024-08-01",
    symbol: "RELIANCE",
    type: "Buy",
    quantity: 20,
    price: 2850,
    exchange: "NSE",
  },
  {
    id: 3,
    date: "2024-07-25",
    symbol: "TCS",
    type: "Buy",
    quantity: 20,
    price: 4000,
    exchange: "BSE",
  },
  {
    id: 4,
    date: "2024-07-28",
    symbol: "NIFTYBEES",
    type: "Buy",
    quantity: 100,
    price: 145,
    exchange: "NSE",
  },
  {
    id: 5,
    date: "2024-07-30",
    symbol: "SBI Mutual Fund",
    type: "Buy",
    quantity: 200,
    price: 110,
    exchange: "AMFI",
  },
];

const Portfolio = () => {
  const { user } = useContext(UserContext);
  const [filterSymbol, setFilterSymbol] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [unrealizedPL, setUnrealizedPL] = useState(0);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Calculate portfolio performance and setup pie chart
  useEffect(() => {
    // Filter transactions
    const filtered = mockTransactions.filter((txn) => {
      const symbolMatch = filterSymbol
        ? txn.symbol.toLowerCase().includes(filterSymbol.toLowerCase())
        : true;
      const typeMatch =
        filterType === "All"
          ? true
          : mockPortfolioHoldings.find(
              (h) => h.symbol === txn.symbol && h.type === filterType
            );
      return symbolMatch && typeMatch;
    });
    setFilteredTransactions(filtered);

    // Calculate portfolio value and unrealized gain/loss
    let totalValue = 0;
    let totalCost = 0;
    mockPortfolioHoldings.forEach(({ symbol, quantity, avgPrice }) => {
      const currentPrice = mockLatestPrices[symbol] || avgPrice;
      totalValue += currentPrice * quantity;
      totalCost += avgPrice * quantity;
    });
    setPortfolioValue(totalValue);
    setUnrealizedPL(totalValue - totalCost);

    // Portfolio breakdown by asset type
    const breakdown = {};
    mockPortfolioHoldings.forEach(({ type, quantity, symbol }) => {
      const currentPrice = mockLatestPrices[symbol] || 0;
      breakdown[type] = (breakdown[type] || 0) + currentPrice * quantity;
    });

    // Setup or update pie chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(breakdown),
        datasets: [
          {
            data: Object.values(breakdown),
            backgroundColor: [
              "#f97316", // Saffron - Stocks
              "#22c55e", // Green - Mutual Funds
              "#2563eb", // Blue - ETFs
              "#eab308", // Yellow - Bonds/Other
            ],
          },
        ],
      },
      options: {
        plugins: { legend: { position: "bottom" } },
      },
    });
  }, [filterSymbol, filterType]);

  if (!user) {
    return (
      <div className="text-center mt-20">
        <p>Please login to view your portfolio.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Portfolio Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Total Portfolio Value</h3>
          <p className="text-2xl font-bold text-blue-600">
            ₹{portfolioValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Unrealized Gains/Losses</h3>
          <p
            className={`text-2xl font-bold ${
              unrealizedPL >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{unrealizedPL.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Account Balance</h3>
          <p className="text-2xl font-bold text-green-600">
            ₹{user.accountBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Portfolio Breakdown Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow max-w-md mx-auto mb-10">
        <h3 className="font-semibold mb-2 text-center">Asset Allocation</h3>
        <canvas ref={chartRef} aria-label="Portfolio Asset Allocation Pie Chart" role="img" />
      </div>

      {/* Transaction History Filters */}
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-center max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Filter by symbol"
          value={filterSymbol}
          onChange={(e) => setFilterSymbol(e.target.value)}
          className="p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 flex-grow"
          aria-label="Filter transactions by symbol"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          aria-label="Filter transactions by asset type"
        >
          <option value="All">All Types</option>
          <option value="Stock">Stock</option>
          <option value="ETF">ETF</option>
          <option value="Mutual Fund">Mutual Fund</option>
          <option value="Bond">Bond</option>
          <option value="Crypto">Crypto</option>
          <option value="Forex">Forex</option>
        </select>
      </div>

      {/* Transaction History Table */}
      {filteredTransactions.length === 0 ? (
        <p className="text-center">No transactions found.</p>
      ) : (
        <table className="w-full max-w-4xl mx-auto border-collapse bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Symbol</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Price (₹)</th>
              <th className="p-2 text-left">Exchange</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(({ id, date, symbol, type, quantity, price, exchange }) => (
              <tr key={id} className="even:bg-gray-100 dark:even:bg-gray-700">
                <td className="p-2">{date}</td>
                <td className="p-2 font-semibold">{symbol}</td>
                <td className="p-2">{type}</td>
                <td className="p-2">{quantity}</td>
                <td className="p-2">₹{price.toFixed(2)}</td>
                <td className="p-2">{exchange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Portfolio;
