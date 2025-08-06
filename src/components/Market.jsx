import React, { useEffect, useState } from "react";

// Sample mock market data structured with Indian instruments
const mockMarketData = [
  { symbol: "RELIANCE", exchange: "NSE", type: "Stock", name: "Reliance Industries", price: 2900.5, change: 1.5 },
  { symbol: "TCS", exchange: "BSE", type: "Stock", name: "Tata Consultancy Services", price: 4200.75, change: -0.3 },
  { symbol: "NIFTYBEES", exchange: "NSE", type: "ETF", name: "NIFTYBEES ETF", price: 150.0, change: 0.2 },
  { symbol: "BTC/INR", exchange: "WazirX", type: "Crypto", name: "Bitcoin INR", price: 4800000, change: 2.0 },
  { symbol: "USD/INR", exchange: "Forex", type: "Forex", name: "US Dollar to INR", price: 83.2, change: 0.1 },
  { symbol: "NIFTY", exchange: "NSE", type: "Index", name: "NIFTY 50", price: 17600, change: 0.8 },
  { symbol: "GOLDBEES", exchange: "NSE", type: "ETF", name: "Gold Bees ETF", price: 55.5, change: 0.3 },
  { symbol: "INFY", exchange: "NSE", type: "Stock", name: "Infosys Ltd", price: 1400, change: -0.5 },
];

const instrumentTypes = ["All", "Stock", "ETF", "Crypto", "Forex", "Index"];

const exchanges = ["All", "NSE", "BSE", "WazirX", "Forex"];

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [instrumentFilter, setInstrumentFilter] = useState("All");
  const [exchangeFilter, setExchangeFilter] = useState("All");
  const [filteredData, setFilteredData] = useState(mockMarketData);

  useEffect(() => {
    let data = mockMarketData;

    if (instrumentFilter !== "All") {
      data = data.filter((item) => item.type === instrumentFilter);
    }

    if (exchangeFilter !== "All") {
      data = data.filter((item) => item.exchange === exchangeFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      data = data.filter(
        (item) =>
          item.symbol.toLowerCase().includes(term) ||
          item.name.toLowerCase().includes(term)
      );
    }

    setFilteredData(data);
  }, [searchTerm, instrumentFilter, exchangeFilter]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Market Instruments</h2>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by symbol or name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          aria-label="Search market instruments"
        />

        <select
          value={instrumentFilter}
          onChange={(e) => setInstrumentFilter(e.target.value)}
          className="p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          aria-label="Filter by instrument type"
        >
          {instrumentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={exchangeFilter}
          onChange={(e) => setExchangeFilter(e.target.value)}
          className="p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          aria-label="Filter by exchange"
        >
          {exchanges.map((ex) => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>
      </div>

      {/* Instruments Table */}
      {filteredData.length === 0 ? (
        <p>No instruments found matching your criteria.</p>
      ) : (
        <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2 text-left">Symbol</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Exchange</th>
              <th className="p-2 text-right">Price (₹)</th>
              <th className="p-2 text-right">Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(({ symbol, name, exchange, price, change }) => (
              <tr
                key={symbol}
                className="even:bg-gray-100 dark:even:bg-gray-700"
              >
                <td className="p-2 font-semibold">{symbol}</td>
                <td className="p-2">{name}</td>
                <td className="p-2">{exchange}</td>
                <td className="p-2 text-right">
                  {price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td
                  className={`p-2 text-right ${
                    change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {change > 0 ? "+" : ""}
                  {change.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Market;
