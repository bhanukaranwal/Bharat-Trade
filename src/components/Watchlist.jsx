import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

// Using the same mock instruments as in Market
const mockInstruments = [
  { symbol: "RELIANCE", exchange: "NSE", type: "Stock", name: "Reliance Industries", price: 2900.5, change: 1.5 },
  { symbol: "TCS", exchange: "BSE", type: "Stock", name: "Tata Consultancy Services", price: 4200.75, change: -0.3 },
  { symbol: "NIFTYBEES", exchange: "NSE", type: "ETF", name: "NIFTYBEES ETF", price: 150.0, change: 0.2 },
  { symbol: "BTC/INR", exchange: "WazirX", type: "Crypto", name: "Bitcoin INR", price: 4800000, change: 2.0 },
  { symbol: "USD/INR", exchange: "Forex", type: "Forex", name: "US Dollar to INR", price: 83.2, change: 0.1 },
  { symbol: "INFY", exchange: "NSE", type: "Stock", name: "Infosys Ltd", price: 1400, change: -0.5 },
];

const Watchlist = () => {
  const { user } = useContext(UserContext);
  const [watchlist, setWatchlist] = useState(() => {
    // Load watchlist from localStorage or start empty
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("watchlist");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Persist watchlist to localStorage on changes
    if (typeof window !== "undefined") {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist]);

  if (!user) {
    return (
      <div className="text-center mt-20">
        <p>Please login to view your watchlist.</p>
      </div>
    );
  }

  const addToWatchlist = () => {
    if (!selectedSymbol) {
      setError("Please select an instrument to add.");
      return;
    }
    if (watchlist.includes(selectedSymbol)) {
      setError("Instrument already in watchlist.");
      return;
    }
    setWatchlist((prev) => [...prev, selectedSymbol]);
    setSelectedSymbol("");
    setError("");
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist((prev) => prev.filter((item) => item !== symbol));
  };

  const watchlistItems = watchlist
    .map((sym) => mockInstruments.find((item) => item.symbol === sym))
    .filter(Boolean); // filter out any missing instruments

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Watchlist</h2>

      {/* Add new instrument */}
      <div className="flex gap-2 mb-4 max-w-md">
        <select
          aria-label="Select instrument to add to watchlist"
          className="flex-grow p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          value={selectedSymbol}
          onChange={(e) => {
            setSelectedSymbol(e.target.value);
            setError("");
          }}
        >
          <option value="">Select Instrument</option>
          {mockInstruments.map(({ symbol, name }) => (
            <option key={symbol} value={symbol}>
              {symbol} - {name}
            </option>
          ))}
        </select>
        <button
          onClick={addToWatchlist}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
        >
          Add
        </button>
      </div>
      {error && (
        <div className="mb-4 text-red-600 border border-red-600 p-2 rounded">
          {error}
        </div>
      )}

      {/* Watchlist table */}
      {watchlistItems.length === 0 ? (
        <p>No instruments in your watchlist. Add some above.</p>
      ) : (
        <table className="w-full max-w-lg border-collapse bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2 text-left">Symbol</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Exchange</th>
              <th className="p-2 text-right">Price (₹)</th>
              <th className="p-2 text-right">Change (%)</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchlistItems.map(({ symbol, name, exchange, price, change }) => (
              <tr key={symbol} className="even:bg-gray-100 dark:even:bg-gray-700">
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
                <td className="p-2 text-center">
                  <button
                    onClick={() => removeFromWatchlist(symbol)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Remove ${symbol} from watchlist`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Watchlist;
